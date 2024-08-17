import { locales } from './i18n'
import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,
  localePrefix: 'always',

  // Used when no locale matches
  defaultLocale: 'en'
})

const privatePaths = ['/product', '/dashboard']
const authPaths = ['/login', '/signup']

// Combined config
export const config = {
  // Match only internationalized pathnames and specific routes, excluding static assets
  matcher: ['/((?!api|_next|.*\\..*).*)', '/dashboard', '/product', '/login', '/signup']
}

function getPathnameWithoutLocale(pathname: string, locale: string): string {
  return pathname.replace(`/${locale}`, '')
}

// Custom middleware function
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const locale = request.nextUrl.pathname.split('/')[1]

  const cleanPathname = getPathnameWithoutLocale(pathname, locale)

  const sessionToken = request.cookies.get('sessionToken')?.value

  const response = intlMiddleware(request)

  if (privatePaths.some(path => cleanPathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (authPaths.some(path => cleanPathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return response
}
