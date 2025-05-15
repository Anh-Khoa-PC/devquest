"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, BookOpen, User, Info, Code, Trophy, Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ThemeToggle from "./theme-toggle"
import LanguageSwitcher from "./language-switcher"

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [points, setPoints] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState("vi")
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    setMounted(true)
    // Set initial window width
    setWindowWidth(window.innerWidth)

    // Add resize listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)

    // Load user points from localStorage
    const userProgress = localStorage.getItem("devquest-progress")
    if (userProgress) {
      const progress = JSON.parse(userProgress)
      setPoints(progress.points || 0)
    }

    // Load language preference
    const savedLanguage = localStorage.getItem("devquest-language")
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage)
    }

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    // Update points when localStorage changes
    const handleStorageChange = () => {
      const userProgress = localStorage.getItem("devquest-progress")
      if (userProgress) {
        const progress = JSON.parse(userProgress)
        setPoints(progress.points || 0)
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Also check for updates every 5 seconds
    const interval = setInterval(() => {
      handleStorageChange()
    }, 5000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navigateToProfile = () => {
    router.push("/profile")
  }

  const translations = {
    vi: {
      home: "Trang chủ",
      learn: "Học tập",
      playground: "Playground",
      challenges: "Thử thách",
      profile: "Hồ sơ",
      about: "Giới thiệu",
      darkMode: "Chế độ tối",
      points: "điểm",
    },
    en: {
      home: "Home",
      learn: "Learn",
      playground: "Playground",
      challenges: "Challenges",
      profile: "Profile",
      about: "About",
      darkMode: "Dark Mode",
      points: "points",
    },
  }

  const t = translations[currentLanguage as keyof typeof translations]
  const isMobile = windowWidth < 768

  return (
    <header className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            DevQuest
          </Link>

          {/* Points display */}
          {pathname !== "/" && mounted && !isMobile && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-semibold"
            >
              {points} {t.points}
            </motion.div>
          )}

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="flex items-center space-x-3">
              <Link
                href="/"
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                <Home className="h-5 w-5" />
              </Link>
              <Link
                href="/languages"
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                <BookOpen className="h-5 w-5" />
              </Link>
              <Link
                href="/playground"
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                <Code className="h-5 w-5" />
              </Link>
              <Link
                href="/challenges"
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                <Trophy className="h-5 w-5" />
              </Link>
              <button
                onClick={navigateToProfile}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                <User className="h-5 w-5" />
              </button>
              <Link
                href="/about"
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                <Info className="h-5 w-5" />
              </Link>
              <ThemeToggle />
              <LanguageSwitcher />
            </nav>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <LanguageSwitcher />
              <button
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && isMobile && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <div className="flex flex-col space-y-1">
                <Link
                  href="/"
                  className="flex items-center py-2 px-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="h-5 w-5 mr-3" />
                  <span>{t.home}</span>
                </Link>
                <Link
                  href="/languages"
                  className="flex items-center py-2 px-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BookOpen className="h-5 w-5 mr-3" />
                  <span>{t.learn}</span>
                </Link>
                <Link
                  href="/playground"
                  className="flex items-center py-2 px-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Code className="h-5 w-5 mr-3" />
                  <span>{t.playground}</span>
                </Link>
                <Link
                  href="/challenges"
                  className="flex items-center py-2 px-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Trophy className="h-5 w-5 mr-3" />
                  <span>{t.challenges}</span>
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center py-2 px-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-3" />
                  <span>{t.profile}</span>
                </Link>
                <Link
                  href="/about"
                  className="flex items-center py-2 px-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Info className="h-5 w-5 mr-3" />
                  <span>{t.about}</span>
                </Link>
                <div className="flex justify-between items-center py-2 px-3">
                  <div className="bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {points} {t.points}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
