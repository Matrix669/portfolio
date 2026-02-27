'use client'

import { useState } from 'react'
import Image from 'next/image'
// import { toast } from 'sonner'
import { Spinner } from '@/componentsShadcn/ui/spinner'
import { useCart } from '@/app/context/CartContext'
import { convertShopProductToProductLink } from '@/app/types/shop'
import { ImageProps } from '@/utils/types'

import HandMadeIcon from '@/app/icons/shop/HandMadeIcon'
import SupportFundationIcon from '@/app/icons/shop/SupportFundationIcon'
import UniqueIcon from '@/app/icons/shop/UniqueIcon'
import PresentIcon from '@/app/icons/shop/PresentIcon'
import BankTransferIcon from '@/app/icons/shop/BankTransferIcon'
import BlikIcon from '@/app/icons/shop/BlikIcon'
import CardIcon from '@/app/icons/shop/CardIcon'
import ShopCheckoutIcon from '@/app/icons/ShopCheckoutIcon'

import INPOST_LOGO from '@/app/assets/shop/productList/product page/inpost.png'
import DPD_LOGO from '@/app/assets/shop/productList/product page/dpd.png'

import styles from '../ProductShop.module.scss'
import stylesProduct from '@/app/(subpages)/(shop)/components/Product/Product.module.scss'
import stylesBtn from '@/app/UI/MainLink/MainLink.module.scss'

interface ProductContentTextProps {
	id: number
	nazwaProduktu: string
	cena: number
	przecena?: string
	totalStock: number
	availableStock: number
	produktSlug: string
	wyroznioneZdjecie: ImageProps
	czyNowy: boolean
	czyPromocja: boolean
	kategoria:
		| 'Biżuteria'
		| 'Dekoracje'
		| 'Ceramika'
		| 'Rękodzieło'
		| 'Odzież'
		| 'Plakaty'
		| 'Torby'
		| 'Teatr Tańca Szofar'
	onSyncTotalStock: (nextTotal: number) => void
}

export default function ProductContentText({
	id,
	nazwaProduktu,
	cena,
	przecena,
	totalStock,
	availableStock,
	produktSlug,
	wyroznioneZdjecie,
	czyNowy,
	czyPromocja,
	kategoria,
	onSyncTotalStock,
}: ProductContentTextProps) {
	const { addToCart } = useCart()
	const [isProcessing, setIsProcessing] = useState(false)

	const isUnavailable = availableStock <= 0

	const handleAddToCart = async (e: React.MouseEvent) => {
		e.preventDefault()

		if (isUnavailable || isProcessing) {
			// toast.error('Nie możesz dodać więcej sztuk tego produktu.')
			return
		}

		const productData = convertShopProductToProductLink({
			id,
			nazwaProduktu,
			produktSlug,
			cena,
			czyNowy,
			czyPromocja,
			iloscProduktu: totalStock,
			przecena: przecena || '',
			wyroznioneZdjecie,
			kategoria,
		})

		try {
			setIsProcessing(true)
			const result = await addToCart(productData)

			if (!result?.success) {
				if (typeof result?.availableQuantity === 'number') {
					onSyncTotalStock(result.availableQuantity)
				}
				const message =
					result?.reason === 'OUT_OF_STOCK'
						? 'Limit sztuk w magazynie został osiągnięty.'
						: 'Nie udało się zweryfikować stanu magazynowego. Spróbuj ponownie.'
				// toast.error(message)
				return
			}

			if (typeof result.availableQuantity === 'number') {
				onSyncTotalStock(result.availableQuantity)
			}
		} catch (error) {
			console.error('Błąd podczas dodawania produktu do koszyka', error)
			// toast.error('Nie udało się dodać produktu. Spróbuj ponownie później.')
		} finally {
			setIsProcessing(false)
		}
	}

	return (
		<div className={styles['productShop__productInfo-content']}>
			{nazwaProduktu ? <h1>{nazwaProduktu}</h1> : <h1>Nazwa produktu</h1>}
			<p
				className={`${stylesProduct['product__boxText-bottom-price']} ${
					styles['productShop__productInfo-content--price']
				} ${przecena ? stylesProduct['product__boxText-bottom--discount'] : ''}`}
			>
				{cena ? cena : 'cena'} zł {przecena && <span> {przecena ? przecena : ''} zł</span>}
			</p>
			<ul className={styles['productShop__productInfo-content--list']}>
				<li>
					<HandMadeIcon /> Wykonane ręcznie
				</li>
				<li>
					<SupportFundationIcon /> Wspierasz fundację
				</li>
				<li>
					<UniqueIcon /> Każdy egzemplarz jest unikalny
				</li>
				<li>
					<PresentIcon /> Idealne na prezent
				</li>
			</ul>
			<div
				className={styles['productShop__productInfo-content-boxOptions']}
				role='radiogroup'
				aria-label='Metody płatności'
			>
				<p>Metody Płatności:</p>
				<div className={styles['productShop__boxOptions']} aria-label='Metody płatności'>
					<p>
						<span>
							<BankTransferIcon />
						</span>
						Przelew Bankowy
					</p>
					<p>
						<span>
							<BlikIcon />
						</span>
						Blik
					</p>
					<p>
						<span>
							<CardIcon />
						</span>
						Karta
					</p>
				</div>
			</div>
			<div className={styles['productShop__productInfo-content-boxOptions']}>
				<div className={styles['productShop__deliveryHeader']}>
					<p>Dostawa:</p>
					<p>Termin realizacji zamówienia to 7 dni roboczych.</p>
				</div>
				<div className={styles['productShop__boxOptions']} aria-label='Sposób dostawy'>
					<p>
						<span className={styles['productShop__boxLogo']}>
							<Image src={INPOST_LOGO} alt='InPost' width={28} height={28} />
						</span>
						Inpost
					</p>
					<p>
						<span className={styles['productShop__boxLogo']}>
							<Image src={DPD_LOGO} alt='DPD' width={28} height={28} />
						</span>
						DPD
					</p>
					<p>
						<span className={styles['productShop__boxLogo']}>
							<Image src={INPOST_LOGO} alt='InPost Paczkomat' width={28} height={28} />
						</span>
						Inpost | Paczkomat
					</p>
				</div>
			</div>
			<button
				className={`${stylesBtn.mainBtn} ${styles['productShop__productInfo-content--addToCartBtn']}`}
				aria-label='Dodaj do koszyka'
				disabled={isUnavailable || isProcessing}
				onClick={handleAddToCart}
			>
				Dodaj do koszyka {isProcessing ? <Spinner aria-label='Dodawanie produktu' /> : <ShopCheckoutIcon />}
			</button>
		</div>
	)
}
