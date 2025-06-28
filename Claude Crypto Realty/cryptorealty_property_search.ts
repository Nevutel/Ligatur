// components/PropertySearch.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, Filter, X } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/button'
import { Card, CardContent } from './ui/button'
import { Badge } from './ui/button'
import { COUNTRIES, PROPERTY_TYPES, AMENITIES } from '@/lib/utils'

interface SearchFilters {
  query: string
  country: string
  city: string
  type: 'all' | 'SALE' | 'RENT'
  propertyType: string
  minPrice: string
  maxPrice: string
  bedrooms: string
  bathrooms: string
  amenities: string[]
  cryptoPayment: boolean
  tokenized: boolean
  featured: boolean
}

interface PropertySearchProps {
  onSearch: (filters: SearchFilters) => void
  isLoading?: boolean
  className?: string
}

export default function PropertySearch({ onSearch, isLoading = false, className = '' }: PropertySearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showAdvanced, setShowAdvanced] = useState(false)
  
  const [filters, setFilters] = useState<SearchFilters>({
    query: searchParams.get('q') || '',
    country: searchParams.get('country') || '',
    city: searchParams.get('city') || '',
    type: (searchParams.get('type') as 'all' | 'SALE' | 'RENT') || 'all',
    propertyType: searchParams.get('propertyType') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    bathrooms: searchParams.get('bathrooms') || '',
    amenities: searchParams.get('amenities')?.split(',').filter(Boolean) || [],
    cryptoPayment: searchParams.get('crypto') === 'true',
    tokenized: searchParams.get('tokenized') === 'true',
    featured: searchParams.get('featured') === 'true',
  })

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== '' && (Array.isArray(value) ? value.length > 0 : true)) {
        if (Array.isArray(value)) {
          params.set(key, value.join(','))
        } else if (typeof value === 'boolean') {
          if (value) params.set(key, 'true')
        } else {
          params.set(key, value.toString())
        }
      }
    })

    const newUrl = params.toString() ? `?${params.toString()}` : ''
    router.replace(`/properties${newUrl}`, { scroll: false })
  }, [filters, router])

  const handleSearch = () => {
    onSearch(filters)
  }

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleAmenityToggle = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }))
  }

  const clearFilters = () => {
    setFilters({
      query: '',
      country: '',
      city: '',
      type: 'all',
      propertyType: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      amenities: [],
      cryptoPayment: false,
      tokenized: false,
      featured: false,
    })
  }

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (key === 'type') return value !== 'all'
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === 'boolean') return value
    return value !== ''
  })

  return (
    <Card className={`w-full ${className}`}>
      <CardContent className="p-6">
        {/* Main Search Bar */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search properties, locations, or keywords..."
              value={filters.query}
              onChange={(e) => handleFilterChange('query', e.target.value)}
              className="pl-10"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button
            onClick={() => setShowAdvanced(!showAdvanced)}
            variant="outline"
            className="flex items-center"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <Badge variant="default" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                !
              </Badge>
            )}
          </Button>
          <Button
            onClick={handleSearch}
            variant="crypto"
            disabled={isLoading}
            className="min-w-[100px]"
          >
            {isLoading ? (
              <div className="loading-spinner" />
            ) : (
              'Search'
            )}
          </Button>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => handleFilterChange('type', filters.type === 'SALE' ? 'all' : 'SALE')}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filters.type === 'SALE'
                ? 'bg-crypto-blue text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            For Sale
          </button>
          <button
            onClick={() => handleFilterChange('type', filters.type === 'RENT' ? 'all' : 'RENT')}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filters.type === 'RENT'
                ? 'bg-crypto-blue text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            For Rent
          </button>
          <button
            onClick={() => handleFilterChange('featured', !filters.featured)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filters.featured
                ? 'bg-crypto-gold text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Featured
          </button>
          <button
            onClick={() => handleFilterChange('tokenized', !filters.tokenized)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filters.tokenized
                ? 'bg-crypto-blue text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Tokenized
          </button>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="border-t pt-4 space-y-4">
            {/* Location Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Country</label>
                <select
                  value={filters.country}
                  onChange={(e) => handleFilterChange('country', e.target.value)}
                  className="w-full p-2 border rounded-md bg-background text-foreground"
                >
                  <option value="">All Countries</option>
                  {COUNTRIES.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <Input
                  placeholder="Enter city name"
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                />
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium mb-2">Property Type</label>
              <select
                value={filters.propertyType}
                