import { BookOpen, Coffee, Smile } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          欢迎来到我的
          <span className="text-blue-600"> 个人博客</span>
        </h1>
        
        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          在这里记录生活的美好瞬间，分享学习的心得体会，
          <br />
          用文字记录成长的足迹，用故事连接你我的心。
        </p>

        <div className="flex justify-center items-center space-x-8 text-gray-600">
          <div className="flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
            <span>阅读</span>
          </div>
          <div className="flex items-center">
            <Coffee className="w-6 h-6 mr-2 text-blue-600" />
            <span>思考</span>
          </div>
          <div className="flex items-center">
            <Smile className="w-6 h-6 mr-2 text-blue-600" />
            <span>分享</span>
          </div>
        </div>
      </div>
    </section>
  )
}