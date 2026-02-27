import { getPlaiceholder } from 'plaiceholder'

// Obrazy zdalne: url jest już pełnym adresem. Obrazy lokalne: url jest ścieżką względną, dopisujemy NEXT_PUBLIC_HOST_URL.
export async function getImageWithBlur(url: string, isStrapiImage: boolean = false):Promise<string | undefined> {
	try {
		const imageUrl = isStrapiImage ? url : (process.env.NEXT_PUBLIC_HOST_URL ?? '') + url
		
		const res = await fetch(imageUrl);

		if (!res.ok) {
			throw new Error('Network response was not ok')
		}

		const buffer = await res.arrayBuffer()
		const { base64 } = await getPlaiceholder(Buffer.from(buffer))

		return base64
	} catch (error) {
		console.error('Error generating blurDataURL:', error)
		return undefined
	}
}
