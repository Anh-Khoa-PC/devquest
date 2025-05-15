export interface CodingChallenge {
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

export const codingChallenges: CodingChallenge[] = [
  // Python Challenges
  {
    id: "python-challenge-1",
    title: "Đảo ngược chuỗi",
    description: "Viết một hàm để đảo ngược chuỗi đầu vào. Ví dụ: 'hello' -> 'olleh'",
    initialCode:
      "def reverse_string(s):\n    # Viết code của bạn ở đây\n    pass\n\n# Kiểm tra hàm\nprint(reverse_string('hello'))",
    language: "python",
    testCases: [
      {
        input: "hello",
        expectedOutput: "olleh",
      },
      {
        input: "python",
        expectedOutput: "nohtyp",
      },
      {
        input: "12345",
        expectedOutput: "54321",
      },
    ],
    timeLimit: 300, // 5 phút
    difficulty: "easy",
    points: 20,
  },
  {
    id: "python-challenge-2",
    title: "Kiểm tra số nguyên tố",
    description:
      "Viết một hàm để kiểm tra xem một số có phải là số nguyên tố hay không. Trả về True nếu là số nguyên tố, False nếu không phải.",
    initialCode:
      "def is_prime(n):\n    # Viết code của bạn ở đây\n    pass\n\n# Kiểm tra hàm\nprint(is_prime(7))\nprint(is_prime(10))",
    language: "python",
    testCases: [
      {
        input: "7",
        expectedOutput: "True",
      },
      {
        input: "10",
        expectedOutput: "False",
      },
      {
        input: "13",
        expectedOutput: "True",
      },
      {
        input: "1",
        expectedOutput: "False",
      },
    ],
    timeLimit: 300,
    difficulty: "medium",
    points: 30,
  },

  // JavaScript Challenges
  {
    id: "javascript-challenge-1",
    title: "Tìm số lớn nhất trong mảng",
    description: "Viết một hàm để tìm số lớn nhất trong một mảng số.",
    initialCode:
      "function findMax(arr) {\n    // Viết code của bạn ở đây\n}\n\n// Kiểm tra hàm\nconsole.log(findMax([1, 3, 5, 7, 9, 2, 4, 6, 8]));",
    language: "javascript",
    testCases: [
      {
        input: "[1, 3, 5, 7, 9, 2, 4, 6, 8]",
        expectedOutput: "9",
      },
      {
        input: "[-1, -5, -10, -2]",
        expectedOutput: "-1",
      },
      {
        input: "[100, 200, 50, 300, 150]",
        expectedOutput: "300",
      },
    ],
    timeLimit: 300,
    difficulty: "easy",
    points: 20,
  },
  {
    id: "javascript-challenge-2",
    title: "Đếm từ trong chuỗi",
    description: "Viết một hàm để đếm số từ trong một chuỗi. Các từ được phân tách bởi khoảng trắng.",
    initialCode:
      "function countWords(str) {\n    // Viết code của bạn ở đây\n}\n\n// Kiểm tra hàm\nconsole.log(countWords('Hello world'));",
    language: "javascript",
    testCases: [
      {
        input: "Hello world",
        expectedOutput: "2",
      },
      {
        input: "JavaScript is awesome",
        expectedOutput: "3",
      },
      {
        input: "   Multiple   spaces   between   words   ",
        expectedOutput: "4",
      },
    ],
    timeLimit: 300,
    difficulty: "medium",
    points: 30,
  },

  // C++ Challenges
  {
    id: "cpp-challenge-1",
    title: "Tính giai thừa",
    description: "Viết một hàm để tính giai thừa của một số nguyên dương n.",
    initialCode:
      "#include <iostream>\nusing namespace std;\n\nint factorial(int n) {\n    // Viết code của bạn ở đây\n}\n\nint main() {\n    cout << factorial(5) << endl;\n    return 0;\n}",
    language: "cpp",
    testCases: [
      {
        input: "5",
        expectedOutput: "120",
      },
      {
        input: "0",
        expectedOutput: "1",
      },
      {
        input: "10",
        expectedOutput: "3628800",
      },
    ],
    timeLimit: 300,
    difficulty: "easy",
    points: 20,
  },

  // C# Challenges
  {
    id: "csharp-challenge-1",
    title: "Kiểm tra chuỗi Palindrome",
    description:
      "Viết một hàm để kiểm tra xem một chuỗi có phải là palindrome hay không (đọc xuôi ngược đều giống nhau, không phân biệt hoa thường).",
    initialCode:
      'using System;\n\nclass Program {\n    static bool IsPalindrome(string str) {\n        // Viết code của bạn ở đây\n    }\n    \n    static void Main() {\n        Console.WriteLine(IsPalindrome("Radar"));\n        Console.WriteLine(IsPalindrome("Hello"));\n    }\n}',
    language: "csharp",
    testCases: [
      {
        input: "Radar",
        expectedOutput: "True",
      },
      {
        input: "Hello",
        expectedOutput: "False",
      },
      {
        input: "A man a plan a canal Panama",
        expectedOutput: "True",
      },
    ],
    timeLimit: 300,
    difficulty: "medium",
    points: 30,
  },
]

export function getChallengeById(id: string): CodingChallenge | undefined {
  return codingChallenges.find((challenge) => challenge.id === id)
}

export function getChallengesByLanguage(language: string): CodingChallenge[] {
  return codingChallenges.filter((challenge) => challenge.language === language)
}

export function getChallengesByDifficulty(difficulty: string): CodingChallenge[] {
  return codingChallenges.filter((challenge) => challenge.difficulty === difficulty)
}
