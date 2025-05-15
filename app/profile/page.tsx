"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { languages } from "@/lib/course-data"
import { Trophy, Award, Star, ArrowRight, Calendar, Code, Zap, Medal, BookOpen, User } from "lucide-react"
import { motion } from "framer-motion"
import StreakCalendar from "@/components/streak-calendar"
import { achievements } from "@/lib/achievements"
import UserProfileForm from "@/components/user-profile-form"

export default function ProfilePage() {
  const [userProgress, setUserProgress] = useState<any>({
    points: 0,
    languages: {},
    completedLessons: [],
    completedChallenges: [],
    streak: 0,
    streakDays: [],
    achievements: [],
  })
  const [currentLanguage, setCurrentLanguage] = useState("vi")
  const [userProfile, setUserProfile] = useState<{ name: string; avatar: string | null }>({
    name: "",
    avatar: null,
  })
  const [isEditingProfile, setIsEditingProfile] = useState(false)

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

    // Load user profile
    const profile = localStorage.getItem("devquest-user-profile")
    if (profile) {
      setUserProfile(JSON.parse(profile))
    }
  }, [])

  const getStartedLanguages = () => {
    if (!userProgress.languages) return []

    return Object.keys(userProgress.languages)
      .filter((langId) => userProgress.languages[langId].started)
      .map((langId) => languages.find((lang) => lang.id === langId))
      .filter(Boolean)
  }

  const getUserAchievements = () => {
    if (!userProgress.achievements) return []

    return achievements.filter((achievement) => userProgress.achievements.includes(achievement.id))
  }

  const startedLanguages = getStartedLanguages()
  const userAchievements = getUserAchievements()

  // Giả lập dữ liệu streak
  const streakDays = [
    20230501, 20230502, 20230503, 20230505, 20230506, 20230508, 20230509, 20230510, 20230512, 20230515, 20230516,
    20230517, 20230518, 20230519, 20230522, 20230523, 20230524, 20230525, 20230526, 20230529, 20230530, 20230531,
  ]

  const translations = {
    vi: {
      yourProfile: "Hồ sơ của bạn",
      totalPoints: "Tổng điểm",
      lessonsCompleted: "Bài học đã hoàn thành",
      challengesCompleted: "Thử thách đã hoàn thành",
      learningStreak: "Chuỗi học tập",
      consecutiveDays: "Ngày liên tiếp",
      record: "Kỷ lục",
      achievements: "Thành tựu",
      noAchievements: "Bạn chưa đạt được thành tựu nào. Hãy tiếp tục học tập để mở khóa!",
      viewAllAchievements: "Xem tất cả thành tựu",
      languagesLearning: "Ngôn ngữ đang học",
      noLanguagesStarted: "Bạn chưa bắt đầu học ngôn ngữ nào.",
      points: "điểm",
      learnMoreAboutDeveloper: "Tìm hiểu thêm về người phát triển",
      programmingLanguages: "Ngôn ngữ lập trình",
      technologies: "Công nghệ",
      editProfile: "Chỉnh sửa hồ sơ",
      saveProfile: "Lưu hồ sơ",
      cancelEdit: "Hủy",
      guest: "Khách",
    },
    en: {
      yourProfile: "Your Profile",
      totalPoints: "Total Points",
      lessonsCompleted: "Lessons Completed",
      challengesCompleted: "Challenges Completed",
      learningStreak: "Learning Streak",
      consecutiveDays: "Consecutive Days",
      record: "Record",
      achievements: "Achievements",
      noAchievements: "You haven't earned any achievements yet. Keep learning to unlock them!",
      viewAllAchievements: "View All Achievements",
      languagesLearning: "Languages Learning",
      noLanguagesStarted: "You haven't started learning any language yet.",
      points: "points",
      learnMoreAboutDeveloper: "Learn more about the developer",
      programmingLanguages: "Programming Languages",
      technologies: "Technologies",
      editProfile: "Edit Profile",
      saveProfile: "Save Profile",
      cancelEdit: "Cancel",
      guest: "Guest",
    },
  }

  const t = translations[currentLanguage as keyof typeof translations]

  const handleSaveProfile = (profileData: { name: string; avatar: string | null }) => {
    setUserProfile(profileData)
    setIsEditingProfile(false)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md overflow-hidden mb-8"
          >
            <div className="h-3 bg-gray-900 dark:bg-white"></div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
                <div className="w-32 h-32 relative rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-800">
                  {userProfile.avatar ? (
                    <Image
                      src={userProfile.avatar || "/placeholder.svg"}
                      alt="User Avatar"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                      <User className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{userProfile.name || t.guest}</h1>
                    <button
                      onClick={() => setIsEditingProfile(!isEditingProfile)}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    >
                      {isEditingProfile ? t.cancelEdit : t.editProfile}
                    </button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {userProgress.points} {t.points}
                  </p>
                </div>
              </div>

              {isEditingProfile ? (
                <UserProfileForm onSave={handleSaveProfile} currentLanguage={currentLanguage} />
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t.yourProfile}</h1>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex flex-col items-center">
                      <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full mb-4">
                        <Trophy className="h-8 w-8 text-purple-600 dark:text-purple-300" />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{userProgress.points}</div>
                      <div className="text-gray-600 dark:text-gray-400">{t.totalPoints}</div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex flex-col items-center">
                      <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full mb-4">
                        <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-300" />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {userProgress.completedLessons?.length || 0}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">{t.lessonsCompleted}</div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex flex-col items-center">
                      <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full mb-4">
                        <Code className="h-8 w-8 text-green-600 dark:text-green-300" />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {userProgress.completedChallenges?.length || 0}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">{t.challengesCompleted}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                        <Zap className="h-5 w-5 mr-2" />
                        {t.learningStreak}
                      </h2>
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center">
                            <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full mr-4">
                              <Calendar className="h-6 w-6 text-orange-600 dark:text-orange-300" />
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {userProgress.streak || 0}
                              </div>
                              <div className="text-gray-600 dark:text-gray-400">{t.consecutiveDays}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{t.record}</div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                              {Math.max(userProgress.streak || 0, userProgress.maxStreak || 0)}
                            </div>
                          </div>
                        </div>

                        <StreakCalendar streakDays={streakDays} />
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                        <Medal className="h-5 w-5 mr-2" />
                        {t.achievements}
                      </h2>
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                        {userAchievements.length > 0 ? (
                          <div className="space-y-4">
                            {userAchievements.slice(0, 3).map((achievement, index) => (
                              <div key={achievement.id} className="flex items-start">
                                <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full mr-3">
                                  {achievement.icon === "award" ? (
                                    <Award className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                                  ) : achievement.icon === "star" ? (
                                    <Star className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                                  ) : achievement.icon === "code" ? (
                                    <Code className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                                  ) : achievement.icon === "trophy" ? (
                                    <Trophy className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                                  ) : (
                                    <Medal className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                                  )}
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900 dark:text-white">{achievement.title}</div>
                                  <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {achievement.description}
                                  </div>
                                  <div className="text-sm font-medium text-purple-600 dark:text-purple-300 mt-1">
                                    +{achievement.points} {t.points}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 dark:text-gray-400">{t.noAchievements}</p>
                          </div>
                        )}

                        <div className="mt-4 text-center">
                          <Link
                            href="/achievements"
                            className="text-purple-600 dark:text-purple-400 hover:underline text-sm font-medium inline-flex items-center"
                          >
                            {t.viewAllAchievements}
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{t.languagesLearning}</h2>
                    {startedLanguages.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {startedLanguages.map((language: any) => (
                          <div
                            key={language.id}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center"
                          >
                            <div className={`p-2 rounded-full ${language.darkBgColor} mr-3`}>{language.icon}</div>
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white">{language.name}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {userProgress.completedLessons?.filter((lessonId: string) =>
                                  lessonId.startsWith(`${language.id}-`),
                                ).length || 0}{" "}
                                {t.lessonsCompleted.toLowerCase()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">{t.noLanguagesStarted}</p>
                    )}
                  </div>
                </>
              )}
            </div>
          </motion.div>

          <div className="text-center">
            <Link href="/about" className="inline-flex items-center text-gray-900 dark:text-white hover:underline">
              {t.learnMoreAboutDeveloper}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
