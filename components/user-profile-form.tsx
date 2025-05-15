"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Camera, Save, User } from "lucide-react"
import Image from "next/image"

interface UserProfileFormProps {
  onSave: (data: { name: string; avatar: string | null }) => void
  currentLanguage: string
}

export default function UserProfileForm({ onSave, currentLanguage }: UserProfileFormProps) {
  const [name, setName] = useState("")
  const [avatar, setAvatar] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const translations = {
    vi: {
      yourName: "Tên của bạn",
      yourAvatar: "Ảnh đại diện",
      changeAvatar: "Thay đổi ảnh",
      saveChanges: "Lưu thay đổi",
      namePlaceholder: "Nhập tên của bạn",
    },
    en: {
      yourName: "Your Name",
      yourAvatar: "Your Avatar",
      changeAvatar: "Change Avatar",
      saveChanges: "Save Changes",
      namePlaceholder: "Enter your name",
    },
  }

  const t = translations[currentLanguage as keyof typeof translations]

  useEffect(() => {
    // Load user profile from localStorage
    const userProfile = localStorage.getItem("devquest-user-profile")
    if (userProfile) {
      const { name, avatar } = JSON.parse(userProfile)
      setName(name || "")
      setAvatar(avatar || null)
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    const profileData = { name, avatar }
    localStorage.setItem("devquest-user-profile", JSON.stringify(profileData))
    onSave(profileData)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <div className="mb-6">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t.yourName}
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.namePlaceholder}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.yourAvatar}</label>
        <div className="flex items-center">
          <div className="w-24 h-24 relative rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 mr-4">
            {avatar ? (
              <Image src={avatar || "/placeholder.svg"} alt="User Avatar" fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <User className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </div>
          <Button variant="outline" onClick={triggerFileInput} className="flex items-center">
            <Camera className="h-4 w-4 mr-2" />
            {t.changeAvatar}
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            aria-label="Upload avatar"
          />
        </div>
      </div>

      <Button
        onClick={handleSave}
        className="bg-gray-900 hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
      >
        <Save className="h-4 w-4 mr-2" />
        {t.saveChanges}
      </Button>
    </div>
  )
}
