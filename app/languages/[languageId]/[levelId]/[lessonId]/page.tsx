"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CheckCircle, X, AlertCircle, ChevronRight, Loader2 } from "lucide-react"
import { getLanguageById, getLevelById, getLessonById, getNextLesson } from "@/lib/course-data"
import CodeEditor from "@/components/code-editor"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import CodeExecutor from "@/components/code-executor"
import ConfettiEffect from "@/components/confetti-effect"
import AchievementPopup from "@/components/achievement-popup"
import { updateAchievements, type Achievement } from "@/lib/achievements"
import Mascot from "@/components/mascot"

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const languageId = params.languageId as string
  const levelId = params.levelId as string
  const lessonId = params.lessonId as string

  const [language, setLanguage] = useState<any>(null)
  const [level, setLevel] = useState<any>(null)
  const [lesson, setLesson] = useState<any>(null)
  const [nextLesson, setNextLesson] = useState<any>(null)
  const [userProgress, setUserProgress] = useState<any>({})
  const [currentStep, setCurrentStep] = useState(0)
  const [userCode, setUserCode] = useState("")
  const [codeOutput, setCodeOutput] = useState("")
  const [quizAnswers, setQuizAnswers] = useState<number[]>([])
  const [showHint, setShowHint] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [codeFeedback, setCodeFeedback] = useState<string[]>([])
  const [codeCorrect, setCodeCorrect] = useState(false)
  const [stepProgress, setStepProgress] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null)
  const [showAchievement, setShowAchievement] = useState(false)

  useEffect(() => {
    // Get language and level
    const currentLanguage = getLanguageById(languageId)
    const currentLevel = getLevelById(levelId)

    setLanguage(currentLanguage)
    setLevel(currentLevel)

    // Load lesson data
    const lessonData = getLessonById(languageId, levelId, lessonId)
    if (lessonData) {
      setLesson(lessonData)
      setUserCode(lessonData.practiceSection.initialCode || "")
    }

    // Get next lesson
    const next = getNextLesson(languageId, levelId, lessonId)
    setNextLesson(next)

    // Load user progress
    const progress = localStorage.getItem("devquest-progress")
    if (progress) {
      const parsedProgress = JSON.parse(progress)
      setUserProgress(parsedProgress)

      // Check if lesson is already completed
      if (parsedProgress.completedLessons && parsedProgress.completedLessons.includes(lessonId)) {
        setIsCompleted(true)
      }
    }
  }, [languageId, levelId, lessonId])

  useEffect(() => {
    // Update step progress
    if (currentStep === 0) {
      setStepProgress(33)
    } else if (currentStep === 1) {
      setStepProgress(66)
    } else if (currentStep === 2) {
      setStepProgress(100)
    }
  }, [currentStep])

  if (!language || !level || !lesson) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-900 dark:text-white">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin mb-4" />
          <p>Đang tải bài học...</p>
        </div>
      </div>
    )
  }

  const handleCodeChange = (newCode: string) => {
    setUserCode(newCode)
    // Reset feedback when code changes
    setCodeFeedback([])
    setCodeCorrect(false)
  }

  const handleCodeOutput = (output: string) => {
    setCodeOutput(output)

    // Kiểm tra xem code có chứa tất cả các từ khóa cần thiết không
    const hasAllKeywords = lesson.practiceSection.keywords.every((keyword: string) =>
      userCode.toLowerCase().includes(keyword.toLowerCase()),
    )

    // Kiểm tra xem output có gần giống với expected output không
    if (output && lesson.practiceSection.expectedOutput) {
      // Chuẩn hóa đầu ra bằng cách loại bỏ khoảng trắng thừa và xuống dòng
      const normalizeOutput = (text: string) => {
        // Loại bỏ khoảng trắng đầu/cuối, chuyển về chữ thường
        return (
          text
            .trim()
            .toLowerCase()
            // Thay thế nhiều khoảng trắng liên tiếp bằng một khoảng trắng
            .replace(/\s+/g, " ")
            // Chuẩn hóa các ký tự xuống dòng
            .replace(/\r\n/g, "\n")
        )
      }

      // Tách các phần của output theo dòng để so sánh từng phần
      const normalizedActualLines = normalizeOutput(output).split("\n")
      const normalizedExpectedLines = normalizeOutput(lesson.practiceSection.expectedOutput).split("\n")

      // Kiểm tra xem mỗi dòng của expected output có xuất hiện trong actual output không
      const allLinesPresent = normalizedExpectedLines.every((expectedLine) =>
        normalizedActualLines.some(
          (actualLine) => actualLine.includes(expectedLine) || expectedLine.includes(actualLine),
        ),
      )

      // Kiểm tra xem tất cả các giá trị số có xuất hiện trong output không
      const expectedNumbers = normalizedExpectedLines.join(" ").match(/\d+/g) || []
      const actualNumbers = normalizedActualLines.join(" ").match(/\d+/g) || []
      const allNumbersPresent = expectedNumbers.every((num) => actualNumbers.includes(num))

      // Nếu tất cả các dòng và số đều có mặt và code chứa tất cả từ khóa, coi như đúng
      if ((allLinesPresent || allNumbersPresent) && hasAllKeywords) {
        setCodeCorrect(true)
        setCodeFeedback(["Tuyệt vời! Code của bạn đã tạo ra kết quả đúng."])
      } else {
        // Nếu không đúng, hiển thị phản hồi
        const feedback = []

        if (!hasAllKeywords) {
          const missingKeywords = lesson.practiceSection.keywords.filter(
            (keyword: string) => !userCode.toLowerCase().includes(keyword.toLowerCase()),
          )
          feedback.push(`Thiếu các yếu tố quan trọng: ${missingKeywords.join(", ")}`)
        }

        if (!allLinesPresent && !allNumbersPresent) {
          feedback.push("Kết quả chưa khớp với yêu cầu.")
          feedback.push(`Kết quả mong đợi: "${lesson.practiceSection.expectedOutput}"`)
          feedback.push(`Kết quả của bạn: "${output}"`)

          // Thêm gợi ý cụ thể cho Python
          if (languageId === "python" && output.includes("Tôi đang học Python với DevQuest!15")) {
            feedback.push(
              "Gợi ý: Bạn cần in số 15 trên một dòng mới. Hãy sử dụng hai lệnh print() riêng biệt hoặc ký tự xuống dòng \\n.",
            )
          }
        }

        setCodeFeedback(feedback)
        setCodeCorrect(false)
        setShowHint(true)
      }
    } else if (output) {
      // Nếu không có expected output nhưng có output
      if (hasAllKeywords) {
        setCodeCorrect(true)
        setCodeFeedback(["Code của bạn đã chạy thành công và chứa tất cả các yếu tố cần thiết."])
      } else {
        const missingKeywords = lesson.practiceSection.keywords.filter(
          (keyword: string) => !userCode.toLowerCase().includes(keyword.toLowerCase()),
        )
        setCodeFeedback([`Thiếu các yếu tố quan trọng: ${missingKeywords.join(", ")}`])
        setCodeCorrect(false)
        setShowHint(true)
      }
    }
  }

  const checkCodeAnswer = () => {
    // Nếu chưa chạy code, yêu cầu chạy code trước
    if (!codeOutput) {
      setCodeFeedback(["Vui lòng chạy code của bạn trước khi tiếp tục."])
      setShowHint(true)
      return
    }

    // Nếu code đã được đánh giá là đúng, cho phép tiếp tục
    if (codeCorrect) {
      setCurrentStep(2) // Move to quiz section
      setShowHint(false)
    } else {
      setCodeFeedback([...codeFeedback, "Code của bạn chưa đáp ứng yêu cầu. Vui lòng kiểm tra lại và sửa code."])
      setShowHint(true)
    }
  }

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers]
    newAnswers[questionIndex] = answerIndex
    setQuizAnswers(newAnswers)
  }

  const isQuizAnswerCorrect = (questionIndex: number) => {
    return quizAnswers[questionIndex] === lesson.quizSection.questions[questionIndex].correctAnswer
  }

  const getQuizFeedback = () => {
    const incorrectQuestions = lesson.quizSection.questions
      .map((_, index) => index)
      .filter((index) => quizAnswers[index] !== undefined && !isQuizAnswerCorrect(index))

    if (incorrectQuestions.length === 0) return []

    return incorrectQuestions.map((index) => {
      const question = lesson.quizSection.questions[index]
      return `Câu hỏi ${index + 1}: Đáp án đúng là "${question.options[question.correctAnswer]}"`
    })
  }

  const checkQuizAnswers = () => {
    const allAnswered = lesson.quizSection.questions.every((_: any, index: number) => quizAnswers[index] !== undefined)

    if (!allAnswered) {
      setCodeFeedback(["Vui lòng trả lời tất cả các câu hỏi."])
      setShowHint(true)
      return
    }

    // Tính số câu trả lời đúng
    const correctCount = lesson.quizSection.questions.filter((_: any, index: number) =>
      isQuizAnswerCorrect(index),
    ).length

    // Nếu đúng ít nhất 60% câu hỏi, cho phép hoàn thành
    const passThreshold = Math.ceil(lesson.quizSection.questions.length * 0.6)

    if (correctCount >= passThreshold) {
      completeLesson()
    } else {
      setCodeFeedback([
        ...getQuizFeedback(),
        `Bạn đã trả lời đúng ${correctCount}/${lesson.quizSection.questions.length} câu hỏi. Cần đúng ít nhất ${passThreshold} câu để hoàn thành.`,
      ])
      setShowHint(true)
    }
  }

  const completeLesson = () => {
    // Update user progress
    const updatedProgress = { ...userProgress }

    // Add points
    updatedProgress.points = (updatedProgress.points || 0) + 10

    // Mark lesson as completed
    if (!updatedProgress.completedLessons) {
      updatedProgress.completedLessons = []
    }
    if (!updatedProgress.completedLessons.includes(lessonId)) {
      updatedProgress.completedLessons.push(lessonId)
    }

    // Update streak
    const today = new Date()
    const todayString = today.toISOString().split("T")[0]
    const todayNumber = Number(todayString.replace(/-/g, ""))

    if (!updatedProgress.streakDays) {
      updatedProgress.streakDays = []
    }

    if (!updatedProgress.streakDays.includes(todayNumber)) {
      updatedProgress.streakDays.push(todayNumber)
    }

    // Calculate streak
    updatedProgress.streak = 1 // Giả lập streak

    // Check for new achievements
    const { updatedProgress: progressWithAchievements, newAchievements } = updateAchievements(updatedProgress)

    localStorage.setItem("devquest-progress", JSON.stringify(progressWithAchievements))
    setUserProgress(progressWithAchievements)
    setIsCompleted(true)

    // Show confetti effect
    setShowConfetti(true)

    // Show achievement popup if there's a new achievement
    if (newAchievements.length > 0) {
      setNewAchievement(newAchievements[0])
      setShowAchievement(true)
    }
  }

  const goToNextLesson = () => {
    if (nextLesson) {
      router.push(`/languages/${languageId}/${levelId}/${nextLesson.id}`)
    } else {
      router.push(`/languages/${languageId}/${levelId}`)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link
            href={`/languages/${languageId}/${levelId}`}
            className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Quay lại danh sách bài học
          </Link>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md overflow-hidden mb-8">
          <div className={`h-2 ${language.darkColor}`}></div>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{lesson.title}</h1>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span className="mr-3">{language.name}</span>
              <span className="mr-3">•</span>
              <span>{level.name}</span>
            </div>

            {isCompleted ? (
              <div className="flex items-center text-gray-700 dark:text-gray-300 mb-4">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Bài học đã hoàn thành</span>
              </div>
            ) : (
              <div className="mb-6">
                <div className="flex mb-2 justify-between">
                  <div className="flex">
                    <div
                      className={`px-4 py-2 rounded-full text-sm font-medium mr-2 ${currentStep === 0 ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white" : "bg-gray-100 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400"}`}
                    >
                      1. Lý thuyết
                    </div>
                    <div
                      className={`px-4 py-2 rounded-full text-sm font-medium mr-2 ${currentStep === 1 ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white" : "bg-gray-100 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400"}`}
                    >
                      2. Thực hành
                    </div>
                    <div
                      className={`px-4 py-2 rounded-full text-sm font-medium ${currentStep === 2 ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white" : "bg-gray-100 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400"}`}
                    >
                      3. Quiz
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {currentStep === 0 ? "1" : currentStep === 1 ? "2" : "3"}/3
                  </div>
                </div>
                <Progress value={stepProgress} className="h-2 bg-gray-200 dark:bg-gray-800" />
              </div>
            )}

            {!isCompleted && (
              <div className="mb-6">
                {currentStep === 0 && (
                  <div className="theory-section">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Lý thuyết</h2>
                    <div className="prose dark:prose-invert max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: lesson.theorySection.content }} />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
                      <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Ví dụ:</h3>
                      <pre className="bg-gray-800 dark:bg-black text-white p-4 rounded-md overflow-x-auto">
                        <code>{lesson.theorySection.example}</code>
                      </pre>
                    </div>
                    <Button
                      className="mt-4 bg-gray-900 hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                      onClick={() => setCurrentStep(1)}
                    >
                      Tiếp tục
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="practice-section">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Thực hành</h2>
                    <p className="mb-4 text-gray-700 dark:text-gray-300">{lesson.practiceSection.instructions}</p>

                    <div className="mb-4">
                      <CodeEditor language={languageId} value={userCode} onChange={handleCodeChange} />
                    </div>

                    {codeOutput && (
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-4">
                        <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Kết quả:</h3>
                        <pre className="bg-gray-800 dark:bg-black text-white p-4 rounded-md overflow-x-auto">
                          <code>{codeOutput}</code>
                        </pre>
                      </div>
                    )}

                    {codeFeedback.length > 0 && (
                      <div
                        className={`border p-4 rounded-md mb-4 ${
                          codeCorrect
                            ? "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                            : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                        }`}
                      >
                        <div className="flex items-start">
                          {codeCorrect ? (
                            <CheckCircle className="h-5 w-5 text-gray-700 dark:text-gray-300 mr-2 mt-0.5" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-gray-700 dark:text-gray-300 mr-2 mt-0.5" />
                          )}
                          <div>
                            <h3 className="text-gray-900 dark:text-white font-medium">
                              {codeCorrect ? "Tuyệt vời!" : "Phản hồi:"}
                            </h3>
                            <ul className="text-gray-700 dark:text-gray-300 list-disc pl-5 mt-2">
                              {codeFeedback.map((feedback, index) => (
                                <li key={index}>{feedback}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {showHint && !codeCorrect && (
                      <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-4 rounded-md mb-4">
                        <div className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-gray-700 dark:text-gray-300 mr-2 mt-0.5" />
                          <div>
                            <h3 className="text-gray-900 dark:text-white font-medium">Gợi ý:</h3>
                            <p className="text-gray-700 dark:text-gray-300">{lesson.practiceSection.hint}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-4">
                      <CodeExecutor code={userCode} language={languageId} onResult={handleCodeOutput} />
                      <Button
                        className="bg-gray-900 hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                        onClick={checkCodeAnswer}
                      >
                        Kiểm tra & Tiếp tục
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="quiz-section">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Quiz</h2>

                    {lesson.quizSection.questions.map((question: any, qIndex: number) => (
                      <div key={qIndex} className="mb-6">
                        <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
                          {qIndex + 1}. {question.text}
                        </h3>
                        <div className="space-y-2">
                          {question.options.map((option: string, oIndex: number) => (
                            <div
                              key={oIndex}
                              className={`p-3 rounded-md border cursor-pointer ${
                                quizAnswers[qIndex] === oIndex
                                  ? quizAnswers[qIndex] === question.correctAnswer
                                    ? "bg-gray-200 dark:bg-gray-800 border-gray-400 dark:border-gray-600"
                                    : "bg-gray-200 dark:bg-gray-800 border-gray-400 dark:border-gray-600"
                                  : "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                              }`}
                              onClick={() => handleQuizAnswer(qIndex, oIndex)}
                            >
                              <div className="flex items-center">
                                <div
                                  className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                                    quizAnswers[qIndex] === oIndex
                                      ? quizAnswers[qIndex] === question.correctAnswer
                                        ? "border-gray-700 dark:border-gray-300 bg-gray-700 dark:bg-gray-300 text-white dark:text-gray-900"
                                        : "border-gray-700 dark:border-gray-300 bg-gray-700 dark:bg-gray-300 text-white dark:text-gray-900"
                                      : "border-gray-400 dark:border-gray-600"
                                  }`}
                                >
                                  {quizAnswers[qIndex] === oIndex &&
                                    (quizAnswers[qIndex] === question.correctAnswer ? (
                                      <CheckCircle className="h-3 w-3" />
                                    ) : (
                                      <X className="h-3 w-3" />
                                    ))}
                                </div>
                                <span className="text-gray-900 dark:text-white">{option}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    {codeFeedback.length > 0 && (
                      <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-4 rounded-md mb-4">
                        <div className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-gray-700 dark:text-gray-300 mr-2 mt-0.5" />
                          <div>
                            <h3 className="text-gray-900 dark:text-white font-medium">Phản hồi:</h3>
                            <ul className="text-gray-700 dark:text-gray-300 list-disc pl-5 mt-2">
                              {codeFeedback.map((feedback, index) => (
                                <li key={index}>{feedback}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    <Button
                      className="bg-gray-900 hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                      onClick={checkQuizAnswers}
                    >
                      Hoàn thành bài học
                    </Button>
                  </div>
                )}
              </div>
            )}

            {isCompleted && (
              <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-6 rounded-md text-center">
                <CheckCircle className="h-12 w-12 text-gray-700 dark:text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Chúc mừng!</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Bạn đã hoàn thành bài học này và nhận được 10 điểm.
                </p>
                {nextLesson ? (
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">
                      Bài học tiếp theo: <span className="font-medium">{nextLesson.title}</span>
                    </p>
                    <Button
                      className="bg-gray-900 hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                      onClick={goToNextLesson}
                    >
                      Tiếp tục học
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="bg-gray-900 hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                    onClick={goToNextLesson}
                  >
                    Quay lại danh sách bài học
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

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

      <Mascot language={languageId} />
    </div>
  )
}
