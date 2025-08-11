"use client"

import { useState } from "react"
import { Filter, DollarSign, Home, Calendar, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

interface SearchFilters {
  priceRange: [number, number]
  currency: string
  propertyTypes: string[]
  bedrooms: string
  bathrooms: string
  sqftRange: [number, number]
  amenities: string[]
  listingType: string
  yearBuiltRange: [number, number]
  availableFrom: string
}

interface AdvancedSearchFiltersProps {
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
  onApplyFilters: () => void
  onClearFilters: () => void
}

const PROPERTY_TYPES = ["House", "Apartment", "Condo", "Townhome", "Multifamily", "Lots/Land", "Manufactured"]

const AMENITIES = [
  "Pool",
  "Gym/Fitness Center",
  "Parking Garage",
  "Balcony/Patio",
  "In-unit Laundry",
  "Dishwasher",
  "Air Conditioning",
  "Fireplace",
  "Walk-in Closet",
  "Hardwood Floors",
  "Stainless Steel Appliances",
  "Granite Countertops",
  "Pet Friendly",
  "Furnished",
  "Elevator",
  "Doorman/Concierge",
  "Rooftop Access",
  "Garden/Yard",
  "Ocean View",
  "Mountain View",
  "City View",
]

const CRYPTOCURRENCIES = [
  { value: "BTC", label: "Bitcoin (BTC)" },
  { value: "ETH", label: "Ethereum (ETH)" },
  { value: "SOL", label: "Solana (SOL)" },
  { value: "USDC", label: "USD Coin (USDC)" },
  { value: "USDT", label: "Tether (USDT)" },
]

export function AdvancedSearchFilters({
  filters,
  onFiltersChange,
  onApplyFilters,
  onClearFilters,
}: AdvancedSearchFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const updateFilters = (updates: Partial<SearchFilters>) => {
    onFiltersChange({ ...filters, ...updates })
  }

  const togglePropertyType = (type: string) => {
    const newTypes = filters.propertyTypes.includes(type)
      ? filters.propertyTypes.filter((t) => t !== type)
      : [...filters.propertyTypes, type]
    updateFilters({ propertyTypes: newTypes })
  }

  const toggleAmenity = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity]
    updateFilters({ amenities: newAmenities })
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 10) count++
    if (filters.propertyTypes.length > 0) count++
    if (filters.bedrooms !== "any") count++
    if (filters.bathrooms !== "any") count++
    if (filters.sqftRange[0] > 0 || filters.sqftRange[1] < 5000) count++
    if (filters.amenities.length > 0) count++
    if (filters.yearBuiltRange[0] > 1900 || filters.yearBuiltRange[1] < 2024) count++
    if (filters.availableFrom) count++
    return count
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Advanced Filters
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "Collapse" : "Expand"}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-8 p-6">
          {/* Price Range */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-orange-500" />
              <Label className="font-medium">Price Range</Label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm text-slate-600">Currency</Label>
                <Select value={filters.currency} onValueChange={(value) => updateFilters({ currency: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CRYPTOCURRENCIES.map((crypto) => (
                      <SelectItem key={crypto.value} value={crypto.value}>
                        {crypto.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-slate-600">Available From</Label>
                <Input
                  type="date"
                  value={filters.availableFrom}
                  onChange={(e) => updateFilters({ availableFrom: e.target.value })}
                />
              </div>
            </div>
            <div className="px-3 py-2">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
                max={10}
                min={0}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-slate-600 mt-2">
                <span>
                  {filters.priceRange[0]} {filters.currency}
                </span>
                <span>
                  {filters.priceRange[1]} {filters.currency}
                </span>
              </div>
            </div>
          </div>

          {/* Property Types */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-orange-500" />
              <Label className="font-medium">Property Types</Label>
            </div>
            <div className="space-y-3">
              {PROPERTY_TYPES.map((type) => (
                <div key={type} className="flex items-center space-x-3 p-3 rounded-md hover:bg-slate-50 transition-colors border border-slate-200">
                  <Checkbox
                    id={type}
                    checked={filters.propertyTypes.includes(type)}
                    onCheckedChange={() => togglePropertyType(type)}
                    className="flex-shrink-0"
                  />
                  <Label htmlFor={type} className="text-sm font-medium cursor-pointer flex-1 whitespace-nowrap">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="font-medium">Bedrooms</Label>
              <Select value={filters.bedrooms} onValueChange={(value) => updateFilters({ bedrooms: value })}>
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
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-medium">Bathrooms</Label>
              <Select value={filters.bathrooms} onValueChange={(value) => updateFilters({ bathrooms: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="1.5">1.5+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="2.5">2.5+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Square Footage */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Square className="h-4 w-4 text-orange-500" />
              <Label className="font-medium">Square Footage</Label>
            </div>
            <div className="px-3 py-2">
              <Slider
                value={filters.sqftRange}
                onValueChange={(value) => updateFilters({ sqftRange: value as [number, number] })}
                max={5000}
                min={0}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-slate-600 mt-2">
                <span>{filters.sqftRange[0].toLocaleString()} sqft</span>
                <span>{filters.sqftRange[1].toLocaleString()}+ sqft</span>
              </div>
            </div>
          </div>

          {/* Year Built */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-orange-500" />
              <Label className="font-medium">Year Built</Label>
            </div>
            <div className="px-3 py-2">
              <Slider
                value={filters.yearBuiltRange}
                onValueChange={(value) => updateFilters({ yearBuiltRange: value as [number, number] })}
                max={2024}
                min={1900}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-slate-600 mt-2">
                <span>{filters.yearBuiltRange[0]}</span>
                <span>{filters.yearBuiltRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <Label className="font-medium">Amenities & Features</Label>
            <div className="space-y-3">
              {/* Selected Amenities */}
              {filters.amenities.length > 0 && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-md">
                  <div className="text-sm font-medium text-orange-800 mb-2">Selected ({filters.amenities.length})</div>
                  <div className="flex flex-wrap gap-2">
                    {filters.amenities.map((amenity) => (
                      <Badge
                        key={amenity}
                        variant="secondary"
                        className="bg-orange-100 text-orange-800 border-orange-300 cursor-pointer hover:bg-orange-200 transition-colors"
                        onClick={() => toggleAmenity(amenity)}
                      >
                        {amenity}
                        <span className="ml-1 text-orange-600">×</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Amenities */}
              <div className="max-h-48 overflow-y-auto border rounded-md p-4 bg-slate-50/30">
                <div className="text-sm font-medium text-slate-700 mb-3">Click to add:</div>
                <div className="flex flex-wrap gap-2">
                  {AMENITIES.filter(amenity => !filters.amenities.includes(amenity)).map((amenity) => (
                    <Badge
                      key={amenity}
                      variant="outline"
                      className="cursor-pointer hover:bg-slate-100 hover:border-slate-400 transition-colors text-slate-700 border-slate-300"
                      onClick={() => toggleAmenity(amenity)}
                    >
                      + {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t">
            <Button onClick={onApplyFilters} className="flex-1">
              Apply Filters ({getActiveFiltersCount()})
            </Button>
            <Button variant="outline" onClick={onClearFilters}>
              Clear All
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
