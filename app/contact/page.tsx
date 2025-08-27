import { Mail, Github, MessageSquare, Send } from 'lucide-react'

export const metadata = {
  title: '联系方式 - 我的个人博客',
  description: '通过各种方式与我取得联系',
}

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">联系我</h1>
        <p className="text-xl text-gray-600">
          很高兴能与你建立联系！
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* 联系方式 */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">联系方式</h2>
          
          <div className="space-y-6">
            <div className="flex items-start p-4 bg-white rounded-lg shadow-md">
              <Mail className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">邮箱</h3>
                <p className="text-gray-600 mb-2">
                  发送邮件是联系我的最佳方式，我通常会在24小时内回复。
                </p>
                <a
                  href="mailto:your-email@example.com"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  your-email@example.com
                </a>
              </div>
            </div>

            <div className="flex items-start p-4 bg-white rounded-lg shadow-md">
              <Github className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">GitHub</h3>
                <p className="text-gray-600 mb-2">
                  查看我的代码项目，或者通过Issues与我讨论技术问题。
                </p>
                <a
                  href="https://github.com/yourusername"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @yourusername
                </a>
              </div>
            </div>

            <div className="flex items-start p-4 bg-white rounded-lg shadow-md">
              <MessageSquare className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">评论</h3>
                <p className="text-gray-600">
                  也可以直接在博客文章下留言，我会定期回复大家的评论。
                </p>
              </div>
            </div>
          </div>

          {/* 回复时间说明 */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">回复时间</h3>
            <ul className="text-gray-600 space-y-1">
              <li>• 邮件：通常24小时内回复</li>
              <li>• GitHub：1-3个工作日</li>
              <li>• 博客评论：每周集中回复</li>
            </ul>
          </div>
        </div>

        {/* 快速留言表单 */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">快速留言</h2>
          
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                姓名
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入您的姓名"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                邮箱
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入您的邮箱地址"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                主题
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入邮件主题"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                留言内容
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入您想说的话..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Send className="w-4 h-4 mr-2" />
              发送留言
            </button>
          </form>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>注意：</strong> 这个表单目前只是演示界面。实际使用时需要配置后端服务来处理表单提交。
              建议直接发送邮件或通过其他方式联系。
            </p>
          </div>
        </div>
      </div>

      {/* 常见问题 */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">常见问题</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-900 mb-2">可以转载你的文章吗？</h3>
            <p className="text-gray-600">
              欢迎转载！请注明出处和作者，并发邮件告知我一声就可以了。
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-900 mb-2">可以约稿或合作吗？</h3>
            <p className="text-gray-600">
              可以的！请通过邮件详细说明合作内容和要求，我会认真考虑。
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-900 mb-2">博客用什么技术搭建的？</h3>
            <p className="text-gray-600">
              使用Next.js + TypeScript + Tailwind CSS构建，部署在Vercel上。
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-900 mb-2">多久更新一次？</h3>
            <p className="text-gray-600">
              我会尽量保持每周至少更新一篇文章，具体频率取决于生活和工作安排。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}