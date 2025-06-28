// app/api/properties/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth-utils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const skip = (page - 1) * limit
    
    const type = searchParams.get('type')
    const propertyType = searchParams.get('propertyType')
    const city = searchParams.get('city')
    const country = searchParams.get('country')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const bedrooms = searchParams.get('bedrooms')
    const bathrooms = searchParams.get('bathrooms')
    const featured = searchParams.get('featured')
    const tokenized = searchParams.get('tokenized')
    const search = searchParams.get('search')

    // Build where clause
    const where: any = {}
    
    if (type) where.type = type.toUpperCase()
    if (propertyType) where.propertyType = propertyType.toUpperCase()
    if (city) where.city = { contains: city, mode: 'insensitive' }
    if (country) where.country = { contains: country, mode: 'insensitive' }
    if (minPrice) where.priceUsd = { ...where.priceUsd, gte: parseInt(minPrice) }
    if (maxPrice) where.priceUsd = { ...where.priceUsd, lte: parseInt(maxPrice) }
    if (bedrooms) where.bedrooms = { gte: parseInt(bedrooms) }
    if (bathrooms) where.bathrooms = { gte: parseInt(bathrooms) }
    if (featured === 'true') where.featured = true
    if (tokenized === 'true') where.tokenized = true
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { country: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        skip,
        take: limit,
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              verified: true,
              walletAddress: true
            }
          }
        },
        orderBy: [
          { featured: 'desc' },
          { createdAt: 'desc' }
        ]
      }),
      prisma.property.count({ where })
    ])

    return NextResponse.json({
      properties,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching properties:', error)
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const data = await request.json()
    
    const property = await prisma.property.create({
      data: {
        ...data,
        ownerId: user.id,
        priceUsd: parseInt(data.priceUsd),
        area: parseInt(data.area),
        bedrooms: data.bedrooms ? parseInt(data.bedrooms) : null,
        bathrooms: data.bathrooms ? parseInt(data.bathrooms) : null,
        parking: data.parking ? parseInt(data.parking) : null,
        cryptoAmount: data.cryptoAmount ? parseFloat(data.cryptoAmount) : null,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            verified: true,
            walletAddress: true
          }
        }
      }
    })

    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(property)
  } catch (error) {
    console.error('Error fetching property:', error)
    return NextResponse.json(
      { error: 'Failed to fetch property' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Check if user owns the property
    const existingProperty = await prisma.property.findUnique({
      where: { id: params.id }
    })

    if (!existingProperty || existingProperty.ownerId !== user.id) {
      return NextResponse.json(
        { error: 'Property not found or access denied' },
        { status: 404 }
      )
    }

    const data = await request.json()
    
    const property = await prisma.property.update({
      where: { id: params.id },
      data: {
        ...data,
        priceUsd: data.priceUsd ? parseInt(data.priceUsd) : undefined,
        area: data.area ? parseInt(data.area) : undefined,
        bedrooms: data.bedrooms ? parseInt(data.bedrooms) : undefined,
        bathrooms: data.bathrooms ? parseInt(data.bathrooms) : undefined,
        parking: data.parking ? parseInt(data.parking) : undefined,
        cryptoAmount: data.cryptoAmount ? parseFloat(data.cryptoAmount) : undefined,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            verified: true,
            walletAddress: true
          }
        }
      }
    })

    return NextResponse.json(property)
  } catch (error) {
    console.error('Error updating property:', error)
    return NextResponse.json(
      { error: 'Failed to update property' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Check if user owns the property
    const existingProperty = await prisma.property.findUnique({
      where: { id: params.id }
    })

    if (!existingProperty || existingProperty.ownerId !== user.id) {
      return NextResponse.json(
        { error: 'Property not found or access denied' },
        { status: 404 }
      )
    }

    await prisma.property.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting property:', error)
    return NextResponse.json(
      { error: 'Failed to delete property' },
      { status: 500 }
    )
  }
}: {
            id: true,
            name: true,
            email: true,
            image: true,
            verified: true,
            walletAddress: true
          }
        }
      }
    })

    return NextResponse.json(property)
  } catch (error) {
    console.error('Error creating property:', error)
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    )
  }
}

// app/api/properties/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth-utils'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const property = await prisma.property.findUnique({
      where: { id: params.id },
      include: {
        owner: {
          select