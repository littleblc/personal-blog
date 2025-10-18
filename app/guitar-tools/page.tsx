'use client'

import { useState, useEffect } from 'react'
import { Guitar, CheckSquare } from 'lucide-react'
import Link from 'next/link'

// 音符到半音的映射
const noteToSemitone: { [key: string]: number } = {
  'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4, 'F': 5,
  'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11
}

// 半音到音符的映射
const semitoneToNote = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

// 和弦数据定义
const chordData: { [key: string]: any } = {
  // 三和弦
  'Am': { name: 'A 小三和弦', root: 'A', third: 'C', fifth: 'E' },
  'A': { name: 'A 大三和弦', root: 'A', third: 'C#', fifth: 'E' },
  'Bm': { name: 'B 小三和弦', root: 'B', third: 'D', fifth: 'F#' },
  'B': { name: 'B 大三和弦', root: 'B', third: 'D#', fifth: 'F#' },
  'Cm': { name: 'C 小三和弦', root: 'C', third: 'Eb', fifth: 'G' },
  'C': { name: 'C 大三和弦', root: 'C', third: 'E', fifth: 'G' },
  'C#m': { name: 'C# 小三和弦', root: 'C#', third: 'E', fifth: 'G#' },
  'C#': { name: 'C# 大三和弦', root: 'C#', third: 'F', fifth: 'G#' },
  'Dm': { name: 'D 小三和弦', root: 'D', third: 'F', fifth: 'A' },
  'D': { name: 'D 大三和弦', root: 'D', third: 'F#', fifth: 'A' },
  'Em': { name: 'E 小三和弦', root: 'E', third: 'G', fifth: 'B' },
  'E': { name: 'E 大三和弦', root: 'E', third: 'G#', fifth: 'B' },
  'Fm': { name: 'F 小三和弦', root: 'F', third: 'Ab', fifth: 'C' },
  'F': { name: 'F 大三和弦', root: 'F', third: 'A', fifth: 'C' },
  'Gm': { name: 'G 小三和弦', root: 'G', third: 'Bb', fifth: 'D' },
  'G': { name: 'G 大三和弦', root: 'G', third: 'B', fifth: 'D' },
  
  // 七和弦
  'Am7': { name: 'A 小七和弦', root: 'A', third: 'C', fifth: 'E', seventh: 'G' },
  'A7': { name: 'A 属七和弦', root: 'A', third: 'C#', fifth: 'E', seventh: 'G' },
  'Amaj7': { name: 'A 大七和弦', root: 'A', third: 'C#', fifth: 'E', seventh: 'G#' },
  'Bm7': { name: 'B 小七和弦', root: 'B', third: 'D', fifth: 'F#', seventh: 'A' },
  'B7': { name: 'B 属七和弦', root: 'B', third: 'D#', fifth: 'F#', seventh: 'A' },
  'Bmaj7': { name: 'B 大七和弦', root: 'B', third: 'D#', fifth: 'F#', seventh: 'A#' },
  'Cm7': { name: 'C 小七和弦', root: 'C', third: 'Eb', fifth: 'G', seventh: 'Bb' },
  'C7': { name: 'C 属七和弦', root: 'C', third: 'E', fifth: 'G', seventh: 'Bb' },
  'Cmaj7': { name: 'C 大七和弦', root: 'C', third: 'E', fifth: 'G', seventh: 'B' },
  'C#m7': { name: 'C# 小七和弦', root: 'C#', third: 'E', fifth: 'G#', seventh: 'B' },
  'C#7': { name: 'C# 属七和弦', root: 'C#', third: 'F', fifth: 'G#', seventh: 'B' },
  'C#maj7': { name: 'C# 大七和弦', root: 'C#', third: 'F', fifth: 'G#', seventh: 'C' },
  'Dm7': { name: 'D 小七和弦', root: 'D', third: 'F', fifth: 'A', seventh: 'C' },
  'D7': { name: 'D 属七和弦', root: 'D', third: 'F#', fifth: 'A', seventh: 'C' },
  'Dmaj7': { name: 'D 大七和弦', root: 'D', third: 'F#', fifth: 'A', seventh: 'C#' },
  'Em7': { name: 'E 小七和弦', root: 'E', third: 'G', fifth: 'B', seventh: 'D' },
  'E7': { name: 'E 属七和弦', root: 'E', third: 'G#', fifth: 'B', seventh: 'D' },
  'Emaj7': { name: 'E 大七和弦', root: 'E', third: 'G#', fifth: 'B', seventh: 'D#' },
  'Fm7': { name: 'F 小七和弦', root: 'F', third: 'Ab', fifth: 'C', seventh: 'Eb' },
  'F7': { name: 'F 属七和弦', root: 'F', third: 'A', fifth: 'C', seventh: 'Eb' },
  'Fmaj7': { name: 'F 大七和弦', root: 'F', third: 'A', fifth: 'C', seventh: 'E' },
  'Gm7': { name: 'G 小七和弦', root: 'G', third: 'Bb', fifth: 'D', seventh: 'F' },
  'G7': { name: 'G 属七和弦', root: 'G', third: 'B', fifth: 'D', seventh: 'F' },
  'Gmaj7': { name: 'G 大七和弦', root: 'G', third: 'B', fifth: 'D', seventh: 'F#' }
}

