"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { getLanguageById, getLevels } from "@/lib/course-data"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LanguageLevelsPage() {
  const params = useParams()
  const router = useRouter()
  const languageId = params.languageId as string
  const language = getLanguageById(languageId)
  const levels = getLevels()

  const [userProgress, setUserProgress] = useState<any>({})

  useEffect(() => {
    // Load user progress
    const progress = localStorage.getItem("devquest-progress")
    if (progress) {
      setUserProgress(JSON.parse(progress))
    }
  }, [])

  if (!language) {
    return <div>Không tìm thấy ngôn ngữ</div>
  }

  const handleLevelSelect = (levelId: string) => {
    // Update user progress to mark this language as started
    const updatedProgress = { ...userProgress }
    if (!updatedProgress.languages) {
      updatedProgress.languages = {}
    }
    if (!updatedProgress.languages[languageId]) {
      updatedProgress.languages[languageId] = { started: true, currentLevel: levelId }
    } else {
      updatedProgress.languages[languageId].started = true
      updatedProgress.languages[languageId].currentLevel = levelId
    }

    localStorage.setItem("devquest-progress", JSON.stringify(updatedProgress))

    // Navigate to the level's lessons
    router.push(`/languages/${languageId}/${levelId}`)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link
            href="/languages"
            className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Quay lại
          </Link>
        </div>

        <div className="text-center mb-12">
          <div className={`inline-block p-4 rounded-full ${language.darkBgColor} mb-4`}>{language.icon}</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{language.name}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Chọn cấp độ phù hợp với bạn</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {levels.map((level) => {
            const isCurrentLevel =
              userProgress.languages &&
              userProgress.languages[languageId] &&
              userProgress.languages[languageId].currentLevel === level.id

            return (
              <div
                key={level.id}
                className={`bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 ${isCurrentLevel ? "border-2 border-gray-900 dark:border-white" : ""}`}
                onClick={() => handleLevelSelect(level.id)}
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{level.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{level.description}</p>
                  {isCurrentLevel && (
                    <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">Cấp độ hiện tại</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
