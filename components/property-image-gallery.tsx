"use client"

import { useState } from "react"
import { ImageSlideshow } from "./image-slideshow"

interface PropertyImageGalleryProps {
  images: string[]
  title: string
  className?: string
}

export function PropertyImageGallery({ images, title, className = "" }: PropertyImageGalleryProps) {
  const [isSlideShowOpen, setIsSlideShowOpen] = useState(false)
  const [initialSlideIndex, setInitialSlideIndex] = useState(0)

  const openSlideshow = (index = 0) => {
    setInitialSlideIndex(index)
    setIsSlideShowOpen(true)
  }

  const defaultImage =
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  const displayImages = images.length > 0 ? images : [defaultImage]

  return (
    <>
      <div className={`space-y-4 ${className}`}>
        {/* Main Image */}
        <div className="w-full cursor-pointer" onClick={() => openSlideshow(0)}>
          <img
            src={displayImages[0] || "/placeholder.svg"}
            alt={`${title} - Main image`}
            className="w-full h-64 md:h-96 object-cover rounded-lg border hover:opacity-90 transition-opacity"
          />
          {displayImages.length > 1 && (
            <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
              +{displayImages.length - 1} more
            </div>
          )}
        </div>

        {/* Additional Images */}
        {displayImages.length > 1 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {displayImages.slice(1, 7).map((image, index) => (
              <div key={index} className="relative cursor-pointer" onClick={() => openSlideshow(index + 1)}>
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${title} - Image ${index + 2}`}
                  className="w-full h-32 md:h-40 object-cover rounded-lg border hover:opacity-90 transition-opacity"
                />
                {/* Show "+X more" on the last visible image if there are more */}
                {index === 5 && displayImages.length > 7 && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg">
                    <span className="text-white font-semibold">+{displayImages.length - 7} more</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <ImageSlideshow
        images={displayImages}
        title={title}
        isOpen={isSlideShowOpen}
        onClose={() => setIsSlideShowOpen(false)}
        initialIndex={initialSlideIndex}
      />
    </>
  )
}
