"use client"

import { useState } from 'react'
import { Search, Filter, MapPin, Bookmark, Bell, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

interface AdvancedPropertySearchProps {
  onSearch: (filters: SearchFilters) => void
  className?: string
}

interface SearchFilters {
  location: string
  priceRange: [number, number]
  propertyType: string[]
  bedrooms: string
  bathrooms: string
  walkScore: [number, number]
  transitScore: [number, number]
  safetyScore: [number, number]
  schoolRating: [number, number]
  nearbyAmenities: string[]
  investmentGoals: string[]
}

const NEARBY_AMENITIES = [
  'Schools', 'Hospitals', 'Shopping Centers', 'Restaurants', 
  'Parks', 'Public Transport', 'Gyms', 'Banks', 'Pharmacies'
]

const INVESTMENT_GOALS = [
  'High ROI', 'Rental Income', 'Long-term Appreciation', 
  'Fix & Flip', 'Vacation Rental', 'Primary Residence'
]

const AI_RECOMMENDATIONS = [
  {
    title: "Rising Tech District",
    description: "Properties near emerging tech hubs with 15% YoY growth",
    badge: "High Growth",
    color: "bg-green-100 text-green-800"
  },
  {
    title: "Undervalued Gems",
    description: "Quality properties priced below market average",
    badge: "Value Play",
    color: "bg-blue-100 text-blue-800"
  },
  {
    title: "Rental Hotspots",
    description: "Areas with high rental demand and strong yields",
    badge: "Cash Flow",
    color: "bg-purple-100 text-purple-800"
  },
  {
    title: "Transit-Oriented",
    description: "Properties near planned transit developments",
    badge: "Infrastructure",
    color: "bg-orange-100 text-orange-800"
  }
]

export function AdvancedPropertySearch({ onSearch, className }: AdvancedPropertySearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    priceRange: [0, 10],
    propertyType: [],
    bedrooms: 'any',
    bathrooms: 'any',
    walkScore: [0, 100],
    transitScore: [0, 100],
    safetyScore: [0, 100],
    schoolRating: [0, 10],
    nearbyAmenities: [],
    investmentGoals: []
  })

  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleSearch = () => {
    onSearch(filters)
  }


  return (
    <div className={className}>
      {/* Main Search Bar */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Enter location, neighborhood, or address..."
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch} className="px-8">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            <Badge variant="outline" className="cursor-pointer hover:bg-slate-100 justify-center py-2">
              Under 3 BTC
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-slate-100 justify-center py-2">
              High Walk Score
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-slate-100 justify-center py-2">
              Near Transit
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-slate-100 justify-center py-2">
              Investment Grade
            </Badge>
          </div>

          {/* Advanced Filters */}
          {showAdvanced && (
            <div className="border-t pt-6 space-y-6">
              {/* Price Range */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Price Range (BTC)</Label>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => handleFilterChange('priceRange', value)}
                  max={10}
                  min={0}
                  step={0.1}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-slate-600">
                  <span>{filters.priceRange[0]} BTC</span>
                  <span>{filters.priceRange[1]} BTC</span>
                </div>
              </div>

              {/* Bedrooms & Bathrooms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Bedrooms</Label>
                  <Select value={filters.bedrooms} onValueChange={(value) => handleFilterChange('bedrooms', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="0">Studio</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block">Bathrooms</Label>
                  <Select value={filters.bathrooms} onValueChange={(value) => handleFilterChange('bathrooms', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Neighborhood Scores */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium mb-3 block">Walk Score</Label>
                  <Slider
                    value={filters.walkScore}
                    onValueChange={(value) => handleFilterChange('walkScore', value)}
                    max={100}
                    min={0}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>{filters.walkScore[0]}</span>
                    <span>{filters.walkScore[1]}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-3 block">Safety Score</Label>
                  <Slider
                    value={filters.safetyScore}
                    onValueChange={(value) => handleFilterChange('safetyScore', value)}
                    max={100}
                    min={0}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>{filters.safetyScore[0]}</span>
                    <span>{filters.safetyScore[1]}</span>
                  </div>
                </div>
              </div>

              {/* Nearby Amenities */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Nearby Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {NEARBY_AMENITIES.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity}
                        checked={filters.nearbyAmenities.includes(amenity)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleFilterChange('nearbyAmenities', [...filters.nearbyAmenities, amenity])
                          } else {
                            handleFilterChange('nearbyAmenities', filters.nearbyAmenities.filter(a => a !== amenity))
                          }
                        }}
                      />
                      <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Investment Goals */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Investment Goals</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {INVESTMENT_GOALS.map((goal) => (
                    <div key={goal} className="flex items-center space-x-2">
                      <Checkbox
                        id={goal}
                        checked={filters.investmentGoals.includes(goal)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleFilterChange('investmentGoals', [...filters.investmentGoals, goal])
                          } else {
                            handleFilterChange('investmentGoals', filters.investmentGoals.filter(g => g !== goal))
                          }
                        }}
                      />
                      <Label htmlFor={goal} className="text-sm">{goal}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSearch} className="flex-1">
                  Apply Filters
                </Button>
                <Button variant="outline" onClick={saveCurrentSearch}>
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save Search
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>


      {/* Saved Searches */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-600" />
            Saved Searches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {savedSearches.map((search, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium">{search}</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">Run</Button>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
