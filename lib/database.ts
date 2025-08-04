// Database utility functions for Supabase integration
import { createClient } from "@supabase/supabase-js"

// Check if we have valid Supabase environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Determine if we're in development/preview mode
const isDevelopment = !supabaseUrl || !supabaseKey || supabaseUrl.includes("placeholder")

// Create client only if we have valid credentials
export const supabase = isDevelopment ? null : createClient(supabaseUrl!, supabaseKey!)

// Log Supabase initialization status
if (isDevelopment) {
  console.log("Supabase: Running in development/mock data mode. NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY not set or invalid.")
} else if (supabase) {
  console.log("Supabase: Client initialized successfully for production.")
} else {
  console.error("Supabase: Failed to initialize client despite environment variables being present. Check configuration.")
}


export type Property = {
  id: number
  title: string
  description: string
  location: string
  country?: string
  price: number
  currency: string
  accepted_currencies?: string[]
  type: "sale" | "rent"
  bedrooms: number
  bathrooms: number
  sqft: number
  year_built?: number
  features: string[]
  images: string[]
  featured: boolean
  contact_name?: string
  contact_email?: string
  contact_phone?: string
  preferred_contact?: string
  user_id?: string
  created_at: string
  updated_at: string
}

export type Agent = {
  id: number
  name: string
  email: string
  phone?: string
  wallet_address?: string
  created_at: string
}

export type Inquiry = {
  id: number
  property_id: number
  name: string
  email: string
  phone?: string
  message?: string
  inquiry_type: string
  created_at: string
}

