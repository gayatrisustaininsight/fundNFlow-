import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Public routes that do not require authentication
const PUBLIC_PATHS: RegExp[] = [
  /^\/$/,
  /^\/login(?:\/.*)?$/,
  /^\/signup(?:\/.*)?$/,
  /^\/api(?:\/.*)?$/,
  /^\/favicon\.ico$/,
  /^\/assets(?:\/.*)?$/,
  /^\/_next(?:\/.*)?$/,
  /^\/images(?:\/.*)?$/,
]

// Routes that should not be accessible when already authenticated
const AUTH_PAGES: RegExp[] = [
  /^\/login(?:\/.*)?$/,
  /^\/signup(?:\/.*)?$/,
]

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((re) => re.test(pathname))
}

function isAuthPage(pathname: string): boolean {
  return AUTH_PAGES.some((re) => re.test(pathname))
}

export function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request
  const pathname = nextUrl.pathname

  // Read token from cookie set client-side
  const token = cookies.get('auth_token')?.value

  // Allow public paths always
  if (isPublicPath(pathname)) {
    // If user is authenticated and tries to access auth pages, redirect to dashboard
    if (token && isAuthPage(pathname)) {
      const url = nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  // For all other paths, require authentication
  if (!token) {
    const url = nextUrl.clone()
    // Remember where the user wanted to go
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname + nextUrl.search)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Protect everything except the public assets and api; public paths handled in code above
    '/((?!_next|assets|images|favicon.ico).*)',
  ],
}


