"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import CodeEditor from "@/components/code-editor"
import { Button } from "@/components/ui/button"
import { Play, Clock, Award, CheckCircle, XCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { executeCode } from "@/lib/code-execution"

interface CodingChallengeProps {
  challenge: {
    id: string
    title: string
    description: string
    initialCode: string
    language: string
    testCases: Array<{
      input: string
      expectedOutput: string
    }>
    timeLimit: number // in seconds
    difficulty: "easy" | "medium" | "hard"
    points: number
  }
  onComplete: (success: boolean, points: number) => void
}

export default function CodingChallenge({ challenge, onComplete }: CodingChallengeProps) {
  const [code, setCode] = useState(challenge.initialCode)
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<Array<{ passed: boolean; output: string; expected: string }>>([])
  const [timeLeft, setTimeLeft] = useState(challenge.timeLimit)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [allTestsPassed, setAllTestsPassed] = useState(false)

  // Bắt đầu đếm ngược khi component được mount
  useEffect(() => {
    setIsTimerActive(true)
  }, [])

  // Xử lý đếm ngược
  useEffect(() => {
    if (!isTimerActive || isCompleted) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setIsTimerActive(false)
          if (!isCompleted) {
            handleTimeUp()
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isTimerActive, isCompleted])

  const handleTimeUp = () => {
    setIsCompleted(true)
    onComplete(false, 0)
  }

  const runTests = () => {
    setIsRunning(true)
    const testResults = []

    try {
      for (const testCase of challenge.testCases) {
        // Giả lập việc chạy code với input
        const result = executeCode(code, challenge.language)

        // So sánh output với expected output
        const passed = result.output.trim() === testCase.expectedOutput.trim()

        testResults.push({
          passed,
          output: result.output,
          expected: testCase.expectedOutput,
        })
      }

      setResults(testResults)

      // Kiểm tra xem tất cả các test case có pass không
      const allPassed = testResults.every((result) => result.passed)
      setAllTestsPassed(allPassed)

      if (allPassed) {
        setIsCompleted(true)
        setIsTimerActive(false)
        onComplete(true, challenge.points)
      }
    } catch (error) {
      setResults([
        {
          passed: false,
          output: `Lỗi: ${error instanceof Error ? error.message : String(error)}`,
          expected: "Không có lỗi",
        },
      ])
    } finally {
      setIsRunning(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const getDifficultyColor = () => {
    switch (challenge.difficulty) {
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

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
      <div className="border-b border-gray-200 dark:border-gray-800 p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{challenge.title}</h3>
          <div className="flex items-center">
            <span className={`text-sm font-medium ${getDifficultyColor()} mr-3`}>
              {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
            </span>
            <Award className="h-5 w-5 text-purple-500 mr-1" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{challenge.points} điểm</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-500 mr-1" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{formatTime(timeLeft)}</span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Ngôn ngữ: {challenge.language.charAt(0).toUpperCase() + challenge.language.slice(1)}
          </div>
        </div>

        <Progress value={(timeLeft / challenge.timeLimit) * 100} className="h-1" />
      </div>

      <div className="p-4">
        <div className="prose dark:prose-invert max-w-none mb-4">
          <p>{challenge.description}</p>
        </div>

        <div className="mb-4">
          <CodeEditor language={challenge.language} value={code} onChange={setCode} height="300px" />
        </div>

        <div className="flex justify-between items-center">
          <Button
            onClick={runTests}
            disabled={isRunning || isCompleted}
            className="bg-gray-900 hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            <Play className="h-4 w-4 mr-2" />
            {isRunning ? "Đang chạy..." : "Chạy kiểm tra"}
          </Button>

          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`flex items-center ${allTestsPassed ? "text-green-500" : "text-red-500"}`}
            >
              {allTestsPassed ? (
                <>
                  <CheckCircle className="h-5 w-5 mr-1" />
                  <span className="font-medium">Thành công!</span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 mr-1" />
                  <span className="font-medium">Chưa hoàn thành</span>
                </>
              )}
            </motion.div>
          )}
        </div>

        {results.length > 0 && (
          <div className="mt-4 space-y-3">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">Kết quả kiểm tra:</h4>
            {results.map((result, index) => (
              <div
                key={index}
                className={`p-3 rounded-md ${
                  result.passed
                    ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900"
                    : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900"
                }`}
              >
                <div className="flex items-center mb-2">
                  {result.passed ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                  )}
                  <span
                    className={`font-medium ${result.passed ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}
                  >
                    Test case {index + 1}: {result.passed ? "Đạt" : "Không đạt"}
                  </span>
                </div>

                {!result.passed && (
                  <div className="mt-2 text-sm">
                    <div className="mb-1">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Kết quả mong đợi:</span>
                      <pre className="mt-1 bg-gray-100 dark:bg-gray-800 p-2 rounded text-gray-800 dark:text-gray-200 overflow-x-auto">
                        {result.expected}
                      </pre>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Kết quả của bạn:</span>
                      <pre className="mt-1 bg-gray-100 dark:bg-gray-800 p-2 rounded text-gray-800 dark:text-gray-200 overflow-x-auto">
                        {result.output}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
