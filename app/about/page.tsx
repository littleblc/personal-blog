import { Heart, Book, Camera, Cpu } from 'lucide-react'

export const metadata = {
  title: '关于我 - 我的个人博客',
  description: '了解更多关于我的信息、兴趣爱好和联系方式',
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">关于我</h1>
        <p className="text-xl text-gray-600">
          热爱生活，享受学习，乐于分享
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* 个人介绍 */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">个人简介</h2>
          <div className="prose prose-lg">
            <p>
              你好！我是一个热爱生活的普通人，喜欢通过文字记录生活中的点点滴滴。
              我相信每个人都有自己独特的故事和见解，而博客是一个很好的分享平台。
            </p>
            <p>
              在这里，我会分享我的日常生活、学习心得、旅行经历，以及一些随想和感悟。
              希望我的文字能给你带来一些启发，或者至少让你感到不那么孤单。
            </p>
            <p>
              我相信真诚的交流能够拉近人与人之间的距离，也希望通过这个博客认识更多有趣的朋友。
            </p>
          </div>
        </div>

        {/* 兴趣爱好 */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">兴趣爱好</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <Book className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">阅读</h3>
                <p className="text-gray-600">
                  热爱阅读各类书籍，从文学小说到科普读物，每本书都是一次新的冒险。
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Camera className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">摄影</h3>
                <p className="text-gray-600">
                  喜欢用镜头捕捉生活中的美好瞬间，记录旅途中的风景和感动。
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Cpu className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">技术</h3>
                <p className="text-gray-600">
                  对新技术充满好奇，喜欢学习和尝试各种有趣的工具和框架。
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Heart className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">生活</h3>
                <p className="text-gray-600">
                  享受简单的生活乐趣，比如一杯好咖啡、一次愉快的散步、与朋友的深度对话。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 联系方式 */}
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">联系我</h2>
        <p className="text-gray-600 mb-6">
          如果你有任何想法、建议或者只是想聊聊天，欢迎随时联系我！
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="mailto:your-email@example.com"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            发送邮件
          </a>
          <a
            href="https://github.com/yourusername"
            className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  )
}