import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'
import { Calendar, FileText } from 'lucide-react'
import { safeFormatDate } from '@/lib/date-utils'

export const metadata = {
  title: '文章归档 - 我的个人博客',
  description: '按时间顺序浏览所有文章',
}

export default async function ArchivePage() {
  const posts = await getAllPosts()

  // 按年份分组
  const postsByYear = posts.reduce((acc, post) => {
    try {
      const dateWithTime = post.date.includes('T') ? post.date : `${post.date}T00:00:00`
      const year = new Date(dateWithTime).getFullYear()
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(post)
    } catch (error) {
      console.error(`Error processing date for post ${post.slug}:`, error)
      // 如果日期处理失败，放入当前年份
      const currentYear = new Date().getFullYear()
      if (!acc[currentYear]) {
        acc[currentYear] = []
      }
      acc[currentYear].push(post)
    }
    return acc
  }, {} as Record<number, typeof posts>)

  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a) // 最新年份在前

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">文章归档</h1>
        <p className="text-xl text-gray-600">
          共 {posts.length} 篇文章，记录了生活的点点滴滴
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">还没有文章</p>
          <p className="text-gray-500">开始写第一篇文章吧！</p>
        </div>
      ) : (
        <div className="space-y-12">
          {years.map((year) => (
            <div key={year} className="border-l-2 border-blue-200 pl-8 relative">
              {/* 年份标签 */}
              <div className="absolute -left-4 top-0">
                <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {year}
                </div>
              </div>

              {/* 该年份的文章列表 */}
              <div className="space-y-6 mt-8">
                {postsByYear[year].map((post) => (
                  <article key={post.slug} className="group">
                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            <Link 
                              href={`/blog/${post.slug}`}
                              className="hover:text-blue-600 transition-colors"
                            >
                              {post.title}
                            </Link>
                          </h3>
                          
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-2" />
                            <time dateTime={post.date}>
                              {safeFormatDate(post.date, 'yyyy年MM月dd日')}
                            </time>
                          </div>
                        </div>
                        
                        <div className="ml-6 flex-shrink-0">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                          >
                            阅读 →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 返回顶部 */}
      {posts.length > 5 && (
        <div className="text-center mt-12">
          <div className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg transition-colors cursor-pointer inline-block">
            返回顶部
          </div>
        </div>
      )}
    </div>
  )
}