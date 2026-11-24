import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Toaster } from 'sonner'
import { NAVIGATION_DATA } from '@/app/constants/navigationData'
import { absoluteUrl, getAlternates, SITE_URL } from '@/app/constants/site'
import Cursor from '@/app/UI/Cursor/Cursor'
import Footer from '@/app/UI/Footer/Footer'
import Navigation from '@/app/UI/Navigation/Navigation'
import { routing } from '@/i18n/routing'
import CursorLabelProvider from '../contexts/CursorLabelContext'

import '../styles/globals.css'

const cairo = Cairo({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin'],
	fallback: ['sans-serif'],
})

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params
	const tLayoutMetadata = await getTranslations('layoutMetadata')
	return {
		title: {
			default: tLayoutMetadata('title'),
			template: '%s | ' + tLayoutMetadata('title'),
		},
		description: tLayoutMetadata('description'),
		keywords: tLayoutMetadata('keywords'),

		icons: {
			icon: [
				{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
				{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			],
			shortcut: '/favicon.ico',
			apple: '/apple-touch-icon.png',
		},

		// --- Web App Manifest ---
		manifest: '/site.webmanifest',

		// --- Open Graph ---
		openGraph: {
			title: tLayoutMetadata('title'),
			description: tLayoutMetadata('ogDescription'),
			url: absoluteUrl('/', locale === 'en' ? 'en' : 'pl'),
			siteName: tLayoutMetadata('title'),
			images: [{ url: '/og-image.png', width: 1200, height: 630, alt: tLayoutMetadata('title') }],
			locale: locale === 'pl' ? 'pl_PL' : 'en_US',
			type: 'website',
		},

		// --- Twitter ---
		twitter: {
			card: 'summary_large_image',
			title: tLayoutMetadata('title'),
			description: tLayoutMetadata('ogDescription'),
			images: [{ url: '/og-image.png', width: 1200, height: 630, alt: tLayoutMetadata('title') }],
		},

		// --- Other ---
		metadataBase: new URL(SITE_URL),
		alternates: getAlternates('/', locale),
		authors: [{ name: 'Maksymilian Tkaczyk' }],
		creator: 'Maksymilian Tkaczyk',
		robots: 'index, follow',
	}
}

export function generateStaticParams() {
	return routing.locales.map(locale => ({ locale }))
}

type Props = {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}
export default async function RootLayout({ children, params }: Props) {
	const { locale } = await params
	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}
	return (
		<html lang={locale}>
			<body className={`${cairo.className} antialiased`} data-scroll-behavior='smooth'>
				<NextIntlClientProvider>
					<CursorLabelProvider>
						<Navigation data={NAVIGATION_DATA} />
						{children}
						<Footer />
						<Cursor />
						<Toaster richColors position='bottom-right' expand={true} />
						<Analytics />
						<SpeedInsights />
					</CursorLabelProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
