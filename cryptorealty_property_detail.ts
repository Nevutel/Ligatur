// app/property/[id]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/lib/auth-context'
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Car, 
  Star, 
  Shield, 
  Coins,
  User,
  Mail,
  Phone,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Copy,
  Check
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Property {
  id: string
  title: string
  description: string
  priceUsd: number
  cryptoAmount?: number
  cryptoCurrency?: string
  ownerWalletAddress?: string
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
  tokenAddress?: string
  network?: string
  owner: {
    id: string
    name: string
    email: string
    image?: string
    verified: boolean
    walletAddress?: string
  }
  createdAt: string
}

export default function PropertyDetailPage() {
  const params = useParams()
  const { user } = useAuth()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [message, setMessage] = useState('')
  const [sendingMessage, setSendingMessage] = useState(false)
  const [copiedWallet, setCopiedWallet] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchProperty(params.id as string)
    }
  }, [params.id])

  const fetchProperty = async (id: string) => {
    try {
      const response = await fetch(`/api/properties/${id}`)
      if (response.ok) {
        const data = await response.json()
        setProperty(data)
      }
    } catch (error) {
      console.error('Error fetching property:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (!user || !property || !message.trim()) return

    setSendingMessage(true)
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
        },
        body: JSON.stringify({
          propertyId: property.id,
          toUserId: property.owner.id,
          content: message
        })
      })

      if (response.ok) {
        setMessage('')
        alert('Message sent successfully!')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message')
    } finally {
      setSendingMessage(false)
    }
  }

  const copyWalletAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    setCopiedWallet(true)
    setTimeout(() => setCopiedWallet(false), 2000)
  }

  const nextImage = () => {
    if (property?.images) {
      setCurrentImageIndex((prev) => 
        prev === property.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (property?.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? property.images.length - 1 : prev - 1
      )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-crypto-blue" />
        <span className="ml-2 text-gray-600">Loading property...</span>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <Link href="/properties">
            <Button>Back to Properties</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Image Gallery */}
      <div className="relative h-96 md:h-[500px] bg-gray-200">
        {property.images && property.images.length > 0 ? (
          <>
            <Image
              src={property.images[currentImageIndex]}
              alt={property.title}
              fill
              className="object-cover"
            />
            {property.images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <Square className="h-16 w-16 mx-auto mb-4" />
              <p>No images available</p>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {property.featured && (
                  <Badge className="bg-crypto-gold text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
                {property.verified && (
                  <Badge className="bg-green-500 text-white">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
                {property.tokenized && (
                  <Badge className="bg-crypto-blue text-white">
                    <Coins className="h-3 w-3 mr-1" />
                    Tokenized
                  </Badge>
                )}
                <Badge variant="outline">
                  {property.type === 'RENT' ? 'For Rent' : 'For Sale'}
                </Badge>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {property.title}
              </h1>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-1" />
                <span>{property.address}, {property.city}, {property.country}</span>
              </div>

              <div className="flex items-center gap-6 text-gray-600 mb-6">
                {property.bedrooms && (
                  <div className="flex items-center">
                    <Bed className="h-5 w-5 mr-1" />
                    <span>{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 mr-1" />
                    <span>{property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Square className="h-5 w-5 mr-1" />
                  <span>{property.area}m²</span>
                </div>
                {property.parking && (
                  <div className="flex items-center">
                    <Car className="h-5 w-5 mr-1" />
                    <span>{property.parking} parking</span>
                  </div>
                )}
              </div>

              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  ${property.priceUsd.toLocaleString()}
                </div>
                {property.cryptoAmount && property.cryptoCurrency && (
                  <div className="text-lg text-crypto-blue font-semibold">
                    ≈ {property.cryptoAmount} {property.cryptoCurrency}
                  </div>
                )}
              </div>
            </div>

            {/* Property Details Tabs */}
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="amenities">Amenities</TabsTrigger>
                    <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="description" className="mt-6">
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed">
                        {property.description}
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="amenities" className="mt-6">
                    {property.amenities && property.amenities.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {property.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-crypto-blue rounded-full mr-3"></div>
                            <span className="text-gray-700">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No amenities listed</p>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="blockchain" className="mt-6">
                    <div className="space-y-4">
                      {property.tokenized ? (
                        <>
                          <div className="p-4 bg-crypto-blue/10 rounded-lg">
                            <h4 className="font-semibold text-crypto-blue mb-2">Tokenized Property</h4>
                            <p className="text-gray-700 mb-3">
                              This property is tokenized on the blockchain, enabling fractional ownership and transparent transactions.
                            </p>
                            {property.tokenAddress && (
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Token Address
                                </label>
                                <div className="flex items-center gap-2">
                                  <code className="bg-gray-100 px-3 py-2 rounded text-sm flex-1">
                                    {property.tokenAddress}
                                  </code>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => copyWalletAddress(property.tokenAddress!)}
                                  >
                                    {copiedWallet ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                  </Button>
                                </div>
                              </div>
                            )}
                            {property.network && (
                              <div className="mt-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Network
                                </label>
                                <span className="text-gray-900">{property.network}</span>
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-gray-600">This property is not yet tokenized.</p>
                        </div>
                      )}
                      
                      {property.ownerWalletAddress && (
                        <div className="p-4 bg-crypto-gold/10 rounded-lg">
                          <h4 className="font-semibold text-crypto-gold mb-2">Owner Wallet Address</h4>
                          <p className="text-gray-700 mb-3">
                            Contact the owner directly using their crypto wallet address for peer-to-peer transactions.
                          </p>
                          <div className="flex items-center gap-2">
                            <code className="bg-gray-100 px-3 py-2 rounded text-sm flex-1">
                              {property.ownerWalletAddress}
                            </code>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyWalletAddress(property.ownerWalletAddress!)}
                            >
                              {copiedWallet ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Owner Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Property Owner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-3 mb-4">
                  {property.owner.image ? (
                    <Image
                      src={property.owner.image}
                      alt={property.owner.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{property.owner.name}</h3>
                      {property.owner.verified && (
                        <Shield className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">{property.owner.email}</p>
                  </div>
                </div>

                {property.owner.walletAddress && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Wallet Address
                    </label>
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs flex-1 truncate">
                        {property.owner.walletAddress}
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyWalletAddress(property.owner.walletAddress!)}
                      >
                        {copiedWallet ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      </Button>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Button className="w-full" asChild>
                    <a href={`mailto:${property.owner.email}`}>
                      <Mail className="h-4 w-4 mr-2" />
                      Email Owner
                    </a>
                  </Button>
                  
                  {user && user.id !== property.owner.id && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          Send Message
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Send Message to {property.owner.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Textarea
                            placeholder="Type your message here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={4}
                          />
                          <Button 
                            onClick={handleSendMessage} 
                            disabled={!message.trim() || sendingMessage}
                            className="w-full"
                          >
                            {sendingMessage ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Sending...
                              </>
                            ) : (
                              'Send Message'
                            )}
                          </Button>
                        </div>
                      </DialogContent>