import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export default function proxy(request: NextRequest) {
	const [, firstSegment] = request.nextUrl.pathname.split('/')

	if (firstSegment && !routing.locales.includes(firstSegment as 'pl' | 'en')) {
		return NextResponse.next()
	}

  return intlMiddleware(request)
}
export const config = {
	matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
}
