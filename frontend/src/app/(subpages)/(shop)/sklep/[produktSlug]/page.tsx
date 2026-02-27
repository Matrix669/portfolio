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

import BG_BREADCRUMBS from '@/app/assets/formSupport/bg-breadcrumbs.png'

import { ImageProps } from '@/utils/types'
import { ShopProductsProps } from '@/app/types/shop'

import PLACEHOLDER_IMG from '@/app/assets/placeholder/czajnik.png'

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
	opis: string
	zwrotyReklamacje: string
}

const MOCK_PRODUCT: ProductShopProps = {
	id: 1,
	nazwaProduktu: 'Przykładowa świeca sojowa',
	produktSlug: 'przykladowa-swieca-sojowa',
	cena: 59,
	przecena: '49',
	czyNowy: true,
	czyPromocja: true,
	iloscProduktu: 10,
	wyroznioneZdjecie: {
		id: 1,
		documentId: 'mock-product-1',
		url: PLACEHOLDER_IMG.src, 
		alternativeText: 'Przykładowa świeca sojowa',
	},
	glowneZdjecie: {
		id: 2,
		documentId: 'mock-product-1-main',
		url: PLACEHOLDER_IMG.src, 
		alternativeText: 'Przykładowa świeca sojowa – główne zdjęcie',
	},
	zdjeciaProduktu: [
		{
			id: 3,
			documentId: 'mock-product-1-gallery-1',
			url: PLACEHOLDER_IMG.src, 
			alternativeText: 'Galeria produktu – zdjęcie 1',
		},
		{
			id: 4,
			documentId: 'mock-product-1-gallery-2',
			url: PLACEHOLDER_IMG.src, 
			alternativeText: 'Galeria produktu – zdjęcie 2',
		},
	],
	kategoria: 'Dekoracje',
	opis: 'To jest przykładowy opis produktu sklepu. W docelowej wersji dane pochodzą z Payload CMS.',
	zwrotyReklamacje: 'Zwrot produktu możliwy jest w ciągu 14 dni od zakupu. To tylko przykładowa treść.',
}

const MOCK_RELATED_PRODUCTS: ShopProductsProps[] = [
	{
		id: 2,
		nazwaProduktu: 'Ręcznie robiony naszyjnik',
		produktSlug: 'naszyjnik-recznie-robiony',
		cena: 89,
		czyNowy: true,
		czyPromocja: false,
		iloscProduktu: 5,
		przecena: '',
		kategoria: 'Biżuteria',
		wyroznioneZdjecie: {
			id: 5,
			documentId: 'mock-related-1',
			url: PLACEHOLDER_IMG.src, 
			alternativeText: 'Ręcznie robiony naszyjnik',
		},
	},
	{
		id: 3,
		nazwaProduktu: 'Kubek z motywem Drachmy',
		produktSlug: 'kubek-z-motywem-drachmy',
		cena: 69,
		czyNowy: false,
		czyPromocja: true,
		iloscProduktu: 12,
		przecena: '59',
		kategoria: 'Ceramika',
		wyroznioneZdjecie: {
			id: 6,
			documentId: 'mock-related-2',
			url: PLACEHOLDER_IMG.src, 
			alternativeText: 'Kubek z motywem Drachmy',
		},
	},
]
const MOCK_PRODUCTS: ProductShopProps[] = [
	MOCK_PRODUCT,
	{
		id: 2,
		nazwaProduktu: 'Ręcznie robiony naszyjnik',
		produktSlug: 'naszyjnik-recznie-robiony',
		cena: 89,
		przecena: '',
		czyNowy: true,
		czyPromocja: false,
		iloscProduktu: 5,
		wyroznioneZdjecie: {
			id: 5,
			documentId: 'mock-related-1',
			url: PLACEHOLDER_IMG.src, 
			alternativeText: 'Ręcznie robiony naszyjnik',
		},
		glowneZdjecie: {
			id: 5,
			documentId: 'mock-related-1-main',
			url: PLACEHOLDER_IMG.src, 
			alternativeText: 'Ręcznie robiony naszyjnik – główne zdjęcie',
		},
		zdjeciaProduktu: [],
		kategoria: 'Biżuteria',
		opis: 'Opis przykładowego naszyjnika. Dane będą pochodziły z Payload CMS.',
		zwrotyReklamacje: 'Zwroty zgodnie z regulaminem sklepu.',
	},
]

interface PageProductProps {
	params: Promise<{ produktSlug?: string }>
}

function findProductBySlug(slug: string): ProductShopProps | undefined {
	return MOCK_PRODUCTS.find(product => product.produktSlug === slug)
}

function getRelatedProducts(currentSlug: string): ShopProductsProps[] {
	return MOCK_RELATED_PRODUCTS.filter(product => product.produktSlug !== currentSlug)
}

export async function generateMetadata({ params }: PageProductProps): Promise<Metadata> {
	const { ['produktSlug']: productSlug } = await params
	try {
		if (!productSlug) {
			return { title: 'Nie znaleziono strony', description: '' }
		}
		const product = findProductBySlug(productSlug)
		if (!product) {
			return { title: 'Nie znaleziono strony', description: '' }
		}
		return {
			title: product.nazwaProduktu || 'Strona',
			description: `Produkt: ${product.nazwaProduktu}`,
		}
	} catch (error) {
		console.error('Błąd generowania metadata:', error)
		return { title: 'Nie znaleziono strony - Błąd 404', description: '' }
	}
}
export async function generateStaticParams() {
	try {
		return MOCK_PRODUCTS.map(product => ({
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
	const product = findProductBySlug(productSlug)
	if (!product) {
		notFound()
	}
	const liveQuantity = product.iloscProduktu

	const shopProducts: ShopProductsProps[] = getRelatedProducts(productSlug)
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
