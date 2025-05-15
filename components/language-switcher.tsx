"use client"

import { useState, useEffect, useRef } from "react"
import { Globe, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface LanguageSwitcherProps {
  className?: string
}

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState("vi")
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem("devquest-language")
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage)
    }

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const changeLanguage = (lang: string) => {
    localStorage.setItem("devquest-language", lang)
    setCurrentLanguage(lang)
    setIsOpen(false)

    // In a real app, this would trigger a language change
    // For now, we'll just reload the page
    window.location.reload()
  }

  const languages = [
    { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
    { code: "en", name: "English", flag: "🇬🇧" },
  ]

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        aria-label="Change language"
      >
        <Globe className="h-5 w-5 text-gray-900 dark:text-white" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50"
          >
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className="flex items-center justify-between w-full px-4 py-3 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center">
                  <span className="mr-2 text-lg">{language.flag}</span>
                  <span className={currentLanguage === language.code ? "font-medium" : ""}>{language.name}</span>
                </div>
                {currentLanguage === language.code && <Check className="h-4 w-4 text-gray-900 dark:text-white" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
