"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Share2, Heart, Calculator, MapPin, Bed, Bath, Square, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { PropertyMap } from "@/components/property-map"
import { NeighborhoodAnalytics } from "@/components/neighborhood-analytics"
import { MarketIntelligence } from "@/components/market-intelligence"
import { getProperty, type Property } from "@/lib/database"

export default function EnhancedPropertyPage() {
  const params = useParams()
  const propertyId = parseInt(params.id as string)
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorited, setIsFavorited] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    async function fetchProperty() {
      try {
        const propertyData = await getProperty(propertyId)
        setProperty(propertyData)
      } catch (error) {
        console.error("Error fetching property:", error)
      } finally {
        setLoading(false)
      }
    }

    if (propertyId) {
      fetchProperty()
    }
  }, [propertyId])

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading property details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Property Not Found</h1>
            <p className="text-slate-600 mb-6">The property you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/listings">Browse Properties</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const displayImages = property.images && property.images.length > 0 
    ? property.images.filter(img => img && !img.startsWith('blob:'))
    : ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Back Navigation */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/listings" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Listings
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative">
                <img
                  src={displayImages[activeImageIndex]}
                  alt={property.title}
                  className="w-full h-96 object-cover"
                />
                {property.featured && (
                  <Badge className="absolute top-4 left-4 bg-orange-500">Featured</Badge>
                )}
                <Badge
                  variant={property.type === "sale" ? "default" : "secondary"}
                  className="absolute top-4 right-4"
                >
                  {property.type === "sale" ? "For Sale" : "For Rent"}
                </Badge>
              </div>
              
              {displayImages.length > 1 && (
                <div className="p-4">
                  <div className="flex gap-2 overflow-x-auto">
                    {displayImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${
                          index === activeImageIndex ? 'border-blue-500' : 'border-slate-200'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`View ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Property Details */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                    <div className="flex items-center text-slate-600 mb-4">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{property.location}</span>
                      {property.country && <span className="ml-2">• {property.country}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsFavorited(!isFavorited)}
                    >
                      <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current text-red-500' : ''}`} />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-slate-600">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    <span>{property.bedrooms} bed</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    <span>{property.bathrooms} bath</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    <span>{property.sqft} sqft</span>
                  </div>
                  {property.year_built && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Built {property.year_built}</span>
                    </div>
                  )}
                </div>

                <div className="text-3xl font-bold text-blue-600">
                  {property.price} {property.currency}
                  {property.type === "rent" && "/month"}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="prose max-w-none">
                  <p className="text-slate-700 leading-relaxed">{property.description}</p>
                </div>

                {property.features && property.features.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold mb-3">Features & Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {property.features.map((feature, index) => (
                        <Badge key={index} variant="outline">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Enhanced Analytics Tabs */}
            <Tabs defaultValue="location" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="neighborhood">Neighborhood</TabsTrigger>
                <TabsTrigger value="market">Market Data</TabsTrigger>
                <TabsTrigger value="investment">Investment</TabsTrigger>
              </TabsList>
              
              <TabsContent value="location" className="mt-6">
                <PropertyMap 
                  address={property.location}
                  latitude={40.7128} // Mock coordinates
                  longitude={-74.0060}
                />
              </TabsContent>
              
              <TabsContent value="neighborhood" className="mt-6">
                <NeighborhoodAnalytics location={property.location} />
              </TabsContent>
              
              <TabsContent value="market" className="mt-6">
                <MarketIntelligence
                  propertyPrice={property.price}
                  currency={property.currency}
                  location={property.location}
                  propertyType="Apartment" // This would come from property data
                />
              </TabsContent>
              
              <TabsContent value="investment" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-green-600" />
                      Investment Calculator
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold">Purchase Costs</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Property Price:</span>
                            <span className="font-medium">{property.price} {property.currency}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Transaction Fees (2%):</span>
                            <span className="font-medium">{(property.price * 0.02).toFixed(3)} {property.currency}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Legal Fees (1%):</span>
                            <span className="font-medium">{(property.price * 0.01).toFixed(3)} {property.currency}</span>
                          </div>
                          <div className="border-t pt-2 flex justify-between font-semibold">
                            <span>Total Investment:</span>
                            <span>{(property.price * 1.03).toFixed(3)} {property.currency}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold">Projected Returns</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Monthly Rental (Est.):</span>
                            <span className="font-medium">{(property.price * 0.04).toFixed(3)} {property.currency}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Annual Rental Yield:</span>
                            <span className="font-medium text-green-600">4.8%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>5-Year Appreciation:</span>
                            <span className="font-medium text-blue-600">+45%</span>
                          </div>
                          <div className="border-t pt-2 flex justify-between font-semibold">
                            <span>Total ROI (5 years):</span>
                            <span className="text-green-600">+69%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h5 className="font-semibold text-blue-800 mb-2">Investment Insights</h5>
                      <p className="text-sm text-blue-700">
                        This property offers strong fundamentals with above-average rental yields and solid appreciation potential. 
                        The location shows consistent growth trends and strong rental demand.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Seller</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {property.contact_name && (
                  <div>
                    <p className="font-medium">{property.contact_name}</p>
                    {property.contact_email && (
                      <p className="text-sm text-slate-600">{property.contact_email}</p>
                    )}
                    {property.contact_phone && (
                      <p className="text-sm text-slate-600">{property.contact_phone}</p>
                    )}
                  </div>
                )}
                
                <div className="space-y-2">
                  <Button className="w-full">Send Message</Button>
                  <Button variant="outline" className="w-full">Schedule Viewing</Button>
                  <Button variant="outline" className="w-full">
                    <Calculator className="h-4 w-4 mr-2" />
                    Crypto Calculator
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Property Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Walk Score</span>
                    <Badge className="bg-green-100 text-green-800">Excellent (85)</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Safety Score</span>
                    <Badge className="bg-blue-100 text-blue-800">Very Safe (78)</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">School Rating</span>
                    <Badge className="bg-purple-100 text-purple-800">8.5/10</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Investment Grade</span>
                    <Badge className="bg-orange-100 text-orange-800">A-</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Similar Properties */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex gap-3">
                        <div className="w-16 h-12 bg-slate-200 rounded"></div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">Modern Downtown Loft</p>
                          <p className="text-xs text-slate-600">2 bed • 1.5 bath</p>
                          <p className="text-sm font-bold text-blue-600">{(property.price * (0.9 + i * 0.1)).toFixed(1)} {property.currency}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
