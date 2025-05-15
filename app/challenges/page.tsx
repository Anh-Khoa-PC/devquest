"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Trophy, Clock, Award, Filter } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { codingChallenges, type CodingChallenge } from "@/lib/coding-challenges"
import { motion } from "framer-motion"

export default function ChallengesPage() {
  const router = useRouter()
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)
  const [userProgress, setUserProgress] = useState<any>({})
  const [filteredChallenges, setFilteredChallenges] = useState<CodingChallenge[]>(codingChallenges)

  useEffect(() => {
    // Load user progress
    const progress = localStorage.getItem("devquest-progress")
    if (progress) {
      setUserProgress(JSON.parse(progress))
    }
  }, [])

  useEffect(() => {
    // Filter challenges based on selected language and difficulty
    let filtered = [...codingChallenges]

    if (selectedLanguage) {
      filtered = filtered.filter((challenge) => challenge.language === selectedLanguage)
    }

    if (selectedDifficulty) {
      filtered = filtered.filter((challenge) => challenge.difficulty === selectedDifficulty)
    }

    setFilteredChallenges(filtered)
  }, [selectedLanguage, selectedDifficulty])

  const handleChallengeClick = (challenge: CodingChallenge) => {
    router.push(`/challenges/${challenge.id}`)
  }

  const isChallengeCompleted = (challengeId: string) => {
    return userProgress.completedChallenges?.includes(challengeId) || false
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-500"
      case "medium":
        return "text-yellow-500"
      case "hard":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getDifficultyBgColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300"
      case "medium":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300"
      case "hard":
        return "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300"
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Quay lại trang chủ
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Thử thách lập trình</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Thử sức với các thử thách lập trình để nâng cao kỹ năng và kiếm thêm điểm. Mỗi thử thách có giới hạn thời
            gian và độ khó khác nhau.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <div>
              <label
                htmlFor="language-filter"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Ngôn ngữ
              </label>
              <select
                id="language-filter"
                value={selectedLanguage || ""}
                onChange={(e) => setSelectedLanguage(e.target.value || null)}
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-gray-900 dark:text-white"
              >
                <option value="">Tất cả ngôn ngữ</option>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="cpp">C++</option>
                <option value="csharp">C#</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="difficulty-filter"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Độ khó
              </label>
              <select
                id="difficulty-filter"
                value={selectedDifficulty || ""}
                onChange={(e) => setSelectedDifficulty(e.target.value || null)}
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-gray-900 dark:text-white"
              >
                <option value="">Tất cả độ khó</option>
                <option value="easy">Dễ</option>
                <option value="medium">Trung bình</option>
                <option value="hard">Khó</option>
              </select>
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedLanguage(null)
                  setSelectedDifficulty(null)
                }}
                className="border-gray-300 dark:border-gray-700"
              >
                <Filter className="h-4 w-4 mr-2" />
                Xóa bộ lọc
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 ${
                isChallengeCompleted(challenge.id) ? "border-2 border-green-500 dark:border-green-600" : ""
              }`}
              onClick={() => handleChallengeClick(challenge)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{challenge.title}</h2>
                  <span
                    className={`text-sm font-medium px-2 py-1 rounded-full ${getDifficultyBgColor(challenge.difficulty)}`}
                  >
                    {challenge.difficulty === "easy" ? "Dễ" : challenge.difficulty === "medium" ? "Trung bình" : "Khó"}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{challenge.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {Math.floor(challenge.timeLimit / 60)} phút
                    </span>
                  </div>

                  <div className="flex items-center">
                    <Award className="h-4 w-4 text-purple-500 mr-1" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {challenge.points} điểm
                    </span>
                  </div>

                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {challenge.language === "python"
                      ? "Python"
                      : challenge.language === "javascript"
                        ? "JavaScript"
                        : challenge.language === "cpp"
                          ? "C++"
                          : "C#"}
                  </div>
                </div>

                {isChallengeCompleted(challenge.id) && (
                  <div className="mt-4 flex items-center text-green-600 dark:text-green-400">
                    <Trophy className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">Đã hoàn thành</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredChallenges.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">Không tìm thấy thử thách nào phù hợp với bộ lọc.</p>
          </div>
        )}
      </div>
    </div>
  )
}
