"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { languages } from "@/lib/course-data"
import { motion } from "framer-motion"

export default function LanguagesPage() {
  const [userProgress, setUserProgress] = useState<any>({})

  useEffect(() => {
    // Load user progress from localStorage
    const progress = localStorage.getItem("devquest-progress")
    if (progress) {
      setUserProgress(JSON.parse(progress))
    } else {
      // Initialize progress if it doesn't exist
      const initialProgress = {
        points: 0,
        languages: {},
        completedLessons: [],
      }
      localStorage.setItem("devquest-progress", JSON.stringify(initialProgress))
      setUserProgress(initialProgress)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Chọn ngôn ngữ lập trình</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {languages.map((language, index) => {
            const hasStarted =
              userProgress.languages &&
              userProgress.languages[language.id] &&
              userProgress.languages[language.id].started

            return (
              <motion.div
                key={language.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/languages/${language.id}`}>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className={`h-3 ${language.darkColor}`}></div>
                    <div className="p-6">
                      <div className="flex justify-center mb-4">
                        <div className={`p-3 rounded-full ${language.darkBgColor}`}>{language.icon}</div>
                      </div>
                      <h2 className="text-xl font-bold text-center mb-2 text-gray-900 dark:text-white">
                        {language.name}
                      </h2>
                      {hasStarted && (
                        <div className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">Đã bắt đầu</div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
