"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award } from "lucide-react"

interface AchievementPopupProps {
  title: string
  description: string
  points: number
  show: boolean
  onClose: () => void
}

export default function AchievementPopup({ title, description, points, show, onClose }: AchievementPopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      // Tự động đóng sau 5 giây
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 500) // Đợi animation kết thúc
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 right-4 z-50 max-w-sm"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-2"></div>
            <div className="p-4">
              <div className="flex items-start">
                <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full mr-3">
                  <Award className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Thành tựu mới!</h3>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{description}</p>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-300 mt-2">+{points} điểm</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
