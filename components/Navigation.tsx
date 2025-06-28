// components/Navigation.tsx
import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Ligatur
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link href="/properties" className="text-gray-700 hover:text-gray-900">
              Properties
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
