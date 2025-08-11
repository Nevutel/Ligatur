"use client"

import { useState } from 'react'
import { Search, MapPin, SlidersHorizontal, Filter, DollarSign, Home, Calendar, Square } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

interface UnifiedFilters {
  location: string
  priceRange: [number, number]
  currency: string
  propertyTypes: string[]
  bedrooms: string
  bathrooms: string
  sqftRange: [number, number]
  walkScore: [number, number]
  transitScore: [number, number]
  safetyScore: [number, number]
  schoolRating: [number, number]
  nearbyAmenities: string[]
  amenities: string[]
  investmentGoals: string[]
  yearBuiltRange: [number, number]
  availableFrom: string
}

interface UnifiedPropertyFiltersProps {
  onSearch: (filters: UnifiedFilters) => void
  className?: string
}

const NEARBY_AMENITIES = [
  'Schools', 'Hospitals', 'Shopping Centers', 'Restaurants', 
  'Parks', 'Public Transport', 'Gyms', 'Banks', 'Pharmacies'
]

const PROPERTY_AMENITIES = [
  "Pool", "Gym/Fitness Center", "Parking Garage", "Balcony/Patio",
  "In-unit Laundry", "Dishwasher", "Air Conditioning", "Fireplace",
  "Walk-in Closet", "Hardwood Floors", "Stainless Steel Appliances",
  "Granite Countertops", "Pet Friendly", "Furnished", "Elevator",
  "Doorman/Concierge", "Rooftop Access", "Garden/Yard", "Ocean View",
  "Mountain View", "City View"
]

const PROPERTY_TYPES = ["House", "Apartment", "Condo", "Townhome", "Multifamily", "Lots/Land", "Manufactured"]

const INVESTMENT_GOALS = [
  'High ROI', 'Rental Income', 'Long-term Appreciation', 
  'Fix & Flip', 'Vacation Rental', 'Primary Residence'
]

const CRYPTOCURRENCIES = [
  { value: "BTC", label: "₿ Bitcoin (BTC)", symbol: "₿" },
  { value: "ETH", label: "Ξ Ethereum (ETH)", symbol: "Ξ" },
  { value: "SOL", label: "◎ Solana (SOL)", symbol: "◎" },
  { value: "USDC", label: "$ USD Coin (USDC)", symbol: "$" },
  { value: "USDT", label: "$ Tether (USDT)", symbol: "$" },
]

