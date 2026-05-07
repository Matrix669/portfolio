import type { Metadata } from 'next'
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

export const metadata: Metadata = {
	title: 'Portfolio Maksymilian Tkaczyk',
	description: 'Moje portfolio w którym znajdziesz moje projekty oraz informacje o mnie',
	keywords:
		'portfolio, projekty, informacje o mnie, it, web development, frontend, backend, fullstack, developer, programista, kodowanie, tworzenie stron, tworzenie aplikacji, tworzenie software',
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
			<body className={`${cairo.className} antialiased`} data-scroll-behavior="smooth">
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
