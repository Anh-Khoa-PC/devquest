"use client"

import Link from "next/link"
import { ArrowRight, Code, Award, BookOpen, Zap, Trophy, Puzzle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">DevQuest</h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
              Học lập trình miễn phí, tương tác và vui nhộn
            </p>
            <Link
              href="/languages"
              className="inline-flex items-center bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black font-bold py-3 px-6 rounded-full transition-colors duration-200"
            >
              Bắt đầu học ngay
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl shadow-md"
          >
            <div className="bg-gray-200 dark:bg-gray-800 p-3 rounded-full w-fit mb-4">
              <Code className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Đa dạng ngôn ngữ</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Học Python, JavaScript, C++ và C# với lộ trình được thiết kế riêng cho từng ngôn ngữ.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl shadow-md"
          >
            <div className="bg-gray-200 dark:bg-gray-800 p-3 rounded-full w-fit mb-4">
              <BookOpen className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Học tương tác</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Kết hợp lý thuyết, thực hành và quiz để giúp bạn nắm vững kiến thức.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl shadow-md"
          >
            <div className="bg-gray-200 dark:bg-gray-800 p-3 rounded-full w-fit mb-4">
              <Award className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Hệ thống phần thưởng</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Nhận điểm và huy hiệu khi hoàn thành bài học, theo dõi tiến độ dễ dàng.
            </p>
          </motion.div>
        </div>

        {/* New Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">Tính năng mới</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6 rounded-xl shadow-md text-white"
            >
              <div className="bg-white/20 p-3 rounded-full w-fit mb-4">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Thử thách lập trình</h3>
              <p className="text-white/80 mb-4">
                Thử sức với các thử thách lập trình có giới hạn thời gian để nâng cao kỹ năng.
              </p>
              <Link href="/challenges" className="inline-flex items-center text-white hover:text-white/90">
                Khám phá ngay
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-green-500 to-teal-600 p-6 rounded-xl shadow-md text-white"
            >
              <div className="bg-white/20 p-3 rounded-full w-fit mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Chuỗi học tập</h3>
              <p className="text-white/80 mb-4">
                Duy trì thói quen học tập hàng ngày và nhận thưởng cho chuỗi ngày liên tiếp.
              </p>
              <Link href="/profile" className="inline-flex items-center text-white hover:text-white/90">
                Xem chuỗi của bạn
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-xl shadow-md text-white"
            >
              <div className="bg-white/20 p-3 rounded-full w-fit mb-4">
                <Puzzle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Code Playground</h3>
              <p className="text-white/80 mb-4">
                Thử nghiệm code của bạn trong môi trường tương tác, lưu và chia sẻ với bạn bè.
              </p>
              <Link href="/playground" className="inline-flex items-center text-white hover:text-white/90">
                Thử ngay
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-xl shadow-md text-white"
            >
              <div className="bg-white/20 p-3 rounded-full w-fit mb-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Thành tựu</h3>
              <p className="text-white/80 mb-4">
                Mở khóa các thành tựu đặc biệt khi bạn tiến bộ và nhận thêm điểm thưởng.
              </p>
              <Link href="/profile" className="inline-flex items-center text-white hover:text-white/90">
                Xem thành tựu
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl p-8 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold mb-4">Sẵn sàng bắt đầu hành trình lập trình?</h2>
          <p className="mb-6">
            Tham gia cùng hàng nghìn người học khác và bắt đầu hành trình lập trình của bạn ngay hôm nay.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              className="bg-white text-gray-900 hover:bg-gray-200 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
            >
              <Link href="/languages">Bắt đầu học</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white/10 dark:border-gray-900 dark:text-gray-900 dark:hover:bg-gray-900/10"
            >
              <Link href="/challenges">Thử thách lập trình</Link>
            </Button>
          </div>
        </motion.div>

        {/* About Developer */}
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl shadow-md max-w-2xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Về người phát triển</h2>
          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <p>
              <span className="font-semibold">Tên:</span> Nguyễn Võ Anh Khoa
            </p>
            <p>
              <span className="font-semibold">Sinh ngày:</span> 14/6/2011
            </p>
            <p>
              <span className="font-semibold">Nơi ở:</span> TP. Hồ Chí Minh
            </p>
            <p className="mt-4 text-gray-600 dark:text-gray-400 italic">
              Đang học và phát triển DevQuest như một nền tảng giáo dục lập trình miễn phí.
            </p>
            <div className="mt-4">
              <Link href="/about" className="inline-flex items-center text-gray-900 dark:text-white hover:underline">
                Tìm hiểu thêm về người phát triển
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
