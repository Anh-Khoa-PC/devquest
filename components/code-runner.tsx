"use client"

import { useState } from "react"
import { executeCode } from "@/lib/code-execution"
import { Button } from "@/components/ui/button"
import { Play, Loader2 } from "lucide-react"

interface CodeRunnerProps {
  code: string
  language: string
  onResult?: (output: string) => void
}

export default function CodeRunner({ code, language, onResult }: CodeRunnerProps) {
  const [output, setOutput] = useState<string>("")
  const [isRunning, setIsRunning] = useState<boolean>(false)

  const runCode = () => {
    setIsRunning(true)

    // Simulate a slight delay to show loading state
    setTimeout(() => {
      try {
        const result = executeCode(code, language)
        setOutput(result.output)
        if (onResult) {
          onResult(result.output)
        }
      } catch (error) {
        setOutput(`Lỗi thực thi: ${error instanceof Error ? error.message : String(error)}`)
        if (onResult) {
          onResult(`Lỗi thực thi: ${error instanceof Error ? error.message : String(error)}`)
        }
      } finally {
        setIsRunning(false)
      }
    }, 500)
  }

  return (
    <div>
      <Button
        variant="outline"
        onClick={runCode}
        disabled={isRunning}
        className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
      >
        {isRunning ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Đang chạy...
          </>
        ) : (
          <>
            <Play className="mr-2 h-4 w-4" />
            Chạy code
          </>
        )}
      </Button>

      {output && (
        <div className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
          <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Kết quả:</h3>
          <pre className="bg-gray-800 dark:bg-black text-white p-4 rounded-md overflow-x-auto">
            <code>{output}</code>
          </pre>
        </div>
      )}
    </div>
  )
}
