import { PrismaClient, PropertyType, PropertyCategory } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create demo users
  const hashedPassword = await bcrypt.hash('demo123', 12);

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'john@example.com' },
      update: {},
      create: {
        email: 'john@example.com',
        name: 'John Smith',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        verified: true,
        walletAddress: '0x742d35Cc6634C0532925a3b8D0C7c2B4b1c8b123',
      },
    }),
    prisma.user.upsert({
      where: { email: 'sarah@example.com' },
      update: {},
      create: {
        email: 'sarah@example.com',
        name: 'Sarah Johnson',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e4?w=100&h=100&fit=crop&crop=face',
        verified: true,
        walletAddress: '0x8ba1f109551bD432803012645Hac189451c8b456',
      },
    }),
    prisma.user.upsert({
      where: { email: 'mike@example.com' },
      update: {},
      create: {
        email: 'mike@example.com',
        name: 'Mike Chen',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        verified: false,
        walletAddress: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
      },
    }),
    prisma.user.upsert({
      where: { email: 'demo@cryptorealty.com' },
      update: {},
      create: {
        email: 'demo@cryptorealty.com',
        name: 'Demo User',
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
        verified: true,
        walletAddress: '0xdemo1234567890abcdef1234567890abcdef123456',
      },
    }),
  ]);

  console.log('✅ Created users:', users.length);

  // Create demo properties
  const properties = [
    {
      title: 'Executive Penthouse Suite',
      description: 'Luxurious penthouse with wraparound terrace, private elevator access, and panoramic city views. Premium finishes throughout with marble countertops and hardwood floors.',
      priceUsd: 12000,
      cryptoAmount: 4.8,
      cryptoCurrency: 'ETH',
      ownerWalletAddress: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
      address: '321 Skyline Boulevard, Penthouse',
      city: 'San Francisco',
      country: 'United States',
      latitude: 37.7749,
      longitude: -122.4194,
      type: PropertyType.RENT,
      propertyType: PropertyCategory.APARTMENT,
      bedrooms: 3,
      bathrooms: 3,
      area: 250,
      parking: 2,
      amenities: ['City View', 'Private Elevator', 'Terrace', 'Gym', 'Concierge', 'Smart Home'],
      images: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop',
      ],
      featured: true,
      verified: true,
      tokenized: true,
      tokenAddress: '0xtoken987654321fedcba987654321fedcba98765432',
      network: 'Polygon',
      ownerId: users[2].id,
    },
    {
      title: 'Historic Brownstone',
      description: 'Beautifully restored 19th-century brownstone in prestigious neighborhood. Original architectural details preserved with modern updates.',
      priceUsd: 1750000,
      cryptoAmount: 45.5,
      cryptoCurrency: 'BTC',
      ownerWalletAddress: '0xdemo1234567890abcdef1234567890abcdef123456',
      address: '567 Heritage Lane',
      city: 'Boston',
      country: 'United States',
      latitude: 42.3601,
      longitude: -71.0589,
      type: PropertyType.SALE,
      propertyType: PropertyCategory.HOUSE,
      bedrooms: 4,
      bathrooms: 3,
      area: 320,
      parking: 1,
      amenities: ['Historic Features', 'Garden', 'Fireplace', 'Original Hardwood', 'Basement'],
      images: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      ],
      featured: false,
      verified: true,
      tokenized: false,
      ownerId: users[3].id,
    },
    {
      title: 'Waterfront Condo',
      description: 'Contemporary waterfront condominium with floor-to-ceiling windows and private balcony overlooking the marina.',
      priceUsd: 1200000,
      cryptoAmount: 31.2,
      cryptoCurrency: 'BTC',
      ownerWalletAddress: '0x742d35Cc6634C0532925a3b8D0C7c2B4b1c8b123',
      address: '890 Marina Way, Unit 12B',
      city: 'Seattle',
      country: 'United States',
      latitude: 47.6062,
      longitude: -122.3321,
      type: PropertyType.SALE,
      propertyType: PropertyCategory.CONDO,
      bedrooms: 2,
      bathrooms: 2,
      area: 140,
      parking: 1,
      amenities: ['Water View', 'Balcony', 'Marina Access', 'Gym', 'Pool'],
      images: [
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753051-e97b8c4e1c6b?w=800&h=600&fit=crop',
      ],
      featured: false,
      verified: true,
      tokenized: true,
      tokenAddress: '0xtokenabcdef123456789abcdef123456789abcdef1',
      network: 'Ethereum',
      ownerId: users[0].id,
    },
  ];

  const createdProperties = [];
  for (const propertyData of properties) {
    const property = await prisma.property.create({
      data: propertyData,
    });
    createdProperties.push(property);
  }

  console.log('✅ Created properties:', createdProperties.length);

  // Create some sample messages
  const messages = [
    {
      content: 'Hi, I\'m interested in viewing this property. Is it available for a showing this weekend?',
      propertyId: createdProperties[0].id,
      fromId: users[1].id,
      toId: users[0].id,
    },
    {
      content: 'Hello! Yes, the property is available. I can schedule a showing for Saturday at 2 PM. Would that work for you?',
      propertyId: createdProperties[0].id,
      fromId: users[0].id,
      toId: users[1].id,
    },
    {
      content: 'Perfect! Saturday at 2 PM works great. Should I bring any documentation?',
      propertyId: createdProperties[0].id,
      fromId: users[1].id,
      toId: users[0].id,
    },
    {
      content: 'I love the apartment! Can you tell me more about the building amenities?',
      propertyId: createdProperties[1].id,
      fromId: users[2].id,
      toId: users[1].id,
    },
    {
      content: 'Thank you! The building has a 24/7 concierge, fitness center, rooftop terrace with city views, and private storage. Would you like to schedule a tour?',
      propertyId: createdProperties[1].id,
      fromId: users[1].id,
      toId: users[2].id,
    },
  ];

  for (const messageData of messages) {
    await prisma.message.create({
      data: messageData,
    });
  }

  console.log('✅ Created messages:', messages.length);

  console.log('🎉 Database seeded successfully!');
  console.log('\n📊 Summary:');
  console.log(`   Users: ${users.length}`);
  console.log(`   Properties: ${createdProperties.length}`);
  console.log(`   Messages: ${messages.length}`);
  console.log('\n🔐 Demo Accounts:');
  console.log('   Email: demo@cryptorealty.com');
  console.log('   Email: john@example.com');
  console.log('   Email: sarah@example.com');
  console.log('   Email: mike@example.com');
  console.log('   Password: demo123 (for all accounts)');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });Luxury Beachfront Villa',
      description: 'Stunning oceanfront villa with panoramic views, private beach access, and modern amenities. This architectural masterpiece features floor-to-ceiling windows, infinity pool, and smart home technology.',
      priceUsd: 2500000,
      cryptoAmount: 65.0,
      cryptoCurrency: 'BTC',
      ownerWalletAddress: '0x742d35Cc6634C0532925a3b8D0C7c2B4b1c8b123',
      address: '123 Ocean Drive',
      city: 'Miami',
      country: 'United States',
      latitude: 25.7617,
      longitude: -80.1918,
      type: PropertyType.SALE,
      propertyType: PropertyCategory.VILLA,
      bedrooms: 5,
      bathrooms: 4,
      area: 450,
      parking: 3,
      amenities: ['Swimming Pool', 'Ocean View', 'Private Beach', 'Smart Home', 'Gym', 'Wine Cellar'],
      images: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      ],
      featured: true,
      verified: true,
      tokenized: true,
      tokenAddress: '0xtoken123456789abcdef123456789abcdef12345678',
      network: 'Ethereum',
      ownerId: users[0].id,
    },
    {
      title: 'Modern Downtown Apartment',
      description: 'Sleek apartment in the heart of the financial district. Features open-plan living, premium finishes, and city skyline views from the 35th floor.',
      priceUsd: 850000,
      cryptoAmount: 22.1,
      cryptoCurrency: 'BTC',
      ownerWalletAddress: '0x8ba1f109551bD432803012645Hac189451c8b456',
      address: '456 Financial Street, Unit 3502',
      city: 'New York',
      country: 'United States',
      latitude: 40.7589,
      longitude: -73.9851,
      type: PropertyType.SALE,
      propertyType: PropertyCategory.APARTMENT,
      bedrooms: 2,
      bathrooms: 2,
      area: 120,
      parking: 1,
      amenities: ['City View', 'Gym', 'Concierge', 'Rooftop Terrace', 'Security'],
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      ],
      featured: true,
      verified: true,
      tokenized: false,
      ownerId: users[1].id,
    },
    {
      title: 'Cozy Mountain Cabin',
      description: 'Charming cabin nestled in the mountains, perfect for weekend getaways. Features stone fireplace, wooden deck, and hiking trails nearby.',
      priceUsd: 3500,
      type: PropertyType.RENT,
      address: '789 Mountain Trail',
      city: 'Aspen',
      country: 'United States',
      latitude: 39.1911,
      longitude: -106.8175,
      propertyType: PropertyCategory.HOUSE,
      bedrooms: 3,
      bathrooms: 2,
      area: 180,
      parking: 2,
      amenities: ['Fireplace', 'Mountain View', 'Hiking', 'WiFi', 'Kitchen'],
      images: [
        'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      ],
      featured: false,
      verified: true,
      tokenized: false,
      ownerId: users[2].id,
    },
    {
      title: '