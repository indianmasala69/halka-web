import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/auth/phone', '/auth/verify'];
  const isPublicRoute = publicRoutes.some(route =>
    pathname === route || pathname.startsWith('/api/auth/')
  );

  // Check if user has session token
  const sessionToken = request.cookies.get('sb-auth-token')?.value;

  // Protected routes
  if (pathname.startsWith('/dashboard') && !sessionToken) {
    // Redirect to phone auth if not authenticated
    const url = request.nextUrl.clone();
    url.pathname = '/auth/phone';
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from auth pages
  if ((pathname === '/auth/phone' || pathname === '/auth/verify') && sessionToken) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configure which routes to apply middleware to
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
