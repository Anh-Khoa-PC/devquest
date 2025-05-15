import { Code, FileCode, Braces, Hash } from "lucide-react"

// Define programming languages
export const languages = [
  {
    id: "python",
    name: "Python",
    icon: <Code className="h-6 w-6 text-gray-700 dark:text-gray-300" />,
    color: "bg-blue-500",
    bgColor: "bg-blue-100",
    darkColor: "bg-gray-900 dark:bg-blue-500",
    darkBgColor: "bg-gray-200 dark:bg-gray-800",
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: <Braces className="h-6 w-6 text-gray-700 dark:text-gray-300" />,
    color: "bg-yellow-500",
    bgColor: "bg-yellow-100",
    darkColor: "bg-gray-900 dark:bg-yellow-500",
    darkBgColor: "bg-gray-200 dark:bg-gray-800",
  },
  {
    id: "cpp",
    name: "C++",
    icon: <FileCode className="h-6 w-6 text-gray-700 dark:text-gray-300" />,
    color: "bg-purple-500",
    bgColor: "bg-purple-100",
    darkColor: "bg-gray-900 dark:bg-purple-500",
    darkBgColor: "bg-gray-200 dark:bg-gray-800",
  },
  {
    id: "csharp",
    name: "C#",
    icon: <Hash className="h-6 w-6 text-gray-700 dark:text-gray-300" />,
    color: "bg-green-500",
    bgColor: "bg-green-100",
    darkColor: "bg-gray-900 dark:bg-green-500",
    darkBgColor: "bg-gray-200 dark:bg-gray-800",
  },
]

// Define levels
export const getLevels = () => [
  {
    id: "beginner",
    name: "Beginner",
    description: "Dành cho người mới bắt đầu, chưa có kiến thức lập trình.",
  },
  {
    id: "intermediate",
    name: "Intermediate",
    description: "Dành cho người đã có kiến thức cơ bản về lập trình.",
  },
  {
    id: "advanced",
    name: "Advanced",
    description: "Dành cho người đã có kinh nghiệm lập trình và muốn nâng cao.",
  },
]

// Helper functions
export const getLanguageById = (id: string) => {
  return languages.find((lang) => lang.id === id)
}

export const getLevelById = (id: string) => {
  return getLevels().find((level) => level.id === id)
}

// Get next lesson
export const getNextLesson = (languageId: string, levelId: string, currentLessonId: string) => {
  const lessons = generateLessons(languageId, levelId)
  const currentIndex = lessons.findIndex((lesson) => lesson.id === currentLessonId)

  if (currentIndex === -1 || currentIndex === lessons.length - 1) {
    return null
  }

  return lessons[currentIndex + 1]
}

