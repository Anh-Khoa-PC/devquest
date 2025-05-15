"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Lightbulb } from "lucide-react"

interface MascotProps {
  language?: string
}

export default function Mascot({ language }: MascotProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState("")
  const [showMessage, setShowMessage] = useState(false)

  const mascotMessages = {
    default: [
      "Chào mừng đến với DevQuest! Bạn đã sẵn sàng học lập trình chưa?",
      "Học lập trình mỗi ngày giúp bạn tiến bộ nhanh hơn!",
      "Đừng quên thực hành sau mỗi bài học nhé!",
      "Bạn đang làm rất tốt! Hãy tiếp tục!",
    ],
    python: [
      "Python là ngôn ngữ tuyệt vời để bắt đầu học lập trình!",
      "Bạn biết không? Python được đặt tên theo chương trình hài kịch Monty Python!",
      "Indentation (thụt lề) rất quan trọng trong Python!",
      "Python có nhiều thư viện mạnh mẽ như NumPy, Pandas và TensorFlow!",
    ],
    javascript: [
      "JavaScript là ngôn ngữ phổ biến nhất để phát triển web!",
      "Bạn biết không? JavaScript được tạo ra chỉ trong 10 ngày!",
      "Đừng nhầm lẫn giữa Java và JavaScript, chúng hoàn toàn khác nhau!",
      "Với JavaScript, bạn có thể làm cả frontend và backend!",
    ],
    cpp: [
      "C++ là ngôn ngữ mạnh mẽ và hiệu quả!",
      "Nhiều game và phần mềm hiệu suất cao được viết bằng C++!",
      "C++ kết hợp lập trình hướng đối tượng và lập trình thủ tục!",
      "Quản lý bộ nhớ là một kỹ năng quan trọng khi học C++!",
    ],
    csharp: [
      "C# là ngôn ngữ tuyệt vời cho phát triển ứng dụng Windows và game Unity!",
      "C# được phát triển bởi Microsoft và là một phần của .NET Framework!",
      "LINQ trong C# giúp bạn truy vấn dữ liệu một cách dễ dàng!",
      "C# có cú pháp giống với Java nhưng có nhiều tính năng hiện đại hơn!",
    ],
  }

  useEffect(() => {
    // Hiển thị mascot sau 3 giây
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isVisible) {
      // Hiển thị tin nhắn ngẫu nhiên sau mỗi 30 giây
      const messageInterval = setInterval(() => {
        const messages =
          language && mascotMessages[language as keyof typeof mascotMessages]
            ? mascotMessages[language as keyof typeof mascotMessages]
            : mascotMessages.default

        const randomMessage = messages[Math.floor(Math.random() * messages.length)]
        setMessage(randomMessage)
        setShowMessage(true)

        // Ẩn tin nhắn sau 10 giây
        setTimeout(() => {
          setShowMessage(false)
        }, 10000)
      }, 30000)

      return () => clearInterval(messageInterval)
    }
  }, [isVisible, language])

  const handleMascotClick = () => {
    if (!showMessage) {
      const messages =
        language && mascotMessages[language as keyof typeof mascotMessages]
          ? mascotMessages[language as keyof typeof mascotMessages]
          : mascotMessages.default

      const randomMessage = messages[Math.floor(Math.random() * messages.length)]
      setMessage(randomMessage)
      setShowMessage(true)
    } else {
      setShowMessage(false)
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-4 right-4 z-50">
          <AnimatePresence>
            {showMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg mb-3 max-w-xs relative"
              >
                <button
                  onClick={() => setShowMessage(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="flex items-start">
                  <Lightbulb className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-800 dark:text-gray-200 text-sm">{message}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleMascotClick}
            className="bg-gray-900 dark:bg-white rounded-full p-3 shadow-lg cursor-pointer"
          >
            <div className="relative">
              <img src="/placeholder.svg?height=50&width=50" alt="DevQuest Mascot" className="h-12 w-12 rounded-full" />
              <div className="absolute -top-1 -right-1 bg-green-500 h-3 w-3 rounded-full border-2 border-white dark:border-gray-900"></div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
