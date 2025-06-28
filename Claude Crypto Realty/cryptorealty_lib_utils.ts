// lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatCryptoPrice(amount: number, currency: string): string {
  return `${amount.toFixed(6)} ${currency}`
}

export function formatArea(area: number): string {
  return `${area.toLocaleString()} sqm`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

export function truncateAddress(address: string, length = 6): string {
  if (!address) return ''
  return `${address.slice(0, length)}...${address.slice(-4)}`
}

export function generatePropertyId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export const COUNTRIES = [
  'United States',
  'Canada',
  'United Kingdom',
  'Germany',
  'France',
  'Spain',
  'Italy',
  'Netherlands',
  'Switzerland',
  'Austria',
  'Australia',
  'New Zealand',
  'Japan',
  'Singapore',
  'Hong Kong',
  'UAE',
  'Turkey',
  'Brazil',
  'Mexico',
  'Argentina',
  'Other'
].sort()

export const PROPERTY_TYPES = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
  { value: 'condo', label: 'Condo' },
  { value: 'villa', label: 'Villa' },
  { value: 'commercial', label: 'Commercial' },
]

export const CRYPTO_CURRENCIES = [
  { value: 'BTC', label: 'Bitcoin (BTC)' },
  { value: 'ETH', label: 'Ethereum (ETH)' },
  { value: 'USDT', label: 'Tether (USDT)' },
  { value: 'USDC', label: 'USD Coin (USDC)' },
  { value: 'BNB', label: 'Binance Coin (BNB)' },
]

export const AMENITIES = [
  'Swimming Pool',
  'Gym/Fitness Center',
  'Parking',
  'Balcony/Terrace',
  'Garden',
  'Security System',
  'Air Conditioning',
  'Heating',
  'Elevator',
  'Storage',
  'Furnished',
  'Pet Friendly',
  'Internet/WiFi',
  'Laundry',
  'Concierge'
]

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function validatePassword(password: string): boolean {
  return password.length >= 6
}

export function validateWalletAddress(address: string): boolean {
  // Basic validation for common wallet address formats
  if (!address) return true // Optional field
  
  // Bitcoin address (legacy, segwit)
  if (/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(address)) return true
  if (/^bc1[a-z0-9]{39,59}$/.test(address)) return true
  
  // Ethereum address
  if (/^0x[a-fA-F0-9]{40}$/.test(address)) return true
  
  return false
}

export function getPropertyImageUrl(images: string[], index = 0): string {
  if (!images || images.length === 0) {
    return '/placeholder-property.jpg'
  }
  return images[index] || images[0]
}

export function timeAgo(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`
  
  return date.toLocaleDateString()
}