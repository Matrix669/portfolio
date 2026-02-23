export function getStrapiURL() {
	return process.env.NEXT_PUBLIC_STRAPI_API_URL_PRODUCTION ?? process.env.NEXT_PUBLIC_STRAPI_API_URL_LOCAL
}

export function getStrapiURLMedia() {
	return process.env.NEXT_PUBLIC_STRAPI_API_URL_PRODUCTION_MEDIA ?? process.env.NEXT_PUBLIC_STRAPI_API_URL_LOCAL
}
