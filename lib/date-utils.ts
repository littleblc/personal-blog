import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

/**
 * 安全地格式化日期字符串
 * @param dateString 日期字符串，格式为 YYYY-MM-DD
 * @param formatString date-fns 格式字符串
 * @returns 格式化后的日期字符串
 */
export function safeFormatDate(dateString: string, formatString: string): string {
  try {
    // 确保日期字符串包含时间部分，避免时区问题
    const dateWithTime = dateString.includes('T') ? dateString : `${dateString}T00:00:00`
    const date = new Date(dateWithTime)
    
    // 检查日期是否有效
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date: ${dateString}`)
      return dateString // 返回原字符串作为备选
    }
    
    return format(date, formatString, { locale: zhCN })
  } catch (error) {
    console.error(`Error formatting date ${dateString}:`, error)
    return dateString // 返回原字符串作为备选
  }
}

/**
 * 安全地比较两个日期字符串
 * @param dateA 日期字符串A
 * @param dateB 日期字符串B
 * @returns 比较结果 (A > B 返回正数，A < B 返回负数，A = B 返回0)
 */
export function safeDateCompare(dateA: string, dateB: string): number {
  try {
    const dateWithTimeA = dateA.includes('T') ? dateA : `${dateA}T00:00:00`
    const dateWithTimeB = dateB.includes('T') ? dateB : `${dateB}T00:00:00`
    
    const timeA = new Date(dateWithTimeA).getTime()
    const timeB = new Date(dateWithTimeB).getTime()
    
    // 检查日期是否有效
    if (isNaN(timeA) || isNaN(timeB)) {
      console.warn(`Invalid date comparison: ${dateA} vs ${dateB}`)
      return 0
    }
    
    return timeA - timeB
  } catch (error) {
    console.error(`Error comparing dates ${dateA} vs ${dateB}:`, error)
    return 0
  }
}