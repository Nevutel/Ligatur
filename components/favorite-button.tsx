"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { addToFavorites, removeFromFavorites, isPropertyFavorited } from "@/lib/database"

interface FavoriteButtonProps {
  propertyId: number
  className?: string
}

export function FavoriteButton({ propertyId, className = "" }: FavoriteButtonProps) {
  const { user } = useAuth()
  const [isFavorited, setIsFavorited] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function checkFavoriteStatus() {
      if (!user) return

      try {
        const favorited = await isPropertyFavorited(user.id, propertyId)
        setIsFavorited(favorited)
      } catch (error) {
        console.error("Error checking favorite status:", error)
      }
    }

    checkFavoriteStatus()
  }, [user, propertyId])

  const handleToggleFavorite = async () => {
    if (!user) {
      // Redirect to login or show login modal
      return
    }

    setIsLoading(true)
    try {
      if (isFavorited) {
        await removeFromFavorites(user.id, propertyId)
        setIsFavorited(false)
      } else {
        await addToFavorites(user.id, propertyId)
        setIsFavorited(true)
      }
    } catch (error) {
      console.error("Error toggling favorite:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return null // Or show a disabled heart icon
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={`p-2 ${className}`}
    >
      <Heart className={`h-5 w-5 ${isFavorited ? "fill-red-500 text-red-500" : "text-slate-400 hover:text-red-500"}`} />
    </Button>
  )
}
