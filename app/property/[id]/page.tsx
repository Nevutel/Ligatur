"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Share2, Heart, Calculator, MapPin, Bed, Bath, Square, Calendar, Mail, Phone, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { getProperty, type Property } from "@/lib/database"
import { useAuth } from "@/components/auth-provider"
import { Header } from "@/components/header"
import { PropertyImageGallery } from "@/components/property-image-gallery"
import { ContactFormModal } from "@/components/contact-form-modal"
import { CryptoPriceCalculator } from "@/components/crypto-price-calculator"
import { PropertyMap } from "@/components/property-map"
import { NeighborhoodAnalytics } from "@/components/neighborhood-analytics"
import { MarketIntelligence } from "@/components/market-intelligence"
import { obfuscateEmail, formatPhone } from "@/utils/email-obfuscation"

export default function PropertyPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { user } = useAuth()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const propertyId = Number.parseInt(params.id)

  useEffect(() => {
    async function fetchProperty() {
      if (isNaN(propertyId)) {
        router.push("/listings")
        return
      }

      try {
        setLoading(true)
        const data = await getProperty(propertyId)
        if (!data) {
          router.push("/listings")
          return
        }
        setProperty(data)
      } catch (error) {
        console.error("Error fetching property:", error)
        router.push("/listings")
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [propertyId, router])

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading property...</p>
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
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Property Not Found</h2>
            <p className="text-slate-600 mb-4">The property you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link href="/listings">Back to Listings</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const isOwner = user && property.user_id === user.id

  const cryptocurrencyLabels: Record<string, string> = {
    BTC: "Bitcoin (BTC)",
    ETH: "Ethereum (ETH)",
    SOL: "Solana (SOL)",
    TRX: "Tron (TRX)",
    XMR: "Monero (XMR)",
    USDC: "USD Coin (USDC)",
    USDT: "Tether (USDT)",
  }

  // Get display images - use default if no images or if images are blob URLs
  const getDisplayImages = () => {
    const defaultImage =
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"

    if (!property.images || property.images.length === 0) {
      return [defaultImage]
    }

    // Filter out blob URLs and invalid images, replace with default
    const validImages = property.images.map((img) => {
      if (!img || img.startsWith("blob:") || img.includes("blob.vercel.app")) {
        return defaultImage
      }
      return img
    })

    return validImages.length > 0 ? validImages : [defaultImage]
  }

  const displayImages = getDisplayImages()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-4 md:py-8 max-w-7xl">
        {/* Back Button and Edit Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <Button variant="ghost" asChild className="self-start">
            <Link href="/listings">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Listings
            </Link>
          </Button>
          {isOwner && (
            <Button variant="outline" asChild>
              <Link href={`/property/${property.id}/edit`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Listing
              </Link>
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery with Slideshow */}
            <PropertyImageGallery images={displayImages} title={property.title} />

            {/* Property Details */}
            <div className="space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge variant={property.type === "sale" ? "default" : "secondary"}>
                    {property.type === "sale" ? "For Sale" : "For Rent"}
                  </Badge>
                  {property.featured && <Badge className="bg-orange-500">Featured</Badge>}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-3 break-words">{property.title}</h1>
                <div className="flex items-start text-slate-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-base md:text-lg break-words">{property.location}</span>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-orange-600 break-words">
                  {property.price} {property.currency}
                  {property.type === "rent" && "/month"}
                </div>
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <div className="text-center p-3 md:p-4 bg-slate-50 rounded-lg">
                  <Bed className="h-5 w-5 md:h-6 md:w-6 mx-auto mb-2 text-slate-600" />
                  <div className="font-semibold text-sm md:text-base">{property.bedrooms}</div>
                  <div className="text-xs md:text-sm text-slate-600">Bedrooms</div>
                </div>
                <div className="text-center p-3 md:p-4 bg-slate-50 rounded-lg">
                  <Bath className="h-5 w-5 md:h-6 md:w-6 mx-auto mb-2 text-slate-600" />
                  <div className="font-semibold text-sm md:text-base">{property.bathrooms}</div>
                  <div className="text-xs md:text-sm text-slate-600">Bathrooms</div>
                </div>
                <div className="text-center p-3 md:p-4 bg-slate-50 rounded-lg">
                  <Square className="h-5 w-5 md:h-6 md:w-6 mx-auto mb-2 text-slate-600" />
                  <div className="font-semibold text-sm md:text-base">{property.sqft}</div>
                  <div className="text-xs md:text-sm text-slate-600">Sq Ft</div>
                </div>
                <div className="text-center p-3 md:p-4 bg-slate-50 rounded-lg">
                  <Calendar className="h-5 w-5 md:h-6 md:w-6 mx-auto mb-2 text-slate-600" />
                  <div className="font-semibold text-sm md:text-base">{property.year_built || "N/A"}</div>
                  <div className="text-xs md:text-sm text-slate-600">Year Built</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-lg md:text-xl font-semibold mb-3">Description</h2>
                <p className="text-slate-600 leading-relaxed break-words">{property.description}</p>
              </div>

              {/* Features */}
              {property.features && property.features.length > 0 && (
                <div>
                  <h2 className="text-lg md:text-xl font-semibold mb-3">Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-slate-600 text-sm md:text-base break-words">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

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
            {/* Crypto Price Calculator */}
            <CryptoPriceCalculator propertyPrice={property.price} propertyCurrency={property.currency} />

            {/* Payment Options */}
            <Card>
              <CardHeader>
                <CardTitle>Accepted Cryptocurrencies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {property.accepted_currencies && property.accepted_currencies.length > 0 ? (
                    property.accepted_currencies.map((currency) => (
                      <div key={currency} className="flex items-center justify-between gap-2">
                        <span className="text-sm break-words">{cryptocurrencyLabels[currency] || currency}</span>
                        <Badge variant="outline" className="flex-shrink-0">
                          {currency === property.currency ? "Primary" : "Accepted"}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm break-words">
                        {cryptocurrencyLabels[property.currency] || property.currency}
                      </span>
                      <Badge variant="outline" className="flex-shrink-0">
                        Primary
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Contact Owner Card - Back at bottom of sidebar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Contact Owner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-semibold break-words">{property.contact_name || "Property Owner"}</div>
                  {property.contact_email && (
                    <div className="text-sm text-slate-600 flex items-start mt-2">
                      <Mail className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="break-all">{obfuscateEmail(property.contact_email)}</span>
                    </div>
                  )}
                  {property.contact_phone && (
                    <div className="text-sm text-slate-600 flex items-center mt-1">
                      <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>{formatPhone(property.contact_phone)}</span>
                    </div>
                  )}
                  {property.preferred_contact && (
                    <div className="text-xs text-slate-500 mt-2">
                      Prefers: {property.preferred_contact === "both" ? "Email & Phone" : property.preferred_contact}
                    </div>
                  )}
                </div>
                <Separator />
                <div className="space-y-2">
                  <Button className="w-full" onClick={() => setIsContactModalOpen(true)}>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <div className="bg-blue-50 border border-blue-200 text-blue-700 px-3 py-2 rounded-md text-xs">
                    <Shield className="h-3 w-3 inline mr-1" />
                    Email address is partially hidden for privacy protection
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      <ContactFormModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        propertyTitle={property.title}
        ownerName={property.contact_name || "Property Owner"}
        ownerEmail={property.contact_email || "nevutel@proton.me"}
        ownerPhone={property.contact_phone}
        preferredContact={property.preferred_contact}
      />
    </div>
  )
}
