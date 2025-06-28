// app/page.tsx
import { PropertySearch } from '@/components/PropertySearch'
import { PropertyCard } from '@/components/PropertyCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Bitcoin, Building, Users, TrendingUp, ArrowRight, MapPin, Bed, Bath, Square } from 'lucide-react'
import Link from 'next/link'

async function getFeaturedProperties() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/properties?featured=true&limit=6`, {
      cache: 'no-store'
    })
    if (!res.ok) throw new Error('Failed to fetch properties')
    return res.json()
  } catch (error) {
    console.error('Error fetching properties:', error)
    return []
  }
}

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-crypto-dark via-slate-900 to-crypto-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-crypto-blue/20 to-crypto-gold/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-crypto-blue to-crypto-gold bg-clip-text text-transparent">
                Premium Real Estate
              </span>
              <br />
              <span className="text-white">Powered by Crypto</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Buy, sell, and rent premium real estate with cryptocurrency. Access global properties with direct peer-to-peer transactions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-crypto-blue to-crypto-gold hover:opacity-90">
                Browse Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-gray-600 text-white hover:bg-gray-800">
                List Property
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Building className="h-12 w-12 text-crypto-blue mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">2,500+</h3>
                <p className="text-gray-600">Properties Listed</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-crypto-gold mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">10,000+</h3>
                <p className="text-gray-600">Active Users</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Bitcoin className="h-12 w-12 text-crypto-blue mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
                <p className="text-gray-600">Crypto Transactions</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-crypto-gold mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">$2.5B+</h3>
                <p className="text-gray-600">Total Value</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Property Search */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Property</h2>
            <p className="text-lg text-gray-600">Search through our extensive collection of premium properties</p>
          </div>
          <PropertySearch />
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Properties</h2>
              <p className="text-lg text-gray-600">Handpicked premium properties with crypto payment options</p>
            </div>
            <Link href="/properties">
              <Button variant="outline">
                View All Properties
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.length > 0 ? (
              featuredProperties.map((property: any) => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              // Fallback mock properties if no data
              [1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <Building className="h-12 w-12 text-gray-400" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">
                          Sample Property {i}
                        </h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">Sample Location</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">$500,000</div>
                        <div className="text-sm text-crypto-blue">≈ 12.5 BTC</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        <span>3</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        <span>2</span>
                      </div>
                      <div className="flex items-center">
                        <Square className="h-4 w-4 mr-1" />
                        <span>120m²</span>
                      </div>
                    </div>
                    
                    <Button className="w-full">View Details</Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose CryptoRealty?</h2>
            <p className="text-lg text-gray-600">Experience the future of real estate transactions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-8 text-center">
                <Bitcoin className="h-16 w-16 text-crypto-blue mx-auto mb-6" />
                <h3 className="text-xl font-semibold mb-4">Crypto Payments</h3>
                <p className="text-gray-600">
                  Direct peer-to-peer transactions using Bitcoin, Ethereum, and other cryptocurrencies
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-8 text-center">
                <Building className="h-16 w-16 text-crypto-gold mx-auto mb-6" />
                <h3 className="text-xl font-semibold mb-4">Global Properties</h3>
                <p className="text-gray-600">
                  Access premium real estate worldwide with transparent blockchain-based ownership
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="h-16 w-16 text-crypto-blue mx-auto mb-6" />
                <h3 className="text-xl font-semibold mb-4">Direct Connect</h3>
                <p className="text-gray-600">
                  Connect directly with property owners using wallet addresses for seamless transactions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-crypto-blue to-crypto-gold">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Crypto Real Estate Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of users already trading premium properties with cryptocurrency
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-crypto-blue hover:bg-gray-100">
              Sign Up Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-crypto-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Bitcoin className="h-8 w-8 text-crypto-gold mr-2" />
                <span className="text-xl font-bold">CryptoRealty</span>
              </div>
              <p className="text-gray-400">
                The future of real estate transactions powered by blockchain technology.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Properties</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">For Sale</a></li>
                <li><a href="#" className="hover:text-white">For Rent</a></li>
                <li><a href="#" className="hover:text-white">Luxury</a></li>
                <li><a href="#" className="hover:text-white">Commercial</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Property Calculator</a></li>
                <li><a href="#" className="hover:text-white">Market Analysis</a></li>
                <li><a href="#" className="hover:text-white">Property Valuation</a></li>
                <li><a href="#" className="hover:text-white">Investment Guide</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CryptoRealty. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}