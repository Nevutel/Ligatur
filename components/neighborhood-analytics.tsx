"use client"

import { Shield, Plane, TreePine, Wind, Users, GraduationCap, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface NeighborhoodAnalyticsProps {
  location: string
  className?: string
}

interface AnalyticsData {
  safetyScore: number
  airQuality: number
  noiseLevel: number
  crimeRate: string
  nearestAirport: string
  airportDistance: number
  greenSpaces: number
  demographics: {
    medianAge: number
    medianIncome: number
    educationLevel: string
  }
  schoolRating: number
  environmentalRisks: string[]
}

export function NeighborhoodAnalytics({ location, className }: NeighborhoodAnalyticsProps) {
  // Mock data - in real implementation, this would come from various APIs
  const analytics: AnalyticsData = {
    safetyScore: 78,
    airQuality: 85,
    noiseLevel: 65,
    crimeRate: "Low",
    nearestAirport: "JFK International",
    airportDistance: 12.5,
    greenSpaces: 6,
    demographics: {
      medianAge: 34,
      medianIncome: 89000,
      educationLevel: "Bachelor's Degree"
    },
    schoolRating: 8.5,
    environmentalRisks: ["Low flood risk", "Moderate earthquake risk"]
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className={className}>
      {/* Safety & Security */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Safety & Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Safety Score</span>
                <span className={`text-lg font-bold ${getScoreColor(analytics.safetyScore)}`}>
                  {analytics.safetyScore}/100
                </span>
              </div>
              <Progress value={analytics.safetyScore} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Crime Rate</span>
                <Badge variant={analytics.crimeRate === 'Low' ? 'default' : 'destructive'}>
                  {analytics.crimeRate}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 p-3 rounded-lg">
            <h5 className="font-medium mb-2">Environmental Risks</h5>
            <div className="flex flex-wrap gap-2">
              {analytics.environmentalRisks.map((risk, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {risk}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Environmental Quality */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-blue-600" />
            Environmental Quality
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Air Quality Index</span>
                <span className={`text-lg font-bold ${getScoreColor(analytics.airQuality)}`}>
                  {analytics.airQuality}
                </span>
              </div>
              <Progress value={analytics.airQuality} className="h-2" />
              <p className="text-xs text-slate-600 mt-1">Excellent air quality</p>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Noise Level</span>
                <span className={`text-lg font-bold ${getScoreColor(100 - analytics.noiseLevel)}`}>
                  {analytics.noiseLevel} dB
                </span>
              </div>
              <Progress value={100 - analytics.noiseLevel} className="h-2" />
              <p className="text-xs text-slate-600 mt-1">Moderate noise levels</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <TreePine className="h-8 w-8 text-green-600" />
            <div>
              <p className="font-medium">Green Spaces</p>
              <p className="text-sm text-slate-600">{analytics.greenSpaces} parks within 1 mile</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transportation */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="h-5 w-5 text-purple-600" />
            Transportation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
            <Plane className="h-8 w-8 text-purple-600" />
            <div>
              <p className="font-medium">Nearest Airport</p>
              <p className="text-sm text-slate-600">
                {analytics.nearestAirport} - {analytics.airportDistance} miles
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Demographics */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-orange-600" />
            Demographics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">{analytics.demographics.medianAge}</p>
              <p className="text-sm text-slate-600">Median Age</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                ${(analytics.demographics.medianIncome / 1000).toFixed(0)}k
              </p>
              <p className="text-sm text-slate-600">Median Income</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-lg font-bold text-blue-600">{analytics.demographics.educationLevel}</p>
              <p className="text-sm text-slate-600">Avg. Education</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-indigo-600" />
            Schools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <div>
                <p className="font-medium">Average School Rating</p>
                <p className="text-sm text-slate-600">Based on local schools</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-indigo-600">{analytics.schoolRating}/10</p>
              <p className="text-sm text-slate-600">Excellent</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
