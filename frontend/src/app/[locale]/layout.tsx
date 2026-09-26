import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Cairo } from 'next/font/google'
import { notFound } from 'next/navigation'

import CursorLabelProvider from '../contexts/CursorLabelContext'

import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { routing } from '@/i18n/routing'

import Navigation from '@/app/UI/Navigation/Navigation'
import Footer from '@/app/UI/Footer/Footer'
import Cursor from '@/app/UI/Cursor/Cursor'

import { NAVIGATION_DATA } from '@/app/constants/navigationData'

import '../styles/globals.css'
import { Toaster } from 'sonner'

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
			url: 'https://maxtkaczyk.pl',
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
		metadataBase: new URL('https://maxtkaczyk.pl'),
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
					</CursorLabelProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
