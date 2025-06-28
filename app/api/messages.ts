import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/messages - Get user's message threads
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get('propertyId');

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' }, 
        { status: 404 }
      );
    }

    if (propertyId) {
      // Get messages for specific property
      const messages = await prisma.message.findMany({
        where: {
          propertyId,
          OR: [
            { fromId: user.id },
            { toId: user.id }
          ]
        },
        include: {
          from: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              verified: true
            }
          },
          to: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              verified: true
            }
          },
          property: {
            select: {
              id: true,
              title: true,
              images: true,
              priceUsd: true,
              city: true,
              country: true
            }
          }
        },
        orderBy: { createdAt: 'asc' }
      });

      return NextResponse.json({
        success: true,
        data: messages
      });
    } else {
      // Get all message threads for user
      const messageThreads = await prisma.message.findMany({
        where: {
          OR: [
            { fromId: user.id },
            { toId: user.id }
          ]
        },
        include: {
          from: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              verified: true
            }
          },
          to: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              verified: true
            }
          },
          property: {
            select: {
              id: true,
              title: true,
              images: true,
              priceUsd: true,
              city: true,
              country: true,
              owner: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  image: true,
                  verified: true
                }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      // Group messages by property and conversation partner
      const threads = messageThreads.reduce((acc, message) => {
        const partnerId = message.fromId === user.id ? message.toId : message.fromId;
        const threadKey = `${message.propertyId}-${partnerId}`;
        
        if (!acc[threadKey]) {
          acc[threadKey] = {
            propertyId: message.propertyId,
            property: message.property,
            partner: message.fromId === user.id ? message.to : message.from,
            messages: [],
            lastMessage: message,
            unreadCount: 0
          };
        }
        
        acc[threadKey].messages.push(message);
        
        if (message.createdAt > acc[threadKey].lastMessage.createdAt) {
          acc[threadKey].lastMessage = message;
        }
        
        return acc;
      }, {} as any);

      return NextResponse.json({
        success: true,
        data: Object.values(threads)
      });
    }
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' }, 
      { status: 500 }
    );
  }
}

// POST /api/messages - Send a new message
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    const { propertyId, toUserId, content } = await request.json();

    if (!propertyId || !toUserId || !content) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' }, 
        { status: 404 }
      );
    }

    // Verify property exists
    const property = await prisma.property.findUnique({
      where: { id: propertyId }
    });

    if (!property) {
      return NextResponse.json(
        { success: false, error: 'Property not found' }, 
        { status: 404 }
      );
    }

    // Verify recipient exists
    const recipient = await prisma.user.findUnique({
      where: { id: toUserId }
    });

    if (!recipient) {
      return NextResponse.json(
        { success: false, error: 'Recipient not found' }, 
        { status: 404 }
      );
    }

    const message = await prisma.message.create({
      data: {
        content,
        propertyId,
        fromId: user.id,
        toId: toUserId
      },
      include: {
        from: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            verified: true
          }
        },
        to: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            verified: true
          }
        },
        property: {
          select: {
            id: true,
            title: true,
            images: true,
            priceUsd: true,
            city: true,
            country: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: message,
      message: 'Message sent successfully'
    });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message' }, 
      { status: 500 }
    );
  }
}