"use client"

import { useState, useEffect } from "react"
import { Calendar } from "lucide-react"

interface StreakCalendarProps {
  streakDays: number[]
}

export default function StreakCalendar({ streakDays }: StreakCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [calendarDays, setCalendarDays] = useState<Date[]>([])

  useEffect(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    // Lấy ngày đầu tiên của tháng
    const firstDay = new Date(year, month, 1)

    // Lấy ngày cuối cùng của tháng
    const lastDay = new Date(year, month + 1, 0)

    // Tạo mảng các ngày trong tháng
    const days: Date[] = []
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(year, month, d))
    }

    setCalendarDays(days)
  }, [currentMonth])

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const isStreakDay = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return streakDays.includes(Number(dateString.replace(/-/g, "")))
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Chuỗi học tập
        </h3>
        <div className="flex space-x-2">
          <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            &lt;
          </button>
          <span className="text-gray-700 dark:text-gray-300">
            {currentMonth.toLocaleDateString("vi-VN", { month: "long", year: "numeric" })}
          </span>
          <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            &gt;
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day, index) => (
          <div key={index} className="text-xs font-medium text-gray-500 dark:text-gray-400 py-1">
            {day}
          </div>
        ))}

        {/* Khoảng trống cho các ngày trước ngày đầu tiên của tháng */}
        {Array.from({ length: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() }).map(
          (_, i) => (
            <div key={`empty-${i}`} className="h-8"></div>
          ),
        )}

        {/* Các ngày trong tháng */}
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`h-8 w-8 flex items-center justify-center rounded-full mx-auto text-sm
              ${
                isStreakDay(day)
                  ? "bg-green-500 text-white"
                  : isToday(day)
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300"
              }`}
          >
            {day.getDate()}
          </div>
        ))}
      </div>
    </div>
  )
}
