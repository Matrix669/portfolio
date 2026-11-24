import type { MetadataRoute } from 'next'
import { type AppHref, absoluteUrl } from '@/app/constants/site'
import { routing } from '@/i18n/routing'

const PAGES: { href: AppHref; priority: number }[] = [
	{ href: '/', priority: 1 },
	{ href: '/projekty', priority: 0.8 },
]

export default function sitemap(): MetadataRoute.Sitemap {
	return PAGES.flatMap(({ href, priority }) =>
		routing.locales.map(locale => ({
			url: absoluteUrl(href, locale),
			lastModified: new Date(),
			priority,
			alternates: {
				languages: Object.fromEntries(routing.locales.map(l => [l, absoluteUrl(href, l)])),
			},
		})),
	)
}
