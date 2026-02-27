'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
// import { toast } from 'sonner'
// import { Spinner } from '@/components/ui/spinner'
import { useCart } from '@/app/context/CartContext'

// import { StrapiImage } from '@/app/UI/StrapiImage/StrapiImage'

import { ProductLinkProps } from '@/app/types/shop'

import ShopNewProductIcon from '@/app/icons/shop/ShopNewProductIcon'
import ShopPromotionProduct from '@/app/icons/shop/ShopPromotionProduct'
import ShopUnavailableProductIcon from '@/app/icons/shop/ShopUnavailableProductIcon'
import ShopCartIcon from '@/app/icons/shop/ShopCartIcon'

import styles from './Product.module.scss'
import btnStyles from '@/app/UI/MainLink/MainLink.module.scss'
import { Spinner } from '@/componentsShadcn/ui/spinner'

interface ProductCartProps {
	product: ProductLinkProps
}
export default function Product({ product }: ProductCartProps) {
	const { addToCart, cart } = useCart()
	const [availableStock, setAvailableStock] = useState<number>(product.iloscProduktu ?? 0)
	const [isProcessing, setIsProcessing] = useState(false)

	const quantityInCart = cart.find(item => item.id === product.id)?.quantityInCart ?? 0
	const isOutOfStock = availableStock <= 0
	const isLimitReached = !isOutOfStock && quantityInCart >= availableStock
	const isCardUnavailable = isOutOfStock || isLimitReached
	const disableAddButton = isProcessing || isCardUnavailable


	const handleAddToCart = async (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()

		if (disableAddButton && !isProcessing) {
			// toast.error('Nie możesz dodać więcej sztuk tego produktu.')
			return
		}

		try {
			setIsProcessing(true)
			const result = await addToCart(product)

			if (!result?.success) {
				if (typeof result?.availableQuantity === 'number') {
					setAvailableStock(result.availableQuantity)
				}
				const message =
					result?.reason === 'OUT_OF_STOCK'
						? 'Limit sztuk w magazynie został osiągnięty.'
						: 'Nie udało się zweryfikować stanu magazynowego. Spróbuj ponownie.'
				// toast.error(message)
				return
			}

			if (typeof result.availableQuantity === 'number') {
				setAvailableStock(result.availableQuantity)
			}
		} catch (error) {
			console.error('Błąd podczas dodawania produktu do koszyka', error)
			// toast.error('Nie udało się dodać produktu. Spróbuj ponownie później.')
		} finally {
			setIsProcessing(false)
		}
	}
	const state = isCardUnavailable
		? {
				key: 'unavailable',
				Icon: ShopUnavailableProductIcon,
				label: 'Niedostępne',
				badgeClass: styles['product__state--unavailableBadge'],
		  }
		: product.czyNowy
		? {
				key: 'new',
				Icon: ShopNewProductIcon,
				label: 'Nowość',
				badgeClass: styles['product__state--newBadge'],
		  }
		: product.czyPromocja
		? {
				key: 'promotion',
				Icon: ShopPromotionProduct,
				label: 'Promocja',
				badgeClass: styles['product__state--promotionBadge'],
		  }
		: null

	const productState = state ? (
		<div className={`${styles['product__state']} ${styles[`product__state--${state.key}`]}`}>
			<state.Icon />
			<span className={state.badgeClass}>{state.label}</span>
		</div>
	) : null

	return (
		<Link
			href={`/sklep/${product.produktSlug}`}
			className={`${styles.product} ${isCardUnavailable ? styles['product--unavailable'] : ''}`}
		>
			{product.wyroznioneZdjecie && (
				<div className={styles.product__boxImg}>
					<Image
						src={product.wyroznioneZdjecie.url}
						alt={product.wyroznioneZdjecie.alternativeText || `Zdjęcie produktu ${product.nazwaProduktu}`}
						width={405}
						height={329}
					/>
					{productState}
				</div>
			)}

			<div className={styles.product__boxText}>
				{product.nazwaProduktu && <h2> {product.nazwaProduktu}</h2>}

				{product.cena && (
					<div className={styles['product__boxText-bottom']}>
						<h3
							className={`${styles['product__boxText-bottom-price']} ${
								product.przecena ? styles['product__boxText-bottom--discount'] : ''
							}`}
						>
							{product.cena} zł {product.przecena && <span>{product.przecena ? `${product.przecena} zł` : ''}</span>}
						</h3>
						<button className={btnStyles.mainBtn} onClick={handleAddToCart} disabled={disableAddButton}>
							<span>Do koszyka</span> {isProcessing ? <Spinner aria-label='Dodawanie produktu' /> : <ShopCartIcon />}
						</button>
					</div>
				)}
			</div>
		</Link>
	)
}
