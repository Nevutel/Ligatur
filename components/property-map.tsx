"use client"

import { useEffect, useRef, useState } from 'react'
import { MapPin, Navigation, Car, Train, Bike } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface PropertyMapProps {
  address: string
  latitude?: number
  longitude?: number
  className?: string
}

interface TransportationScores {
  walkScore: number
  transitScore: number
  bikeScore: number
}

export function PropertyMap({ address, latitude, longitude, className }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [scores, setScores] = useState<TransportationScores>({
    walkScore: 0,
    transitScore: 0,
    bikeScore: 0
  })
  const [nearbyPlaces, setNearbyPlaces] = useState<google.maps.places.PlaceResult[]>([])

  // Mock implementation since we need Google Maps API key
  useEffect(() => {
    // Mock transportation scores (in real implementation, these would come from Walk Score API)
    setScores({
      walkScore: Math.floor(Math.random() * 40) + 60, // 60-100 for demonstration
      transitScore: Math.floor(Math.random() * 30) + 50, // 50-80
      bikeScore: Math.floor(Math.random() * 35) + 45 // 45-80
    })

    // Mock nearby places
    setNearbyPlaces([
      { name: 'Central Park', types: ['park'], rating: 4.8 },
      { name: 'Metro Station', types: ['transit_station'], rating: 4.2 },
      { name: 'Whole Foods Market', types: ['grocery_or_supermarket'], rating: 4.5 },
      { name: 'Roosevelt Hospital', types: ['hospital'], rating: 4.3 },
      { name: 'Lincoln Elementary', types: ['school'], rating: 4.7 }
    ])
  }, [address])

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getScoreText = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    return 'Fair'
  }

  return (
    <div className={className}>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            Location & Neighborhood
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Map Placeholder */}
          <div className="w-full h-64 bg-slate-100 rounded-lg flex items-center justify-center border">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-600 font-medium">{address}</p>
              <p className="text-sm text-slate-500 mt-1">Interactive map requires Google Maps API</p>
            </div>
          </div>

          {/* Transportation Scores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Navigation className="h-5 w-5 text-slate-600 mr-2" />
                <span className="font-medium">Walk Score</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getScoreColor(scores.walkScore)}`}></div>
                <span className="text-2xl font-bold">{scores.walkScore}</span>
              </div>
              <p className="text-sm text-slate-600 mt-1">{getScoreText(scores.walkScore)}</p>
            </div>

            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Train className="h-5 w-5 text-slate-600 mr-2" />
                <span className="font-medium">Transit Score</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getScoreColor(scores.transitScore)}`}></div>
                <span className="text-2xl font-bold">{scores.transitScore}</span>
              </div>
              <p className="text-sm text-slate-600 mt-1">{getScoreText(scores.transitScore)}</p>
            </div>

            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Bike className="h-5 w-5 text-slate-600 mr-2" />
                <span className="font-medium">Bike Score</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getScoreColor(scores.bikeScore)}`}></div>
                <span className="text-2xl font-bold">{scores.bikeScore}</span>
              </div>
              <p className="text-sm text-slate-600 mt-1">{getScoreText(scores.bikeScore)}</p>
            </div>
          </div>

          {/* Nearby Places */}
          <div>
            <h4 className="font-semibold mb-3">Nearby Places</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {nearbyPlaces.map((place, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{place.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {place.types?.[0]?.replace(/_/g, ' ')}
                      </Badge>
                      {place.rating && (
                        <span className="text-xs text-slate-600">★ {place.rating}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
