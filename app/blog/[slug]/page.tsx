import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import Link from 'next/link'
import { safeFormatDate } from '@/lib/date-utils'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: '文章未找到',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* 返回按钮 */}
      <Link 
        href="/" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        返回首页
      </Link>

      {/* 文章头部 */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        
        <div className="flex items-center text-gray-600 space-x-6">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <time dateTime={post.date}>
              {safeFormatDate(post.date, 'yyyy年MM月dd日')}
            </time>
          </div>
          
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>{post.readingTime}分钟阅读</span>
          </div>
        </div>
      </header>

      {/* 文章内容 */}
      <div className="blog-content">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {/* 分享区域 */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="text-center">
          <p className="text-gray-600">喜欢这篇文章吗？分享给朋友吧！</p>
        </div>
      </footer>
    </article>
  )
}