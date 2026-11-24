import type { Metadata } from 'next'

import { getPathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

export const SITE_URL = 'https://maxtkaczyk.pl'

export type AppHref = Parameters<typeof getPathname>[0]['href']
export type AppLocale = (typeof routing.locales)[number]

export function absoluteUrl(href: AppHref, locale: AppLocale) {
	return SITE_URL + getPathname({ href, locale })
}

/** canonical + hreflang dla danej podstrony */
export function getAlternates(href: AppHref, locale: string): Metadata['alternates'] {
	const current = (routing.locales as readonly string[]).includes(locale)
		? (locale as AppLocale)
		: routing.defaultLocale
	return {
		canonical: absoluteUrl(href, current),
		languages: {
			...Object.fromEntries(routing.locales.map(l => [l, absoluteUrl(href, l)])),
			'x-default': absoluteUrl(href, routing.defaultLocale),
		},
	}
}
