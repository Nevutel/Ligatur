"use client"

import { useEffect, useRef, useState } from 'react'
import { MapPin, ExternalLink, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { GoogleMapsSetup } from './google-maps-setup'

interface PropertyMapProps {
  address?: string
  latitude?: number
  longitude?: number
  title?: string
  className?: string
}

declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

export function PropertyMap({ address, latitude, longitude, title, className }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [apiKey, setApiKey] = useState<string>('')
  const [showSetup, setShowSetup] = useState(false)
  const [mapError, setMapError] = useState<string>('')

  useEffect(() => {
    // Check if API key is stored (in a real app, this would be from environment or user settings)
    const storedApiKey = localStorage.getItem('googleMapsApiKey')
    if (storedApiKey) {
      setApiKey(storedApiKey)
    }
  }, [])

  useEffect(() => {
    if (apiKey && mapRef.current && !mapLoaded) {
      loadGoogleMaps()
    }
  }, [apiKey, mapLoaded])

  const loadGoogleMaps = async () => {
    try {
      // Check if Google Maps is already loaded
      if (window.google && window.google.maps) {
        initializeMap()
        return
      }

      // Load Google Maps script
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`
      script.async = true
      script.defer = true

      window.initMap = () => {
        initializeMap()
      }

      script.onerror = () => {
        setMapError('Failed to load Google Maps. Please check your API key.')
      }

      document.head.appendChild(script)
    } catch (error) {
      setMapError('Error loading Google Maps API')
    }
  }

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return

    try {
      const defaultLocation = { lat: 40.7128, lng: -74.0060 } // New York City default
      const mapLocation = latitude && longitude 
        ? { lat: latitude, lng: longitude }
        : defaultLocation

      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 15,
        center: mapLocation,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      })

      // Add marker
      const marker = new window.google.maps.Marker({
        position: mapLocation,
        map: map,
        title: title || 'Property Location',
      })

      // Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px;">
            <h3 style="margin: 0 0 5px 0; font-size: 16px;">${title || 'Property Location'}</h3>
            ${address ? `<p style="margin: 0; color: #666;">${address}</p>` : ''}
          </div>
        `
      })

      marker.addListener('click', () => {
        infoWindow.open(map, marker)
      })

      setMapLoaded(true)
      setMapError('')
    } catch (error) {
      setMapError('Error initializing map')
    }
  }

  const handleApiKeySubmit = (newApiKey: string) => {
    setApiKey(newApiKey)
    localStorage.setItem('googleMapsApiKey', newApiKey)
    setShowSetup(false)
    setMapLoaded(false) // Force reload
  }

  const getGoogleMapsUrl = () => {
    if (address) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    }
    if (latitude && longitude) {
      return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
    }
    return 'https://www.google.com/maps'
  }

  if (showSetup) {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Map Setup
            </CardTitle>
            <Button variant="outline" size="sm" onClick={() => setShowSetup(false)}>
              Back to Map
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <GoogleMapsSetup onApiKeySubmit={handleApiKeySubmit} currentApiKey={apiKey} />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowSetup(true)}>
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={getGoogleMapsUrl()} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {mapError && (
          <Alert className="mb-4">
            <AlertDescription>{mapError}</AlertDescription>
          </Alert>
        )}

        {!apiKey && (
          <Alert className="mb-4">
            <AlertDescription>
              <div className="flex items-center justify-between">
                <span>Google Maps integration requires an API key to display interactive maps.</span>
                <Button size="sm" onClick={() => setShowSetup(true)}>
                  Setup
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {apiKey && !mapLoaded && !mapError && (
          <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p className="text-sm text-slate-600">Loading map...</p>
            </div>
          </div>
        )}

        <div 
          ref={mapRef} 
          className={`w-full h-64 rounded-lg ${!apiKey || mapError ? 'hidden' : ''}`}
        />

        {(!apiKey || mapError) && (
          <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
            <div className="text-center p-6">
              <MapPin className="h-12 w-12 text-slate-400 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-600 mb-2">Interactive Map Not Available</h3>
              <p className="text-sm text-slate-500 mb-4">
                {address || (latitude && longitude) 
                  ? "View this location on Google Maps"
                  : "Location information not available"
                }
              </p>
              {(address || (latitude && longitude)) && (
                <Button variant="outline" size="sm" asChild>
                  <a href={getGoogleMapsUrl()} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in Google Maps
                  </a>
                </Button>
              )}
            </div>
          </div>
        )}

        {address && (
          <div className="mt-4 text-sm text-slate-600">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{address}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
