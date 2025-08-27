import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { Post } from '@/lib/posts'
import { safeFormatDate } from '@/lib/date-utils'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        {/* 文章标题 */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          <Link 
            href={`/blog/${post.slug}`}
            className="hover:text-blue-600 transition-colors"
          >
            {post.title}
          </Link>
        </h3>

        {/* 文章摘要 */}
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        {/* 文章元信息 */}
        <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <time dateTime={post.date}>
              {safeFormatDate(post.date, 'MM月dd日')}
            </time>
          </div>
          
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{post.readingTime}分钟</span>
          </div>
        </div>

        {/* 阅读更多链接 */}
        <Link 
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          阅读全文
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </article>
  )
}