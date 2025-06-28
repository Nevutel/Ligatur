// components/PropertyCard.tsx
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Property {
  id: string
  title: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  sqft: number
  image?: string
  type: string
}

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="h-48 bg-gray-200 flex items-center justify-center">
          {property.image ? (
            <img 
              src={property.image} 
              alt={property.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-500">No Image Available</div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
        <p className="text-2xl font-bold text-blue-600 mb-2">
          ${property.price.toLocaleString()}
        </p>
        <p className="text-gray-600 mb-3">{property.location}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <span>{property.bedrooms} bed</span>
          <span>{property.bathrooms} bath</span>
          <span>{property.sqft.toLocaleString()} sqft</span>
        </div>
        <div className="mt-2">
          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
            {property.type}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}
