// Simulated code execution environment
import { compareOutputs } from "./lesson-utils"

export function executeCode(code: string, language: string): { output: string; success: boolean; error?: string } {
  try {
    // In a real application, this would be a secure sandbox or API call
    // For this demo, we'll simulate execution with some basic checks

    switch (language) {
      case "python":
        return simulatePythonExecution(code)
      case "javascript":
        return simulateJavaScriptExecution(code)
      case "cpp":
        return simulateCppExecution(code)
      case "csharp":
        return simulateCSharpExecution(code)
      default:
        return {
          output: "Ngôn ngữ không được hỗ trợ.",
          success: false,
          error: "Unsupported language",
        }
    }
  } catch (error) {
    return {
      output: `Lỗi thực thi: ${error instanceof Error ? error.message : String(error)}`,
      success: false,
      error: String(error),
    }
  }
}

function simulatePythonExecution(code: string) {
  // Check for common Python syntax
  if (!code.includes("print(")) {
    return {
      output: "Lỗi: Không tìm thấy hàm print() trong code của bạn.",
      success: false,
      error: "Missing print function",
    }
  }

  // Extract print statements and simulate their output
  const output: string[] = []
  const printRegex = /print\s*$$(.*?)$$/g
  let match

  while ((match = printRegex.exec(code)) !== null) {
    const content = match[1].trim()

    // Handle string literals
    if ((content.startsWith('"') && content.endsWith('"')) || (content.startsWith("'") && content.endsWith("'"))) {
      output.push(content.slice(1, -1))
    }
    // Handle f-strings (simplified)
    else if (content.startsWith('f"') || content.startsWith("f'")) {
      // Very simplified f-string handling
      output.push(content.slice(2, -1).replace(/\{([^}]+)\}/g, "variable"))
    }
    // Handle expressions (very simplified)
    else if (content.includes("+") || content.includes("-") || content.includes("*") || content.includes("/")) {
      try {
        // DANGER: Never use eval in production! This is just for demonstration
        // In a real app, use a proper sandbox or parser
        const result = Function(`"use strict"; return ${content}`)()
        output.push(String(result))
      } catch {
        output.push(`[Error evaluating: ${content}]`)
      }
    }
    // Default case
    else {
      output.push(`[Output of: ${content}]`)
    }
  }

  return {
    output: output.join("\n"),
    success: true,
  }
}

function simulateJavaScriptExecution(code: string) {
  // Check for common JavaScript syntax
  if (!code.includes("console.log(")) {
    return {
      output: "Lỗi: Không tìm thấy hàm console.log() trong code của bạn.",
      success: false,
      error: "Missing console.log function",
    }
  }

  // Extract console.log statements and simulate their output
  const output: string[] = []
  const logRegex = /console\.log\s*$$(.*?)$$/g
  let match

  while ((match = logRegex.exec(code)) !== null) {
    const content = match[1].trim()

    // Handle string literals
    if ((content.startsWith('"') && content.endsWith('"')) || (content.startsWith("'") && content.endsWith("'"))) {
      output.push(content.slice(1, -1))
    }
    // Handle template literals (simplified)
    else if (content.startsWith("`") && content.endsWith("`")) {
      // Very simplified template literal handling
      output.push(content.slice(1, -1).replace(/\${([^}]+)}/g, "variable"))
    }
    // Handle expressions (very simplified)
    else if (content.includes("+") || content.includes("-") || content.includes("*") || content.includes("/")) {
      try {
        // DANGER: Never use eval in production! This is just for demonstration
        // In a real app, use a proper sandbox or parser
        const result = Function(`"use strict"; return ${content}`)()
        output.push(String(result))
      } catch {
        output.push(`[Error evaluating: ${content}]`)
      }
    }
    // Default case
    else {
      output.push(`[Output of: ${content}]`)
    }
  }

  return {
    output: output.join("\n"),
    success: true,
  }
}

