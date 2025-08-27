import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import Hero from '@/components/Hero'

export default async function HomePage() {
  const posts = await getAllPosts()

  return (
    <div>
      <Hero />
      
      <section className="py-12">
        <div className="max-w-6xl mx-auto">
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