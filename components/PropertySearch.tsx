// components/PropertySearch.tsx
'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface PropertySearchProps {
  onSearch: (filters: any) => void
}

export default function PropertySearch({ onSearch }: PropertySearchProps) {
  const [location, setLocation] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [propertyType, setPropertyType] = useState('')

  const handleSearch = () => {
    onSearch({ location, priceRange, propertyType })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-lg font-semibold mb-4">Search Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter location"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any Price</option>
            <option value="0-200000">$0 - $200,000</option>
            <option value="200000-500000">$200,000 - $500,000</option>
            <option value="500000-1000000">$500,000 - $1,000,000</option>
            <option value="1000000+">$1,000,000+</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Type
          </label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any Type</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
            <option value="townhouse">Townhouse</option>
          </select>
        </div>
        <div className="flex items-end">
          <Button onClick={handleSearch} className="w-full">
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}
