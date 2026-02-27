import { Metadata } from 'next'

import MainContent from '@/app/UI/MainContent/MainContent'
import ShopFilters from '../components/ShopFilters/ShopFilters'
import ProductListClient from '../components/ProductList/ProductListClient'
import CartSheet from '../components/CartSheet/CartSheet'

import { navMarginTop } from '@/app/constants/forStyles'
import { ShopProductsProps } from '@/app/types/shop'

export const metadata: Metadata = {
	title: 'Sklep',
	description:
		'Sztuka z duszą. Twój wybór ma znaczenie. Unikatowe ręcznie robione produkty. Podaruj sobie i bliskim nietuzinkowe rękodzieło.',
}

const MOCK_PRODUCTS: ShopProductsProps[] = [
	{
		id: 1,
		nazwaProduktu: 'Ręcznie robiona bransoletka',
		produktSlug: 'bransoletka-recznie-robiona',
		cena: 49,
		czyNowy: true,
		czyPromocja: false,
		iloscProduktu: 8,
		przecena: '',
		kategoria: 'Biżuteria',
		wyroznioneZdjecie: {
			id: 1,
			documentId: 'mock-1',
			url: '/placeholder/product-1.jpg',
			alternativeText: 'Ręcznie robiona bransoletka',
		},
	},
	{
		id: 2,
		nazwaProduktu: 'Ceramiczny kubek',
		produktSlug: 'ceramiczny-kubek',
		cena: 79,
		czyNowy: false,
		czyPromocja: true,
		iloscProduktu: 4,
		przecena: '69',
		kategoria: 'Ceramika',
		wyroznioneZdjecie: {
			id: 2,
			documentId: 'mock-2',
			url: '/placeholder/product-2.jpg',
			alternativeText: 'Ceramiczny kubek',
		},
	},
	{
		id: 3,
		nazwaProduktu: 'Plakat artystyczny',
		produktSlug: 'plakat-artystyczny',
		cena: 39,
		czyNowy: false,
		czyPromocja: false,
		iloscProduktu: 15,
		przecena: '',
		kategoria: 'Plakaty',
		wyroznioneZdjecie: {
			id: 3,
			documentId: 'mock-3',
			url: '/placeholder/product-3.jpg',
			alternativeText: 'Plakat artystyczny',
		},
	},
]

export default function Shop() {
	return (
		<MainContent style={{ marginTop: navMarginTop }}>
			<ShopFilters />
			<ProductListClient initialProducts={MOCK_PRODUCTS} />
			<CartSheet />
		</MainContent>
	)
}
