'use client'

import { useEffect, useMemo, useState } from 'react'
import { useCart } from '@/app/context/CartContext'

import ProductContentGallery from './ProductContentGallery'
import ProductContentText from './ProductContentText'

import { ImageProps } from '@/utils/types'

import styles from '../ProductShop.module.scss'

interface ProductShopContentProps {
	id: number
	nazwaProduktu: string
	cena: number
	przecena?: string
	czyNowy: boolean
	czyPromocja: boolean
	iloscProduktu: number
	zdjeciaProduktu: ImageProps[]
	produktSlug: string
	wyroznioneZdjecie: ImageProps
	kategoria:
		| 'Biżuteria'
		| 'Dekoracje'
		| 'Ceramika'
		| 'Rękodzieło'
		| 'Odzież'
		| 'Plakaty'
		| 'Torby'
		| 'Teatr Tańca Szofar'
}

export default function ProductContent({
	id,
	nazwaProduktu,
	cena,
	przecena,
	czyNowy,
	czyPromocja,
	iloscProduktu,
	zdjeciaProduktu,
	produktSlug,
	wyroznioneZdjecie,
	kategoria,
}: ProductShopContentProps) {
	const { cart } = useCart()
	const cartQuantity = useMemo(() => {
		const item = cart.find(cartItem => cartItem.id === id.toString())
		return item?.quantityInCart ?? 0
	}, [cart, id])

	const [totalStock, setTotalStock] = useState(iloscProduktu)

	useEffect(() => {
		setTotalStock(iloscProduktu)
	}, [iloscProduktu])

	const availableStock = Math.max(totalStock - cartQuantity, 0)

	return (
		<section className={styles.productShop__productInfo}>
			<ProductContentGallery
				zdjeciaProduktu={zdjeciaProduktu}
				czyNowy={czyNowy}
				czyPromocja={czyPromocja}
				iloscProduktu={availableStock}
			/>
			<ProductContentText
				id={id}
				nazwaProduktu={nazwaProduktu}
				cena={cena}
				przecena={przecena}
				totalStock={totalStock}
				availableStock={availableStock}
				produktSlug={produktSlug}
				wyroznioneZdjecie={wyroznioneZdjecie}
				czyNowy={czyNowy}
				czyPromocja={czyPromocja}
				kategoria={kategoria}
				onSyncTotalStock={nextTotal => setTotalStock(Math.max(nextTotal, 0))}
			/>
		</section>
	)
}