function simulateCppExecution(code: string) {
  // Check for common C++ syntax
  if (!code.includes("cout")) {
    return {
      output: "Lỗi: Không tìm thấy lệnh cout trong code của bạn.",
      success: false,
      error: "Missing cout statement",
    }
  }

  // Extract cout statements and simulate their output
  const output: string[] = []
  const coutRegex = /cout\s*<<\s*(.*?)(?:<<\s*endl|;)/g
  let match

  while ((match = coutRegex.exec(code)) !== null) {
    const content = match[1].trim()

    // Handle string literals
    if ((content.startsWith('"') && content.endsWith('"')) || (content.startsWith("'") && content.endsWith("'"))) {
      output.push(content.slice(1, -1))
    }
    // Handle expressions (very simplified)
    else if (content.includes("+") || content.includes("-") || content.includes("*") || content.includes("/")) {
      try {
        // DANGER: Never use eval in production! This is just for demonstration
        // In a real app, use a proper sandbox or parser
        const result = Function(`"use strict"; return ${content}`)()
        output.push(String(result))
      } catch {
        output.push(`[Error evaluating: ${content}]`)
      }
    }
    // Default case
    else {
      output.push(`[Output of: ${content}]`)
    }
  }

  return {
    output: output.join("\n"),
    success: true,
  }
}

function simulateCSharpExecution(code: string) {
  // Check for common C# syntax
  if (!code.includes("Console.WriteLine(")) {
    return {
      output: "Lỗi: Không tìm thấy hàm Console.WriteLine() trong code của bạn.",
      success: false,
      error: "Missing Console.WriteLine function",
    }
  }

  // Extract Console.WriteLine statements and simulate their output
  const output: string[] = []
  const writeLineRegex = /Console\.WriteLine\s*$$(.*?)$$/g
  let match

  while ((match = writeLineRegex.exec(code)) !== null) {
    const content = match[1].trim()

    // Handle string literals
    if ((content.startsWith('"') && content.endsWith('"')) || (content.startsWith("'") && content.endsWith("'"))) {
      output.push(content.slice(1, -1))
    }
    // Handle string interpolation (simplified)
    else if (content.startsWith('$"') || content.startsWith("$'")) {
      // Very simplified string interpolation handling
      output.push(content.slice(2, -1).replace(/\{([^}]+)\}/g, "variable"))
    }
    // Handle expressions (very simplified)
    else if (content.includes("+") || content.includes("-") || content.includes("*") || content.includes("/")) {
      try {
        // DANGER: Never use eval in production! This is just for demonstration
        // In a real app, use a proper sandbox or parser
        const result = Function(`"use strict"; return ${content}`)()
        output.push(String(result))
      } catch {
        output.push(`[Error evaluating: ${content}]`)
      }
    }
    // Default case
    else {
      output.push(`[Output of: ${content}]`)
    }
  }

  return {
    output: output.join("\n"),
    success: true,
  }
}

// Function to check if code meets requirements
export function checkCodeRequirements(
  code: string,
  language: string,
  keywords: string[],
  expectedOutput: string,
): {
  passed: boolean
  feedback: string[]
  missingKeywords: string[]
  outputMatch: boolean
} {
  const feedback: string[] = []
  const missingKeywords: string[] = []
  let outputMatch = false

  // Check for required keywords
  for (const keyword of keywords) {
    if (!code.toLowerCase().includes(keyword.toLowerCase())) {
      missingKeywords.push(keyword)
    }
  }

  // Execute the code
  const result = executeCode(code, language)

  // Check if output matches expected output using the improved comparison
  outputMatch = compareOutputs(result.output, expectedOutput)

  // Generate feedback
  if (missingKeywords.length > 0) {
    feedback.push(`Thiếu các yếu tố quan trọng: ${missingKeywords.join(", ")}`)
  }

  if (!outputMatch) {
    feedback.push("Kết quả chưa khớp với yêu cầu.")
    feedback.push(`Kết quả mong đợi: "${expectedOutput}"`)
    feedback.push(`Kết quả của bạn: "${result.output}"`)
  }

  if (result.error) {
    feedback.push(`Lỗi: ${result.error}`)
  }

  // Nếu có tất cả từ khóa và không có lỗi, coi như đã đạt yêu cầu
  const hasAllKeywords = missingKeywords.length === 0
  const passed = (hasAllKeywords && outputMatch) || (hasAllKeywords && !result.error && result.output.length > 0)

  return {
    passed,
    feedback,
    missingKeywords,
    outputMatch,
  }
}
