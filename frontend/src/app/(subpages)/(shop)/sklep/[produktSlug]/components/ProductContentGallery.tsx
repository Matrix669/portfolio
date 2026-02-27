'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import MagnifyingGlassIcon from '@/app/icons/shop/MagnifyingGlassIcon'
import ShopNewProductIcon from '@/app/icons/shop/ShopNewProductIcon'
import ShopUnavailableProductIcon from '@/app/icons/shop/ShopUnavailableProductIcon'
import ShopPromotionProduct from '@/app/icons/shop/ShopPromotionProduct'
import ProductAvailableIcon from '@/app/icons/shop/ProductAvailableIcon'
import { Gallery, Item } from 'react-photoswipe-gallery'

import LOGO_PLACEHOLDER from '@/app/assets/logoDrachma.png'

import { ImageProps } from '@/utils/types'

import styles from '../ProductShop.module.scss'
import stylesProduct from '@/app/(subpages)/(shop)/components/Product/Product.module.scss'
import 'photoswipe/dist/photoswipe.css'

interface ProductContentGalleryProps {
	zdjeciaProduktu: ImageProps[]
	czyNowy: boolean
	czyPromocja: boolean
	iloscProduktu: number
}

export default function ProductContentGallery({
	zdjeciaProduktu,
	czyNowy,
	czyPromocja,
	iloscProduktu,
}: ProductContentGalleryProps) {
	const [activeIdx, setActiveIdx] = useState(0)
	const imgRef = useRef<HTMLImageElement | null>(null)
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [isZoomed, setIsZoomed] = useState(false)
	const isMobileBadges = useMediaQuery({ maxWidth: 639 })

	const images = useMemo(() => {
		if (Array.isArray(zdjeciaProduktu) && zdjeciaProduktu.length > 0) return zdjeciaProduktu
		return []
	}, [zdjeciaProduktu])

	useEffect(() => {
		if (containerRef.current) {
			const internalImg = containerRef.current.querySelector('img') as HTMLImageElement | null
			if (internalImg) imgRef.current = internalImg
		}
	}, [activeIdx])

	const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = e => {
		if (!imgRef.current || !containerRef.current) return
		const rect = containerRef.current.getBoundingClientRect()
		const x = ((e.clientX - rect.left) / rect.width) * 100
		const y = ((e.clientY - rect.top) / rect.height) * 100
		imgRef.current.style.transformOrigin = `${x}% ${y}%`
	}

	const isUnavailable = iloscProduktu <= 0
	const state = isUnavailable
		? {
				key: 'unavailable',
				Icon: ShopUnavailableProductIcon,
				label: 'Niedostępne',
				badgeClass: stylesProduct['product__state--unavailableBadge'],
		  }
		: czyNowy
		? {
				key: 'new',
				Icon: ShopNewProductIcon,
				label: 'Nowość',
				badgeClass: stylesProduct['product__state--newBadge'],
		  }
		: czyPromocja
		? {
				key: 'promotion',
				Icon: ShopPromotionProduct,
				label: 'Promocja',
				badgeClass: stylesProduct['product__state--promotionBadge'],
		  }
		: null

	const productState = state ? (
		<div
			className={`${styles['productShop__productInfo__boxImgs-badge']} ${stylesProduct['product__state']} ${
				stylesProduct[`product__state--${state.key}`]
			}`}
		>
			<state.Icon />
			<span className={state.badgeClass}>{state.label}</span>
		</div>
	) : null
	const galleryBoxCSS = `${styles['productShop__productInfo__boxImgs']} ${isUnavailable ? styles['productShop__productInfo__boxImgs--unavailable'] : ''}`
	return (
		<div className={galleryBoxCSS} role='region' aria-label='Zdjęcia produktu'>
			<Gallery
				options={{
					arrowPrev: true,
					arrowNext: true,
					zoom: true,
					close: true,
					counter: true,
				}}
			>
				{/* Main image */}
				{images.length > 0 ? (
					<div
						className={styles['productShop__mainImage']}
						onMouseMove={handleMouseMove}
						onMouseEnter={() => setIsZoomed(true)}
						onMouseLeave={() => setIsZoomed(false)}
						ref={containerRef}
					>
						{!isMobileBadges ? (
							<div className={styles['productShop__productInfo__boxBadges']}>
								{productState}
								{!isUnavailable && (
									<div
										className={`${styles['productShop__productInfo__boxImgs-badge']} ${styles['productShop__badgeAvailable']} ${stylesProduct['product__state']}`}
									>
										<ProductAvailableIcon />
										<span className={stylesProduct['product__state--newBadge']}>Dostępne</span>
									</div>
								)}
							</div>
						) : null}

						{images.map((img, idx) => (
							<Item
								key={idx}
								original={img?.url ?? ''}
								thumbnail={img?.url ?? ''}
								width={img?.width || 1200}
								height={img?.height || 1200}
								alt={img?.alternativeText ?? `zdjęcie ${idx + 1}`}
							>
								{({ ref, open }) =>
									idx === activeIdx ? (
										<Image
											ref={node => {
												ref(node)
												if (node) imgRef.current = node
											}}
											onClick={open}
											src={img?.url ?? ''}
											alt={img?.alternativeText ?? `zdjęcie ${idx + 1}`}
											fill
											sizes='(max-width: 768px) 100vw, 60vw'
											className={`${styles['productShop__mainImage-img']} ${
												isZoomed ? styles['productShop__mainImage-img--zoom'] : ''
											}`}
											priority
										/>
									) : (
										<div ref={ref} style={{ display: 'none' }} />
									)
								}
							</Item>
						))}

						<button type='button' className={styles['productShop__zoomBadge']} aria-label='Powiększ'>
							<MagnifyingGlassIcon />
						</button>
					</div>
				) : (
					<Image
						src={LOGO_PLACEHOLDER.src}
						alt={'Zdjęcie placeholder'}
						fill
						sizes='(max-width: 768px) 100vw, 60vw'
						className={`${styles['productShop__mainImage-img']} ${
							isZoomed ? styles['productShop__mainImage-img--zoom'] : ''
						}`}
						priority
					/>
				)}

				{/* thumbnails */}
				{images.length > 1 && (
					<div className={styles['productShop__thumbs']}>
						{images.map((img, idx) => (
							<button
								key={idx}
								type='button'
								className={`${styles['productShop__thumb']} ${
									idx === activeIdx ? styles['productShop__thumb--active'] : ''
								}`}
								onClick={() => setActiveIdx(idx)}
								aria-label={`Pokaż zdjęcie ${idx + 1}`}
							>
								<span className={styles['productShop__thumb-inner']}>
									<Image
										src={img?.url ?? ''}
										alt={img.alternativeText ?? `miniatura ${idx + 1}`}
										fill
										sizes='100px'
										className={styles['productShop__thumb-img']}
									/>
								</span>
							</button>
						))}
					</div>
				)}
			</Gallery>
			{/* Badges */}
			{isMobileBadges ? (
				<div className={styles['productShop__productInfo__boxBadges']}>
					{productState}
					{!isUnavailable && (
						<div
							className={`${styles['productShop__productInfo__boxImgs-badge']} ${styles['productShop__badgeAvailable']} ${stylesProduct['product__state']}`}
						>
							<ProductAvailableIcon />
							<span className={stylesProduct['product__state--newBadge']}>Dostępne</span>
						</div>
					)}
				</div>
			) : null}
		</div>
	)
}
