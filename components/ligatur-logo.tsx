"use client"

import React, { useEffect, useMemo, useState, type CSSProperties } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface LigaturLogoProps {
  className?: string
  fallbackColor?: string
  transitionDuration?: number
  size?: "sm" | "md" | "lg"
}

const LigaturLogo = React.memo(function LigaturLogoComponent({
  className,
  fallbackColor = "#2563eb", // blue-600 to match current theme
  transitionDuration = 800,
  size = "md",
}: LigaturLogoProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [currentGifIndex, setCurrentGifIndex] = useState(0)

  // Curated GIFs that work well for a crypto/real estate brand
  const brandGifs = [
    // Flowing liquid/wave animations (sophisticated, modern)
    "https://media.giphy.com/media/l0HlTy9x8FZo0XO1i/giphy.gif", // Flowing blue liquid
    "https://media.giphy.com/media/3o7TKqm1mNujcBPSpy/giphy.gif", // Golden flowing animation
    "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif", // Abstract flowing pattern
    "https://media.giphy.com/media/l0HlPystfePnAI3G8/giphy.gif", // Gradient wave
    // Subtle particle/tech animations
    "https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif", // Tech particles
    "https://media.giphy.com/media/3o7TKSha4fzrX8Hnz2/giphy.gif", // Digital flow
  ]

  const currentGifUrl = brandGifs[currentGifIndex]

  // Size variants
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl md:text-4xl",
  }

  // Reset states when gif changes
  useEffect(() => {
    setLoaded(false)
    setError(false)
  }, [currentGifUrl])

  // Cycle through GIFs every 8 seconds for variety
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGifIndex((prev) => (prev + 1) % brandGifs.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [brandGifs.length])

  // Memoize className for performance
  const textClassName = useMemo(
    () =>
      cn(
        sizeClasses[size],
        "font-bold",
        loaded && !error ? "text-transparent bg-clip-text" : "",
        className,
        "select-none" // Prevent text selection
      ),
    [size, className, loaded, error]
  )

  // Memoize style for performance
  const textStyle = useMemo(() => {
    const style: CSSProperties = {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      WebkitBackgroundClip: "text",
      lineHeight: 1,
      fontFamily: 'Copperplate, "Copperplate Gothic Light", fantasy',
      color: fallbackColor,
      WebkitTextFillColor: fallbackColor,
      transition: `background-image ${transitionDuration}ms ease-in-out, color ${transitionDuration}ms ease-in-out`,
      textShadow: loaded && !error ? "none" : "0 0 20px rgba(37, 99, 235, 0.3)",
    }

    if (loaded && !error) {
      style.backgroundImage = `url(${currentGifUrl})`
      style.color = "transparent"
      style.WebkitTextFillColor = "transparent"
    }

    return style
  }, [loaded, error, currentGifUrl, transitionDuration, fallbackColor])

  return (
    <div className="relative inline-block">
      {/* Hidden image for preloading */}
      {currentGifUrl && (
        <Image
          src={currentGifUrl}
          alt=""
          width={1}
          height={1}
          className="absolute opacity-0 pointer-events-none"
          onLoad={() => {
            setLoaded(true)
            setError(false)
          }}
          onError={() => {
            setError(true)
            setLoaded(false)
          }}
          priority
          unoptimized // Important for GIFs
        />
      )}
      
      {/* Preload next GIF */}
      {brandGifs[(currentGifIndex + 1) % brandGifs.length] && (
        <Image
          src={brandGifs[(currentGifIndex + 1) % brandGifs.length]}
          alt=""
          width={1}
          height={1}
          className="absolute opacity-0 pointer-events-none"
          unoptimized
        />
      )}
      
      <span className={textClassName} style={textStyle}>
        Ligatur
      </span>
      
      {/* Subtle glow effect when GIF is not loaded */}
      {(!loaded || error) && (
        <span 
          className="absolute inset-0 font-bold select-none pointer-events-none opacity-30 blur-sm"
          style={{
            fontFamily: 'Copperplate, "Copperplate Gothic Light", fantasy',
            color: fallbackColor,
            fontSize: "inherit"
          }}
        >
          Ligatur
        </span>
      )}
    </div>
  )
})

export { LigaturLogo }
