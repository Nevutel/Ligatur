"use client"

import { MapPin, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { GoogleMapsSetup } from '@/components/google-maps-setup'

export default function MapsSetupPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Google Maps Integration</h1>
              <p className="text-slate-600">Configure maps for enhanced property listings</p>
            </div>
          </div>
        </div>

        {/* Main Setup Component */}
        <GoogleMapsSetup 
          onApiKeySubmit={(apiKey) => {
            // Handle API key submission
            localStorage.setItem('googleMapsApiKey', apiKey)
            // You could also show a success message here
          }}
        />
        
        {/* Additional Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              Benefits of Maps Integration
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Interactive property location maps</li>
              <li>• Neighborhood exploration for buyers</li>
              <li>• Street view and satellite imagery</li>
              <li>• Nearby amenities visualization</li>
              <li>• Walking/driving directions</li>
              <li>• Property location verification</li>
            </ul>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Security Best Practices</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Restrict API key to your domain</li>
              <li>• Enable only required APIs (Maps, Places)</li>
              <li>• Set daily usage quotas</li>
              <li>• Monitor usage in Google Cloud Console</li>
              <li>• Regenerate keys if compromised</li>
              <li>• Use environment variables in production</li>
            </ul>
          </div>
        </div>

        {/* Alternative Options */}
        <div className="mt-8 p-6 bg-slate-50 rounded-lg">
          <h3 className="font-semibold mb-3">Alternative Mapping Solutions</h3>
          <p className="text-sm text-slate-600 mb-4">
            If Google Maps doesn't meet your needs, consider these alternatives:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-white rounded border">
              <div className="font-medium">OpenStreetMap</div>
              <div className="text-slate-500">Free, open-source mapping</div>
            </div>
            <div className="p-3 bg-white rounded border">
              <div className="font-medium">Mapbox</div>
              <div className="text-slate-500">Developer-friendly with free tier</div>
            </div>
            <div className="p-3 bg-white rounded border">
              <div className="font-medium">HERE Maps</div>
              <div className="text-slate-500">Enterprise mapping solution</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
