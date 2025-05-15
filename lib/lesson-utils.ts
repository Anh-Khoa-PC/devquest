// Utility functions for lesson progression

/**
 * Kiểm tra xem một chuỗi có chứa tất cả các từ khóa trong một mảng hay không
 * @param text Chuỗi cần kiểm tra
 * @param keywords Mảng các từ khóa cần tìm
 * @returns true nếu chuỗi chứa tất cả các từ khóa, false nếu không
 */
export function containsAllKeywords(text: string, keywords: string[]): boolean {
  const lowerText = text.toLowerCase()
  return keywords.every((keyword) => lowerText.includes(keyword.toLowerCase()))
}

/**
 * So sánh hai chuỗi đầu ra, cho phép một số sai khác nhỏ
 * @param actual Chuỗi đầu ra thực tế
 * @param expected Chuỗi đầu ra mong đợi
 * @returns true nếu hai chuỗi tương đương, false nếu không
 */
export function compareOutputs(actual: string, expected: string): boolean {
  // Chuẩn hóa chuỗi: loại bỏ khoảng trắng thừa, xuống dòng, và chuyển về chữ thường
  const normalizeString = (str: string) => str.trim().toLowerCase().replace(/\s+/g, " ").replace(/\n+/g, "\n")

  const normalizedActual = normalizeString(actual)
  const normalizedExpected = normalizeString(expected)

  // Kiểm tra nếu một chuỗi chứa chuỗi còn lại
  if (normalizedActual.includes(normalizedExpected) || normalizedExpected.includes(normalizedActual)) {
    return true
  }

  // Kiểm tra độ tương đồng
  const words1 = normalizedActual.split(/\s+/)
  const words2 = normalizedExpected.split(/\s+/)

  // Đếm số từ chung
  const commonWords = words1.filter((word) => words2.includes(word))

  // Nếu có ít nhất 70% từ chung, coi như đúng
  const similarity = commonWords.length / Math.max(words1.length, words2.length)
  return similarity >= 0.7
}

/**
 * Kiểm tra xem người dùng có thể tiến tới bài học tiếp theo không
 * @param completedLessons Mảng các ID bài học đã hoàn thành
 * @param languageId ID của ngôn ngữ
 * @param levelId ID của cấp độ
 * @param currentLessonId ID của bài học hiện tại
 * @returns true nếu có thể tiến tới bài học tiếp theo, false nếu không
 */
export function canProgressToNextLesson(
  completedLessons: string[],
  languageId: string,
  levelId: string,
  currentLessonId: string,
): boolean {
  // Nếu bài học hiện tại đã hoàn thành, luôn cho phép tiến tới
  if (completedLessons.includes(currentLessonId)) {
    return true
  }

  // Kiểm tra xem bài học trước đó đã hoàn thành chưa
  const lessonIdPattern = new RegExp(`${languageId}-${levelId}-(\\d+)`)
  const match = currentLessonId.match(lessonIdPattern)

  if (match) {
    const currentNumber = Number.parseInt(match[1], 10)
    if (currentNumber > 1) {
      const previousLessonId = `${languageId}-${levelId}-${currentNumber - 1}`
      return completedLessons.includes(previousLessonId)
    }
  }

  // Bài học đầu tiên luôn có thể truy cập
  return true
}
