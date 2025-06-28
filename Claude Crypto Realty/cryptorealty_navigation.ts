// components/Navigation.tsx
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Bitcoin, Menu, X, User, LogOut, Plus } from 'lucide-react'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Button } from './ui/button'
import { AuthUser } from '@/lib/auth'

interface NavigationProps {
  user?: AuthUser | null
}

export default function Navigation({ user }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Bitcoin className="h-8 w-8 text-crypto-blue" />
            <span className="text-2xl font-bold text-gradient">CryptoRealty</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu.Root className="hidden md:flex">
            <NavigationMenu.List className="flex space-x-6">
              {/* Properties Dropdown */}
              <NavigationMenu.Item>
                <NavigationMenu.Trigger className="group flex items-center px-3 py-2 text-sm font-medium text-foreground hover:text-crypto-blue transition-colors">
                  Properties
                  <svg
                    className="ml-1 h-3 w-3 transition-transform group-data-[state=open]:rotate-180"
                    fill="none"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path
                      d="m6 9 6 6 6-6"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="absolute top-full left-0 mt-2 w-48 rounded-md bg-background border shadow-lg">
                  <div className="p-2">
                    <Link
                      href="/properties?type=sale"
                      className="block px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors"
                    >
                      For Sale
                    </Link>
                    <Link
                      href="/properties?type=rent"
                      className="block px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors"
                    >
                      For Rent
                    </Link>
                    <Link
                      href="/properties?featured=true"
                      className="block px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors"
                    >
                      Luxury Properties
                    </Link>
                  </div>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              {/* Services Dropdown */}
              <NavigationMenu.Item>
                <NavigationMenu.Trigger className="group flex items-center px-3 py-2 text-sm font-medium text-foreground hover:text-crypto-blue transition-colors">
                  Services
                  <svg
                    className="ml-1 h-3 w-3 transition-transform group-data-[state=open]:rotate-180"
                    fill="none"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path
                      d="m6 9 6 6 6-6"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="absolute top-full left-0 mt-2 w-48 rounded-md bg-background border shadow-lg">
                  <div className="p-2">
                    <Link
                      href="/calculator"
                      className="block px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors"
                    >
                      Crypto Calculator
                    </Link>
                    <Link
                      href="/market"
                      className="block px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors"
                    >
                      Market Analysis
                    </Link>
                    <Link
                      href="/valuation"
                      className="block px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors"
                    >
                      Property Valuation
                    </Link>
                  </div>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu.Root>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/properties/new">
                  <Button variant="crypto" size="sm" className="flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    List Property
                  </Button>
                </Link>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{user.name}</span>
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content className="w-48 rounded-md bg-background border shadow-lg p-2" align="end">
                    <DropdownMenu.Item asChild>
                      <Link
                        href="/profile"
                        className="flex items-center px-2 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors cursor-pointer"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item asChild>
                      <Link
                        href="/my-properties"
                        className="flex items-center px-2 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors cursor-pointer"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        My Properties
                      </Link>
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator className="my-1 h-px bg-border" />
                    <DropdownMenu.Item
                      onClick={handleLogout}
                      className="flex items-center px-2 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors cursor-pointer"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/register">
                  <Button variant="crypto">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="px-4 py-4 space-y-4">
              {/* Properties Section */}
              <div>
                <h3 className="font-medium text-foreground mb-2">Properties</h3>
                <div className="space-y-2 ml-4">
                  <Link
                    href="/properties?type=sale"
                    className="block text-sm text-muted-foreground hover:text-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    For Sale
                  </Link>
                  <Link
                    href="/properties?type=rent"
                    className="block text-sm text-muted-foreground hover:text-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    For Rent
                  </Link>
                  <Link
                    href="/properties?featured=true"
                    className="block text-sm text-muted-foreground hover:text-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Luxury Properties
                  </Link>
                </div>
              </div>

              {/* Services Section */}
              <div>
                <h3 className="font-medium text-foreground mb-2">Services</h3>
                <div className="space-y-2 ml-4">
                  <Link
                    href="/calculator"
                    className="block text-sm text-muted-foreground hover:text-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Crypto Calculator
                  </Link>
                  <Link
                    href="/market"
                    className="block text-sm text-muted-foreground hover:text-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Market Analysis
                  </Link>
                  <Link
                    href="/valuation"
                    className="block text-sm text-muted-foreground hover:text-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Property Valuation
                  </Link>
                </div>
              </div>

              {/* Auth Section */}
              <div className="border-t pt-4">
                {user ? (
                  <div className="space-y-2">
                    <Link
                      href="/properties/new"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button variant="crypto" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        List Property
                      </Button>
                    </Link>
                    <Link
                      href="/profile"
                      className="block text-sm text-muted-foreground hover:text-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/my-properties"
                      className="block text-sm text-muted-foreground hover:text-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Properties
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMobileMenuOpen(false)
                      }}
                      className="block text-sm text-muted-foreground hover:text-foreground"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button variant="ghost" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button variant="crypto" className="w-full">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}