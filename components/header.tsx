"use client"

import Link from "next/link"
import { User, LogOut, Plus, Menu, X } from "lucide-react"
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
import { Logo } from "@/components/ui/logo"

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
    <header className="sticky top-0 z-50 px-4 lg:px-6 h-20 flex items-center bg-white/80 backdrop-blur-xl border-b border-slate-200">
      <Link className="flex items-center justify-center" href="/">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
          <div className="w-6 h-6 bg-white rounded-md"></div>
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" style={{ fontFamily: 'Copperplate, "Copperplate Gothic Light", fantasy' }}>Ligatur</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="ml-auto hidden md:flex gap-2 items-center">
        <Link
          className="relative text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors px-4 py-2 rounded-full hover:bg-slate-100"
          href="/listings"
        >
          Browse Properties
        </Link>

        {!loading && (
          <>
            {user ? (
              <>
                <Link
                  className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors px-4 py-2 rounded-full hover:bg-slate-100"
                  href="/create"
                >
                  List Property
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-slate-100">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <span className="hidden lg:inline max-w-32 truncate text-sm font-medium text-slate-700">
                        {user.email?.split('@')[0]}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
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
                    <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 text-red-500 hover:text-red-600">
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link
                  className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors px-4 py-2 rounded-full hover:bg-slate-100"
                  href="/auth/login"
                >
                  Sign In
                </Link>
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2 rounded-full">
                  <Link href="/auth/signup">Create Account</Link>
                </Button>
              </>
            )}
          </>
        )}
      </nav>

      {/* Mobile Navigation */}
      <div className="ml-auto md:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-full hover:bg-slate-100"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5 text-slate-700" /> : <Menu className="h-5 w-5 text-slate-700" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-xl border-b shadow-2xl z-50 md:hidden">
          <nav className="flex flex-col p-6 space-y-6">
            <Link
              className="text-lg font-medium text-slate-700 hover:text-blue-600 py-3 px-4 rounded-xl hover:bg-slate-100 transition-all"
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
                      className="text-lg font-medium text-slate-700 hover:text-blue-600 py-3 px-4 rounded-xl hover:bg-slate-100 transition-all"
                      href="/create"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      List Property
                    </Link>
                    <Link
                      className="text-lg font-medium text-slate-700 hover:text-blue-600 py-3 px-4 rounded-xl hover:bg-slate-100 transition-all"
                      href="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Properties
                    </Link>
                    <div className="border-t border-slate-200 pt-6">
                      <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-slate-50">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div className="text-sm font-medium text-slate-700 truncate">{user.email}</div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          handleSignOut()
                          setIsMobileMenuOpen(false)
                        }}
                        className="w-full text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      className="text-lg font-medium text-slate-700 hover:text-blue-600 py-3 px-4 rounded-xl hover:bg-slate-100 transition-all"
                      href="/auth/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white w-full rounded-xl py-3 text-base font-semibold">
                      <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                        Create Account
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
