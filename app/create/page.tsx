"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { createProperty } from "@/lib/database"
import { useAuth } from "@/components/auth-provider"
import { Header } from "@/components/header"

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Eswatini",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Republic of the Congo",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "São Tomé and Príncipe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
]

const homeTypes = ["House", "Apartment", "Condo", "Multifamily", "Lots/Land", "Manufactured", "Townhome"]

const cryptocurrencies = [
  { value: "BTC", label: "Bitcoin (BTC)" },
  { value: "ETH", label: "Ethereum (ETH)" },
  { value: "SOL", label: "Solana (SOL)" },
  { value: "TRX", label: "Tron (TRX)" },
  { value: "XMR", label: "Monero (XMR)" },
  { value: "USDC", label: "USD Coin (USDC)" },
  { value: "USDT", label: "Tether (USDT)" },
]

export default function CreateListingPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    country: "",
    homeType: "",
    price: "",
    currency: "BTC",
    acceptedCurrencies: ["BTC"] as string[],
    type: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    yearBuilt: "",
    description: "",
    features: [] as string[],
    // Contact information
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    preferredContact: "email",
  })

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  // Pre-fill contact email with user's email
  useEffect(() => {
    if (user && !formData.contactEmail) {
      setFormData((prev) => ({
        ...prev,
        contactEmail: user.email || "",
      }))
    }
  }, [user, formData.contactEmail])

  const propertyFeatures = {
    "Interior Features": {
      Flooring: [
        "Hardwood floors",
        "Marble flooring",
        "Tile flooring",
        "Carpet",
        "Laminate flooring",
        "Bamboo flooring",
        "Concrete floors",
      ],
      Lighting: [
        "Recessed lighting",
        "Crown molding",
        "Track lighting",
        "Pendant lights",
        "Skylights",
        "Smart lighting",
      ],
      Kitchen: [
        "High-end appliances",
        "Granite countertops",
        "Quartz countertops",
        "Kitchen island",
        "Stainless steel appliances",
        "Wine fridge",
        "Double oven",
        "Gas range",
      ],
      Bathrooms: ["Master bathroom", "Walk-in shower", "Soaking tub", "Double vanity", "Heated floors", "Spa shower"],
      Storage: ["Walk-in closets", "Built-in storage", "Pantry", "Mudroom", "Cedar closet"],
      Ceilings: ["Vaulted ceilings", "Exposed beams", "Coffered ceilings", "High ceilings (9ft+)"],
      Windows: ["Floor-to-ceiling windows", "Bay windows", "French doors", "Window treatments included"],
    },
    "Exterior Features": {
      "Outdoor Space": ["Private terrace", "Balcony", "Patio", "Deck", "Rooftop access", "Courtyard"],
      Landscaping: ["Fenced yard", "Mature trees", "Garden", "Sprinkler system", "Drought-resistant landscaping"],
      Views: ["Panoramic views", "Ocean view", "Mountain view", "City skyline", "Park view", "Water view"],
      Architecture: ["Historic details", "Modern design", "Colonial style", "Craftsman", "Contemporary"],
    },
    "Utilities & Systems": {
      Laundry: ["In-unit laundry", "Washer/dryer hookups", "Shared laundry facility"],
      HVAC: ["Central air/heat", "Radiant heating", "Zone climate control", "Energy-efficient systems"],
      Technology: ["Smart home features", "High-speed internet ready", "Security system", "Intercom"],
      Sustainability: ["Solar panels", "Off-grid capable", "Energy-efficient appliances", "Tankless water heater"],
    },
    "Building Amenities": {
      "Staff Services": ["Concierge service", "Doorman", "Valet parking", "Housekeeping available"],
      Fitness: ["Gym access", "Yoga studio", "Tennis court", "Basketball court"],
      Recreation: ["Pool", "Hot tub/spa", "Game room", "Library", "Movie theater", "Business center"],
      Outdoor: ["BBQ area", "Fire pit", "Playground", "Dog park", "Walking trails"],
    },
    "Parking & Transportation": {
      Parking: ["Parking included", "Garage parking", "Covered parking", "Multiple spaces", "EV charging"],
      Access: ["Elevator building", "Wheelchair accessible", "Bike storage", "Near public transit"],
    },
    "Special Features": {
      Condition: ["Move-in ready", "Newly renovated", "Turnkey", "Needs TLC"],
      Furnishing: ["Furnished", "Partially furnished", "Unfurnished"],
      Occupancy: ["Pet-friendly", "No smoking", "Short-term rental allowed"],
      Unique: ["Loft-style", "Duplex", "Penthouse", "Corner unit", "Ground floor", "Top floor"],
    },
    "Security & Safety": {
      Security: ["Gated community", "Security system", "Keyless entry", "Video surveillance"],
      Safety: ["Fire sprinkler system", "Smoke detectors", "Carbon monoxide detectors"],
    },
    "Location Benefits": {
      Neighborhood: ["Quiet street", "Cul-de-sac", "Walkable area", "Near schools", "Shopping nearby"],
      Proximity: ["Beach access", "Ski access", "Downtown location", "Suburban setting"],
    },
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // In a real app, you'd upload to a service like Vercel Blob
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleFeatureChange = (feature: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      features: checked ? [...prev.features, feature] : prev.features.filter((f) => f !== feature),
    }))
  }

  const handleCurrencyChange = (currency: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      acceptedCurrencies: checked
        ? [...prev.acceptedCurrencies, currency]
        : prev.acceptedCurrencies.filter((c) => c !== currency),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      router.push("/auth/login")
      return
    }

    setIsSubmitting(true)

    try {
      // Get custom features from textarea
      const customFeaturesInput = (document.getElementById("customFeatures") as HTMLTextAreaElement)?.value || ""
      const customFeatures = customFeaturesInput
        .split(",")
        .map((feature) => feature.trim())
        .filter((feature) => feature.length > 0)

      // Combine checkbox features with custom features
      const allFeatures = [...formData.features, ...customFeatures]

      // Prepare property data for database
      const propertyData = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        country: formData.country,
        price: Number.parseFloat(formData.price),
        currency: formData.currency,
        accepted_currencies: formData.acceptedCurrencies,
        type: formData.type as "sale" | "rent",
        bedrooms: Number.parseInt(formData.bedrooms),
        bathrooms: Number.parseInt(formData.bathrooms),
        sqft: Number.parseInt(formData.sqft),
        year_built: formData.yearBuilt ? Number.parseInt(formData.yearBuilt) : undefined,
        features: allFeatures,
        images:
          images.length > 0
            ? images
            : [
                "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              ],
        featured: false,
        // Contact information
        contact_name: formData.contactName,
        contact_email: formData.contactEmail,
        contact_phone: formData.contactPhone,
        preferred_contact: formData.preferredContact,
        // Associate with current user
        user_id: user.id,
      }

      // Create property in database
      const newProperty = await createProperty(propertyData)

      console.log("Property created successfully:", newProperty)

      // Redirect to the new property page
      router.push(`/property/${newProperty.id}`)
    } catch (error) {
      console.error("Error creating property:", error)
      alert("Failed to create property listing. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">List Your Property</h1>
          <p className="text-slate-600">Create a new property listing and start accepting crypto payments</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Property Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Modern Downtown Penthouse"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">City/Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="New York, NY"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, country: value }))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="homeType">Home Type</Label>
                  <Select
                    value={formData.homeType}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, homeType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select home type" />
                    </SelectTrigger>
                    <SelectContent>
                      {homeTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                    placeholder="2.5"
                    type="number"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Primary Currency</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, currency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cryptocurrencies.map((crypto) => (
                        <SelectItem key={crypto.value} value={crypto.value}>
                          {crypto.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Listing Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Accepted Cryptocurrencies */}
          <Card>
            <CardHeader>
              <CardTitle>Accepted Cryptocurrencies</CardTitle>
              <p className="text-sm text-slate-600">Select all cryptocurrencies you're willing to accept as payment</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {cryptocurrencies.map((crypto) => (
                  <div key={crypto.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={crypto.value}
                      checked={formData.acceptedCurrencies.includes(crypto.value)}
                      onCheckedChange={(checked) => handleCurrencyChange(crypto.value, checked as boolean)}
                    />
                    <Label htmlFor={crypto.value} className="text-sm">
                      {crypto.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <p className="text-sm text-slate-600">This information will be displayed to potential buyers/renters</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactName">Your Name</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contactName: e.target.value }))}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Email Address</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contactEmail: e.target.value }))}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactPhone">Phone Number (Optional)</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contactPhone: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                  <Select
                    value={formData.preferredContact}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, preferredContact: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="both">Email & Phone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData((prev) => ({ ...prev, bedrooms: e.target.value }))}
                    placeholder="3"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData((prev) => ({ ...prev, bathrooms: e.target.value }))}
                    placeholder="2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="sqft">Square Feet</Label>
                  <Input
                    id="sqft"
                    type="number"
                    value={formData.sqft}
                    onChange={(e) => setFormData((prev) => ({ ...prev, sqft: e.target.value }))}
                    placeholder="2400"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="yearBuilt">Year Built</Label>
                  <Input
                    id="yearBuilt"
                    type="number"
                    value={formData.yearBuilt}
                    onChange={(e) => setFormData((prev) => ({ ...prev, yearBuilt: e.target.value }))}
                    placeholder="2020"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your property..."
                  rows={4}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Property Features</CardTitle>
              <p className="text-sm text-slate-600">Select all features that apply to your property</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(propertyFeatures).map(([category, subcategories]) => (
                <div key={category} className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">{category}</h3>
                  {Object.entries(subcategories).map(([subcategory, features]) => (
                    <div key={subcategory} className="space-y-2">
                      <h4 className="text-sm font-medium text-slate-700">{subcategory}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ml-4">
                        {features.map((feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <Checkbox
                              id={feature}
                              checked={formData.features.includes(feature)}
                              onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                            />
                            <Label htmlFor={feature} className="text-sm">
                              {feature}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              <div className="pt-4 border-t">
                <Label htmlFor="customFeatures">Additional Custom Features</Label>
                <Textarea
                  id="customFeatures"
                  placeholder="Enter additional features separated by commas (e.g., wine cellar, home theater, greenhouse)"
                  rows={3}
                  className="mt-1"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Separate each feature with a comma. These will be added to your selected features above.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Property Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 mx-auto text-slate-400 mb-4" />
                <div className="space-y-2">
                  <Label htmlFor="images" className="cursor-pointer">
                    <span className="text-sm font-medium text-orange-600 hover:text-orange-500">
                      Click to upload images
                    </span>
                    <Input
                      id="images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </Label>
                  <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB each</p>
                </div>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-32 object-contain bg-slate-50 rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-4">
            <Button type="submit" size="lg" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Listing...
                </>
              ) : (
                "Create Listing"
              )}
            </Button>
            <Button type="button" variant="outline" size="lg" asChild>
              <Link href="/listings">Cancel</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