// Generate lessons based on language and level
export const generateLessons = (languageId: string, levelId: string) => {
  // This function simulates AI-generated content
  // In a real app, this could call an API or use a more sophisticated algorithm

  const lessons = []
  const language = getLanguageById(languageId)
  const level = getLevelById(levelId)

  if (!language || !level) return []

  // Generate different lessons based on language and level
  if (languageId === "python") {
    if (levelId === "beginner") {
      lessons.push(
        {
          id: "python-beginner-1",
          title: "Giới thiệu Python",
          description: "Tìm hiểu về ngôn ngữ Python và cách cài đặt.",
        },
        {
          id: "python-beginner-2",
          title: "Biến và kiểu dữ liệu",
          description: "Học cách khai báo biến và các kiểu dữ liệu cơ bản.",
        },
        {
          id: "python-beginner-3",
          title: "Cấu trúc điều kiện",
          description: "Sử dụng if, elif và else để tạo điều kiện.",
        },
        {
          id: "python-beginner-4",
          title: "Vòng lặp",
          description: "Sử dụng for và while để lặp qua dữ liệu.",
        },
        {
          id: "python-beginner-5",
          title: "Hàm",
          description: "Tạo và sử dụng hàm trong Python.",
        },
        {
          id: "python-beginner-6",
          title: "List và Tuple",
          description: "Làm việc với cấu trúc dữ liệu danh sách.",
        },
        {
          id: "python-beginner-7",
          title: "Dictionary và Set",
          description: "Làm việc với cấu trúc dữ liệu từ điển và tập hợp.",
        },
        {
          id: "python-beginner-8",
          title: "Xử lý chuỗi",
          description: "Các thao tác với chuỗi trong Python.",
        },
        {
          id: "python-beginner-9",
          title: "Xử lý ngoại lệ cơ bản",
          description: "Học cách xử lý lỗi với try/except.",
        },
        {
          id: "python-beginner-10",
          title: "Làm việc với file",
          description: "Đọc và ghi file trong Python.",
        },
        {
          id: "python-beginner-11",
          title: "Module và Package",
          description: "Tổ chức code với module và package.",
        },
        {
          id: "python-beginner-12",
          title: "Dự án mini: Ứng dụng To-Do List",
          description: "Xây dựng ứng dụng quản lý công việc đơn giản.",
        },
      )
    } else if (levelId === "intermediate") {
      lessons.push(
        {
          id: "python-intermediate-1",
          title: "Xử lý ngoại lệ nâng cao",
          description: "Học cách xử lý lỗi với try/except/finally và tạo exception tùy chỉnh.",
        },
        {
          id: "python-intermediate-2",
          title: "Làm việc với file nâng cao",
          description: "Đọc và ghi file với các định dạng khác nhau (CSV, JSON, etc).",
        },
        {
          id: "python-intermediate-3",
          title: "Lập trình hướng đối tượng",
          description: "Tạo class và object trong Python.",
        },
        {
          id: "python-intermediate-4",
          title: "Kế thừa và đa hình",
          description: "Hiểu về kế thừa và đa hình trong OOP.",
        },
        {
          id: "python-intermediate-5",
          title: "Thuộc tính và phương thức đặc biệt",
          description: "Sử dụng các phương thức magic và thuộc tính đặc biệt trong Python.",
        },
        {
          id: "python-intermediate-6",
          title: "List Comprehension",
          description: "Cách viết code ngắn gọn với list comprehension.",
        },
        {
          id: "python-intermediate-7",
          title: "Lambda và Higher-order Functions",
          description: "Sử dụng hàm lambda và các hàm bậc cao như map, filter, reduce.",
        },
        {
          id: "python-intermediate-8",
          title: "Decorators",
          description: "Mở rộng chức năng của hàm với decorators.",
        },
        {
          id: "python-intermediate-9",
          title: "Generators và Iterators",
          description: "Tối ưu bộ nhớ với generators và iterators.",
        },
        {
          id: "python-intermediate-10",
          title: "Regular Expressions",
          description: "Xử lý và tìm kiếm chuỗi với biểu thức chính quy.",
        },
        {
          id: "python-intermediate-11",
          title: "Làm việc với API",
          description: "Gọi API và xử lý dữ liệu JSON.",
        },
        {
          id: "python-intermediate-12",
          title: "Dự án: Ứng dụng Weather App",
          description: "Xây dựng ứng dụng thời tiết sử dụng API.",
        },
      )
    } else if (levelId === "advanced") {
      lessons.push(
        {
          id: "python-advanced-1",
          title: "Concurrency với Threading",
          description: "Lập trình đa luồng với threading module.",
        },
        {
          id: "python-advanced-2",
          title: "Concurrency với Multiprocessing",
          description: "Tận dụng nhiều CPU với multiprocessing.",
        },
        {
          id: "python-advanced-3",
          title: "Asyncio",
          description: "Lập trình bất đồng bộ với asyncio.",
        },
        {
          id: "python-advanced-4",
          title: "Context Managers",
          description: "Sử dụng with statement và tạo context managers.",
        },
        {
          id: "python-advanced-5",
          title: "Metaprogramming",
          description: "Viết code để tạo ra code với metaprogramming.",
        },
        {
          id: "python-advanced-6",
          title: "Descriptors",
          description: "Sử dụng descriptors để kiểm soát thuộc tính.",
        },
        {
          id: "python-advanced-7",
          title: "Metaclasses",
          description: "Tùy chỉnh hành vi của class với metaclasses.",
        },
        {
          id: "python-advanced-8",
          title: "Tối ưu hiệu suất",
          description: "Kỹ thuật tối ưu code Python.",
        },
        {
          id: "python-advanced-9",
          title: "Testing và Debugging",
          description: "Viết unit test và debug code hiệu quả.",
        },
        {
          id: "python-advanced-10",
          title: "Design Patterns",
          description: "Các mẫu thiết kế phổ biến trong Python.",
        },
        {
          id: "python-advanced-11",
          title: "Web Scraping nâng cao",
          description: "Thu thập dữ liệu từ web với Scrapy và BeautifulSoup.",
        },
        {
          id: "python-advanced-12",
          title: "Dự án: Xây dựng Web Framework",
          description: "Tạo một web framework đơn giản từ đầu.",
        },
      )
    }
  } else if (languageId === "javascript") {
    if (levelId === "beginner") {
      lessons.push(
        {
          id: "javascript-beginner-1",
          title: "Giới thiệu JavaScript",
          description: "Tìm hiểu về JavaScript và cách sử dụng trong web.",
        },
        {
          id: "javascript-beginner-2",
          title: "Biến và kiểu dữ liệu",
          description: "Khai báo biến với let, const và các kiểu dữ liệu.",
        },
        {
          id: "javascript-beginner-3",
          title: "Hàm",
          description: "Tạo và sử dụng hàm trong JavaScript.",
        },
        {
          id: "javascript-beginner-4",
          title: "Cấu trúc điều kiện",
          description: "Sử dụng if, else if, else và switch.",
        },
        {
          id: "javascript-beginner-5",
          title: "Vòng lặp",
          description: "Sử dụng for, while và do-while.",
        },
        {
          id: "javascript-beginner-6",
          title: "Array",
          description: "Làm việc với mảng trong JavaScript.",
        },
        {
          id: "javascript-beginner-7",
          title: "Object",
          description: "Làm việc với đối tượng trong JavaScript.",
        },
        {
          id: "javascript-beginner-8",
          title: "DOM Basics",
          description: "Thao tác với DOM để thay đổi nội dung trang web.",
        },
        {
          id: "javascript-beginner-9",
          title: "Event Handling",
          description: "Xử lý sự kiện người dùng trong JavaScript.",
        },
        {
          id: "javascript-beginner-10",
          title: "Form Validation",
          description: "Kiểm tra dữ liệu form với JavaScript.",
        },
        {
          id: "javascript-beginner-11",
          title: "Local Storage",
          description: "Lưu trữ dữ liệu trong trình duyệt.",
        },
        {
          id: "javascript-beginner-12",
          title: "Dự án: Ứng dụng Todo List",
          description: "Xây dựng ứng dụng quản lý công việc đơn giản.",
        },
      )
    } else if (levelId === "intermediate") {
      lessons.push(
        {
          id: "javascript-intermediate-1",
          title: "ES6+ Features",
          description: "Các tính năng mới trong ES6 và các phiên bản sau.",
        },
        {
          id: "javascript-intermediate-2",
          title: "Promises",
          description: "Xử lý bất đồng bộ với Promises.",
        },
        {
          id: "javascript-intermediate-3",
          title: "Async/Await",
          description: "Cú pháp hiện đại cho xử lý bất đồng bộ.",
        },
        {
          id: "javascript-intermediate-4",
          title: "Fetch API",
          description: "Gọi API và xử lý dữ liệu từ server.",
        },
        {
          id: "javascript-intermediate-5",
          title: "JSON",
          description: "Làm việc với dữ liệu JSON.",
        },
        {
          id: "javascript-intermediate-6",
          title: "Error Handling",
          description: "Xử lý lỗi với try/catch/finally.",
        },
        {
          id: "javascript-intermediate-7",
          title: "Closures",
          description: "Hiểu về closures và scope trong JavaScript.",
        },
        {
          id: "javascript-intermediate-8",
          title: "Higher-order Functions",
          description: "Sử dụng map, filter, reduce và các hàm bậc cao khác.",
        },
        {
          id: "javascript-intermediate-9",
          title: "Modules",
          description: "Tổ chức code với ES modules.",
        },
        {
          id: "javascript-intermediate-10",
          title: "Regular Expressions",
          description: "Xử lý và tìm kiếm chuỗi với biểu thức chính quy.",
        },
        {
          id: "javascript-intermediate-11",
          title: "Web APIs",
          description: "Sử dụng các API của trình duyệt như Geolocation, Canvas, etc.",
        },
        {
          id: "javascript-intermediate-12",
          title: "Dự án: Ứng dụng Weather App",
          description: "Xây dựng ứng dụng thời tiết sử dụng API.",
        },
      )
    } else if (levelId === "advanced") {
      lessons.push(
        {
          id: "javascript-advanced-1",
          title: "Prototypes",
          description: "Kế thừa dựa trên prototype trong JavaScript.",
        },
        {
          id: "javascript-advanced-2",
          title: "Design Patterns",
          description: "Các mẫu thiết kế phổ biến trong JavaScript.",
        },
        {
          id: "javascript-advanced-3",
          title: "Functional Programming",
          description: "Lập trình hàm trong JavaScript.",
        },
        {
          id: "javascript-advanced-4",
          title: "Memory Management",
          description: "Quản lý bộ nhớ và tránh memory leaks.",
        },
        {
          id: "javascript-advanced-5",
          title: "Web Workers",
          description: "Xử lý đa luồng với Web Workers.",
        },
        {
          id: "javascript-advanced-6",
          title: "Service Workers",
          description: "Tạo ứng dụng web hoạt động offline.",
        },
        {
          id: "javascript-advanced-7",
          title: "WebSockets",
          description: "Giao tiếp hai chiều với WebSockets.",
        },
        {
          id: "javascript-advanced-8",
          title: "Testing",
          description: "Viết unit test và integration test cho JavaScript.",
        },
        {
          id: "javascript-advanced-9",
          title: "Performance Optimization",
          description: "Tối ưu hiệu suất cho ứng dụng JavaScript.",
        },
        {
          id: "javascript-advanced-10",
          title: "Security Best Practices",
          description: "Bảo mật cho ứng dụng JavaScript.",
        },
        {
          id: "javascript-advanced-11",
          title: "State Management",
          description: "Quản lý trạng thái trong ứng dụng lớn.",
        },
        {
          id: "javascript-advanced-12",
          title: "Dự án: Single Page Application",
          description: "Xây dựng SPA từ đầu không sử dụng framework.",
        },
      )
    }
  } else if (languageId === "cpp") {
    if (levelId === "beginner") {
      lessons.push(
        {
          id: "cpp-beginner-1",
          title: "Giới thiệu C++",
          description: "Tìm hiểu về ngôn ngữ C++ và cách cài đặt.",
        },
        {
          id: "cpp-beginner-2",
          title: "Biến và kiểu dữ liệu",
          description: "Khai báo biến và các kiểu dữ liệu trong C++.",
        },
        {
          id: "cpp-beginner-3",
          title: "Cấu trúc điều kiện",
          description: "Sử dụng if, else if và else trong C++.",
        },
        {
          id: "cpp-beginner-4",
          title: "Vòng lặp",
          description: "Sử dụng for, while và do-while trong C++.",
        },
        {
          id: "cpp-beginner-5",
          title: "Hàm",
          description: "Tạo và sử dụng hàm trong C++.",
        },
        {
          id: "cpp-beginner-6",
          title: "Mảng",
          description: "Làm việc với mảng trong C++.",
        },
        {
          id: "cpp-beginner-7",
          title: "Chuỗi",
          description: "Làm việc với chuỗi trong C++.",
        },
        {
          id: "cpp-beginner-8",
          title: "Con trỏ cơ bản",
          description: "Giới thiệu về con trỏ trong C++.",
        },
        {
          id: "cpp-beginner-9",
          title: "Tham chiếu",
          description: "Sử dụng tham chiếu trong C++.",
        },
        {
          id: "cpp-beginner-10",
          title: "Cấu trúc",
          description: "Tạo và sử dụng struct trong C++.",
        },
        {
          id: "cpp-beginner-11",
          title: "Nhập xuất file",
          description: "Đọc và ghi file trong C++.",
        },
        {
          id: "cpp-beginner-12",
          title: "Dự án: Quản lý sinh viên",
          description: "Xây dựng ứng dụng quản lý sinh viên đơn giản.",
        },
      )
    } else if (levelId === "intermediate") {
      lessons.push(
        {
          id: "cpp-intermediate-1",
          title: "Lập trình hướng đối tượng",
          description: "Tạo class và object trong C++.",
        },
        {
          id: "cpp-intermediate-2",
          title: "Kế thừa",
          description: "Hiểu về kế thừa trong C++.",
        },
        {
          id: "cpp-intermediate-3",
          title: "Đa hình",
          description: "Hiểu về đa hình trong C++.",
        },
        {
          id: "cpp-intermediate-4",
          title: "Overloading",
          description: "Function overloading và operator overloading trong C++.",
        },
        {
          id: "cpp-intermediate-5",
          title: "Xử lý ngoại lệ",
          description: "Xử lý lỗi với try/catch trong C++.",
        },
        {
          id: "cpp-intermediate-6",
          title: "Templates",
          description: "Sử dụng templates để viết code tổng quát.",
        },
        {
          id: "cpp-intermediate-7",
          title: "STL Containers",
          description: "Sử dụng vector, list, map và các container khác.",
        },
        {
          id: "cpp-intermediate-8",
          title: "STL Algorithms",
          description: "Sử dụng các thuật toán có sẵn trong STL.",
        },
        {
          id: "cpp-intermediate-9",
          title: "Smart Pointers",
          description: "Quản lý bộ nhớ với smart pointers.",
        },
        {
          id: "cpp-intermediate-10",
          title: "Lambda Expressions",
          description: "Sử dụng lambda expressions trong C++.",
        },
        {
          id: "cpp-intermediate-11",
          title: "Move Semantics",
          description: "Tối ưu hiệu suất với move semantics.",
        },
        {
          id: "cpp-intermediate-12",
          title: "Dự án: Game Snake",
          description: "Xây dựng game rắn săn mồi đơn giản.",
        },
      )
    } else if (levelId === "advanced") {
      lessons.push(
        {
          id: "cpp-advanced-1",
          title: "Multithreading",
          description: "Lập trình đa luồng với std::thread.",
        },
        {
          id: "cpp-advanced-2",
          title: "Concurrency",
          description: "Đồng bộ hóa với mutex, condition variables.",
        },
        {
          id: "cpp-advanced-3",
          title: "Design Patterns",
          description: "Các mẫu thiết kế phổ biến trong C++.",
        },
        {
          id: "cpp-advanced-4",
          title: "Memory Management",
          description: "Quản lý bộ nhớ nâng cao và tránh memory leaks.",
        },
        {
          id: "cpp-advanced-5",
          title: "RAII",
          description: "Resource Acquisition Is Initialization pattern.",
        },
        {
          id: "cpp-advanced-6",
          title: "Template Metaprogramming",
          description: "Lập trình meta với templates.",
        },
        {
          id: "cpp-advanced-7",
          title: "Modern C++ Features",
          description: "Các tính năng mới trong C++11/14/17/20.",
        },
        {
          id: "cpp-advanced-8",
          title: "Performance Optimization",
          description: "Tối ưu hiệu suất cho ứng dụng C++.",
        },
        {
          id: "cpp-advanced-9",
          title: "Testing",
          description: "Viết unit test cho C++ với Google Test.",
        },
        {
          id: "cpp-advanced-10",
          title: "Networking",
          description: "Lập trình mạng với C++.",
        },
        {
          id: "cpp-advanced-11",
          title: "GUI Programming",
          description: "Tạo giao diện người dùng với Qt hoặc wxWidgets.",
        },
        {
          id: "cpp-advanced-12",
          title: "Dự án: Game Engine",
          description: "Xây dựng một game engine đơn giản.",
        },
      )
    }
  } else if (languageId === "csharp") {
    if (levelId === "beginner") {
      lessons.push(
        {
          id: "csharp-beginner-1",
          title: "Giới thiệu C#",
          description: "Tìm hiểu về ngôn ngữ C# và .NET Framework.",
        },
        {
          id: "csharp-beginner-2",
          title: "Biến và kiểu dữ liệu",
          description: "Khai báo biến và các kiểu dữ liệu trong C#.",
        },
        {
          id: "csharp-beginner-3",
          title: "Cấu trúc điều kiện",
          description: "Sử dụng if, else if và else trong C#.",
        },
        {
          id: "csharp-beginner-4",
          title: "Vòng lặp",
          description: "Sử dụng for, while và do-while trong C#.",
        },
        {
          id: "csharp-beginner-5",
          title: "Mảng và Collections",
          description: "Làm việc với mảng và collections trong C#.",
        },
        {
          id: "csharp-beginner-6",
          title: "Phương thức",
          description: "Tạo và sử dụng phương thức trong C#.",
        },
        {
          id: "csharp-beginner-7",
          title: "Xử lý chuỗi",
          description: "Làm việc với chuỗi trong C#.",
        },
        {
          id: "csharp-beginner-8",
          title: "Xử lý ngoại lệ",
          description: "Xử lý lỗi với try/catch/finally.",
        },
        {
          id: "csharp-beginner-9",
          title: "Lập trình hướng đối tượng cơ bản",
          description: "Tạo class và object trong C#.",
        },
        {
          id: "csharp-beginner-10",
          title: "Properties",
          description: "Sử dụng properties để truy cập dữ liệu.",
        },
        {
          id: "csharp-beginner-11",
          title: "File I/O",
          description: "Đọc và ghi file trong C#.",
        },
        {
          id: "csharp-beginner-12",
          title: "Dự án: Quản lý thư viện",
          description: "Xây dựng ứng dụng quản lý thư viện đơn giản.",
        },
      )
    } else if (levelId === "intermediate") {
      lessons.push(
        {
          id: "csharp-intermediate-1",
          title: "Kế thừa",
          description: "Hiểu về kế thừa trong C#.",
        },
        {
          id: "csharp-intermediate-2",
          title: "Đa hình",
          description: "Hiểu về đa hình trong C#.",
        },
        {
          id: "csharp-intermediate-3",
          title: "Interfaces",
          description: "Tạo và sử dụng interfaces.",
        },
        {
          id: "csharp-intermediate-4",
          title: "Generics",
          description: "Sử dụng generics để viết code tổng quát.",
        },
        {
          id: "csharp-intermediate-5",
          title: "Delegates và Events",
          description: "Sử dụng delegates và events trong C#.",
        },
        {
          id: "csharp-intermediate-6",
          title: "LINQ",
          description: "Truy vấn dữ liệu với LINQ.",
        },
        {
          id: "csharp-intermediate-7",
          title: "Async/Await",
          description: "Lập trình bất đồng bộ trong C#.",
        },
        {
          id: "csharp-intermediate-8",
          title: "Lambda Expressions",
          description: "Sử dụng lambda expressions và anonymous methods.",
        },
        {
          id: "csharp-intermediate-9",
          title: "Extension Methods",
          description: "Mở rộng chức năng của các class có sẵn.",
        },
        {
          id: "csharp-intermediate-10",
          title: "Collections nâng cao",
          description: "Sử dụng các collection đặc biệt như Dictionary, HashSet.",
        },
        {
          id: "csharp-intermediate-11",
          title: "Serialization",
          description: "Chuyển đổi object thành các định dạng như JSON, XML.",
        },
        {
          id: "csharp-intermediate-12",
          title: "Dự án: Ứng dụng Chat",
          description: "Xây dựng ứng dụng chat đơn giản.",
        },
      )
    } else if (levelId === "advanced") {
      lessons.push(
        {
          id: "csharp-advanced-1",
          title: "Reflection",
          description: "Sử dụng reflection để kiểm tra metadata.",
        },
        {
          id: "csharp-advanced-2",
          title: "Dependency Injection",
          description: "Thiết kế ứng dụng với dependency injection.",
        },
        {
          id: "csharp-advanced-3",
          title: "Entity Framework",
          description: "Làm việc với cơ sở dữ liệu qua Entity Framework.",
        },
        {
          id: "csharp-advanced-4",
          title: "Parallel Programming",
          description: "Lập trình song song trong C#.",
        },
        {
          id: "csharp-advanced-5",
          title: "Design Patterns",
          description: "Các mẫu thiết kế phổ biến trong C#.",
        },
        {
          id: "csharp-advanced-6",
          title: "Microservices",
          description: "Xây dựng ứng dụng với kiến trúc microservices.",
        },
        {
          id: "csharp-advanced-7",
          title: "ASP.NET Core",
          description: "Phát triển web với ASP.NET Core.",
        },
        {
          id: "csharp-advanced-8",
          title: "SignalR",
          description: "Xây dựng ứng dụng real-time với SignalR.",
        },
        {
          id: "csharp-advanced-9",
          title: "Unit Testing",
          description: "Viết unit test với xUnit hoặc NUnit.",
        },
        {
          id: "csharp-advanced-10",
          title: "Performance Optimization",
          description: "Tối ưu hiệu suất cho ứng dụng C#.",
        },
        {
          id: "csharp-advanced-11",
          title: "Security Best Practices",
          description: "Bảo mật cho ứng dụng .NET.",
        },
        {
          id: "csharp-advanced-12",
          title: "Dự án: E-commerce Platform",
          description: "Xây dựng nền tảng thương mại điện tử.",
        },
      )
    }
  }

  return lessons
}

