"use client"

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, ExternalLink, Key, CheckCircle, AlertCircle, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'

interface GoogleMapsSetupProps {
  onApiKeySubmit?: (apiKey: string) => void
  currentApiKey?: string
}

export function GoogleMapsSetup({ onApiKeySubmit, currentApiKey }: GoogleMapsSetupProps) {
  const [apiKey, setApiKey] = useState(currentApiKey || '')
  const [showApiKeyInput, setShowApiKeyInput] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (apiKey.trim() && onApiKeySubmit) {
      onApiKeySubmit(apiKey.trim())
      setShowApiKeyInput(false)
    }
  }

  const setupSteps = [
    {
      title: "Sign up for Google Cloud Platform",
      description: "Create a free Google Cloud account with $300 credit",
      url: "https://cloud.google.com/",
      completed: false
    },
    {
      title: "Enable Google Maps API",
      description: "Enable Maps JavaScript API and Places API",
      url: "https://console.cloud.google.com/apis/library/maps-embed-backend.googleapis.com",
      completed: false
    },
    {
      title: "Create API Key", 
      description: "Generate your Maps API key with proper restrictions",
      url: "https://console.cloud.google.com/apis/credentials",
      completed: !!currentApiKey
    },
    {
      title: "Configure Billing",
      description: "Set up billing account (required but has generous free tier)",
      url: "https://console.cloud.google.com/billing",
      completed: false
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            Google Maps Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentApiKey ? (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Google Maps API is configured and ready to use!
                </AlertDescription>
              </Alert>
            ) : (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Google Maps integration requires an API key. Follow the setup guide below to get started.
                </AlertDescription>
              </Alert>
            )}

            {!currentApiKey && !showApiKeyInput && (
              <div className="flex gap-3">
                <Button onClick={() => setShowApiKeyInput(true)} className="flex-1">
                  <Key className="h-4 w-4 mr-2" />
                  Add API Key
                </Button>
                <Button variant="outline" asChild>
                  <Link href="https://developers.google.com/maps/documentation/javascript/get-api-key" target="_blank">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Get API Key
                  </Link>
                </Button>
              </div>
            )}

            {showApiKeyInput && (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <Label htmlFor="apiKey">Google Maps API Key</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    placeholder="Enter your Google Maps API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="font-mono"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={!apiKey.trim()}>
                    Save API Key
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowApiKeyInput(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Setup Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Setup Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {setupSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step.completed 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {step.completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm">{step.title}</h3>
                    {step.completed && (
                      <Badge variant="secondary" className="text-xs">
                        Complete
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{step.description}</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={step.url} target="_blank" className="flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      Open in Google Cloud
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Key Management */}
      {currentApiKey && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              API Key Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Current API Key</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input 
                    value={`${currentApiKey.slice(0, 8)}...${currentApiKey.slice(-4)}`}
                    readOnly
                    className="font-mono"
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowApiKeyInput(true)}
                  >
                    Update
                  </Button>
                </div>
              </div>
              
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Security Note:</strong> Restrict your API key to your domain and specific APIs for security. 
                  Monitor usage in Google Cloud Console to avoid unexpected charges.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pricing Information */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing & Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 border rounded">
                <div className="font-semibold text-green-600">Free Tier</div>
                <div className="text-slate-600">$200 monthly credit</div>
                <div className="text-xs text-slate-500 mt-1">~28,000 map loads/month</div>
              </div>
              <div className="p-3 border rounded">
                <div className="font-semibold text-blue-600">Map Loads</div>
                <div className="text-slate-600">$7 per 1,000</div>
                <div className="text-xs text-slate-500 mt-1">After free tier</div>
              </div>
              <div className="p-3 border rounded">
                <div className="font-semibold text-purple-600">Places API</div>
                <div className="text-slate-600">$17 per 1,000</div>
                <div className="text-xs text-slate-500 mt-1">Address autocomplete</div>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Pricing as of 2024. Check Google Cloud for current rates. Most small to medium applications stay within the free tier.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
