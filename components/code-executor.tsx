"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, Loader2 } from "lucide-react"

interface CodeExecutorProps {
  code: string
  language: string
  onResult: (output: string) => void
}

export default function CodeExecutor({ code, language, onResult }: CodeExecutorProps) {
  const [isExecuting, setIsExecuting] = useState(false)

  const executeCode = () => {
    setIsExecuting(true)

    // Simulate a slight delay to show loading state
    setTimeout(() => {
      try {
        let output = ""

        // Simple code execution simulation based on language
        if (language === "python") {
          output = executePythonCode(code)
        } else if (language === "javascript") {
          output = executeJavaScriptCode(code)
        } else if (language === "cpp") {
          output = executeCppCode(code)
        } else if (language === "csharp") {
          output = executeCSharpCode(code)
        } else {
          output = "Ngôn ngữ không được hỗ trợ."
        }

        onResult(output)
      } catch (error) {
        onResult(`Lỗi thực thi: ${error instanceof Error ? error.message : String(error)}`)
      } finally {
        setIsExecuting(false)
      }
    }, 500)
  }

  // Simple Python code execution simulation
  const executePythonCode = (code: string): string => {
    const lines = code.split("\n")
    const output: string[] = []

    for (const line of lines) {
      const trimmedLine = line.trim()

      // Handle print statements
      if (trimmedLine.startsWith("print(") && trimmedLine.endsWith(")")) {
        const content = trimmedLine.substring(6, trimmedLine.length - 1)

        // Handle string literals
        if ((content.startsWith('"') && content.endsWith('"')) || (content.startsWith("'") && content.endsWith("'"))) {
          output.push(content.slice(1, -1))
        }
        // Handle simple expressions
        else if (content.includes("+") || content.includes("-") || content.includes("*") || content.includes("/")) {
          try {
            // CAUTION: This is a simplified simulation
            const result = eval(content)
            output.push(String(result))
          } catch {
            output.push(`[Error evaluating: ${content}]`)
          }
        }
        // Default case
        else {
          output.push(content)
        }
      }
    }

    return output.join("\n")
  }

  // Simple JavaScript code execution simulation
  const executeJavaScriptCode = (code: string): string => {
    const lines = code.split("\n")
    const output: string[] = []

    for (const line of lines) {
      const trimmedLine = line.trim()

      // Handle console.log statements
      if (
        (trimmedLine.startsWith("console.log(") && trimmedLine.endsWith(");")) ||
        (trimmedLine.startsWith("console.log(") && trimmedLine.endsWith(")"))
      ) {
        let content = trimmedLine.substring(12)
        if (content.endsWith(");")) {
          content = content.substring(0, content.length - 2)
        } else if (content.endsWith(")")) {
          content = content.substring(0, content.length - 1)
        }

        // Handle string literals
        if ((content.startsWith('"') && content.endsWith('"')) || (content.startsWith("'") && content.endsWith("'"))) {
          output.push(content.slice(1, -1))
        }
        // Handle simple expressions
        else if (content.includes("+") || content.includes("-") || content.includes("*") || content.includes("/")) {
          try {
            // CAUTION: This is a simplified simulation
            const result = eval(content)
            output.push(String(result))
          } catch {
            output.push(`[Error evaluating: ${content}]`)
          }
        }
        // Default case
        else {
          output.push(content)
        }
      }
    }

    return output.join("\n")
  }

  // Simple C++ code execution simulation
  const executeCppCode = (code: string): string => {
    const lines = code.split("\n")
    const output: string[] = []

    for (const line of lines) {
      const trimmedLine = line.trim()

      // Handle cout statements
      if (trimmedLine.includes("cout <<") && (trimmedLine.includes(";") || trimmedLine.includes("endl"))) {
        const parts = trimmedLine.split("<<")

        // Skip the first part (cout)
        for (let i = 1; i < parts.length; i++) {
          let part = parts[i].trim()

          // Remove trailing semicolon or endl
          if (part.endsWith(";")) {
            part = part.substring(0, part.length - 1).trim()
          } else if (part.includes("endl")) {
            part = part.split("endl")[0].trim()
            // Add a newline if endl is present
            if (i < parts.length - 1) {
              output.push("")
            }
            continue
          }

          // Handle string literals
          if ((part.startsWith('"') && part.endsWith('"')) || (part.startsWith("'") && part.endsWith("'"))) {
            output.push(part.slice(1, -1))
          }
          // Handle simple expressions
          else if (part.includes("+") || part.includes("-") || part.includes("*") || part.includes("/")) {
            try {
              // CAUTION: This is a simplified simulation
              const result = eval(part)
              output.push(String(result))
            } catch {
              output.push(`[Error evaluating: ${part}]`)
            }
          }
          // Default case
          else {
            output.push(part)
          }
        }
      }
    }

    return output.join("")
  }

  // Simple C# code execution simulation
  const executeCSharpCode = (code: string): string => {
    const lines = code.split("\n")
    const output: string[] = []

    for (const line of lines) {
      const trimmedLine = line.trim()

      // Handle Console.WriteLine statements
      if (
        (trimmedLine.startsWith("Console.WriteLine(") && trimmedLine.endsWith(");")) ||
        (trimmedLine.startsWith("Console.WriteLine(") && trimmedLine.endsWith(")"))
      ) {
        let content = trimmedLine.substring(18)
        if (content.endsWith(");")) {
          content = content.substring(0, content.length - 2)
        } else if (content.endsWith(")")) {
          content = content.substring(0, content.length - 1)
        }

        // Handle string literals
        if ((content.startsWith('"') && content.endsWith('"')) || (content.startsWith("'") && content.endsWith("'"))) {
          output.push(content.slice(1, -1))
        }
        // Handle simple expressions
        else if (content.includes("+") || content.includes("-") || content.includes("*") || content.includes("/")) {
          try {
            // CAUTION: This is a simplified simulation
            const result = eval(content)
            output.push(String(result))
          } catch {
            output.push(`[Error evaluating: ${content}]`)
          }
        }
        // Default case
        else {
          output.push(content)
        }
      }
    }

    return output.join("\n")
  }

  return (
    <Button
      variant="outline"
      onClick={executeCode}
      disabled={isExecuting}
      className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
    >
      {isExecuting ? (
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
  )
}