export function UnifiedPropertyFilters({ onSearch, className }: UnifiedPropertyFiltersProps) {
  const [filters, setFilters] = useState<UnifiedFilters>({
    location: '',
    priceRange: [0, 10],
    currency: 'BTC',
    propertyTypes: [],
    bedrooms: 'any',
    bathrooms: 'any',
    sqftRange: [0, 5000],
    walkScore: [0, 100],
    transitScore: [0, 100],
    safetyScore: [0, 100],
    schoolRating: [0, 10],
    nearbyAmenities: [],
    amenities: [],
    investmentGoals: [],
    yearBuiltRange: [1900, 2024],
    availableFrom: ''
  })

  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleFilterChange = (key: keyof UnifiedFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleSearch = () => {
    onSearch(filters)
  }

  const handleClearFilters = () => {
    setFilters({
      location: '',
      priceRange: [0, 10],
      currency: 'BTC',
      propertyTypes: [],
      bedrooms: 'any',
      bathrooms: 'any',
      sqftRange: [0, 5000],
      walkScore: [0, 100],
      transitScore: [0, 100],
      safetyScore: [0, 100],
      schoolRating: [0, 10],
      nearbyAmenities: [],
      amenities: [],
      investmentGoals: [],
      yearBuiltRange: [1900, 2024],
      availableFrom: ''
    })
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.location) count++
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 10) count++
    if (filters.propertyTypes.length > 0) count++
    if (filters.bedrooms !== 'any') count++
    if (filters.bathrooms !== 'any') count++
    if (filters.sqftRange[0] > 0 || filters.sqftRange[1] < 5000) count++
    if (filters.walkScore[0] > 0 || filters.walkScore[1] < 100) count++
    if (filters.transitScore[0] > 0 || filters.transitScore[1] < 100) count++
    if (filters.safetyScore[0] > 0 || filters.safetyScore[1] < 100) count++
    if (filters.schoolRating[0] > 0 || filters.schoolRating[1] < 10) count++
    if (filters.nearbyAmenities.length > 0) count++
    if (filters.amenities.length > 0) count++
    if (filters.investmentGoals.length > 0) count++
    if (filters.yearBuiltRange[0] > 1900 || filters.yearBuiltRange[1] < 2024) count++
    if (filters.availableFrom) count++
    return count
  }

  const toggleArrayFilter = (key: 'propertyTypes' | 'nearbyAmenities' | 'amenities' | 'investmentGoals', value: string) => {
    const currentArray = filters[key]
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value]
    handleFilterChange(key, newArray)
  }

  return (
    <div className={className}>
      {/* Main Search and Basic Filters */}
      <Card className="mb-6">
        <CardContent className="p-4 md:p-6">
          <div className="space-y-4">
            {/* Location Search */}
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Enter location, neighborhood, or address..."
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Quick Filters Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Currency */}
              <Select value={filters.currency} onValueChange={(value) => handleFilterChange('currency', value)}>
                <SelectTrigger className="h-12">
                  <span className="mr-2 flex-shrink-0 text-sm font-medium">
                    {CRYPTOCURRENCIES.find(c => c.value === filters.currency)?.symbol || '₿'}
                  </span>
                  <SelectValue placeholder="Currency" className="truncate" />
                </SelectTrigger>
                <SelectContent>
                  {CRYPTOCURRENCIES.map((crypto) => (
                    <SelectItem key={crypto.value} value={crypto.value}>
                      {crypto.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Available From */}
              <Input
                type="date"
                value={filters.availableFrom}
                onChange={(e) => handleFilterChange('availableFrom', e.target.value)}
                className="h-12"
                placeholder="Available from"
              />
            </div>

            {/* Bedrooms & Bathrooms Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Bedrooms */}
              <Select value={filters.bedrooms} onValueChange={(value) => handleFilterChange('bedrooms', value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Any Bedrooms" className="truncate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Bedrooms</SelectItem>
                  <SelectItem value="0">Studio</SelectItem>
                  <SelectItem value="1">1+ Bedrooms</SelectItem>
                  <SelectItem value="2">2+ Bedrooms</SelectItem>
                  <SelectItem value="3">3+ Bedrooms</SelectItem>
                  <SelectItem value="4">4+ Bedrooms</SelectItem>
                  <SelectItem value="5">5+ Bedrooms</SelectItem>
                </SelectContent>
              </Select>

              {/* Bathrooms */}
              <Select value={filters.bathrooms} onValueChange={(value) => handleFilterChange('bathrooms', value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Any Bathrooms" className="truncate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Bathrooms</SelectItem>
                  <SelectItem value="1">1+ Bathrooms</SelectItem>
                  <SelectItem value="1.5">1.5+ Bathrooms</SelectItem>
                  <SelectItem value="2">2+ Bathrooms</SelectItem>
                  <SelectItem value="2.5">2.5+ Bathrooms</SelectItem>
                  <SelectItem value="3">3+ Bathrooms</SelectItem>
                  <SelectItem value="4">4+ Bathrooms</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button onClick={handleSearch} className="w-full h-12">
                <Search className="h-4 w-4 mr-2" />
                Search Properties
              </Button>

              <Button
                variant="outline"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full h-12"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                {showAdvanced ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
                {getActiveFiltersCount() > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {getActiveFiltersCount()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showAdvanced && (
            <div className="border-t pt-6 mt-6 space-y-6">
              {/* Price Range */}
              <div>
                <Label className="text-sm font-medium mb-3 block flex items-center gap-2">
                  <span className="text-orange-500 text-sm font-medium">
                    {CRYPTOCURRENCIES.find(c => c.value === filters.currency)?.symbol || '₿'}
                  </span>
                  Price Range ({filters.currency})
                </Label>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => handleFilterChange('priceRange', value)}
                  max={10}
                  min={0}
                  step={0.1}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-slate-600">
                  <span>{CRYPTOCURRENCIES.find(c => c.value === filters.currency)?.symbol || '₿'}{filters.priceRange[0]}</span>
                  <span>{CRYPTOCURRENCIES.find(c => c.value === filters.currency)?.symbol || '₿'}{filters.priceRange[1]}</span>
                </div>
              </div>

              {/* Property Types */}
              <div>
                <Label className="text-sm font-medium mb-3 block flex items-center gap-2">
                  <Home className="h-4 w-4 text-orange-500" />
                  Property Types
                </Label>
                <div className="space-y-2">
                  {PROPERTY_TYPES.map((type) => (
                    <div key={type} className="flex items-center space-x-3 p-3 rounded-md hover:bg-slate-50 transition-colors border border-slate-200">
                      <Checkbox
                        id={`type-${type}`}
                        checked={filters.propertyTypes.includes(type)}
                        onCheckedChange={() => toggleArrayFilter('propertyTypes', type)}
                        className="flex-shrink-0"
                      />
                      <Label htmlFor={`type-${type}`} className="text-sm cursor-pointer flex-1 whitespace-nowrap">{type}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Square Footage */}
              <div>
                <Label className="text-sm font-medium mb-3 block flex items-center gap-2">
                  <Square className="h-4 w-4 text-orange-500" />
                  Square Footage
                </Label>
                <Slider
                  value={filters.sqftRange}
                  onValueChange={(value) => handleFilterChange('sqftRange', value)}
                  max={5000}
                  min={0}
                  step={100}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-slate-600">
                  <span>{filters.sqftRange[0].toLocaleString()} sqft</span>
                  <span>{filters.sqftRange[1].toLocaleString()}+ sqft</span>
                </div>
              </div>

              {/* Year Built */}
              <div>
                <Label className="text-sm font-medium mb-3 block flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-orange-500" />
                  Year Built
                </Label>
                <Slider
                  value={filters.yearBuiltRange}
                  onValueChange={(value) => handleFilterChange('yearBuiltRange', value)}
                  max={2024}
                  min={1900}
                  step={5}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-slate-600">
                  <span>{filters.yearBuiltRange[0]}</span>
                  <span>{filters.yearBuiltRange[1]}</span>
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
                <div className="space-y-2">
                  {NEARBY_AMENITIES.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-3 p-3 rounded-md hover:bg-slate-50 transition-colors border border-slate-200">
                      <Checkbox
                        id={`nearby-${amenity}`}
                        checked={filters.nearbyAmenities.includes(amenity)}
                        onCheckedChange={() => toggleArrayFilter('nearbyAmenities', amenity)}
                        className="flex-shrink-0"
                      />
                      <Label htmlFor={`nearby-${amenity}`} className="text-sm cursor-pointer flex-1 whitespace-nowrap">{amenity}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Property Amenities */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Property Amenities</Label>
                {filters.amenities.length > 0 && (
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-md mb-3">
                    <div className="text-sm font-medium text-orange-800 mb-2">Selected ({filters.amenities.length})</div>
                    <div className="flex flex-wrap gap-2">
                      {filters.amenities.map((amenity) => (
                        <Badge
                          key={amenity}
                          variant="secondary"
                          className="bg-orange-100 text-orange-800 border-orange-300 cursor-pointer hover:bg-orange-200 transition-colors"
                          onClick={() => toggleArrayFilter('amenities', amenity)}
                        >
                          {amenity}
                          <span className="ml-1 text-orange-600">×</span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <div className="max-h-48 overflow-y-auto border rounded-md p-4 bg-slate-50/30">
                  <div className="text-sm font-medium text-slate-700 mb-3">Click to add:</div>
                  <div className="flex flex-wrap gap-2">
                    {PROPERTY_AMENITIES.filter(amenity => !filters.amenities.includes(amenity)).map((amenity) => (
                      <Badge
                        key={amenity}
                        variant="outline"
                        className="cursor-pointer hover:bg-slate-100 hover:border-slate-400 transition-colors text-slate-700 border-slate-300"
                        onClick={() => toggleArrayFilter('amenities', amenity)}
                      >
                        + {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>


              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t">
                <Button onClick={handleSearch} className="flex-1">
                  Apply Filters ({getActiveFiltersCount()})
                </Button>
                <Button variant="outline" onClick={handleClearFilters}>
                  Clear All
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
