import { TrendingUp, Shield, Zap, Globe, MapPin, Search, ArrowRight, Play, Star, Users, Building, Award } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />

      {/* Hero Section - Cutting Edge Design */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-blue-50/30 to-orange-50/20">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-gold/10 rounded-full filter blur-3xl animate-pulse delay-500"></div>
          </div>
        </div>

        <div className="container-responsive relative z-10 py-20">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="flex flex-col justify-center space-y-8">
              {/* Badge */}
              <div className="flex items-center gap-2">
                <Badge className="glass px-4 py-2 text-sm font-medium border-white/20">
                  🚀 The Future of Real Estate
                </Badge>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
                  Trade Real Estate
                  <br />
                  <span className="text-shine bg-gradient-to-r from-primary via-accent-gold to-secondary bg-clip-text text-transparent">
                    with Crypto
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-neutral-600 max-w-2xl leading-relaxed">
                  Experience the next generation of property trading. Secure, instant, and global real estate transactions powered by cryptocurrency.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-md">
                <div className="glass rounded-2xl p-1 border border-white/20">
                  <div className="flex items-center gap-3 px-4 py-3">
                    <Search className="h-5 w-5 text-neutral-400" />
                    <Input 
                      placeholder="Search by location, country..." 
                      className="border-0 bg-transparent text-lg placeholder:text-neutral-400 focus:ring-0"
                    />
                    <Button size="sm" className="btn-primary rounded-xl px-4">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="btn-primary text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300" asChild>
                  <Link href="/listings" className="flex items-center gap-2">
                    Explore Properties
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="btn-outline text-lg px-8 py-4 rounded-2xl border-2" asChild>
                  <Link href="/create" className="flex items-center gap-2">
                    <Play className="h-5 w-5" />
                    Watch Demo
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">2.4K+</div>
                  <div className="text-sm text-neutral-600">Properties</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">150+</div>
                  <div className="text-sm text-neutral-600">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">$2.8B</div>
                  <div className="text-sm text-neutral-600">In Transactions</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl transform rotate-3"></div>
                <div className="relative glass rounded-3xl p-6 border border-white/20 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Luxury modern property"
                    className="w-full aspect-[4/3] object-cover rounded-2xl"
                  />
                  
                  {/* Floating Cards */}
                  <div className="absolute -top-4 -right-4 glass rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Live Bidding</span>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 glass rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-bold">4.9</span>
                      <span className="text-xs text-neutral-600">Rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="relative w-full py-24 bg-neutral-50">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20">
              Why Choose Ligatur
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Revolutionizing Real Estate
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Experience seamless property transactions with cutting-edge technology and unmatched security.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <Card className="card-elegant card-hover border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4">Blockchain Security</h3>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  Every transaction is secured by blockchain technology, ensuring complete transparency and immutable records.
                </p>
                <Badge variant="secondary" className="px-3 py-1">
                  256-bit Encryption
                </Badge>
              </CardContent>
            </Card>

            <Card className="card-elegant card-hover border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4">Instant Settlements</h3>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  Complete property purchases in minutes, not weeks. Smart contracts automate the entire process.
                </p>
                <Badge variant="secondary" className="px-3 py-1">
                  &lt; 15 Minutes
                </Badge>
              </CardContent>
            </Card>

            <Card className="card-elegant card-hover border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent-gold to-accent-gold/80 flex items-center justify-center">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4">Global Access</h3>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  Invest in properties worldwide without traditional banking limitations or currency restrictions.
                </p>
                <Badge variant="secondary" className="px-3 py-1">
                  150+ Countries
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="w-full py-20 bg-white">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h3 className="font-display text-3xl font-bold mb-4">Trusted by Industry Leaders</h3>
            <p className="text-neutral-600">Join thousands of satisfied users worldwide</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="flex items-center justify-center">
              <Building className="h-12 w-12 text-neutral-400" />
              <span className="ml-2 font-bold text-neutral-400">RealCorp</span>
            </div>
            <div className="flex items-center justify-center">
              <Users className="h-12 w-12 text-neutral-400" />
              <span className="ml-2 font-bold text-neutral-400">PropTech</span>
            </div>
            <div className="flex items-center justify-center">
              <Award className="h-12 w-12 text-neutral-400" />
              <span className="ml-2 font-bold text-neutral-400">EstateAI</span>
            </div>
            <div className="flex items-center justify-center">
              <TrendingUp className="h-12 w-12 text-neutral-400" />
              <span className="ml-2 font-bold text-neutral-400">InvestPro</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-24 bg-gradient-to-br from-primary to-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container-responsive relative z-10 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join the revolution of cryptocurrency real estate. Start exploring properties today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4 rounded-2xl bg-white text-primary hover:bg-neutral-100" asChild>
              <Link href="/listings">Explore Properties</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 rounded-2xl border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link href="/auth/signup">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-16">
        <div className="container-responsive">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mr-3">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <span className="font-display text-2xl font-bold">Ligatur</span>
              </Link>
              <p className="text-neutral-400 max-w-md mb-6">
                The future of real estate trading. Secure, instant, and global property transactions powered by cryptocurrency.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-neutral-700 cursor-pointer transition-colors">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-neutral-700 cursor-pointer transition-colors">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-neutral-700 cursor-pointer transition-colors">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><Link href="/listings" className="hover:text-white transition-colors">Browse Properties</Link></li>
                <li><Link href="/create" className="hover:text-white transition-colors">List Property</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm">
              © 2025 Ligatur. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <span className="text-neutral-400 text-sm">Made with ❤️ for the future</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
