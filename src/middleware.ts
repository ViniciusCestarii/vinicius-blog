import { NextResponse, type NextRequest } from 'next/server'
import { isAuthenticated } from './server/auth'

export async function middleware(request: NextRequest) {
  const authenticated = await isAuthenticated()

  if (request.nextUrl.pathname === '/login') {
    if (authenticated) {
      return NextResponse.redirect(new URL('/admin/blog/list', request.url))
    }
    return NextResponse.next()
  }

  if (!authenticated) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}