// Mock data for development/preview
const mockProperties: Property[] = [
  {
    id: 1,
    title: "Modern Downtown Penthouse",
    description:
      "Stunning penthouse apartment in the heart of downtown with panoramic city views. This modern unit features high-end finishes, floor-to-ceiling windows, and a private terrace.",
    location: "New York, NY",
    country: "United States",
    price: 2.5,
    currency: "BTC",
    accepted_currencies: ["BTC", "ETH", "USDC"],
    type: "sale",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2400,
    year_built: 2020,
    features: [
      "Panoramic city views",
      "Private terrace",
      "High-end appliances",
      "Floor-to-ceiling windows",
      "Hardwood floors",
      "In-unit laundry",
      "Concierge service",
      "Gym access",
    ],
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    featured: true,
    contact_name: "Sarah Johnson",
    contact_email: "sarah@ligatur.com",
    contact_phone: "+1 (555) 123-4567",
    preferred_contact: "email",
    user_id: "demo-user-1",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    title: "Luxury Beach Villa",
    description:
      "Spectacular oceanfront villa with private beach access. Features include infinity pool, gourmet kitchen, and expansive outdoor living spaces.",
    location: "Miami, FL",
    country: "United States",
    price: 0.8,
    currency: "ETH",
    accepted_currencies: ["ETH", "BTC", "USDT"],
    type: "rent",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3200,
    year_built: 2019,
    features: [
      "Ocean views",
      "Private beach access",
      "Infinity pool",
      "Gourmet kitchen",
      "Outdoor living spaces",
      "Smart home technology",
    ],
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    featured: false,
    contact_name: "Mike Chen",
    contact_email: "mike@ligatur.com",
    contact_phone: "+1 (555) 234-5678",
    preferred_contact: "both",
    user_id: "demo-user-2",
    created_at: "2024-01-14T15:30:00Z",
    updated_at: "2024-01-14T15:30:00Z",
  },
  {
    id: 3,
    title: "Tech Hub Apartment",
    description:
      "Modern apartment in the heart of Silicon Valley. Perfect for tech professionals with high-speed internet, smart home features, and proximity to major tech companies.",
    location: "San Francisco, CA",
    country: "United States",
    price: 1.2,
    currency: "BTC",
    accepted_currencies: ["BTC", "SOL", "USDC"],
    type: "sale",
    bedrooms: 2,
    bathrooms: 1,
    sqft: 1800,
    year_built: 2021,
    features: ["High-speed internet", "Smart home features", "Modern appliances", "Rooftop access", "Bike storage"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    featured: true,
    contact_name: "Emma Rodriguez",
    contact_email: "emma@ligatur.com",
    contact_phone: "+1 (555) 345-6789",
    preferred_contact: "email",
    user_id: "demo-user-3",
    created_at: "2024-01-13T09:15:00Z",
    updated_at: "2024-01-13T09:15:00Z",
  },
  {
    id: 4,
    title: "Mountain Retreat Cabin",
    description:
      "Cozy cabin nestled in the mountains with stunning views and outdoor activities nearby. Perfect for a peaceful getaway or remote work retreat.",
    location: "Aspen, CO",
    country: "United States",
    price: 0.5,
    currency: "ETH",
    accepted_currencies: ["ETH", "BTC"],
    type: "rent",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2000,
    year_built: 2018,
    features: ["Mountain views", "Fireplace", "Hot tub", "Ski access", "Hiking trails nearby"],
    images: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    featured: false,
    contact_name: "David Wilson",
    contact_email: "david@ligatur.com",
    contact_phone: "+1 (555) 456-7890",
    preferred_contact: "phone",
    user_id: "demo-user-4",
    created_at: "2024-01-12T14:20:00Z",
    updated_at: "2024-01-12T14:20:00Z",
  },
  {
    id: 5,
    title: "London City Loft",
    description:
      "Industrial-style loft in trendy Shoreditch. Features exposed brick, high ceilings, and modern amenities in a converted warehouse building.",
    location: "London",
    country: "United Kingdom",
    price: 1.8,
    currency: "BTC",
    accepted_currencies: ["BTC", "ETH", "USDC"],
    type: "sale",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1600,
    year_built: 2017,
    features: ["Exposed brick", "High ceilings", "Industrial design", "Modern kitchen", "Warehouse conversion"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    featured: false,
    contact_name: "James Smith",
    contact_email: "james@ligatur.com",
    contact_phone: "+44 20 7123 4567",
    preferred_contact: "email",
    user_id: "demo-user-5",
    created_at: "2024-01-11T11:45:00Z",
    updated_at: "2024-01-11T11:45:00Z",
  },
  {
    id: 6,
    title: "Tokyo Modern Apartment",
    description:
      "Sleek modern apartment in central Tokyo with city views. Features minimalist design, high-tech amenities, and excellent transport links.",
    location: "Tokyo",
    country: "Japan",
    price: 0.6,
    currency: "ETH",
    accepted_currencies: ["ETH", "BTC", "USDT"],
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 800,
    year_built: 2022,
    features: ["City views", "Minimalist design", "High-tech amenities", "Transport links", "Balcony"],
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    featured: true,
    contact_name: "Yuki Tanaka",
    contact_email: "yuki@ligatur.com",
    contact_phone: "+81 3-1234-5678",
    preferred_contact: "email",
    user_id: "demo-user-6",
    created_at: "2024-01-10T16:30:00Z",
    updated_at: "2024-01-10T16:30:00Z",
  },
]

// Property functions with fallback to mock data
export async function getProperties(filters?: {
  type?: "sale" | "rent"
  location?: string
  country?: string
  minPrice?: number
  maxPrice?: number
}) {
  console.log("getProperties called with filters:", filters);
  if (isDevelopment) {
    console.log("getProperties: Using mock data.");
    let filteredProperties = [...mockProperties]

    if (filters?.type) {
      filteredProperties = filteredProperties.filter((p) => p.type === filters.type)
    }

    if (filters?.location) {
      filteredProperties = filteredProperties.filter((p) =>
        p.location.toLowerCase().includes(filters.location!.toLowerCase()),
      )
    }

    if (filters?.country) {
      filteredProperties = filteredProperties.filter((p) => p.country === filters.country)
    }

    if (filters?.minPrice) {
      filteredProperties = filteredProperties.filter((p) => p.price >= filters.minPrice!)
    }

    if (filters?.maxPrice) {
      filteredProperties = filteredProperties.filter((p) => p.price <= filters.maxPrice!)
    }

    // Sort by featured first, then by creation date
    return filteredProperties.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })
  }

  // Production Supabase logic
  if (!supabase) {
    console.error("getProperties: Supabase client not initialized. Returning empty array.")
    return []
  }

  let query = supabase
    .from("properties")
    .select("*")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false })

  if (filters?.type) {
    query = query.eq("type", filters.type)
  }

  if (filters?.location) {
    query = query.ilike("location", `%${filters.location}%`)
  }

  if (filters?.country) {
    query = query.eq("country", filters.country)
  }

  if (filters?.minPrice) {
    query = query.gte("price", filters.minPrice)
  }

  if (filters?.maxPrice) {
    query = query.lte("price", filters.maxPrice)
  }

  const { data, error } = await query

  if (error) {
    console.error("getProperties: Error fetching properties from Supabase:", error)
    return []
  }
  console.log(`getProperties: Fetched ${data.length} properties from Supabase.`);
  return data as Property[]
}

