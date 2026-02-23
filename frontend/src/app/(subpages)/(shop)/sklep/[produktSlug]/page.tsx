import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { navMarginTop } from '@/app/constants/forStyles'

import { Breadcrumbs } from '@/app/UI/Breadcrumbs/Breadcrumbs'
import MainContent from '@/app/UI/MainContent/MainContent'
import Wrapper from '@/app/UI/Wrapper/Wrapper'
import ProductContent from './components/ProductContent'
import ProductTextContainer from './components/ProductTextContainer'
import ProductsContainer from './components/ProductsContainer'
import CartSheet from '../../components/CartSheet/CartSheet'

import BG_BREADCRUMBS from '@/app/assets/subpages/ourGroups/bg-breadcrumbs.png'

import { getRandomProductList, getProductShop, getProductSlugQuery } from '@/data/loaders'
import { ImageProps, MetadataProps } from '@/utils/types'
import { ShopProductsProps } from '@/app/types/shop'
import { BlocksContent } from '@strapi/blocks-react-renderer'
import { fetchProductStock } from '@/app/(subpages)/(shop)/actions/product-stock-helpers'

import styles from './ProductShop.module.scss'

interface ProductShopProps {
	id: number
	nazwaProduktu: string
	produktSlug: string
	cena: number
	przecena?: string
	czyNowy: boolean
	czyPromocja: boolean
	iloscProduktu: number
	wyroznioneZdjecie: ImageProps
	glowneZdjecie: ImageProps
	zdjeciaProduktu: ImageProps[]
	kategoria:
		| 'Biżuteria'
		| 'Dekoracje'
		| 'Ceramika'
		| 'Rękodzieło'
		| 'Odzież'
		| 'Plakaty'
		| 'Torby'
		| 'Teatr Tańca Szofar'
	opis: BlocksContent
	zwrotyReklamacje: BlocksContent
}
interface PageProductProps {
	params: Promise<{ produktSlug?: string }>
}
interface StaticPostProps {
	data: {
		produktSlug: string
	}[]
}
async function loader(productSlug: string) {
	try {
		if (!productSlug || typeof productSlug !== 'string' || productSlug.trim() === '') {
			notFound()
		}
		const { data } = await getProductShop(productSlug)
		if (!data || (Array.isArray(data) && data.length === 0)) {
			notFound()
		}

		if (!data || data.length === 0) {
			notFound()
		}
		return Array.isArray(data) ? data[0] : data
	} catch (error) {
		console.error('Błąd pobierania posta:', productSlug, error)
		throw error
	}
}
async function loaderShopProducts(currentSlug: string) {
	try {
		const items = await getRandomProductList(4, 50, currentSlug)
		if (!items || items.length === 0) {
			console.warn('Brak danych dla inny produktów - wyświetlam komunikat o braku postów')
			return []
		}
		return items as unknown as ShopProductsProps[]
	} catch (error) {
		console.error('Błąd pobierania danych dla strony produktu (inne produkty)', error)
		return []
	}
}
export async function generateMetadata({ params }: PageProductProps): Promise<Metadata> {
	const { ['produktSlug']: productSlug } = await params
	try {
		if (!productSlug) {
			return { title: 'Nie znaleziono strony', description: '' }
		}
		const { data } = await getProductShop(productSlug)
		if (!data || (Array.isArray(data) && data.length === 0)) {
			return { title: 'Nie znaleziono strony', description: '' }
		}
		const pageData: MetadataProps = Array.isArray(data) ? data[0] : data
		return {
			title: pageData.nazwaProduktu || 'Strona',
			description: pageData.opis || pageData.nazwaProduktu,
		}
	} catch (error) {
		console.error('Błąd generowania metadata:', error)
		return { title: 'Nie znaleziono strony - Błąd 404', description: '' }
	}
}
export async function generateStaticParams() {
	try {
		const products: StaticPostProps = await getProductSlugQuery()
		return products.data.map(product => ({
			produktSlug: product.produktSlug,
		}))
	} catch (error) {
		console.error('Błąd generowania statycznych parametrów dla produktu sklepu', error)
		return []
	}
}
export default async function ProductShop({ params }: PageProductProps) {
	const { ['produktSlug']: productSlug } = await params
	if (!productSlug) {
		notFound()
	}
	const product: ProductShopProps = await loader(productSlug)
	const liveQuantity = (await fetchProductStock(product.id)) ?? product.iloscProduktu

	const shopProducts: ShopProductsProps[] = await loaderShopProducts(productSlug)
	return (
		<>
			<Breadcrumbs
				styleCSS={{ marginTop: `${navMarginTop}` }}
				bgBreadcrumbs={BG_BREADCRUMBS.src}
				pageTitle={`${product.kategoria} / ${product.nazwaProduktu}`}
			/>
			<MainContent CSSClassName={`${styles.productShop} ${styles.sectionPadding}`}>
				<Wrapper>
					<ProductContent
						id={product.id}
						nazwaProduktu={product.nazwaProduktu}
						cena={product.cena}
						przecena={product.przecena}
						czyNowy={product.czyNowy}
						czyPromocja={product.czyPromocja}
						iloscProduktu={liveQuantity}
						zdjeciaProduktu={product.zdjeciaProduktu}
						produktSlug={product.produktSlug}
						wyroznioneZdjecie={product.wyroznioneZdjecie}
						kategoria={product.kategoria}
					/>
					<ProductTextContainer opis={product.opis} zwrotyReklamacje={product.zwrotyReklamacje} />
					{shopProducts.length > 0 && <ProductsContainer shopProducts={shopProducts} />}
				</Wrapper>
				<CartSheet />
			</MainContent>
		</>
	)
}
