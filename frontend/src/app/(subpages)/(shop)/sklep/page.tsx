import { Metadata } from 'next'

import MainContent from '@/app/UI/MainContent/MainContent'
import ShopFilters from '../components/ShopFilters/ShopFilters'
import ProductListClient from '../components/ProductList/ProductListClient'
import BlockRenderer from '@/app/UI/BlockRenderer/BlockRenderer'
import CmsWarning from '@/app/UI/CmsWarning/CmsWarning'
import CartSheet from '../components/CartSheet/CartSheet'

import { navMarginTop } from '@/app/constants/forStyles'
import { getAllProducts, getShopPage } from '@/data/loaders'
import { MetadataProps } from '@/utils/types'
import { ShopProductsProps } from '@/app/types/shop'
import { Suspense } from 'react'
import ProductListSkeleton from '../components/ProductList/ProductListSkeleton'

async function loader() {
	try {
		const data = await getShopPage()
		if (!data || !data.data) {
			console.warn('Brak danych CMS dla sklepu (shop page)')
			return null
		}
		return { ...data.data }
	} catch (error) {
		console.error('Błąd pobierania danych dla sklepu:', error)
		return null
	}
}

async function loaderAllProducts() {
	try {
		const data = await getAllProducts()
		if (!data || !data.data) {
			console.warn('Brak danych list produktu')
			return { products: [] }
		}
		return {
			products: data.data as ShopProductsProps[],
		}
	} catch (error) {
		console.error('Błąd pobierania danych dla list produktów:', error)
		return { products: [] }
	}
}
export async function generateMetadata(): Promise<Metadata> {
	try {
		const shop: MetadataProps = await loader()
		if (!shop) {
			return {
				title: 'Sklep',
				description:
					'Sztuka z duszą. Twój wybór ma znaczenie. Unikatowe ręcznie robione produkty. Podaruj sobie i bliskim nietuzinkowe rękodzieło stworzone przez naszych wolontariuszy, pracowników i podopiecznych.',
			}
		}
		return {
			title: `${shop.tytul}`,
			description: shop.opis,
			keywords: shop.slowaKluczowe,
		}
	} catch (error) {
		console.error('Błąd generowania metadata dla sklepu:', error)
		return {
			title: 'Sklep',
			description:
				'Sztuka z duszą. Twój wybór ma znaczenie. Unikatowe ręcznie robione produkty. Podaruj sobie i bliskim nietuzinkowe rękodzieło stworzone przez naszych wolontariuszy, pracowników i podopiecznych.',
		}
	}
}

export default async function Shop() {
	const shop = await loader()
	const showCmsWarning = !shop
	const blocks = shop?.bloki || []
	const { products } = await loaderAllProducts()

	return (
		<MainContent style={{ marginTop: navMarginTop }}>
			{showCmsWarning ? (
				<CmsWarning showCmsWarning={showCmsWarning}>
					Brak danych z panelu CMS. Część treści może być niedostępna.
				</CmsWarning>
			) : (
				<>
					<BlockRenderer blocks={blocks} />
					<Suspense fallback={<ProductListSkeleton />}>
						<ShopFilters />
						<ProductListClient initialProducts={products} />
					</Suspense>
					<CartSheet />
				</>
			)}
		</MainContent>
	)
}