export async function getProperty(id: number) {
  console.log(`getProperty called for ID: ${id}`);
  if (isDevelopment) {
    console.log("getProperty: Using mock data.");
    return mockProperties.find((p) => p.id === id) || null
  }

  if (!supabase) {
    console.error("getProperty: Supabase client not initialized. Returning null.")
    return null
  }

  const { data, error } = await supabase
    .from("properties")
    .select(`
      *,
      property_agents (
        agents (*)
      )
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("getProperty: Error fetching property from Supabase:", error)
    return null
  }
  console.log(`getProperty: Fetched property with ID ${id} from Supabase.`);
  return data
}

export async function getUserProperties(userId: string) {
  console.log(`getUserProperties called for user ID: ${userId}`);
  if (isDevelopment) {
    console.log("getUserProperties: Using mock data.");
    return mockProperties.filter((p) => p.user_id === userId)
  }

  if (!supabase) {
    console.error("getUserProperties: Supabase client not initialized. Returning empty array.")
    return []
  }

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("getUserProperties: Error fetching user properties from Supabase:", error)
    return []
  }
  console.log(`getUserProperties: Fetched ${data.length} properties for user ${userId} from Supabase.`);
  return data as Property[]
}

export async function createProperty(property: Omit<Property, "id" | "created_at" | "updated_at">) {
  console.log("createProperty called.");
  if (isDevelopment) {
    // Simulate creating property in development/preview
    console.log("createProperty: Simulating property creation in demo mode.");
    const newProperty: Property = {
      ...property,
      id: Math.max(...mockProperties.map((p) => p.id)) + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    mockProperties.unshift(newProperty)
    return newProperty
  }

  if (!supabase) {
    throw new Error("createProperty: Supabase client not initialized")
  }

  const { data, error } = await supabase.from("properties").insert([property]).select().single()

  if (error) {
    console.error("createProperty: Error creating property in Supabase:", error)
    throw error
  }
  console.log("createProperty: Property created successfully in Supabase.");
  return data as Property
}

export async function updateProperty(id: number, property: Partial<Property>, userId?: string) {
  console.log(`updateProperty called for ID: ${id}, user ID: ${userId || 'N/A'}`);
  if (isDevelopment) {
    // Simulate updating property in development/preview
    console.log("updateProperty: Simulating property update in demo mode.");
    const index = mockProperties.findIndex((p) => p.id === id)
    if (index !== -1) {
      mockProperties[index] = { ...mockProperties[index], ...property, updated_at: new Date().toISOString() }
      return mockProperties[index]
    }
    throw new Error("Property not found")
  }

  if (!supabase) {
    throw new Error("updateProperty: Supabase client not initialized")
  }

  let query = supabase
    .from("properties")
    .update({ ...property, updated_at: new Date().toISOString() })
    .eq("id", id)

  // If userId is provided, ensure user can only update their own properties
  if (userId) {
    query = query.eq("user_id", userId)
  }

  const { data, error } = await query.select().single()

  if (error) {
    console.error("updateProperty: Error updating property in Supabase:", error)
    throw error
  }
  console.log(`updateProperty: Property with ID ${id} updated successfully in Supabase.`);
  return data as Property
}

export async function deleteProperty(id: number, userId?: string) {
  console.log(`deleteProperty called for ID: ${id}, user ID: ${userId || 'N/A'}`);
  if (isDevelopment) {
    // Simulate deleting property in development/preview
    console.log("deleteProperty: Simulating property deletion in demo mode.");
    const index = mockProperties.findIndex((p) => p.id === id)
    if (index !== -1) {
      mockProperties.splice(index, 1)
      return true
    }
    throw new Error("Property not found")
  }

  if (!supabase) {
    throw new Error("deleteProperty: Supabase client not initialized")
  }

  let query = supabase.from("properties").delete().eq("id", id)

  // If userId is provided, ensure user can only delete their own properties
  if (userId) {
    query = query.eq("user_id", userId)
  }

  const { error } = await query

  if (error) {
    console.error("deleteProperty: Error deleting property from Supabase:", error)
    throw error
  }
  console.log(`deleteProperty: Property with ID ${id} deleted successfully from Supabase.`);
  return true
}

export async function createInquiry(inquiry: Omit<Inquiry, "id" | "created_at">) {
  console.log("createInquiry called.");
  if (isDevelopment) {
    // Simulate creating inquiry in development/preview
    console.log("createInquiry: Simulating inquiry creation in demo mode:", inquiry);
    return { id: Date.now(), ...inquiry, created_at: new Date().toISOString() } as Inquiry
  }

  if (!supabase) {
    throw new Error("createInquiry: Supabase client not initialized")
  }

  const { data, error } = await supabase.from("inquiries").insert([inquiry]).select().single()

  if (error) {
    console.error("createInquiry: Error creating inquiry in Supabase:", error)
    throw error
  }
  console.log("createInquiry: Inquiry created successfully in Supabase.");
  return data as Inquiry
}

export async function searchProperties(searchTerm: string, country?: string) {
  console.log(`searchProperties called with searchTerm: "${searchTerm}", country: "${country || 'N/A'}"`);
  if (isDevelopment) {
    console.log("searchProperties: Using mock data.");
    let filteredProperties = mockProperties.filter(
      (property) =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (property.country && property.country.toLowerCase().includes(searchTerm.toLowerCase())),
    )

    if (country) {
      filteredProperties = filteredProperties.filter((p) => p.country === country)
    }

    return filteredProperties.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })
  }

  if (!supabase) {
    console.error("searchProperties: Supabase client not initialized. Returning empty array.")
    return []
  }

  let query = supabase
    .from("properties")
    .select("*")
    .or(`title.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false })

  if (country) {
    query = query.eq("country", country)
  }

  const { data, error } = await query

  if (error) {
    console.error("searchProperties: Error searching properties in Supabase:", error)
    return []
  }
  console.log(`searchProperties: Found ${data.length} properties for search term "${searchTerm}".`);
  return data as Property[]
}

