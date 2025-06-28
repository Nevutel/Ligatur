// app/properties/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { PropertySearch } from '@/components/PropertySearch'
import { PropertyCard } from '@/components/PropertyCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react'

interface Property {
  id: string
  title: string
  description: string
  priceUsd: number
  cryptoAmount?: number
  cryptoCurrency?: string
  address: string
  city: string
  country: string
  type: string
  propertyType: string
  bedrooms?: number
  bathrooms?: number
  area: number
  parking?: number
  amenities: string[]
  images: string[]
  featured: boolean
  verified: boolean
  tokenized: boolean
  owner: {
    id: string
    name: string
    email: string
    image?: string
    verified: boolean
    walletAddress?: string
  }
}

interface SearchFilters {
  search?: string
  type?: string
  propertyType?: string
  city?: string
  country?: string
  minPrice?: string
  maxPrice?: string
  bedrooms?: string
  bathrooms?: string
  tokenized?: string
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState<SearchFilters>({})

  useEffect(() => {
    fetchProperties()
  }, [currentPage, filters])

  const fetchProperties = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12',
        ...filters
      })

      const response = await fetch(`/api/properties?${params}`)
      if (response.ok) {
        const data = await response.json()
        setProperties(data.properties)
        setTotalPages(data.pagination.pages)
      }
    } catch (error) {
      console.error('Error fetching properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (newFilters: SearchFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            All Properties
          </h1>
          <p className="text-lg text-gray-600">
            Discover premium real estate properties available with cryptocurrency payments
          </p>
        </div>
      </div>

      {/* Search Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <PropertySearch onSearch={handleSearch} />
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-crypto-blue" />
            <span className="ml-2 text-gray-600">Loading properties...</span>
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {properties.length} Properties Found
                </h2>
                <p className="text-gray-600">
                  Page {currentPage} of {totalPages}
                </p>
              </div>
            </div>

            {/* Properties Grid */}
            {properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <CardContent>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Properties Found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search filters to find more properties.
                  </p>
                  <Button onClick={() => handleSearch({})}>
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => 
                    page === 1 || 
                    page === totalPages || 
                    Math.abs(page - currentPage) <= 2
                  )
                  .map((page, index, array) => (
                    <div key={page} className="flex items-center">
                      {index > 0 && array[index - 1] !== page - 1 && (
                        <span className="px-2 text-gray-400">...</span>
                      )}
                      <Button
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => handlePageChange(page)}
                        className={currentPage === page ? "bg-crypto-blue" : ""}
                      >
                        {page}
                      </Button>
                    </div>
                  ))
                }
                
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}