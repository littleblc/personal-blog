'use client'

import { useState } from 'react'
import { CheckSquare, Square, Guitar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const practiceSteps = [
  {
    id: 'step1',
    title: '步骤 1',
    description: '以50%速度跟着视频练习（有吉他伴奏和无吉他伴奏两种）。'
  },
  {
    id: 'step2',
    title: '步骤 2',
    description: '以50%速度练习，同时说出并定位每个三和弦指型中的根音（有伴奏和无伴奏两种）。'
  },
  {
    id: 'step3',
    title: '步骤 3',
    description: '以50%速度练习，同时说出并定位每个三和弦指型中的音程 (例如: 1-3-5, 3-5-1, 5-1-3)。'
  },
  {
    id: 'step4',
    title: '步骤 4',
    description: '以50%速度练习，同时说出每个三和弦指型中的音符名称 (例如: C-E-G, E-G-C, G-C-E)。'
  },
  {
    id: 'step5',
    title: '步骤 5',
    description: '以50%速度跟着练习，注意每根弦上音符/音程的移动。先练习最高声部，然后是中间声部，最后是最低声部，完整走完整个序列。'
  },
  {
    id: 'step6',
    title: '步骤 6',
    description: '重复步骤1-5，以全速（或75%速度）练习。'
  },
  {
    id: 'step7',
    title: '步骤 7',
    description: '创造性地演奏这个练习 - 琶音、指弹、滑音等。'
  },
  {
    id: 'step8',
    title: '步骤 8 (可选)',
    description: '以1.25倍、1.5倍或2倍速度演奏练习视频。'
  },
  {
    id: 'step9',
    title: '步骤 9',
    description: '脱离视频，自己练习，最好配合伴奏或节拍器。'
  },
  {
    id: 'step10',
    title: '步骤 10',
    description: '在完全不看任何视觉参考的情况下演奏这些练习 - 能够演奏所有指型，并自己说出所有音符和音程！'
  }
]

export default function PracticeChecklistPage() {
  const [chordName, setChordName] = useState('')
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())

  const toggleStep = (stepId: string) => {
    const newCompleted = new Set(completedSteps)
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId)
    } else {
      newCompleted.add(stepId)
    }
    setCompletedSteps(newCompleted)
  }

  const resetChecklist = () => {
    setCompletedSteps(new Set())
    setChordName('')
  }

  const progress = (completedSteps.size / practiceSteps.length) * 100

  return (
    <div className="max-w-4xl mx-auto">
      {/* 返回按钮 */}
      <div className="mb-6">
        <Link 
          href="/guitar-tools" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回吉他工具
        </Link>
      </div>

      {/* 页面标题 */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Guitar className="w-10 h-10 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">三和弦精通10步检查清单</h1>
        </div>
        <p className="text-lg text-gray-600">系统化的三和弦练习方案，循序渐进掌握指型和理论</p>
      </div>

      {/* 和弦名称输入 */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center justify-center gap-4">
          <label className="text-lg font-semibold text-gray-700">和弦名称：</label>
          <input
            type="text"
            value={chordName}
            onChange={(e) => setChordName(e.target.value)}
            placeholder="例如：C大三和弦"
            className="px-4 py-2 border-2 border-blue-500 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors min-w-[200px]"
          />
        </div>
      </div>

      {/* 进度条 */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">练习进度</span>
          <span className="text-sm font-semibold text-gray-700">{completedSteps.size}/{practiceSteps.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-center mt-2 text-sm text-gray-600">
          {progress.toFixed(0)}% 完成
        </div>
      </div>

      {/* 练习步骤清单 */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">练习步骤</h2>
        <div className="space-y-4">
          {practiceSteps.map((step) => {
            const isCompleted = completedSteps.has(step.id)
            return (
              <div
                key={step.id}
                className={`flex items-start gap-4 p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${
                  isCompleted 
                    ? 'bg-green-50 border-green-300' 
                    : 'bg-gray-50 border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => toggleStep(step.id)}
              >
                <div className="flex-shrink-0 mt-1">
                  {isCompleted ? (
                    <CheckSquare className="w-6 h-6 text-green-600" />
                  ) : (
                    <Square className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold mb-2 ${
                    isCompleted ? 'text-green-800' : 'text-gray-900'
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`leading-relaxed ${
                    isCompleted ? 'text-green-700' : 'text-gray-700'
                  }`}>
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 重要提示 */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">重要提示</h3>
            <p className="text-yellow-700">
              除了第5步以外，所有这些步骤同样适用于<strong>纵向指型</strong>！
            </p>
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={resetChecklist}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
        >
          重置清单
        </button>
        <button
          onClick={() => window.print()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          打印清单
        </button>
      </div>

      {/* 练习建议 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">练习建议</h3>
        <div className="text-gray-700 space-y-3">
          <p>这是一份系统的吉他三和弦练习方案，旨在循序渐进地帮助你：</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>掌握三和弦的各种指型</li>
            <li>理解三和弦的音程结构</li>
            <li>记忆三和弦的音符组成</li>
            <li>培养肌肉记忆和即兴演奏能力</li>
          </ul>
          <p className="font-semibold text-blue-800 mt-4">
            坚持按照这10个步骤练习，你将能够真正精通三和弦！
          </p>
        </div>
      </div>
    </div>
  )
}
