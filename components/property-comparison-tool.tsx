"use client"

import { useState } from "react"
import { X, Plus, Scale, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import type { Property } from "@/lib/database"

interface PropertyComparisonToolProps {
  availableProperties: Property[]
  className?: string
}

export function PropertyComparisonTool({ availableProperties, className = "" }: PropertyComparisonToolProps) {
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const addProperty = (property: Property) => {
    if (selectedProperties.length < 3 && !selectedProperties.find((p) => p.id === property.id)) {
      setSelectedProperties([...selectedProperties, property])
      setIsAddDialogOpen(false)
      setSearchTerm("")
    }
  }

  const removeProperty = (propertyId: number) => {
    setSelectedProperties(selectedProperties.filter((p) => p.id !== propertyId))
  }

  const filteredProperties = availableProperties
    .filter(
      (property) =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((property) => !selectedProperties.find((p) => p.id === property.id))

  const getComparisonRows = () => {
    return [
      {
        label: "Price",
        getValue: (property: Property) => `${property.price} ${property.currency}`,
        getComparison: (properties: Property[]) => {
          // Convert all to USD for comparison (using mock rates)
          const rates = { BTC: 43250, ETH: 2580, SOL: 98.5, USDC: 1, USDT: 1 }
          const usdPrices = properties.map((p) => p.price * (rates[p.currency as keyof typeof rates] || 1))
          const minPrice = Math.min(...usdPrices)
          const maxPrice = Math.max(...usdPrices)
          return properties.map((p, i) => {
            const usdPrice = usdPrices[i]
            if (usdPrice === minPrice) return "lowest"
            if (usdPrice === maxPrice) return "highest"
            return "middle"
          })
        },
      },
      {
        label: "Price per sqft",
        getValue: (property: Property) => {
          const rates = { BTC: 43250, ETH: 2580, SOL: 98.5, USDC: 1, USDT: 1 }
          const usdPrice = property.price * (rates[property.currency as keyof typeof rates] || 1)
          return `$${(usdPrice / property.sqft).toFixed(2)}/sqft`
        },
      },
      {
        label: "Location",
        getValue: (property: Property) => property.location,
      },
      {
        label: "Type",
        getValue: (property: Property) => (property.type === "sale" ? "For Sale" : "For Rent"),
      },
      {
        label: "Bedrooms",
        getValue: (property: Property) => property.bedrooms.toString(),
        getComparison: (properties: Property[]) => {
          const bedrooms = properties.map((p) => p.bedrooms)
          const maxBedrooms = Math.max(...bedrooms)
          return properties.map((p) => (p.bedrooms === maxBedrooms ? "highest" : "normal"))
        },
      },
      {
        label: "Bathrooms",
        getValue: (property: Property) => property.bathrooms.toString(),
        getComparison: (properties: Property[]) => {
          const bathrooms = properties.map((p) => p.bathrooms)
          const maxBathrooms = Math.max(...bathrooms)
          return properties.map((p) => (p.bathrooms === maxBathrooms ? "highest" : "normal"))
        },
      },
      {
        label: "Square Feet",
        getValue: (property: Property) => property.sqft.toLocaleString(),
        getComparison: (properties: Property[]) => {
          const sqfts = properties.map((p) => p.sqft)
          const maxSqft = Math.max(...sqfts)
          return properties.map((p) => (p.sqft === maxSqft ? "highest" : "normal"))
        },
      },
      {
        label: "Year Built",
        getValue: (property: Property) => property.year_built?.toString() || "N/A",
        getComparison: (properties: Property[]) => {
          const years = properties.map((p) => p.year_built || 0).filter((y) => y > 0)
          if (years.length === 0) return properties.map(() => "normal")
          const maxYear = Math.max(...years)
          return properties.map((p) => ((p.year_built || 0) === maxYear ? "highest" : "normal"))
        },
      },
      {
        label: "Accepted Cryptos",
        getValue: (property: Property) => (property.accepted_currencies || [property.currency]).length.toString(),
      },
      {
        label: "Features Count",
        getValue: (property: Property) => (property.features || []).length.toString(),
        getComparison: (properties: Property[]) => {
          const featureCounts = properties.map((p) => (p.features || []).length)
          const maxFeatures = Math.max(...featureCounts)
          return properties.map((p) => ((p.features || []).length === maxFeatures ? "highest" : "normal"))
        },
      },
    ]
  }

  if (selectedProperties.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-orange-500" />
            Property Comparison
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="text-slate-500 mb-4">Select properties to compare side by side</div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Property to Compare
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Select Property to Compare</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="max-h-96 overflow-y-auto space-y-2">
                  {filteredProperties.map((property) => (
                    <div
                      key={property.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 cursor-pointer"
                      onClick={() => addProperty(property)}
                    >
                      <div className="flex-1">
                        <div className="font-medium">{property.title}</div>
                        <div className="text-sm text-slate-600 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {property.location}
                        </div>
                        <div className="text-sm font-semibold text-orange-600">
                          {property.price} {property.currency}
                        </div>
                      </div>
                      <Button size="sm">Add</Button>
                    </div>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    )
  }

  const comparisonRows = getComparisonRows()

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-orange-500" />
            Property Comparison ({selectedProperties.length}/3)
          </CardTitle>
          {selectedProperties.length < 3 && (
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Property
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Select Property to Compare</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Search properties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="max-h-96 overflow-y-auto space-y-2">
                    {filteredProperties.map((property) => (
                      <div
                        key={property.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 cursor-pointer"
                        onClick={() => addProperty(property)}
                      >
                        <div className="flex-1">
                          <div className="font-medium">{property.title}</div>
                          <div className="text-sm text-slate-600 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {property.location}
                          </div>
                          <div className="text-sm font-semibold text-orange-600">
                            {property.price} {property.currency}
                          </div>
                        </div>
                        <Button size="sm">Add</Button>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2 border-b font-medium">Feature</th>
                {selectedProperties.map((property) => (
                  <th key={property.id} className="text-left p-2 border-b min-w-48">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="font-medium text-sm line-clamp-2">{property.title}</div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeProperty(property.id)}
                          className="p-1 h-6 w-6"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="text-xs text-slate-600 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {property.location}
                      </div>
                      <img
                        src={property.images?.[0] || "/placeholder.svg"}
                        alt={property.title}
                        className="w-full h-24 object-cover rounded"
                      />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, rowIndex) => {
                const comparisons = row.getComparison ? row.getComparison(selectedProperties) : []
                return (
                  <tr key={rowIndex} className="border-b">
                    <td className="p-2 font-medium text-sm">{row.label}</td>
                    {selectedProperties.map((property, colIndex) => {
                      const comparison = comparisons[colIndex]
                      return (
                        <td key={property.id} className="p-2">
                          <div
                            className={`text-sm ${
                              comparison === "highest"
                                ? "font-semibold text-green-600"
                                : comparison === "lowest"
                                  ? "font-semibold text-red-600"
                                  : ""
                            }`}
                          >
                            {row.getValue(property)}
                            {comparison === "highest" && (
                              <Badge variant="secondary" className="ml-1 text-xs bg-green-100 text-green-700">
                                Best
                              </Badge>
                            )}
                            {comparison === "lowest" && row.label === "Price" && (
                              <Badge variant="secondary" className="ml-1 text-xs bg-blue-100 text-blue-700">
                                Lowest
                              </Badge>
                            )}
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
