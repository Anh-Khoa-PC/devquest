"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getChallengeById } from "@/lib/coding-challenges"
import CodingChallenge from "@/components/coding-challenge"
import ConfettiEffect from "@/components/confetti-effect"
import AchievementPopup from "@/components/achievement-popup"
import { updateAchievements, type Achievement } from "@/lib/achievements"

export default function ChallengePage() {
  const params = useParams()
  const router = useRouter()
  const challengeId = params.challengeId as string

  const [challenge, setChallenge] = useState<any>(null)
  const [userProgress, setUserProgress] = useState<any>({})
  const [showConfetti, setShowConfetti] = useState(false)
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null)
  const [showAchievement, setShowAchievement] = useState(false)

  useEffect(() => {
    // Load challenge data
    const challengeData = getChallengeById(challengeId)
    if (challengeData) {
      setChallenge(challengeData)
    } else {
      router.push("/challenges")
    }

    // Load user progress
    const progress = localStorage.getItem("devquest-progress")
    if (progress) {
      setUserProgress(JSON.parse(progress))
    }
  }, [challengeId, router])

  const handleChallengeComplete = (success: boolean, points: number) => {
    if (!success) return

    // Update user progress
    const updatedProgress = { ...userProgress }

    // Add points
    updatedProgress.points = (updatedProgress.points || 0) + points

    // Mark challenge as completed
    if (!updatedProgress.completedChallenges) {
      updatedProgress.completedChallenges = []
    }
    if (!updatedProgress.completedChallenges.includes(challengeId)) {
      updatedProgress.completedChallenges.push(challengeId)
    }

    // Check for new achievements
    const { updatedProgress: progressWithAchievements, newAchievements } = updateAchievements(updatedProgress)

    // Save updated progress
    localStorage.setItem("devquest-progress", JSON.stringify(progressWithAchievements))
    setUserProgress(progressWithAchievements)

    // Show confetti effect
    setShowConfetti(true)

    // Show achievement popup if there's a new achievement
    if (newAchievements.length > 0) {
      setNewAchievement(newAchievements[0])
      setShowAchievement(true)
    }
  }

  if (!challenge) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-900 dark:text-white">Đang tải...</div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link
            href="/challenges"
            className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Quay lại danh sách thử thách
          </Link>
        </div>

        <CodingChallenge challenge={challenge} onComplete={handleChallengeComplete} />

        <ConfettiEffect active={showConfetti} duration={5000} />

        {newAchievement && (
          <AchievementPopup
            title={newAchievement.title}
            description={newAchievement.description}
            points={newAchievement.points}
            show={showAchievement}
            onClose={() => setShowAchievement(false)}
          />
        )}
      </div>
    </div>
  )
}
