export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  verified: boolean;
  walletAddress?: string;
  createdAt: Date;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  priceUsd: number;
  cryptoAmount?: number;
  cryptoCurrency?: string;
  ownerWalletAddress?: string;
  address: string;
  city: string;
  country: string;
  latitude?: number;
  longitude?: number;
  type: PropertyType;
  propertyType: PropertyCategory;
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  parking?: number;
  amenities: string[];
  images: string[];
  featured: boolean;
  verified: boolean;
  tokenized: boolean;
  tokenAddress?: string;
  network?: string;
  owner: User;
  ownerId: string;
  createdAt: Date;
}

export enum PropertyType {
  RENT = 'RENT',
  SALE = 'SALE'
}

export enum PropertyCategory {
  APARTMENT = 'APARTMENT',
  HOUSE = 'HOUSE',
  CONDO = 'CONDO',
  VILLA = 'VILLA',
  COMMERCIAL = 'COMMERCIAL'
}

export interface Message {
  id: string;
  content: string;
  property: Property;
  propertyId: string;
  from: User;
  fromId: string;
  to: User;
  toId: string;
  createdAt: Date;
}

export interface PropertySearchFilters {
  type?: PropertyType;
  propertyType?: PropertyCategory[];
  city?: string;
  country?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  minArea?: number;
  maxArea?: number;
  amenities?: string[];
  cryptoPayment?: boolean;
  tokenized?: boolean;
  featured?: boolean;
  verified?: boolean;
}

export interface SearchParams {
  query?: string;
  filters?: PropertySearchFilters;
  page?: number;
  limit?: number;
  sortBy?: 'price' | 'area' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface PropertyStats {
  totalProperties: number;
  totalValue: number;
  averagePrice: number;
  tokenizedProperties: number;
}

export interface CryptoPrice {
  currency: string;
  usd: number;
  symbol: string;
  name: string;
  lastUpdated: Date;
}

export interface PropertyFormData {
  title: string;
  description: string;
  priceUsd: number;
  cryptoAmount?: number;
  cryptoCurrency?: string;
  ownerWalletAddress?: string;
  address: string;
  city: string;
  country: string;
  latitude?: number;
  longitude?: number;
  type: PropertyType;
  propertyType: PropertyCategory;
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  parking?: number;
  amenities: string[];
  images: File[];
  tokenized: boolean;
  tokenAddress?: string;
  network?: string;
}

export interface AuthUser extends User {
  accessToken?: string;
}

export interface MessageThread {
  propertyId: string;
  property: Property;
  participants: User[];
  messages: Message[];
  lastMessage: Message;
  unreadCount: number;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
}

export interface City {
  name: string;
  country: string;
  countryCode: string;
}

export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  contentType: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  total?: number;
  page?: number;
  totalPages?: number;
}

export interface PropertyCardProps {
  property: Property;
  className?: string;
  showContactButton?: boolean;
}

export interface SearchFiltersProps {
  onFiltersChange: (filters: PropertySearchFilters) => void;
  initialFilters?: PropertySearchFilters;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}