// 弦的调音（从低音弦到高音弦）
const stringTuning = ['E', 'A', 'D', 'G', 'B', 'E']

export default function GuitarToolsPage() {
  const [currentChord, setCurrentChord] = useState('Am')
  const [visibleNotes, setVisibleNotes] = useState({
    root: true,
    third: false,
    fifth: false,
    seventh: false
  })

  // 计算指板上的音符
  const getNoteAtFret = (stringIndex: number, fret: number): string => {
    const openNote = stringTuning[stringIndex]
    const openSemitone = noteToSemitone[openNote]
    const targetSemitone = (openSemitone + fret) % 12
    return semitoneToNote[targetSemitone]
  }

  // 获取音符类型
  const getNoteType = (note: string, chord: any): string | null => {
    if (note === chord.root && visibleNotes.root) {
      return 'root-note'
    } else if (note === chord.third && visibleNotes.third) {
      return 'third-note'
    } else if (note === chord.fifth && visibleNotes.fifth) {
      return 'fifth-note'
    } else if (chord.seventh && note === chord.seventh && visibleNotes.seventh) {
      return 'seventh-note'
    }
    return null
  }

  // 获取音符类型名称
  const getNoteTypeName = (type: string): string => {
    const names: { [key: string]: string } = {
      'root-note': '根音',
      'third-note': '三音',
      'fifth-note': '五音',
      'seventh-note': '七音'
    }
    return names[type] || type
  }

  // 渲染指板
  const renderFretboard = () => {
    const chord = chordData[currentChord]
    const specialFrets = [3, 5, 7, 9, 12, 15, 17, 19, 21]
    
    return (
      <div className="relative bg-amber-800 rounded-lg p-6 shadow-2xl overflow-x-auto">
        <div className="min-w-[900px]">
          {/* 品丝 */}
          <div className="absolute top-6 left-16 right-6 h-48 pointer-events-none">
            {Array.from({ length: 22 }, (_, i) => i + 1).map(fret => (
              <div
                key={fret}
                className="absolute w-1 h-32 bg-amber-900 shadow-md top-2"
                style={{ left: `${(fret - 0.5) * (100 / 22)}%` }}
              />
            ))}
          </div>

          {/* 弦 */}
          {stringTuning.slice().reverse().map((tuning, stringIndex) => {
            const actualStringIndex = 5 - stringIndex
            return (
              <div key={stringIndex} className="flex items-center mb-4 relative h-8">
                {/* 弦标签 */}
                <div className="w-8 text-center font-bold text-white text-lg">
                  {tuning}
                </div>
                
                {/* 弦线 */}
                <div className="flex-1 h-1 bg-gradient-to-r from-gray-300 to-gray-500 relative rounded shadow-sm">
                  {/* 音符 */}
                  {Array.from({ length: 23 }, (_, fret) => {
                    const note = getNoteAtFret(actualStringIndex, fret)
                    const noteType = getNoteType(note, chord)
                    
                    if (!noteType) return null
                    
                    const colors = {
                      'root-note': 'bg-blue-500 border-blue-300',
                      'third-note': 'bg-orange-500 border-orange-300',
                      'fifth-note': 'bg-green-500 border-green-300',
                      'seventh-note': 'bg-purple-500 border-purple-300'
                    }
                    
                    return (
                      <div
                        key={fret}
                        className={`absolute w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 shadow-lg transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform cursor-pointer ${colors[noteType as keyof typeof colors]}`}
                        style={{ 
                          left: fret === 0 ? '-12px' : `${fret * (100 / 22)}%`,
                          top: '50%'
                        }}
                        title={`${note} - ${getNoteTypeName(noteType)}`}
                      >
                        {note}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}

          {/* 品位数字 */}
          <div className="flex justify-between px-16 mt-4">
            {Array.from({ length: 22 }, (_, i) => i + 1).map(fret => (
              <div
                key={fret}
                className={`text-center font-bold text-white text-xs ${
                  specialFrets.includes(fret) 
                    ? 'bg-white bg-opacity-20 border-2 border-white border-opacity-60 rounded-full w-5 h-5 flex items-center justify-center' 
                    : ''
                }`}
                style={{ width: `${100 / 22}%` }}
              >
                {fret}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const toggleNote = (noteType: keyof typeof visibleNotes) => {
    setVisibleNotes(prev => ({
      ...prev,
      [noteType]: !prev[noteType]
    }))
  }

  const showAll = () => {
    const allVisible = Object.values(visibleNotes).every(v => v)
    const newState = !allVisible
    setVisibleNotes({
      root: newState,
      third: newState,
      fifth: newState,
      seventh: newState
    })
  }

  const chord = chordData[currentChord]
  const notes = [chord.root, chord.third, chord.fifth]
  if (chord.seventh) {
    notes.push(chord.seventh)
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* 页面标题 */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Guitar className="w-12 h-12 text-blue-600 mr-4" />
          <h1 className="text-4xl font-bold text-gray-900">吉他和弦指型练习</h1>
        </div>
        <p className="text-lg text-gray-600">交互式吉他指板 - 学习和练习三和弦与七和弦的各种指型</p>
        
        {/* 工具链接 */}
        <div className="flex justify-center mt-6">
          <Link 
            href="/guitar-tools/practice-checklist"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
          >
            <CheckSquare className="w-5 h-5 mr-2" />
            三和弦练习清单
          </Link>
        </div>
      </div>

      {/* 控制面板 */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-wrap items-center justify-center gap-6">
          {/* 和弦选择 */}
          <div className="flex flex-col items-center">
            <label className="text-sm font-semibold text-gray-700 mb-2">选择和弦</label>
            <select
              value={currentChord}
              onChange={(e) => setCurrentChord(e.target.value)}
              className="px-4 py-2 border-2 border-blue-500 rounded-lg text-base bg-white hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
            >
              <optgroup label="三和弦">
                <option value="Am">A 小三</option>
                <option value="A">A 大三</option>
                <option value="Bm">B 小三</option>
                <option value="B">B 大三</option>
                <option value="Cm">C 小三</option>
                <option value="C">C 大三</option>
                <option value="C#m">C# 小三</option>
                <option value="C#">C# 大三</option>
                <option value="Dm">D 小三</option>
                <option value="D">D 大三</option>
                <option value="Em">E 小三</option>
                <option value="E">E 大三</option>
                <option value="Fm">F 小三</option>
                <option value="F">F 大三</option>
                <option value="Gm">G 小三</option>
                <option value="G">G 大三</option>
              </optgroup>
              <optgroup label="七和弦">
                <option value="Am7">A 小七</option>
                <option value="A7">A 属七</option>
                <option value="Amaj7">A 大七</option>
                <option value="Bm7">B 小七</option>
                <option value="B7">B 属七</option>
                <option value="Bmaj7">B 大七</option>
                <option value="Cm7">C 小七</option>
                <option value="C7">C 属七</option>
                <option value="Cmaj7">C 大七</option>
                <option value="C#m7">C# 小七</option>
                <option value="C#7">C# 属七</option>
                <option value="C#maj7">C# 大七</option>
                <option value="Dm7">D 小七</option>
                <option value="D7">D 属七</option>
                <option value="Dmaj7">D 大七</option>
                <option value="Em7">E 小七</option>
                <option value="E7">E 属七</option>
                <option value="Emaj7">E 大七</option>
                <option value="Fm7">F 小七</option>
                <option value="F7">F 属七</option>
                <option value="Fmaj7">F 大七</option>
                <option value="Gm7">G 小七</option>
                <option value="G7">G 属七</option>
                <option value="Gmaj7">G 大七</option>
              </optgroup>
            </select>
          </div>

          {/* 音符控制按钮 */}
          <div className="flex flex-col items-center">
            <label className="text-sm font-semibold text-gray-700 mb-2">显示音符</label>
            <div className="flex gap-2">
              <button
                onClick={() => toggleNote('root')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  visibleNotes.root 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                根音
              </button>
              <button
                onClick={() => toggleNote('third')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  visibleNotes.third 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                三音
              </button>
              <button
                onClick={() => toggleNote('fifth')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  visibleNotes.fifth 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                五音
              </button>
              <button
                onClick={() => toggleNote('seventh')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  visibleNotes.seventh 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                七音
              </button>
            </div>
          </div>

          {/* 显示全部按钮 */}
          <div className="flex flex-col items-center">
            <label className="text-sm font-semibold text-gray-700 mb-2">&nbsp;</label>
            <button
              onClick={showAll}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              显示全部
            </button>
          </div>
        </div>
      </div>

      {/* 指板 */}
      <div className="mb-8">
        {renderFretboard()}
      </div>

      {/* 图例说明 */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-center mb-6 text-gray-900">图例说明</h3>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-blue-500 rounded-full border-2 border-blue-300"></div>
            <span className="text-gray-700 font-medium">根音 (1)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-orange-500 rounded-full border-2 border-orange-300"></div>
            <span className="text-gray-700 font-medium">三音 (3)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-green-500 rounded-full border-2 border-green-300"></div>
            <span className="text-gray-700 font-medium">五音 (5)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-purple-500 rounded-full border-2 border-purple-300"></div>
            <span className="text-gray-700 font-medium">七音 (7)</span>
          </div>
        </div>
      </div>

      {/* 和弦信息 */}
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{chord.name}</h2>
        <div className="text-xl text-gray-600">{notes.join(' - ')}</div>
      </div>
    </div>
  )
}