// Get available countries with property counts
export async function getAvailableCountries() {
  console.log("getAvailableCountries called.");
  if (isDevelopment) {
    console.log("getAvailableCountries: Using mock data.");
    const countryCounts = mockProperties.reduce((acc: Record<string, number>, property) => {
      if (property.country) {
        acc[property.country] = (acc[property.country] || 0) + 1
      }
      return acc
    }, {})

    return Object.entries(countryCounts)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
  }

  if (!supabase) {
    console.error("getAvailableCountries: Supabase client not initialized. Returning empty array.")
    return []
  }

  const { data, error } = await supabase.from("properties").select("country").not("country", "is", null)

  if (error) {
    console.error("getAvailableCountries: Error fetching countries from Supabase:", error)
    return []
  }

  // Count properties per country
  const countryCounts = data.reduce((acc: Record<string, number>, item) => {
    if (item.country) {
      acc[item.country] = (acc[item.country] || 0) + 1
    }
    return acc
  }, {})
  console.log(`getAvailableCountries: Found ${Object.keys(countryCounts).length} unique countries.`);
  return Object.entries(countryCounts)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
}

// Favorites functionality
export async function addToFavorites(userId: string, propertyId: number) {
  console.log(`addToFavorites called for user ${userId}, property ${propertyId}.`);
  if (isDevelopment) {
    console.log("addToFavorites: Simulating add to favorites in demo mode:", { userId, propertyId });
    return { id: Date.now(), user_id: userId, property_id: propertyId }
  }

  if (!supabase) {
    throw new Error("addToFavorites: Supabase client not initialized")
  }

  const { data, error } = await supabase
    .from("user_favorites")
    .insert([{ user_id: userId, property_id: propertyId }])
    .select()
    .single()

  if (error) {
    console.error("addToFavorites: Error adding to favorites in Supabase:", error)
    throw error
  }
  console.log("addToFavorites: Added to favorites successfully in Supabase.");
  return data
}

