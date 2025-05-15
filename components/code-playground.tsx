"use client"

import { useState } from "react"
import CodeEditor from "@/components/code-editor"
import { Button } from "@/components/ui/button"
import { Play, Save, Share, Download } from "lucide-react"
import { executeCode } from "@/lib/code-execution"

interface CodePlaygroundProps {
  initialCode?: string
  language: string
}

export default function CodePlayground({ initialCode = "", language }: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState("")
  const [isExecuting, setIsExecuting] = useState(false)

  const runCode = () => {
    setIsExecuting(true)
    try {
      const result = executeCode(code, language)
      setOutput(result.output)
    } catch (error) {
      setOutput(`Lỗi thực thi: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsExecuting(false)
    }
  }

  const saveCode = () => {
    // Lưu code vào localStorage
    const savedCodes = JSON.parse(localStorage.getItem("devquest-saved-codes") || "[]")
    const newCode = {
      id: Date.now(),
      language,
      code,
      createdAt: new Date().toISOString(),
      title: `${language.charAt(0).toUpperCase() + language.slice(1)} Code ${savedCodes.length + 1}`,
    }
    savedCodes.push(newCode)
    localStorage.setItem("devquest-saved-codes", JSON.stringify(savedCodes))
    alert("Code đã được lưu!")
  }

  const shareCode = () => {
    // Tạo URL để chia sẻ code
    const encodedCode = encodeURIComponent(code)
    const shareUrl = `${window.location.origin}/playground?lang=${language}&code=${encodedCode}`

    // Copy URL vào clipboard
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => alert("Đã sao chép liên kết chia sẻ vào clipboard!"))
      .catch((err) => console.error("Không thể sao chép: ", err))
  }

  const downloadCode = () => {
    // Tạo file để download
    const fileExtension =
      language === "python"
        ? "py"
        : language === "javascript"
          ? "js"
          : language === "cpp"
            ? "cpp"
            : language === "csharp"
              ? "cs"
              : "txt"

    const fileName = `devquest_code.${fileExtension}`
    const blob = new Blob([code], { type: "text/plain" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
      <div className="border-b border-gray-200 dark:border-gray-800 p-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Code Playground - {language.charAt(0).toUpperCase() + language.slice(1)}
        </h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={saveCode} className="flex items-center">
            <Save className="h-4 w-4 mr-1" />
            Lưu
          </Button>
          <Button variant="outline" size="sm" onClick={shareCode} className="flex items-center">
            <Share className="h-4 w-4 mr-1" />
            Chia sẻ
          </Button>
          <Button variant="outline" size="sm" onClick={downloadCode} className="flex items-center">
            <Download className="h-4 w-4 mr-1" />
            Tải xuống
          </Button>
        </div>
      </div>

      <div className="p-4">
        <CodeEditor language={language} value={code} onChange={setCode} height="300px" />

        <div className="mt-4">
          <Button
            onClick={runCode}
            disabled={isExecuting}
            className="bg-gray-900 hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            <Play className="h-4 w-4 mr-2" />
            {isExecuting ? "Đang chạy..." : "Chạy code"}
          </Button>
        </div>

        {output && (
          <div className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
            <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Kết quả:</h4>
            <pre className="bg-gray-800 dark:bg-black text-white p-4 rounded-md overflow-x-auto text-sm">
              <code>{output}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
