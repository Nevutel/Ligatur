"use client"

import Link from "next/link"
import { Home, User, LogOut, Plus, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/auth-provider"
import { signOut } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function Header() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white">
      <Link className="flex items-center justify-center" href="/">
        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
          <Home className="h-5 w-5 text-white" />
        </div>
        <span className="ml-2 text-xl font-bold">Ligatur</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="ml-auto hidden md:flex gap-4 sm:gap-6 items-center">
        <Link className="text-base font-medium hover:underline underline-offset-4" href="/listings">
          Browse
        </Link>

        {!loading && (
          <>
            {user ? (
              <>
                <Link className="text-base font-medium hover:underline underline-offset-4" href="/create">
                  List Property
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline max-w-32 truncate">{user.email}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        My Properties
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/create" className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        List Property
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 text-red-600">
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link className="text-base font-medium hover:underline underline-offset-4" href="/auth/login">
                  Sign In
                </Link>
                <Button asChild size="sm">
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </>
        )}
      </nav>

      {/* Mobile Navigation */}
      <div className="ml-auto md:hidden">
        <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b shadow-lg z-50 md:hidden">
          <nav className="flex flex-col p-4 space-y-4">
            <Link
              className="text-base font-medium hover:text-orange-600 py-2"
              href="/listings"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Browse Properties
            </Link>

            {!loading && (
              <>
                {user ? (
                  <>
                    <Link
                      className="text-base font-medium hover:text-orange-600 py-2"
                      href="/create"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      List Property
                    </Link>
                    <Link
                      className="text-base font-medium hover:text-orange-600 py-2"
                      href="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Properties
                    </Link>
                    <div className="border-t pt-4">
                      <div className="text-sm text-slate-600 mb-2 truncate">{user.email}</div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          handleSignOut()
                          setIsMobileMenuOpen(false)
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      className="text-base font-medium hover:text-orange-600 py-2"
                      href="/auth/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Button asChild size="sm" className="self-start">
                      <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                        Sign Up
                      </Link>
                    </Button>
                  </>
                )}
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
