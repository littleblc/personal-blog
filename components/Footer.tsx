import { Heart, Github, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* 关于博客 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">关于这个博客</h3>
            <p className="text-gray-300 leading-relaxed">
              记录生活中的点点滴滴，分享学习心得和思考感悟。
              希望我的文字能给你带来一些启发和帮助。
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/" className="hover:text-white transition-colors">首页</a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition-colors">关于我</a>
              </li>
              <li>
                <a href="/archive" className="hover:text-white transition-colors">文章归档</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">联系方式</a>
              </li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">联系我</h3>
            <div className="flex space-x-4">
              <a
                href="mailto:your-email@example.com"
                className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                title="邮箱"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/yourusername"
                className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                title="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p className="flex items-center justify-center">
            用 <Heart className="w-4 h-4 mx-1 text-red-500" /> 制作 © 2024 我的个人博客
          </p>
        </div>
      </div>
    </footer>
  )
}