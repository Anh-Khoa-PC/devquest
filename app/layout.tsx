import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import Mascot from "@/components/mascot"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DevQuest - Học lập trình miễn phí",
  description: "Nền tảng học lập trình tương tác miễn phí giống Duolingo",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Header />
          {children}
          <Mascot />
        </ThemeProvider>
      </body>
    </html>
  )
}