export async function removeFromFavorites(userId: string, propertyId: number) {
  console.log(`removeFromFavorites called for user ${userId}, property ${propertyId}.`);
  if (isDevelopment) {
    console.log("removeFromFavorites: Simulating remove from favorites in demo mode:", { userId, propertyId });
    return true
  }

  if (!supabase) {
    throw new Error("removeFromFavorites: Supabase client not initialized")
  }

  const { error } = await supabase.from("user_favorites").delete().eq("user_id", userId).eq("property_id", propertyId)

  if (error) {
    console.error("removeFromFavorites: Error removing from favorites in Supabase:", error)
    throw error
  }
  console.log("removeFromFavorites: Removed from favorites successfully in Supabase.");
  return true
}

export async function getUserFavorites(userId: string) {
  console.log(`getUserFavorites called for user ${userId}.`);
  if (isDevelopment) {
    // Return some mock favorites
    console.log("getUserFavorites: Using mock data.");
    return mockProperties.slice(0, 2)
  }

  if (!supabase) {
    console.error("getUserFavorites: Supabase client not initialized. Returning empty array.")
    return []
  }

  const { data, error } = await supabase
    .from("user_favorites")
    .select(`
      property_id,
      properties (*)
    `)
    .eq("user_id", userId)

  if (error) {
    console.error("getUserFavorites: Error fetching favorites from Supabase:", error)
    return []
  }
  console.log(`getUserFavorites: Fetched ${data.length} favorites for user ${userId} from Supabase.`);
  return data.map((item) => item.properties).filter(Boolean)
}

export async function isPropertyFavorited(userId: string, propertyId: number) {
  console.log(`isPropertyFavorited called for user ${userId}, property ${propertyId}.`);
  if (isDevelopment) {
    // Simulate some properties being favorited
    console.log("isPropertyFavorited: Simulating favorite status in demo mode.");
    return propertyId <= 2
  }

  if (!supabase) {
    console.error("isPropertyFavorited: Supabase client not initialized. Returning false.")
    return false
  }

  const { data, error } = await supabase
    .from("user_favorites")
    .select("id")
    .eq("user_id", userId)
    .eq("property_id", propertyId)
    .single()

  if (error && error.code !== "PGRST116") {
    console.error("isPropertyFavorited: Error checking favorite status in Supabase:", error)
    return false
  }
  console.log(`isPropertyFavorited: Property ${propertyId} is ${data ? '' : 'not '}favorited by user ${userId}.`);
  return !!data
}

// Saved searches functionality
export async function saveSearch(
  userId: string,
  searchData: {
    name: string
    location?: string
    country?: string
    type?: string
    min_price?: number
    max_price?: number
    currency?: string
  },
) {
  console.log(`saveSearch called for user ${userId}.`);
  if (isDevelopment) {
    console.log("saveSearch: Simulating search save in demo mode:", { userId, searchData });
    return { id: Date.now(), user_id: userId, ...searchData, created_at: new Date().toISOString() }
  }

  if (!supabase) {
    throw new Error("saveSearch: Supabase client not initialized")
  }

  const { data, error } = await supabase
    .from("saved_searches")
    .insert([{ user_id: userId, ...searchData }])
    .select()
    .single()

  if (error) {
    console.error("saveSearch: Error saving search in Supabase:", error)
    throw error
  }
  console.log("saveSearch: Search saved successfully in Supabase.");
  return data
}

export async function getUserSavedSearches(userId: string) {
  console.log(`getUserSavedSearches called for user ${userId}.`);
  if (isDevelopment) {
    // Return some mock saved searches
    console.log("getUserSavedSearches: Using mock data.");
    return [
      {
        id: 1,
        user_id: userId,
        name: "NYC Apartments",
        location: "New York",
        country: "United States",
        type: "rent",
        created_at: new Date().toISOString(),
      },
    ]
  }

  if (!supabase) {
    console.error("getUserSavedSearches: Supabase client not initialized. Returning empty array.")
    return []
  }

  const { data, error } = await supabase
    .from("saved_searches")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("getUserSavedSearches: Error fetching saved searches from Supabase:", error)
    return []
  }
  console.log(`getUserSavedSearches: Fetched ${data.length} saved searches for user ${userId} from Supabase.`);
  return data
}
