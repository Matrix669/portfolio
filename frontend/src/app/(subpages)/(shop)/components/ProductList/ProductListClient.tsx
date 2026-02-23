'use client'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import Wrapper from '@/app/UI/Wrapper/Wrapper'
import Product from '../Product/Product'
import CmsWarning from '@/app/UI/CmsWarning/CmsWarning'
import PaginationComponent from '@/app/UI/Pagination/Pagination'

import { ShopProductsProps, convertShopProductToProductLink } from '@/app/types/shop'

import styles from './ProductList.module.scss'

interface ProductListClientProps {
	initialProducts: ShopProductsProps[]
}

export default function ProductListClient({ initialProducts }: ProductListClientProps) {
	const searchParams = useSearchParams()
	const [allProducts] = useState<ShopProductsProps[]>(initialProducts)

	// Pobierz filtry z URL
	const category = searchParams.get('category') || 'Wszystko'
	const availability = searchParams.get('availability') || 'Wszystko'
	const highlight = searchParams.get('highlight') || 'Wszystko'
	const sort = searchParams.get('sort') || 'Cena: Rosnąco'
	const currentPage = parseInt(searchParams.get('page') || '1')
	const pageSize = 16

	// Filtrowanie produktów po stronie klienta
	const filteredProducts = useMemo(() => {
		let filtered = [...allProducts]

		// Filtr kategorii
		if (category && category !== 'Wszystko') {
			filtered = filtered.filter(product => product.kategoria === category)
		}

		// Filtr dostępności
		if (availability && availability !== 'Wszystko') {
			if (availability === 'Dostępne') {
				filtered = filtered.filter(product => product.iloscProduktu > 0)
			} else if (availability === 'Niedostępne') {
				filtered = filtered.filter(product => product.iloscProduktu === 0)
			}
		}

		// Filtr wyróżnienia
		if (highlight && highlight !== 'Wszystko') {
			if (highlight === 'Nowość') {
				filtered = filtered.filter(product => product.czyNowy)
			} else if (highlight === 'Promocja') {
				filtered = filtered.filter(product => product.czyPromocja)
			}
		}

		// Sortowanie
		if (sort) {
			if (sort === 'Cena: Rosnąco') {
				filtered.sort((a, b) => a.cena - b.cena)
			} else if (sort === 'Cena: Malejąco') {
				filtered.sort((a, b) => b.cena - a.cena)
			}
		}

		return filtered
	}, [allProducts, category, availability, highlight, sort])

	// Paginacja
	const totalPages = Math.ceil(filteredProducts.length / pageSize)
	const paginatedProducts = useMemo(() => {
		const startIndex = (currentPage - 1) * pageSize
		const endIndex = startIndex + pageSize
		return filteredProducts.slice(startIndex, endIndex)
	}, [filteredProducts, currentPage, pageSize])

	const isEmptyList = paginatedProducts.length > 0 ? {} : { display: 'block' }

	return (
		<>
			<section className={`${styles.sectionPadding} ${styles.productList}`}>
				<Wrapper>
					<div className={styles.productList__inner} style={isEmptyList}>
						{paginatedProducts.length > 0 ? (
							paginatedProducts.map((product: ShopProductsProps) => (
								<Product key={product.id} product={convertShopProductToProductLink(product)} />
							))
						) : (
							<div className={styles.sectionPadding}>
								<CmsWarning showCmsWarning={true}>Brak produktów na liście</CmsWarning>
							</div>
						)}
					</div>
				</Wrapper>
			</section>

			{totalPages > 0 && paginatedProducts.length > 0 && (
				<PaginationComponent currentPage={currentPage} totalPages={totalPages} />
			)}
		</>
	)
}
