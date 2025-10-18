import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import Hero from '@/components/Hero'
import Link from 'next/link'
import { Guitar, CheckSquare } from 'lucide-react'

export default async function HomePage() {
  const posts = await getAllPosts()

  return (
    <div>
      <Hero />
      
      {/* 工具区域 */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">实用工具</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* 吉他指板工具 */}
            <Link 
              href="/guitar-tools"
              className="group bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl border border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center mb-4">
                <Guitar className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  吉他和弦指型练习
                </h3>
              </div>
              <p className="text-gray-700 mb-4">
                交互式22品吉他指板，支持三和弦和七和弦，四色音符标记，帮助你学习和练习各种和弦指型。
              </p>
              <div className="flex items-center text-blue-600 font-semibold">
                <span>开始练习</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            {/* 练习清单工具 */}
            <Link 
              href="/guitar-tools/practice-checklist"
              className="group bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl border border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center mb-4">
                <CheckSquare className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                  三和弦练习清单
                </h3>
              </div>
              <p className="text-gray-700 mb-4">
                10步系统化练习方案，进度跟踪，可打印清单，帮助你循序渐进地掌握三和弦技巧。
              </p>
              <div className="flex items-center text-green-600 font-semibold">
                <span>查看清单</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">最新文章</h2>
          
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">还没有文章，开始写第一篇吧！</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}