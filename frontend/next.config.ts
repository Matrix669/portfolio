import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
	reactCompiler: true,

	allowedDevOrigins: ['192.168.0.171'],
	images: {
		localPatterns: [
			{
				pathname: '/assets/**',
				search: '',
			},
		],
		qualities: [25, 50, 75, 100],
	},
}
const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
