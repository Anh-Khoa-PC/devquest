export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  points: number
  condition: (progress: any) => boolean
}

export const achievements: Achievement[] = [
  {
    id: "first_lesson",
    title: "Bước đầu tiên",
    description: "Hoàn thành bài học đầu tiên",
    icon: "award",
    points: 10,
    condition: (progress) => (progress.completedLessons?.length || 0) >= 1,
  },
  {
    id: "python_beginner",
    title: "Python Rookie",
    description: "Hoàn thành 3 bài học Python cho người mới bắt đầu",
    icon: "code",
    points: 20,
    condition: (progress) => {
      const pythonBeginnerLessons =
        progress.completedLessons?.filter((id: string) => id.startsWith("python-beginner")) || []
      return pythonBeginnerLessons.length >= 3
    },
  },
  {
    id: "js_beginner",
    title: "JavaScript Enthusiast",
    description: "Hoàn thành 3 bài học JavaScript cho người mới bắt đầu",
    icon: "braces",
    points: 20,
    condition: (progress) => {
      const jsBeginnerLessons =
        progress.completedLessons?.filter((id: string) => id.startsWith("javascript-beginner")) || []
      return jsBeginnerLessons.length >= 3
    },
  },
  {
    id: "streak_3",
    title: "Consistent Learner",
    description: "Học 3 ngày liên tiếp",
    icon: "flame",
    points: 30,
    condition: (progress) => (progress.streak || 0) >= 3,
  },
  {
    id: "streak_7",
    title: "Coding Habit",
    description: "Học 7 ngày liên tiếp",
    icon: "zap",
    points: 50,
    condition: (progress) => (progress.streak || 0) >= 7,
  },
  {
    id: "multi_language",
    title: "Polyglot Programmer",
    description: "Học ít nhất 2 ngôn ngữ lập trình khác nhau",
    icon: "globe",
    points: 40,
    condition: (progress) => {
      if (!progress.languages) return false
      const startedLanguages = Object.keys(progress.languages).filter((langId) => progress.languages[langId].started)
      return startedLanguages.length >= 2
    },
  },
  {
    id: "challenge_complete",
    title: "Challenge Accepted",
    description: "Hoàn thành thành công một thử thách lập trình",
    icon: "trophy",
    points: 50,
    condition: (progress) => (progress.completedChallenges?.length || 0) >= 1,
  },
  {
    id: "points_100",
    title: "Century Club",
    description: "Đạt 100 điểm",
    icon: "hundred",
    points: 20,
    condition: (progress) => (progress.points || 0) >= 100,
  },
  {
    id: "points_500",
    title: "Coding Master",
    description: "Đạt 500 điểm",
    icon: "medal",
    points: 50,
    condition: (progress) => (progress.points || 0) >= 500,
  },
  {
    id: "all_beginner",
    title: "Foundation Builder",
    description: "Hoàn thành tất cả các bài học cơ bản của một ngôn ngữ",
    icon: "foundation",
    points: 100,
    condition: (progress) => {
      // Kiểm tra xem có ngôn ngữ nào đã hoàn thành tất cả các bài học beginner không
      const languages = ["python", "javascript", "cpp", "csharp"]
      return languages.some((lang) => {
        const beginnerLessons =
          progress.completedLessons?.filter((id: string) => id.startsWith(`${lang}-beginner`)) || []
        return beginnerLessons.length >= 8 // Giả sử mỗi ngôn ngữ có 8 bài học beginner
      })
    },
  },
]

export function checkAchievements(progress: any): Achievement[] {
  const earnedAchievements: Achievement[] = []
  const userAchievements = progress.achievements || []

  achievements.forEach((achievement) => {
    // Kiểm tra xem thành tựu đã đạt được chưa
    if (!userAchievements.includes(achievement.id) && achievement.condition(progress)) {
      earnedAchievements.push(achievement)
    }
  })

  return earnedAchievements
}

export function updateAchievements(progress: any): { updatedProgress: any; newAchievements: Achievement[] } {
  const newAchievements = checkAchievements(progress)

  if (newAchievements.length === 0) {
    return { updatedProgress: progress, newAchievements: [] }
  }

  // Cập nhật progress với các thành tựu mới
  const updatedProgress = { ...progress }

  if (!updatedProgress.achievements) {
    updatedProgress.achievements = []
  }

  // Thêm ID của các thành tựu mới
  newAchievements.forEach((achievement) => {
    updatedProgress.achievements.push(achievement.id)
    // Cộng điểm cho thành tựu
    updatedProgress.points = (updatedProgress.points || 0) + achievement.points
  })

  return { updatedProgress, newAchievements }
}
