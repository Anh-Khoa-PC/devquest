import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Mail, Globe, Facebook } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Quay lại trang chủ
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
            <div className="h-3 bg-gray-900 dark:bg-white"></div>
            <div className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="w-40 h-40 relative rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-800">
                  <Image
                    src="/images/profile.png"
                    alt="Nguyễn Võ Anh Khoa"
                    width={160}
                    height={160}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Nguyễn Võ Anh Khoa</h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Nhà phát triển DevQuest</p>

                  <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
                    <span className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                      Web Developer
                    </span>
                    <span className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                      Student
                    </span>
                    <span className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                      Coding Enthusiast
                    </span>
                  </div>

                  <div className="flex justify-center md:justify-start space-x-4 mb-6">
                    <a
                      href="https://www.facebook.com/anhkhoavnk/?locale=vi_VN"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                    >
                      <Facebook className="h-6 w-6" />
                    </a>
                    <a
                      href="mailto:kanh05113@gmail.com"
                      className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                    >
                      <Mail className="h-6 w-6" />
                    </a>
                    <a
                      href="https://www.facebook.com/anhkhoavnk/?locale=vi_VN"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                    >
                      <Globe className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Về tôi</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    Xin chào! Tôi là Nguyễn Võ Anh Khoa, sinh ngày 14/6/2011, hiện đang sống tại TP. Hồ Chí Minh. Tôi là
                    một học sinh đam mê lập trình và công nghệ.
                  </p>
                  <p>
                    DevQuest là dự án cá nhân của tôi, được tạo ra với mục đích giúp mọi người học lập trình một cách
                    vui vẻ và hiệu quả. Tôi tin rằng việc học lập trình nên được tiếp cận theo cách tương tác và thú vị,
                    giống như cách Duolingo đã làm với việc học ngôn ngữ.
                  </p>
                  <p>
                    Tôi bắt đầu học lập trình từ năm 9 tuổi và đã thử nghiệm với nhiều ngôn ngữ khác nhau. Qua trải
                    nghiệm của mình, tôi nhận thấy rằng việc học theo từng bước nhỏ, kết hợp lý thuyết với thực hành và
                    có phản hồi ngay lập tức là cách hiệu quả nhất để tiến bộ.
                  </p>
                  <p>
                    Bạn có thể liên hệ với tôi qua email <a href="mailto:kanh05113@gmail.com">kanh05113@gmail.com</a>{" "}
                    hoặc thông qua{" "}
                    <a
                      href="https://www.facebook.com/anhkhoavnk/?locale=vi_VN"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Facebook
                    </a>{" "}
                    của tôi.
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Về DevQuest</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    DevQuest là một nền tảng học lập trình tương tác miễn phí, lấy cảm hứng từ phương pháp học ngôn ngữ
                    của Duolingo. Dự án này được tạo ra với mục tiêu giúp người mới bắt đầu có thể tiếp cận với lập
                    trình một cách dễ dàng và thú vị.
                  </p>
                  <p>Các tính năng chính của DevQuest:</p>
                  <ul>
                    <li>Hỗ trợ nhiều ngôn ngữ lập trình: Python, JavaScript, C++ và C#</li>
                    <li>Các cấp độ học tập phù hợp với nhiều đối tượng: Beginner, Intermediate, Advanced</li>
                    <li>Bài học tương tác với lý thuyết, thực hành và quiz</li>
                    <li>Hệ thống điểm thưởng và huy hiệu để tạo động lực học tập</li>
                    <li>Giao diện đơn giản, dễ sử dụng</li>
                    <li>Hỗ trợ đa ngôn ngữ: Tiếng Việt và Tiếng Anh</li>
                    <li>Chế độ sáng/tối tùy chỉnh</li>
                    <li>Code Playground để thực hành và chia sẻ code</li>
                    <li>Thử thách lập trình để nâng cao kỹ năng</li>
                  </ul>
                  <p>
                    DevQuest vẫn đang trong quá trình phát triển và tôi luôn mong muốn nhận được phản hồi để cải thiện
                    nền tảng này. Nếu bạn có bất kỳ ý kiến đóng góp nào, vui lòng liên hệ với tôi qua email hoặc
                    Facebook.
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Kỹ năng</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Ngôn ngữ lập trình</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-700 dark:text-gray-300">Python</span>
                          <span className="text-gray-700 dark:text-gray-300">90%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-gray-800 dark:bg-gray-300 h-2 rounded-full" style={{ width: "90%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-700 dark:text-gray-300">JavaScript</span>
                          <span className="text-gray-700 dark:text-gray-300">85%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-gray-800 dark:bg-gray-300 h-2 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-700 dark:text-gray-300">HTML/CSS</span>
                          <span className="text-gray-700 dark:text-gray-300">95%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-gray-800 dark:bg-gray-300 h-2 rounded-full" style={{ width: "95%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Công nghệ</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-700 dark:text-gray-300">React</span>
                          <span className="text-gray-700 dark:text-gray-300">80%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-gray-800 dark:bg-gray-300 h-2 rounded-full" style={{ width: "80%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-700 dark:text-gray-300">Next.js</span>
                          <span className="text-gray-700 dark:text-gray-300">75%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-gray-800 dark:bg-gray-300 h-2 rounded-full" style={{ width: "75%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-700 dark:text-gray-300">Tailwind CSS</span>
                          <span className="text-gray-700 dark:text-gray-300">90%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-gray-800 dark:bg-gray-300 h-2 rounded-full" style={{ width: "90%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
