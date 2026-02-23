import type { NextConfig } from "next";

if (!process.env.STRAPI_MEDIA_URL) {
	throw new Error('STRAPI_MEDIA_URL is not defined in .env')
}
 

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  // for cms strapi
  images: {
		// unoptimized: true,
		localPatterns: [
			{
				pathname: '/assets/**',
				search: '',
			},
		],
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '1337',
				pathname: '/uploads/**/*',
			},
			{
				protocol: 'https',
				hostname: process.env.STRAPI_MEDIA_URL,
				pathname: '/uploads/**',
			},
		],
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
};

export default nextConfig;
