import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { safeDateCompare } from './date-utils'

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  readingTime: number
}

const postsDirectory = path.join(process.cwd(), 'posts')

// 确保posts目录存在
if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true })
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    
    // 使用 Promise.all 来等待所有异步操作完成
    const allPostsPromises = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        return await getPostBySlug(slug)
      })

    const allPostsData = (await Promise.all(allPostsPromises))
      .filter(Boolean) as Post[]

    // 按日期排序（最新的在前）
    return allPostsData.sort((a, b) => {
      return safeDateCompare(b.date, a.date)
    })
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // 将Markdown转换为HTML
    const htmlContent = await marked(content)

    // 计算阅读时间（以250字/分钟计算）
    const wordCount = content.replace(/\s+/g, '').length
    const readingTime = Math.ceil(wordCount / 250)

    // 生成摘要（取前150个字符）
    const excerpt = data.excerpt || content.replace(/[#*`]/g, '').substring(0, 150) + '...'

    return {
      slug,
      title: data.title || '无标题',
      date: data.date || new Date().toISOString(),
      excerpt,
      content: htmlContent,
      readingTime: readingTime || 1,
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export function getPostSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => fileName.replace(/\.md$/, ''))
  } catch (error) {
    console.error('Error reading post slugs:', error)
    return []
  }
}