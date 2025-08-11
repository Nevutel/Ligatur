'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const isNetworkError = error.message.includes('NetworkError') || 
                        error.message.includes('fetch') || 
                        error.message.includes('RSC payload') ||
                        error.digest?.includes('NETWORK')

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
          <Card className="w-full max-w-lg">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <AlertTriangle className="h-16 w-16 text-orange-500" />
              </div>
              <CardTitle className="text-2xl font-bold">
                {isNetworkError ? 'Connection Lost' : 'Application Error'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-2">
                <p className="text-slate-600">
                  {isNetworkError 
                    ? 'We\'re having trouble connecting to our servers. This could be due to network issues or server maintenance.'
                    : 'Something went wrong with the application. Our team has been notified.'
                  }
                </p>
                {error.digest && (
                  <p className="text-xs text-slate-500">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
              
              {process.env.NODE_ENV === 'development' && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-md">
                  <h4 className="text-sm font-semibold text-red-800 mb-2">Development Error Details:</h4>
                  <p className="text-xs text-red-700 font-mono break-all">
                    {error.message}
                  </p>
                  {error.stack && (
                    <details className="mt-2">
                      <summary className="text-xs text-red-700 cursor-pointer">Stack trace</summary>
                      <pre className="text-xs text-red-600 mt-1 whitespace-pre-wrap">
                        {error.stack}
                      </pre>
                    </details>
                  )}
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button onClick={reset} className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = '/'} 
                  className="w-full"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Button>
              </div>
              
              <div className="text-center">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => window.location.reload()}
                  className="text-slate-500"
                >
                  Force Refresh Page
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  )
}
