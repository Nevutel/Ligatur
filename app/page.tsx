import { TrendingUp, Shield, Zap, Globe, MapPin, Search, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-orange-50/20">
        <div className="container mx-auto px-4 py-20 max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="flex flex-col justify-center space-y-8">
              {/* Badge */}
              <div className="flex items-center gap-2">
                <Badge className="px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800 border-blue-200">
                  🚀 The Future of Real Estate
                </Badge>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
                  Trade Real Estate
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
                    with Crypto
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-600 max-w-2xl leading-relaxed">
                  Experience the next generation of buying, selling, and renting properties. Direct, peer-to-peer, and decentralized real estate transactions powered by cryptocurrency.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-md">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-1 border border-white/50 shadow-lg">
                  <div className="flex items-center gap-3 px-4 py-3">
                    <Search className="h-5 w-5 text-slate-400" />
                    <Input 
                      placeholder="Search by location, country..." 
                      className="border-0 bg-transparent text-lg placeholder:text-slate-400 focus:ring-0"
                    />
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="text-lg px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-xl hover:shadow-2xl transition-all duration-300" asChild>
                  <Link href="/listings" className="flex items-center gap-2">
                    Explore Properties
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 rounded-2xl border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white" asChild>
                  <Link href="/create">List Property</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">2.4K+</div>
                  <div className="text-sm text-slate-600">Properties</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">150+</div>
                  <div className="text-sm text-slate-600">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">$2.8B</div>
                  <div className="text-sm text-slate-600">In Transactions</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Luxury modern property"
                  className="w-full aspect-[4/3] object-cover rounded-2xl"
                />
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-2 text-sm bg-blue-100 text-blue-800 border-blue-200">
              Why Choose Ligatur
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Revolutionizing Real Estate
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experience seamless property transactions with cutting-edge technology, human-moderated listings, and unmatched security.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <Card className="border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Blockchain Security</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Every transaction is secured by blockchain technology, ensuring complete transparency and immutable records.
                </p>
                <Badge variant="secondary" className="px-3 py-1">
                  256-bit Encryption
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Instant Settlements</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Complete property purchases in minutes, not weeks. Peer-to-peer transactions reduce latency and bureaucracy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Global Access</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Access properties worldwide without traditional banking limitations or currency restrictions.
                </p>
                <Badge variant="secondary" className="px-3 py-1">
                  150+ Countries
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Decentralize?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join the revolution of cryptocurrency real estate. Start exploring properties today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4 rounded-2xl bg-white text-blue-600 hover:bg-slate-100" asChild>
              <Link href="/listings">Explore Properties</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 rounded-2xl border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <Link href="/auth/signup">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold" style={{ fontFamily: 'Copperplate, "Copperplate Gothic Light", fantasy' }}>Ligatur</span>
              </Link>
              <p className="text-slate-400 max-w-md mb-6">
                Experience the next generation of buying, selling, and renting properties. Direct, peer-to-peer, and decentralized real estate transactions powered by cryptocurrency.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/listings" className="hover:text-white transition-colors">Browse Properties</Link></li>
                <li><Link href="/create" className="hover:text-white transition-colors">List Property</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center">
            <p className="text-slate-400 text-sm">
              © 2025 Ligatur. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
