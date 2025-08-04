import { TrendingUp, Shield, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4 lg:pl-8">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  The Future of Real Estate is{" "}
                  <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                    Crypto
                  </span>
                </h1>
                <p className="max-w-[600px] text-slate-600 md:text-xl">
                  Buy, sell, and rent properties using cryptocurrency. Secure, transparent, and global real estate
                  transactions.
                </p>
              </div>
              <div className="flex flex-col gap-3 min-[400px]:flex-row">
                <Button size="lg" className="text-lg px-8 py-6" asChild>
                  <Link href="/listings">Browse Properties</Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent" asChild>
                  <Link href="/create">List Your Property</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Modern luxury home interior"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-lg italic text-orange-600 font-medium bg-orange-50 inline-block px-4 py-2 rounded-lg">
              Direct peer-to-peer realty connection
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <Card>
              <CardContent className="flex flex-col items-center space-y-4 p-6">
                <Shield className="h-12 w-12 text-orange-500" />
                <h3 className="text-xl font-bold">Secure Transactions</h3>
                <p className="text-center text-slate-600">
                  All transactions are secured by blockchain technology, ensuring transparency and trust.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center space-y-4 p-6">
                <Zap className="h-12 w-12 text-orange-500" />
                <h3 className="text-xl font-bold">Instant Payments</h3>
                <p className="text-center text-slate-600">
                  Complete property transactions instantly with cryptocurrency payments.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center space-y-4 p-6">
                <TrendingUp className="h-12 w-12 text-orange-500" />
                <h3 className="text-xl font-bold">Global Market</h3>
                <p className="text-center text-slate-600">
                  Access properties worldwide without traditional banking limitations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-slate-600">© 2025 Ligatur. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="/contact">
            Contact Us
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="/privacy">
            Privacy & Terms
          </Link>
        </nav>
      </footer>
    </div>
  )
}
