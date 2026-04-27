import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,

	images: {
		// unoptimized: true,
		localPatterns: [
			{
				pathname: '/assets/**',
				search: '',
			},
		],
		qualities: [25, 50, 75, 100],
	},
	// how to make redirect
	// async redirects() {
	// 	return [
	// 		{
	// 			source: '/sklep/:path*',
	// 			destination: '/strona-w-budowie',
	// 			permanent: false,
	// 		},
	// 	]
	// },
}
const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
