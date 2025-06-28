import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = request.nextUrl.pathname;

  // Protected routes that require authentication
  const protectedPaths = [
    '/dashboard',
    '/profile',
    '/properties/create',
    '/properties/edit',
    '/messages',
  ];

  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some(protectedPath => 
    path.startsWith(protectedPath)
  );

  // Get the token from the request
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Redirect to login if accessing protected route without token
  if (isProtectedPath && !token) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('callbackUrl', path);
    return NextResponse.redirect(url);
  }

  // Redirect to dashboard if accessing login/register while authenticated
  if ((path === '/auth/login' || path === '/auth/register') && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public/).*)',
  ],
};