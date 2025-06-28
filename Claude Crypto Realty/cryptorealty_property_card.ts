// components/PropertyCard.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Bed, Bath, Square, Star, Shield, Coins } from 'lucide-react'
import { Card, CardContent, Badge } from './ui/button'
import { formatPrice, formatCryptoPrice, formatArea, getPropertyImageUrl, truncateAddress } from '@/lib/utils'

interface PropertyCardProps {
  property: {
    id: string
    title: string
    priceUsd: number
    cryptoAmount?: number | null
    cryptoCurrency?: string | null
    address: string
    city: string
    country: string
    type: 'RENT' | 'SALE'
    propertyType: string
    bedrooms?: number | null
    bathrooms?: number | null
    area: number
    images: string[]
    featured: boolean
    verified: boolean
    tokenized: boolean
    ownerWalletAddress?: string | null
    owner: {
      name: string
      avatar?: string | null
    }
  }
  className?: string
}

export default function PropertyCard({ property, className = '' }: PropertyCardProps) {
  const mainImage = getPropertyImageUrl(property.images)
  const priceText = property.type === 'RENT' ? '/month' : ''

  return (
    <Card className={`group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${className}`}>
      <div className="relative">
        {/* Property Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={mainImage}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Overlay Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {property.featured && (
              <Badge variant="featured" className="flex items-center">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
            {property.verified && (
              <Badge variant="verified" className="flex items-center">
                <Shield className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
            {property.tokenized && (
              <Badge variant="tokenized" className="flex items-center">
                <Coins className="h-3 w-3 mr-1" />
                Tokenized
              </Badge>
            )}
          </div>

          {/* Property Type Badge */}
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-background/90 backdrop-blur">
              For {property.type === 'SALE' ? 'Sale' : 'Rent'}
            </Badge>
          </div>

          {/* Price Overlay */}
          <div className="absolute bottom-3 left-3">
            <div className="bg-background/90 backdrop-blur rounded-lg px-3 py-2">
              <div className="text-lg font-bold text-foreground">
                {formatPrice(property.priceUsd)}{priceText}
              </div>
              {property.cryptoAmount && property.cryptoCurrency && (
                <div className="text-xs text-muted-foreground">
                  {formatCryptoPrice(property.cryptoAmount, property.cryptoCurrency)}
                </div>
              )}
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Property Title */}
          <Link href={`/property/${property.id}`} className="block mb-2">
            <h3 className="font-semibold text-lg text-foreground hover:text-crypto-blue transition-colors line-clamp-2">
              {property.title}
            </h3>
          </Link>

          {/* Location */}
          <div className="flex items-center text-muted-foreground mb-3">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="text-sm truncate">
              {property.city}, {property.country}
            </span>
          </div>

          {/* Property Details */}
          <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              {property.bedrooms && (
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  <span>{property.bedrooms}</span>
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  <span>{property.bathrooms}</span>
                </div>
              )}
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1" />
                <span>{formatArea(property.area)}</span>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              {property.propertyType}
            </Badge>
          </div>

          {/* Owner/Agent Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-brand flex items-center justify-center text-white text-sm font-medium">
                {property.owner.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">
                  {property.owner.name}
                </div>
                {property.ownerWalletAddress && (
                  <div className="text-xs text-muted-foreground font-mono">
                    {truncateAddress(property.ownerWalletAddress)}
                  </div>
                )}
              </div>
            </div>
            
            <Link href={`/property/${property.id}`}>
              <button className="px-4 py-2 bg-crypto-blue hover:bg-crypto-blue/90 text-white text-sm rounded-md transition-colors">
                View Details
              </button>
            </Link>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}