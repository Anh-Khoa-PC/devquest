"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Trophy, Award, Star, Code, Zap, Globe, Medal, Flame } from "lucide-react"
import { motion } from "framer-motion"
import { achievements } from "@/lib/achievements"

export default function AchievementsPage() {
  const [userProgress, setUserProgress] = useState<any>({
    points: 0,
    achievements: [],
  })
  const [currentLanguage, setCurrentLanguage] = useState("vi")

  useEffect(() => {
    // Load user progress
    const progress = localStorage.getItem("devquest-progress")
    if (progress) {
      setUserProgress(JSON.parse(progress))
    }

    // Load language preference
    const savedLanguage = localStorage.getItem("devquest-language")
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage)
    }
  }, [])

  const translations = {
    vi: {
      achievements: "Thành tựu",
      backToProfile: "Quay lại hồ sơ",
      earned: "Đã đạt được",
      locked: "Chưa mở khóa",
      points: "điểm",
      progress: "Tiến độ",
      earnedAchievements: "Thành tựu đã đạt được",
      lockedAchievements: "Thành tựu chưa mở khóa",
      noAchievements: "Bạn chưa đạt được thành tựu nào. Hãy tiếp tục học tập để mở khóa!",
      keepLearning: "Tiếp tục học tập để mở khóa thêm thành tựu!",
    },
    en: {
      achievements: "Achievements",
      backToProfile: "Back to Profile",
      earned: "Earned",
      locked: "Locked",
      points: "points",
      progress: "Progress",
      earnedAchievements: "Earned Achievements",
      lockedAchievements: "Locked Achievements",
      noAchievements: "You haven't earned any achievements yet. Keep learning to unlock them!",
      keepLearning: "Keep learning to unlock more achievements!",
    },
  }

  const t = translations[currentLanguage as keyof typeof translations]

  const earnedAchievements = achievements.filter((achievement) => userProgress.achievements?.includes(achievement.id))

  const lockedAchievements = achievements.filter((achievement) => !userProgress.achievements?.includes(achievement.id))

  const renderAchievementIcon = (icon: string) => {
    switch (icon) {
      case "award":
        return <Award className="h-6 w-6 text-purple-600 dark:text-purple-300" />
      case "star":
        return <Star className="h-6 w-6 text-purple-600 dark:text-purple-300" />
      case "code":
        return <Code className="h-6 w-6 text-purple-600 dark:text-purple-300" />
      case "trophy":
        return <Trophy className="h-6 w-6 text-purple-600 dark:text-purple-300" />
      case "globe":
        return <Globe className="h-6 w-6 text-purple-600 dark:text-purple-300" />
      case "flame":
        return <Flame className="h-6 w-6 text-purple-600 dark:text-purple-300" />
      case "zap":
        return <Zap className="h-6 w-6 text-purple-600 dark:text-purple-300" />
      case "hundred":
        return <span className="text-lg font-bold text-purple-600 dark:text-purple-300">100</span>
      case "medal":
        return <Medal className="h-6 w-6 text-purple-600 dark:text-purple-300" />
      case "foundation":
        return <Code className="h-6 w-6 text-purple-600 dark:text-purple-300" />
      default:
        return <Trophy className="h-6 w-6 text-purple-600 dark:text-purple-300" />
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link
            href="/profile"
            className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            {t.backToProfile}
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md overflow-hidden mb-8"
          >
            <div className="h-3 bg-gray-900 dark:bg-white"></div>
            <div className="p-6">
              <div className="flex items-center mb-8">
                <Trophy className="h-8 w-8 text-gray-900 dark:text-white mr-3" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t.achievements}</h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                    <Award className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-300" />
                    {t.earnedAchievements}
                  </h2>

                  {earnedAchievements.length > 0 ? (
                    <div className="space-y-4">
                      {earnedAchievements.map((achievement) => (
                        <motion.div
                          key={achievement.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-900 rounded-lg p-4"
                        >
                          <div className="flex items-start">
                            <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full mr-3 flex-shrink-0">
                              {renderAchievementIcon(achievement.icon)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">{achievement.title}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</div>
                              <div className="text-sm font-medium text-purple-600 dark:text-purple-300 mt-1">
                                +{achievement.points} {t.points}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400">{t.noAchievements}</p>
                    </div>
                  )}
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                    {t.lockedAchievements}
                  </h2>

                  <div className="space-y-4">
                    {lockedAchievements.map((achievement) => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                      >
                        <div className="flex items-start">
                          <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full mr-3 flex-shrink-0">
                            {renderAchievementIcon(achievement.icon)}
                          </div>
                          <div className="opacity-70">
                            <div className="font-medium text-gray-900 dark:text-white">{achievement.title}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</div>
                            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">
                              +{achievement.points} {t.points}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {lockedAchievements.length > 0 && (
                    <div className="mt-6 text-center">
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{t.keepLearning}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
