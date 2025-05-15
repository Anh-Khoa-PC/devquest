"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import CodePlayground from "@/components/code-playground"

export default function PlaygroundPage() {
  const searchParams = useSearchParams()
  const [language, setLanguage] = useState("python")
  const [initialCode, setInitialCode] = useState("")

  useEffect(() => {
    // Lấy ngôn ngữ và code từ URL nếu có
    const langParam = searchParams.get("lang")
    const codeParam = searchParams.get("code")

    if (langParam) {
      setLanguage(langParam)
    }

    if (codeParam) {
      setInitialCode(decodeURIComponent(codeParam))
    }
  }, [searchParams])

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value)
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

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Code Playground</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Thử nghiệm và thực hành code của bạn trong môi trường tương tác. Bạn có thể lưu, chia sẻ và tải xuống code
            của mình.
          </p>

          <div className="mb-6">
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Chọn ngôn ngữ:
            </label>
            <select
              id="language"
              value={language}
              onChange={handleLanguageChange}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-gray-900 dark:text-white"
            >
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="cpp">C++</option>
              <option value="csharp">C#</option>
            </select>
          </div>
        </div>

        <CodePlayground language={language} initialCode={initialCode} />
      </div>
    </div>
  )
}
