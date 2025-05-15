"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Lock, CheckCircle } from "lucide-react"
import { getLanguageById, getLevelById, generateLessons } from "@/lib/course-data"

export default function LessonsPage() {
  const params = useParams()
  const router = useRouter()
  const languageId = params.languageId as string
  const levelId = params.levelId as string

  const [language, setLanguage] = useState<any>(null)
  const [level, setLevel] = useState<any>(null)
  const [lessons, setLessons] = useState<any[]>([])
  const [userProgress, setUserProgress] = useState<any>({})

  useEffect(() => {
    // Get language and level
    const currentLanguage = getLanguageById(languageId)
    const currentLevel = getLevelById(levelId)

    setLanguage(currentLanguage)
    setLevel(currentLevel)

    if (currentLanguage && currentLevel) {
      // Generate lessons for this language and level
      const generatedLessons = generateLessons(languageId, levelId)
      setLessons(generatedLessons)

      // Load user progress
      const progress = localStorage.getItem("devquest-progress")
      if (progress) {
        setUserProgress(JSON.parse(progress))
      }
    }
  }, [languageId, levelId])

  if (!language || !level) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-900 dark:text-white">Đang tải...</div>
    )
  }

  const isLessonCompleted = (lessonId: string) => {
    return userProgress.completedLessons && userProgress.completedLessons.includes(lessonId)
  }

  const isLessonUnlocked = (index: number) => {
    if (index === 0) return true // First lesson is always unlocked

    // A lesson is unlocked if the previous lesson is completed
    const previousLessonId = lessons[index - 1]?.id
    return previousLessonId && isLessonCompleted(previousLessonId)
  }

  const handleLessonSelect = (lesson: any, index: number) => {
    if (!isLessonUnlocked(index)) return

    router.push(`/languages/${languageId}/${levelId}/${lesson.id}`)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link
            href={`/languages/${languageId}`}
            className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Quay lại
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {language.name} - {level.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{level.description}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lessons.map((lesson, index) => {
              const completed = isLessonCompleted(lesson.id)
              const unlocked = isLessonUnlocked(index)

              return (
                <div
                  key={lesson.id}
                  className={`bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md overflow-hidden ${unlocked ? "cursor-pointer hover:shadow-lg" : "opacity-70"} transition-all duration-300`}
                  onClick={() => handleLessonSelect(lesson, index)}
                >
                  <div className={`h-2 ${language.darkColor}`}></div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">{lesson.title}</h2>
                      {completed ? (
                        <CheckCircle className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                      ) : !unlocked ? (
                        <Lock className="h-5 w-5 text-gray-400" />
                      ) : null}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{lesson.description}</p>
                    {completed && <div className="mt-2 text-xs text-gray-700 dark:text-gray-300">Đã hoàn thành</div>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
