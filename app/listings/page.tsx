"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Filter, MapPin, Bed, Bath, Square, Home, Globe, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { getProperties, getAvailableCountries, type Property } from "@/lib/database"
import { Header } from "@/components/header"
import { ImageSlideshow } from "@/components/image-slideshow"
import { CountrySearch } from "@/components/country-search"
import { PropertyComparisonTool } from "@/components/property-comparison-tool"
import { UnifiedPropertyFilters } from "@/components/unified-property-filters"

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

export default function ListingsPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [selectedCountry, setSelectedCountry] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [availableCountries, setAvailableCountries] = useState<Array<{ country: string; count: number }>>([])
  const [showCountrySearch, setShowCountrySearch] = useState(false)
  const [showComparison, setShowComparison] = useState(false)

  // Unified filters
  const [unifiedFilters, setUnifiedFilters] = useState<UnifiedFilters>({
    location: "",
    priceRange: [0, 10],
    currency: "BTC",
    propertyTypes: [],
    bedrooms: "any",
    bathrooms: "any",
    sqftRange: [0, 5000],
    walkScore: [0, 100],
    transitScore: [0, 100],
    safetyScore: [0, 100],
    schoolRating: [0, 10],
    nearbyAmenities: [],
    amenities: [],
    investmentGoals: [],
    yearBuiltRange: [1900, 2024],
    availableFrom: "",
  })

  // Slideshow state
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [isSlideShowOpen, setIsSlideShowOpen] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [propertiesData, countriesData] = await Promise.all([
          getProperties({
            type: filterType === "all" ? undefined : (filterType as "sale" | "rent"),
            country: selectedCountry || undefined,
          }),
          getAvailableCountries(),
        ])
        setProperties(propertiesData)
        setAvailableCountries(countriesData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [filterType, selectedCountry])

  const applyUnifiedFilters = (property: Property) => {
    // Location filter
    if (unifiedFilters.location) {
      const searchTerm = unifiedFilters.location.toLowerCase()
      const matchesLocation =
        property.title.toLowerCase().includes(searchTerm) ||
        property.location.toLowerCase().includes(searchTerm) ||
        (property.country && property.country.toLowerCase().includes(searchTerm))
      if (!matchesLocation) return false
    }

    // Price range filter
    const rates = { BTC: 43250, ETH: 2580, SOL: 98.5, USDC: 1, USDT: 1 }
    const propertyPriceInFilterCurrency =
      (property.price * (rates[property.currency as keyof typeof rates] || 1)) /
      (rates[unifiedFilters.currency as keyof typeof rates] || 1)

    if (
      propertyPriceInFilterCurrency < unifiedFilters.priceRange[0] ||
      propertyPriceInFilterCurrency > unifiedFilters.priceRange[1]
    ) {
      return false
    }

    // Property type filter
    if (unifiedFilters.propertyTypes.length > 0) {
      // This would need property type data in the database
      // For now, we'll skip this filter
    }

    // Bedrooms filter
    if (unifiedFilters.bedrooms !== "any") {
      const minBedrooms = Number.parseInt(unifiedFilters.bedrooms)
      if (property.bedrooms < minBedrooms) return false
    }

    // Bathrooms filter
    if (unifiedFilters.bathrooms !== "any") {
      const minBathrooms = Number.parseFloat(unifiedFilters.bathrooms)
      if (property.bathrooms < minBathrooms) return false
    }

    // Square footage filter
    if (property.sqft < unifiedFilters.sqftRange[0] || property.sqft > unifiedFilters.sqftRange[1]) {
      return false
    }

    // Year built filter
    if (property.year_built) {
      if (
        property.year_built < unifiedFilters.yearBuiltRange[0] ||
        property.year_built > unifiedFilters.yearBuiltRange[1]
      ) {
        return false
      }
    }

    // Amenities filter
    if (unifiedFilters.amenities.length > 0) {
      const hasAllAmenities = unifiedFilters.amenities.every((amenity) =>
        property.features?.some((feature) => feature.toLowerCase().includes(amenity.toLowerCase())),
      )
      if (!hasAllAmenities) return false
    }

    return true
  }

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (property.country && property.country.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesSearch && applyUnifiedFilters(property)
  })

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "featured":
        return b.featured ? 1 : -1
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "newest":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      case "sqft-low":
        return a.sqft - b.sqft
      case "sqft-high":
        return b.sqft - a.sqft
      case "year-old":
        return (a.year_built || 0) - (b.year_built || 0)
      case "year-new":
        return (b.year_built || 0) - (a.year_built || 0)
      default:
        return 0
    }
  })

  // Stock photo placeholders for properties
  const stockPhotos = [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Modern luxury home
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Contemporary house
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Modern house exterior
    "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Beautiful home exterior
    "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Modern apartment
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Beautiful modern house
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Apartment building
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Townhouse
    "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Urban property
    "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Suburban home
  ]

  // Helper function to get a random stock photo based on property ID
  const getStockPhoto = (propertyId: string | number) => {
    const id = propertyId.toString()
    const index = parseInt(id.slice(-1), 10) || 0
    const safeIndex = isNaN(index) ? 0 : index % stockPhotos.length
    return stockPhotos[safeIndex] || stockPhotos[0]
  }

  // Helper function to get display image
  const getDisplayImage = (property: Property) => {
    // Always try to get a valid image first
    if (property.images && property.images.length > 0) {
      const firstImage = property.images[0]
      // Check if it's a valid URL (not blob or empty)
      if (firstImage &&
          !firstImage.startsWith("blob:") &&
          !firstImage.includes("blob.vercel.app") &&
          firstImage.startsWith("http")) {
        return firstImage
      }
    }

    // If no valid images, always return a stock photo
    return getStockPhoto(property.id)
  }

  // Helper function to get slideshow images
  const getSlideshowImages = (property: Property) => {
    if (!property.images || property.images.length === 0) {
      return [getStockPhoto(property.id)]
    }

    // Filter out blob URLs and invalid images, replace with stock photos
    const validImages = property.images.map((img, index) => {
      if (!img ||
          img.startsWith("blob:") ||
          img.includes("blob.vercel.app") ||
          !img.startsWith("http")) {
        // Use different stock photos for multiple images
        const id = property.id.toString()
        const baseIndex = parseInt(id.slice(-1), 10) || 0
        const stockIndex = (baseIndex + index) % stockPhotos.length
        return stockPhotos[stockIndex] || stockPhotos[0]
      }
      return img
    })

    return validImages.length > 0 ? validImages : [getStockPhoto(property.id)]
  }

  const openSlideshow = (property: Property) => {
    setSelectedProperty(property)
    setIsSlideShowOpen(true)
  }

  const closeSlideshow = () => {
    setIsSlideShowOpen(false)
    setSelectedProperty(null)
  }

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country)
    setShowCountrySearch(false)
  }

  const clearCountryFilter = () => {
    setSelectedCountry("")
  }

  const handleUnifiedSearch = (filters: UnifiedFilters) => {
    setUnifiedFilters(filters)
    // Also update the search term if location is provided in unified filters
    if (filters.location !== unifiedFilters.location) {
      setSearchTerm(filters.location)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading properties...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-4 md:py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-4">
            {/* Unified Property Filters */}
            <UnifiedPropertyFilters onSearch={handleUnifiedSearch} />

            {/* Country Search */}
            <CountrySearch onCountrySelect={handleCountrySelect} selectedCountry={selectedCountry} />

            {/* Available Countries with Counts */}
            {availableCountries.length > 0 && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-orange-500" />
                    Properties by Country
                  </h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {availableCountries.map(({ country, count }) => (
                      <button
                        key={country}
                        onClick={() => setSelectedCountry(country)}
                        className={`w-full text-left p-2 rounded-md text-sm transition-colors ${
                          selectedCountry === country ? "bg-orange-100 text-orange-800" : "hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="truncate">{country}</span>
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {count}
                          </Badge>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filters */}
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search properties, locations, or countries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              {/* Filter Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="h-12">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="sale">For Sale</SelectItem>
                    <SelectItem value="rent">For Rent</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="sqft-low">Square Feet: Small to Large</SelectItem>
                    <SelectItem value="sqft-high">Square Feet: Large to Small</SelectItem>
                    <SelectItem value="year-new">Year: Newest First</SelectItem>
                    <SelectItem value="year-old">Year: Oldest First</SelectItem>
                    <SelectItem value="newest">Recently Listed</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant={showComparison ? "default" : "outline"}
                  onClick={() => setShowComparison(!showComparison)}
                  className="h-12"
                >
                  <Scale className="h-4 w-4 mr-2" />
                  Compare
                </Button>

                <div className="lg:block hidden"></div> {/* Spacer for grid alignment */}
              </div>

              {/* Active Filters */}
              {selectedCountry && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">Filtered by:</span>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    {selectedCountry}
                    <button onClick={clearCountryFilter} className="ml-1 hover:text-red-600">
                      ×
                    </button>
                  </Badge>
                </div>
              )}
            </div>

            {/* Property Comparison Tool */}
            {showComparison && <PropertyComparisonTool availableProperties={sortedProperties} />}

            {/* Results Count */}
            <div className="flex justify-between items-center">
              <p className="text-slate-600 text-sm md:text-base">
                Showing {sortedProperties.length} properties
                {selectedCountry && ` in ${selectedCountry}`}
              </p>
            </div>

            {/* Property Grid */}
            {sortedProperties.length === 0 ? (
              <div className="text-center py-12">
                <Home className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">No properties found</h3>
                <p className="text-slate-500 mb-4 px-4">
                  {selectedCountry
                    ? `No properties found in ${selectedCountry}. Try selecting a different country or adjusting your search.`
                    : "Try adjusting your search criteria or create the first listing!"}
                </p>
                <div className="flex gap-2 justify-center">
                  {selectedCountry && (
                    <Button variant="outline" onClick={clearCountryFilter}>
                      Clear Country Filter
                    </Button>
                  )}
                  <Button asChild>
                    <Link href="/create">List Your Property</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {sortedProperties.map((property) => (
                  <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <div className="cursor-pointer" onClick={() => openSlideshow(property)}>
                        <img
                          src={getDisplayImage(property)}
                          alt={property.title}
                          className="w-full h-48 md:h-64 object-cover hover:opacity-90 transition-opacity"
                          onError={(e) => {
                            // Fallback if image fails to load - use stock photo
                            const target = e.target as HTMLImageElement
                            target.src = getStockPhoto(property.id)
                          }}
                        />
                        {property.images && property.images.length > 1 && (
                          <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs md:text-sm">
                            +{property.images.length - 1} more
                          </div>
                        )}
                      </div>
                      {property.featured && (
                        <Badge className="absolute top-2 right-2 bg-orange-500 text-xs">Featured</Badge>
                      )}
                      <Badge
                        variant={property.type === "sale" ? "default" : "secondary"}
                        className="absolute bottom-2 right-2 text-xs"
                      >
                        {property.type === "sale" ? "For Sale" : "For Rent"}
                      </Badge>
                    </div>
                    <CardContent className="p-3 md:p-4">
                      <h3 className="font-semibold text-base md:text-lg mb-2 line-clamp-2 break-words">
                        {property.title}
                      </h3>
                      <div className="space-y-1 mb-2">
                        <div className="flex items-start text-slate-600">
                          <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                          <span className="text-sm break-words line-clamp-1">{property.location}</span>
                        </div>
                        {property.country && (
                          <div className="flex items-center text-slate-500">
                            <Globe className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="text-xs">{property.country}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-xs md:text-sm text-slate-600 mb-3 gap-2">
                        <div className="flex items-center">
                          <Bed className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                          <span>{property.bedrooms} bed</span>
                        </div>
                        <div className="flex items-center">
                          <Bath className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                          <span>{property.bathrooms} bath</span>
                        </div>
                        <div className="flex items-center">
                          <Square className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                          <span>{property.sqft} sqft</span>
                        </div>
                      </div>
                      <div className="text-lg md:text-xl font-bold text-orange-600 break-words">
                        {property.currency === 'BTC' ? '₿' : property.currency === 'ETH' ? 'Ξ' : property.currency === 'SOL' ? '◎' : '$'}{property.price}
                        {property.type === "rent" && "/month"}
                      </div>
                    </CardContent>
                    <CardFooter className="p-3 md:p-4 pt-0">
                      <Button asChild className="w-full text-sm md:text-base">
                        <Link href={`/property/${property.id}`}>View Listing</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Slideshow */}
      {selectedProperty && (
        <ImageSlideshow
          images={getSlideshowImages(selectedProperty)}
          title={selectedProperty.title}
          isOpen={isSlideShowOpen}
          onClose={closeSlideshow}
        />
      )}
    </div>
  )
}
