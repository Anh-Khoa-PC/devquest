"use client"

import { useState, useEffect } from "react"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"

interface ConfettiEffectProps {
  active: boolean
  duration?: number
}

export default function ConfettiEffect({ active, duration = 3000 }: ConfettiEffectProps) {
  const [isActive, setIsActive] = useState(false)
  const { width, height } = useWindowSize()

  useEffect(() => {
    if (active) {
      setIsActive(true)
      const timer = setTimeout(() => {
        setIsActive(false)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [active, duration])

  if (!isActive) return null

  return (
    <Confetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={500}
      gravity={0.2}
      colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688"]}
    />
  )
}
