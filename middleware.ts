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

  const token = cookies.get('auth_token')?.value
  const isValidToken = (() => {
    if (!token) return false
    try {
      const parts = token.split('.')
      if (parts.length < 2) return false
      const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
      const payload = JSON.parse(Buffer.from(base64, 'base64').toString('utf-8'))
      if (!payload || typeof payload !== 'object') return false
      if (payload.exp && typeof payload.exp === 'number') {
        const now = Math.floor(Date.now() / 1000)
        return payload.exp > now
      }
      return true
    } catch {
      return false
    }
  })()

  // Allow public paths always
  if (isPublicPath(pathname)) {
    if (isValidToken && (isAuthPage(pathname) || pathname === '/')) {
      const url = nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
    if (token && !isValidToken && (isAuthPage(pathname) || pathname === '/')) {
      const url = nextUrl.clone()
      url.pathname = '/login'
      const res = NextResponse.redirect(url)
      res.cookies.set('auth_token', '', { path: '/', maxAge: 0 })
      return res
    }
    return NextResponse.next()
  }

  // For all other paths, require authentication
  if (!isValidToken) {
    const url = nextUrl.clone()
    // Remember where the user wanted to go
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname + nextUrl.search)
    const res = NextResponse.redirect(url)
    if (token && !isValidToken) {
      res.cookies.set('auth_token', '', { path: '/', maxAge: 0 })
    }
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Protect everything except the public assets and api; public paths handled in code above
    '/((?!_next|assets|images|favicon.ico).*)',
  ],
}


