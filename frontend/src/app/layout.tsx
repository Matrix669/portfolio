import type { Metadata } from 'next'
import { Open_Sans, Cairo } from 'next/font/google'

import Navigation from './UI/Navigation/Navigation'
import Footer from './UI/Footer/Footer'

import { NAVIGATION_DATA } from './constants/navigationData'

import './styles/globals.css'

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='pl'>
			<body className={`${cairo.className} antialiased`}>
				<Navigation data={NAVIGATION_DATA} />
				{children}
				<Footer />
			</body>
		</html>
	)
}
