"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Edit, Trash2, MapPin, Bed, Bath, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getUserProperties, deleteProperty, type Property } from "@/lib/database"
import { useAuth } from "@/components/auth-provider"
import { Header } from "@/components/header"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    async function fetchUserProperties() {
      if (!user) return

      try {
        setIsLoading(true)
        const data = await getUserProperties(user.id)
        setProperties(data)
      } catch (error) {
        console.error("Error fetching user properties:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchUserProperties()
    }
  }, [user])

  const handleDelete = async (propertyId: number) => {
    if (!user) return

    if (!confirm("Are you sure you want to delete this property listing? This action cannot be undone.")) {
      return
    }

    try {
      await deleteProperty(propertyId, user.id)
      setProperties((prev) => prev.filter((p) => p.id !== propertyId))
    } catch (error) {
      console.error("Error deleting property:", error)
      alert("Failed to delete property. Please try again.")
    }
  }

  // Helper function to get display image
  const getDisplayImage = (property: Property) => {
    const defaultImage =
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"

    if (!property.images || property.images.length === 0) {
      return defaultImage
    }

    const firstImage = property.images[0]
    // Check if it's a blob URL or invalid, use default instead
    if (!firstImage || firstImage.startsWith("blob:") || firstImage.includes("blob.vercel.app")) {
      return defaultImage
    }

    return firstImage
  }

  if (loading || isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading your properties...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-4 md:py-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">My Properties</h1>
            <p className="text-slate-600">Manage your property listings</p>
          </div>
          <Button asChild>
            <Link href="/create">
              <Plus className="h-4 w-4 mr-2" />
              List New Property
            </Link>
          </Button>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-600 mb-2">No properties listed yet</h3>
            <p className="text-slate-500 mb-4 px-4">Create your first property listing to get started!</p>
            <Button asChild>
              <Link href="/create">List Your First Property</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={getDisplayImage(property) || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-40 md:h-48 object-cover"
                    onError={(e) => {
                      // Fallback if image fails to load
                      const target = e.target as HTMLImageElement
                      target.src =
                        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    }}
                  />
                  {property.featured && <Badge className="absolute top-2 left-2 bg-orange-500 text-xs">Featured</Badge>}
                  <Badge
                    variant={property.type === "sale" ? "default" : "secondary"}
                    className="absolute top-2 right-2 text-xs"
                  >
                    {property.type === "sale" ? "For Sale" : "For Rent"}
                  </Badge>
                </div>
                <CardContent className="p-3 md:p-4">
                  <h3 className="font-semibold text-base md:text-lg mb-2 line-clamp-2 break-words">{property.title}</h3>
                  <div className="flex items-start text-slate-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                    <span className="text-sm break-words line-clamp-1">{property.location}</span>
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
                <CardFooter className="p-3 md:p-4 pt-0 flex gap-2">
                  <Button asChild variant="outline" className="flex-1 bg-transparent text-sm">
                    <Link href={`/property/${property.id}`}>View</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/property/${property.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(property.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
