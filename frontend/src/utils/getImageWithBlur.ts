import { getPlaiceholder } from 'plaiceholder'
import { getStrapiURL } from './get-strapi-url'

// now this components is for local images and remote images (strapi)
// local images: when we use <Image /> component with property "fill"
export async function getImageWithBlur(url: string, isStrapiImage: boolean = false):Promise<string | undefined> {
	try {
		let imageUrl = url;

		if (isStrapiImage) {
		  imageUrl = getStrapiURL() + url
		//   imageUrl = url // remote Strapi
		} else {		  
		  imageUrl = process.env.NEXT_PUBLIC_HOST_URL + url;
		}
		
		const res = await fetch(imageUrl);

		// const res = await fetch(getStrapiURL() + url)
		// const resLocalImgs = await fetch(process.env.NEXT_PUBLIC_HOST_URL + url)

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