// Get lesson by ID
export const getLessonById = (languageId: string, levelId: string, lessonId: string) => {
  // This function simulates AI-generated content for a specific lesson
  // In a real app, this could call an API or use a more sophisticated algorithm

  // First check if the lesson exists in our generated lessons
  const lessons = generateLessons(languageId, levelId)
  const lessonExists = lessons.some((lesson) => lesson.id === lessonId)

  if (!lessonExists) return null

  // Generate lesson content based on ID
  // This is where the "AI" part would happen in a real app

  // For Python Beginner Lesson 1
  if (lessonId === "python-beginner-1") {
    return {
      id: lessonId,
      title: "Giới thiệu Python",
      theorySection: {
        content: `
          <p>Python là một ngôn ngữ lập trình cấp cao, dễ đọc và dễ học. Nó được tạo ra bởi Guido van Rossum và phát hành lần đầu vào năm 1991.</p>
          <p>Python có cú pháp rõ ràng và đơn giản, giúp người mới học dễ dàng tiếp cận. Đây là một ngôn ngữ đa năng, có thể được sử dụng để:</p>
          <ul>
            <li>Phát triển web (Django, Flask)</li>
            <li>Phân tích dữ liệu (Pandas, NumPy)</li>
            <li>Trí tuệ nhân tạo và học máy (TensorFlow, PyTorch)</li>
            <li>Tự động hóa và scripting</li>
          </ul>
          <p>Python sử dụng indentation (thụt lề) để xác định các khối code, thay vì dùng dấu ngoặc nhọn như nhiều ngôn ngữ khác.</p>
          <p>Python là một ngôn ngữ thông dịch (interpreted), nghĩa là code được thực thi trực tiếp mà không cần biên dịch trước. Điều này giúp quá trình phát triển nhanh hơn và dễ dàng hơn.</p>
          <p>Python cũng là một ngôn ngữ đa nền tảng, có thể chạy trên Windows, macOS, Linux và nhiều hệ điều hành khác.</p>
        `,
        example: `# Đây là chương trình Python đầu tiên
print("Hello, World!")

# Biến trong Python
name = "DevQuest"
age = 1
print(f"Chào mừng đến với {name}!")
print(f"{name} đã ra mắt được {age} năm.")

# Tính toán đơn giản
a = 5
b = 3
sum = a + b
difference = a - b
product = a * b
quotient = a / b

print(f"{a} + {b} = {sum}")
print(f"{a} - {b} = {difference}")
print(f"{a} * {b} = {product}")
print(f"{a} / {b} = {quotient}")`,
      },
      practiceSection: {
        instructions:
          'Hãy viết một chương trình Python in ra "Tôi đang học Python với DevQuest!" và tính tổng của 5 + 10, sau đó in kết quả.',
        initialCode: "# Viết code của bạn ở đây\n\n",
        expectedOutput: "Tôi đang học Python với DevQuest!\n15",
        keywords: ["print", "5 + 10", "Tôi đang học Python"],
        hint: "Sử dụng hàm print() để in ra chuỗi và kết quả phép tính. Bạn có thể sử dụng nhiều lệnh print() hoặc kết hợp chúng. Để xuống dòng giữa hai kết quả, hãy sử dụng hai lệnh print() riêng biệt.",
      },
      quizSection: {
        questions: [
          {
            text: "Python sử dụng gì để xác định các khối code?",
            options: ["Dấu ngoặc nhọn {}", "Dấu ngoặc đơn ()", "Thụt lề (indentation)", "Dấu chấm phẩy ;"],
            correctAnswer: 2,
          },
          {
            text: "Ai là người tạo ra ngôn ngữ Python?",
            options: ["Guido van Rossum", "James Gosling", "Bjarne Stroustrup", "Brendan Eich"],
            correctAnswer: 0,
          },
          {
            text: "Python thường được sử dụng trong lĩnh vực nào sau đây?",
            options: [
              "Phát triển game mobile",
              "Phân tích dữ liệu và học máy",
              "Phát triển ứng dụng iOS",
              "Lập trình nhúng",
            ],
            correctAnswer: 1,
          },
          {
            text: "Python là ngôn ngữ lập trình thuộc loại nào?",
            options: ["Biên dịch (compiled)", "Thông dịch (interpreted)", "Cả hai", "Không phải ngôn ngữ lập trình"],
            correctAnswer: 1,
          },
          {
            text: "Đâu là cách khai báo biến đúng trong Python?",
            options: ["var name = 'John';", "string name = 'John';", "name = 'John'", "dim name as string = 'John'"],
            correctAnswer: 2,
          },
        ],
      },
    }
  }

  // For Python Beginner Lesson 2
  if (lessonId === "python-beginner-2") {
    return {
      id: lessonId,
      title: "Biến và kiểu dữ liệu",
      theorySection: {
        content: `
          <p>Trong Python, biến được sử dụng để lưu trữ dữ liệu. Không giống như một số ngôn ngữ khác, Python không yêu cầu khai báo kiểu dữ liệu khi tạo biến.</p>
          <p>Các kiểu dữ liệu cơ bản trong Python bao gồm:</p>
          <ul>
            <li><strong>int</strong>: Số nguyên (ví dụ: 1, 100, -10)</li>
            <li><strong>float</strong>: Số thực (ví dụ: 3.14, -0.001)</li>
            <li><strong>str</strong>: Chuỗi ký tự (ví dụ: "Hello", 'Python')</li>
            <li><strong>bool</strong>: Giá trị logic (True hoặc False)</li>
            <li><strong>list</strong>: Danh sách các phần tử (ví dụ: [1, 2, 3])</li>
            <li><strong>tuple</strong>: Danh sách bất biến (ví dụ: (1, 2, 3))</li>
            <li><strong>dict</strong>: Từ điển (ví dụ: {"name": "John", "age": 30})</li>
          </ul>
          <p>Để gán giá trị cho biến, bạn sử dụng dấu bằng (=):</p>
          <p>Python là ngôn ngữ có kiểu dữ liệu động (dynamically typed), nghĩa là kiểu dữ liệu của biến được xác định tại thời điểm chạy và có thể thay đổi trong quá trình thực thi chương trình.</p>
          <p>Bạn có thể kiểm tra kiểu dữ liệu của một biến bằng hàm <code>type()</code>.</p>
          <p>Để chuyển đổi giữa các kiểu dữ liệu, Python cung cấp các hàm như <code>int()</code>, <code>float()</code>, <code>str()</code>, <code>bool()</code>, v.v.</p>
        `,
        example: `# Khai báo biến và gán giá trị
name = "Python"  # Biến kiểu str
age = 30         # Biến kiểu int
pi = 3.14159     # Biến kiểu float
is_fun = True    # Biến kiểu bool

# Kiểm tra kiểu dữ liệu
print(type(name))    # <class 'str'>
print(type(age))     # <class 'int'>
print(type(pi))      # <class 'float'>
print(type(is_fun))  # <class 'bool'>

# Chuyển đổi kiểu dữ liệu
age_str = str(age)   # Chuyển số thành chuỗi
print("Tôi là " + name + " và tôi " + age_str + " tuổi.")

# Các kiểu dữ liệu phức tạp hơn
my_list = [1, 2, 3, 4, 5]  # List
my_tuple = (1, 2, 3)       # Tuple
my_dict = {"name": "Alice", "age": 25}  # Dictionary

print(my_list)
print(my_tuple)
print(my_dict)

# Nhập dữ liệu từ người dùng
# user_input = input("Nhập một số: ")  # input() luôn trả về chuỗi
# number = int(user_input)  # Chuyển chuỗi thành số nguyên`,
      },
      practiceSection: {
        instructions:
          "Hãy viết một chương trình Python khai báo các biến sau:\n1. Một biến tên 'name' với giá trị là tên của bạn\n2. Một biến tên 'age' với giá trị là tuổi của bạn\n3. Một biến tên 'is_student' với giá trị True hoặc False\n\nSau đó, in ra một câu giới thiệu về bản thân sử dụng các biến trên.",
        initialCode: "# Viết code của bạn ở đây\n\n",
        expectedOutput: "Tôi tên là [tên của bạn], tôi [tuổi của bạn] tuổi và tôi [là/không phải là] sinh viên.",
        keywords: ["name", "age", "is_student", "print"],
        hint: "Sử dụng biến name, age và is_student để lưu thông tin. Sau đó sử dụng f-string hoặc phép nối chuỗi để tạo câu giới thiệu. Ví dụ: print(f\"Tôi tên là {name}, tôi {age} tuổi và tôi {'là' if is_student else 'không phải là'} sinh viên.\")",
      },
      quizSection: {
        questions: [
          {
            text: "Kiểu dữ liệu nào được sử dụng để lưu trữ số thực trong Python?",
            options: ["int", "float", "double", "decimal"],
            correctAnswer: 1,
          },
          {
            text: "Đâu là cách đúng để khai báo biến trong Python?",
            options: ["var name = 'John';", "string name = 'John';", "name = 'John'", "dim name as string = 'John'"],
            correctAnswer: 2,
          },
          {
            text: "Hàm nào được sử dụng để kiểm tra kiểu dữ liệu của một biến trong Python?",
            options: ["typeof()", "typeOf()", "type()", "datatype()"],
            correctAnswer: 2,
          },
          {
            text: "Kiểu dữ liệu nào sau đây là bất biến (immutable) trong Python?",
            options: ["list", "dictionary", "set", "tuple"],
            correctAnswer: 3,
          },
          {
            text: "Hàm input() trong Python trả về kiểu dữ liệu gì?",
            options: ["int", "float", "str", "Tùy thuộc vào đầu vào của người dùng"],
            correctAnswer: 2,
          },
        ],
      },
    }
  }

  // For JavaScript Beginner Lesson 1
  if (lessonId === "javascript-beginner-1") {
    return {
      id: lessonId,
      title: "Giới thiệu JavaScript",
      theorySection: {
        content: `
          <p>JavaScript là ngôn ngữ lập trình phổ biến nhất của web. Ban đầu được tạo ra để làm cho các trang web trở nên tương tác, ngày nay JavaScript có thể chạy trên cả máy chủ và nhiều môi trường khác.</p>
          <p>JavaScript là một ngôn ngữ:</p>
          <ul>
            <li>Động (dynamic): kiểu dữ liệu của biến có thể thay đổi</li>
            <li>Thông dịch (interpreted): không cần biên dịch trước khi chạy</li>
            <li>Hướng đối tượng dựa trên prototype</li>
          </ul>
          <p>JavaScript thường được sử dụng cùng với HTML và CSS để tạo ra các trang web tương tác và ứng dụng web.</p>
          <p>JavaScript không liên quan đến Java mặc dù có tên tương tự. Chúng là hai ngôn ngữ hoàn toàn khác nhau.</p>
          <p>Trong JavaScript hiện đại, chúng ta sử dụng <code>let</code> và <code>const</code> để khai báo biến thay vì <code>var</code>.</p>
          <p>JavaScript có thể được nhúng trực tiếp vào HTML hoặc được tải từ các file .js riêng biệt.</p>
        `,
        example: `// Đây là chương trình JavaScript đầu tiên
console.log("Hello, World!");

// Biến trong JavaScript
let name = "DevQuest";
const age = 1;
console.log(\`Chào mừng đến với \${name}!\`);
console.log(\`\${name} đã ra mắt được \${age} năm.\`);

// Các kiểu dữ liệu cơ bản
let myString = "Đây là một chuỗi";
let myNumber = 42;
let myBoolean = true;
let myNull = null;
let myUndefined = undefined;
let myObject = { name: "John", age: 30 };
let myArray = [1, 2, 3, 4, 5];

// Tính toán đơn giản
let a = 10;
let b = 5;
console.log(\`\${a} + \${b} = \${a + b}\`);
console.log(\`\${a} - \${b} = \${a - b}\`);
console.log(\`\${a} * \${b} = \${a * b}\`);
console.log(\`\${a} / \${b} = \${a / b}\`);`,
      },
      practiceSection: {
        instructions:
          'Hãy viết một chương trình JavaScript in ra "Tôi đang học JavaScript với DevQuest!" và tính tổng của 10 + 20, sau đó in kết quả.',
        initialCode: "// Viết code của bạn ở đây\n\n",
        expectedOutput: "Tôi đang học JavaScript với DevQuest!\n30",
        keywords: ["console.log", "10 + 20", "Tôi đang học JavaScript"],
        hint: "Sử dụng hàm console.log() để in ra chuỗi và kết quả phép tính. Bạn có thể sử dụng nhiều lệnh console.log() hoặc kết hợp chúng. Để xuống dòng giữa hai kết quả, hãy sử dụng hai lệnh console.log() riêng biệt.",
      },
      quizSection: {
        questions: [
          {
            text: "JavaScript chủ yếu được sử dụng để làm gì?",
            options: [
              "Tạo cơ sở dữ liệu",
              "Tạo tính năng tương tác cho trang web",
              "Thiết kế giao diện người dùng",
              "Lập trình hệ điều hành",
            ],
            correctAnswer: 1,
          },
          {
            text: "Đâu là cách khai báo biến trong JavaScript hiện đại?",
            options: [
              'var name = "DevQuest";',
              'let name = "DevQuest";',
              'string name = "DevQuest";',
              'variable name = "DevQuest";',
            ],
            correctAnswer: 1,
          },
          {
            text: "JavaScript là ngôn ngữ lập trình thuộc loại nào?",
            options: ["Biên dịch (compiled)", "Thông dịch (interpreted)", "Cả hai", "Không phải ngôn ngữ lập trình"],
            correctAnswer: 1,
          },
          {
            text: "JavaScript và Java có mối quan hệ như thế nào?",
            options: [
              "JavaScript là phiên bản đơn giản hóa của Java",
              "JavaScript là phiên bản nâng cao của Java",
              "JavaScript và Java là hai ngôn ngữ hoàn toàn khác nhau",
              "JavaScript là một framework của Java",
            ],
            correctAnswer: 2,
          },
          {
            text: "Đâu là cách đúng để tạo một chuỗi trong JavaScript?",
            options: ['"Hello World"', "'Hello World'", "`Hello World`", "Tất cả đều đúng"],
            correctAnswer: 3,
          },
        ],
      },
    }
  }

  // For C++ Beginner Lesson 1
  if (lessonId === "cpp-beginner-1") {
    return {
      id: lessonId,
      title: "Giới thiệu C++",
      theorySection: {
        content: `
          <p>C++ là một ngôn ngữ lập trình mạnh mẽ được phát triển bởi Bjarne Stroustrup vào năm 1979. C++ là phiên bản mở rộng của ngôn ngữ C, bổ sung thêm các tính năng hướng đối tượng.</p>
          <p>C++ được sử dụng rộng rãi trong:</p>
          <ul>
            <li>Phát triển hệ thống (hệ điều hành, trình biên dịch)</li>
            <li>Phát triển game</li>
            <li>Ứng dụng đòi hỏi hiệu suất cao</li>
            <li>Phần mềm nhúng</li>
          </ul>
          <p>C++ là ngôn ngữ biên dịch, nghĩa là code phải được biên dịch thành mã máy trước khi chạy.</p>
          <p>C++ kết hợp lập trình cấp thấp (như C) với các tính năng cấp cao như lập trình hướng đối tượng, lập trình tổng quát (generic programming), và xử lý ngoại lệ.</p>
          <p>C++ cung cấp quyền kiểm soát trực tiếp đối với phần cứng và bộ nhớ, điều này làm cho nó trở thành lựa chọn tốt cho các ứng dụng yêu cầu hiệu suất cao.</p>
        `,
        example: `// Đây là chương trình C++ đầu tiên
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    
    // Biến trong C++
    string name = "DevQuest";
    int age = 1;
    cout << "Chào mừng đến với " << name << "!" << endl;
    cout << name << " đã ra mắt được " << age << " năm." << endl;
    
    // Các kiểu dữ liệu cơ bản
    int myInt = 42;
    float myFloat = 3.14f;
    double myDouble = 3.14159;
    char myChar = 'A';
    bool myBool = true;
    
    // Tính toán đơn giản
    int a = 10;
    int b = 5;
    cout << a << " + " << b << " = " << a + b << endl;
    cout << a << " - " << b << " = " << a - b << endl;
    cout << a << " * " << b << " = " << a * b << endl;
    cout << a << " / " << b << " = " << a / b << endl;
    
    return 0;
}`,
      },
      practiceSection: {
        instructions:
          'Hãy viết một chương trình C++ in ra "Tôi đang học C++ với DevQuest!" và tính tổng của 15 + 25, sau đó in kết quả.',
        initialCode: `#include <iostream>
using namespace std;

int main() {
    // Viết code của bạn ở đây
    
    return 0;
}`,
        expectedOutput: "Tôi đang học C++ với DevQuest!\n40",
        keywords: ["cout", "15 + 25", "Tôi đang học C++"],
        hint: 'Sử dụng cout để in ra chuỗi và kết quả phép tính. Đừng quên sử dụng endl để xuống dòng. Ví dụ: cout << "Tôi đang học C++ với DevQuest!" << endl; cout << 15 + 25 << endl;',
      },
      quizSection: {
        questions: [
          {
            text: "Ai là người phát triển ngôn ngữ C++?",
            options: ["Dennis Ritchie", "Bjarne Stroustrup", "James Gosling", "Guido van Rossum"],
            correctAnswer: 1,
          },
          {
            text: "C++ là ngôn ngữ lập trình thuộc loại nào?",
            options: ["Thông dịch (interpreted)", "Biên dịch (compiled)", "Cả hai", "Không phải ngôn ngữ lập trình"],
            correctAnswer: 1,
          },
          {
            text: "Đâu là thư viện chuẩn để xuất dữ liệu trong C++?",
            options: ["<stdio.h>", "<iostream>", "<output>", "<console>"],
            correctAnswer: 1,
          },
          {
            text: "C++ được sử dụng phổ biến trong lĩnh vực nào?",
            options: [
              "Phát triển web",
              "Phát triển game và ứng dụng hiệu suất cao",
              "Phát triển ứng dụng di động",
              "Phân tích dữ liệu",
            ],
            correctAnswer: 1,
          },
          {
            text: "Đâu là cách đúng để khai báo biến số nguyên trong C++?",
            options: ["integer x = 5;", "int x = 5;", "var x = 5;", "x = 5;"],
            correctAnswer: 1,
          },
        ],
      },
    }
  }

  // For C# Beginner Lesson 1
  if (lessonId === "csharp-beginner-1") {
    return {
      id: lessonId,
      title: "Giới thiệu C#",
      theorySection: {
        content: `
          <p>C# (đọc là "C Sharp") là một ngôn ngữ lập trình hiện đại, hướng đối tượng được phát triển bởi Microsoft. C# được thiết kế để làm việc với nền tảng .NET Framework.</p>
          <p>C# thường được sử dụng để phát triển:</p>
          <ul>
            <li>Ứng dụng Windows</li>
            <li>Ứng dụng web với ASP.NET</li>
            <li>Game với Unity</li>
            <li>Ứng dụng di động với Xamarin</li>
          </ul>
          <p>C# kết hợp tính năng của C++ và Java, cung cấp một ngôn ngữ mạnh mẽ và linh hoạt.</p>
          <p>C# là một ngôn ngữ biên dịch, nhưng khác với C++, nó được biên dịch thành mã trung gian (IL - Intermediate Language) trước khi được thực thi bởi Common Language Runtime (CLR).</p>
          <p>C# cung cấp nhiều tính năng hiện đại như garbage collection, type safety, và hỗ trợ lập trình bất đồng bộ.</p>
        `,
        example: `// Đây là chương trình C# đầu tiên
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello, World!");
        
        // Biến trong C#
        string name = "DevQuest";
        int age = 1;
        Console.WriteLine($"Chào mừng đến với {name}!");
        Console.WriteLine($"{name} đã ra mắt được {age} năm.");
        
        // Các kiểu dữ liệu cơ bản
        int myInt = 42;
        float myFloat = 3.14f;
        double myDouble = 3.14159;
        char myChar = 'A';
        bool myBool = true;
        
        // Tính toán đơn giản
        int a = 10;
        int b = 5;
        Console.WriteLine($"{a} + {b} = {a + b}");
        Console.WriteLine($"{a} - {b} = {a - b}");
        Console.WriteLine($"{a} * {b} = {a * b}");
        Console.WriteLine($"{a} / {b} = {a / b}");
    }
}`,
      },
      practiceSection: {
        instructions:
          'Hãy viết một chương trình C# in ra "Tôi đang học C# với DevQuest!" và tính tổng của 30 + 40, sau đó in kết quả.',
        initialCode: `using System;

class Program
{
    static void Main()
    {
        // Viết code của bạn ở đây
        
    }
}`,
        expectedOutput: "Tôi đang học C# với DevQuest!\n70",
        keywords: ["Console.WriteLine", "30 + 40", "Tôi đang học C#"],
        hint: 'Sử dụng Console.WriteLine() để in ra chuỗi và kết quả phép tính. Ví dụ: Console.WriteLine("Tôi đang học C# với DevQuest!"); Console.WriteLine(30 + 40);',
      },
      quizSection: {
        questions: [
          {
            text: "C# được phát triển bởi công ty nào?",
            options: ["Apple", "Google", "Microsoft", "Oracle"],
            correctAnswer: 2,
          },
          {
            text: "C# thường được sử dụng với nền tảng nào?",
            options: [".NET Framework", "JVM", "Node.js", "Android SDK"],
            correctAnswer: 0,
          },
          {
            text: "Đâu là cách in dữ liệu ra màn hình trong C#?",
            options: ["print()", "System.out.println()", "Console.WriteLine()", "cout <<"],
            correctAnswer: 2,
          },
          {
            text: "C# được sử dụng phổ biến trong lĩnh vực nào?",
            options: [
              "Phát triển ứng dụng Windows và game Unity",
              "Phát triển ứng dụng iOS",
              "Phát triển hệ điều hành",
              "Phân tích dữ liệu",
            ],
            correctAnswer: 0,
          },
          {
            text: "C# là ngôn ngữ lập trình thuộc loại nào?",
            options: [
              "Thông dịch (interpreted)",
              "Biên dịch (compiled) thành mã máy trực tiếp",
              "Biên dịch thành mã trung gian và thực thi bởi CLR",
              "Kịch bản (scripting)",
            ],
            correctAnswer: 2,
          },
        ],
      },
    }
  }

  // Default lesson template for other lessons
  return {
    id: lessonId,
    title: `Bài học ${lessonId}`,
    theorySection: {
      content: `
        <p>Đây là nội dung lý thuyết cho bài học ${lessonId}.</p>
        <p>Trong một ứng dụng thực tế, nội dung này sẽ được tạo tự động bởi AI dựa trên ngôn ngữ ${languageId} và cấp độ ${levelId}.</p>
      `,
      example: `// Đây là ví dụ code cho bài học ${lessonId}
// Trong một ứng dụng thực tế, ví dụ này sẽ được tạo tự động bởi AI
// dựa trên ngôn ngữ ${languageId} và cấp độ ${levelId}.`,
    },
    practiceSection: {
      instructions: `Đây là hướng dẫn thực hành cho bài học ${lessonId}. Hãy viết một chương trình đơn giản.`,
      initialCode: `// Viết code của bạn ở đây
// Trong một ứng dụng thực tế, code mẫu này sẽ được tạo tự động bởi AI
// dựa trên ngôn ngữ ${languageId} và cấp độ ${levelId}.`,
      expectedOutput: "Kết quả mong đợi",
      keywords: ["keyword1", "keyword2", "keyword3"],
      hint: "Đây là gợi ý khi người dùng gặp khó khăn.",
    },
    quizSection: {
      questions: [
        {
          text: `Câu hỏi 1 cho bài học ${lessonId}?`,
          options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
          correctAnswer: 0,
        },
        {
          text: `Câu hỏi 2 cho bài học ${lessonId}?`,
          options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
          correctAnswer: 1,
        },
      ],
    },
  }
}
