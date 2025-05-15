"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

interface CodeEditorProps {
  language: string
  value: string
  onChange: (value: string) => void
  onExecute?: (code: string) => void
  height?: string
}

export default function CodeEditor({ language, value, onChange, onExecute, height = "300px" }: CodeEditorProps) {
  const [editor, setEditor] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Dynamically import Monaco Editor
    import("@monaco-editor/react").then(({ default: MonacoEditor }) => {
      setEditor(MonacoEditor)
      setLoading(false)
    })
  }, [])

  const getLanguageId = (lang: string) => {
    switch (lang) {
      case "python":
        return "python"
      case "javascript":
        return "javascript"
      case "cpp":
        return "cpp"
      case "csharp":
        return "csharp"
      default:
        return "javascript"
    }
  }

  const handleEditorDidMount = (editor: any) => {
    // Add keyboard shortcut for execution (Ctrl+Enter or Cmd+Enter)
    editor.addCommand(
      // Monaco.KeyMod.CtrlCmd | Monaco.KeyCode.Enter
      2048 | 3, // This is the key code for Ctrl+Enter
      () => {
        if (onExecute) {
          onExecute(editor.getValue())
        }
      },
    )
  }

  if (loading) {
    return (
      <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-gray-700 dark:text-gray-300 animate-spin" />
      </div>
    )
  }

  const MonacoEditor = editor

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
      <MonacoEditor
        height={height}
        language={getLanguageId(language)}
        value={value}
        onChange={onChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: "on",
          lineNumbers: "on",
          folding: true,
          autoIndent: "full",
        }}
        onMount={handleEditorDidMount}
      />
    </div>
  )
}
