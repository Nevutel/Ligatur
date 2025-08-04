"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PropertyMapProps {
  address: string
  title: string
}

export function PropertyMap({ address, title }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadGoogleMaps = async () => {
      // In production, you'd load Google Maps API
      // For now, using a placeholder

      if (!mapRef.current) return

      try {
        // Simulate loading
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Create map placeholder
        const mapContainer = mapRef.current
        mapContainer.innerHTML = `
          <div class="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div class="absolute inset-0 opacity-10">
              <svg viewBox="0 0 100 100" class="w-full h-full">
                <path d="M10,10 Q50,5 90,10 Q95,50 90,90 Q50,95 10,90 Q5,50 10,10" fill="currentColor"/>
              </svg>
            </div>
            <div class="text-center z-10">
              <div class="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                <div class="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div class="font-medium text-slate-700">${title}</div>
              <div class="text-sm text-slate-500 mt-1">${address}</div>
              <div class="text-xs text-slate-400 mt-2">Interactive map coming soon</div>
            </div>
          </div>
        `

        setIsLoaded(true)
      } catch (error) {
        console.error("Error loading map:", error)
      }
    }

    loadGoogleMaps()
  }, [address, title])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Location</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-64 rounded-lg overflow-hidden">
          {!isLoaded && (
            <div className="w-full h-full bg-slate-100 animate-pulse rounded-lg flex items-center justify-center">
              <div className="text-slate-400">Loading map...</div>
            </div>
          )}
          <div ref={mapRef} className={`w-full h-full ${!isLoaded ? "hidden" : ""}`} />
        </div>
        <div className="mt-3 text-sm text-slate-600">📍 {address}</div>
      </CardContent>
    </Card>
  )
}
