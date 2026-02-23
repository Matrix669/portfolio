'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useCart } from '@/app/context/CartContext'
import { AnimatePresence, easeInOut, motion } from 'motion/react'

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/componentsShadcn/ui/sheet'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import { getStrapiMedia } from '@/utils/get-strapi-media'

import ShopCartIcon from '@/app/icons/shop/ShopCartIcon'
import TrashIcon from '@/app/icons/shop/TrashIcon'
import { X } from 'lucide-react'
import SmileFaceIcon from '@/app/icons/shop/SmileFaceIcon'

import styles from './CartSheet.module.scss'
import { itemVariants } from './CartAnimationVariants'

export default function CartSheet() {
	const { cart, removeFromCart } = useCart()
	const [isAnimating, setIsAnimating] = useState(false)
	const [bumpIds, setBumpIds] = useState<Set<string>>(new Set())

	const [isRemoving, setIsRemoving] = useState<Set<string>>(new Set())
	const [isHidingScrollbar, setIsHidingScrollbar] = useState(false)

	function bumpItem(id: string) {
		if (isRemoving.has(id) || bumpIds.has(id)) return

		setBumpIds(prev => new Set(prev).add(id))
		setTimeout(() => {
			setBumpIds(prev => {
				const next = new Set(prev)
				next.delete(id)
				return next
			})
		}, 400)
	}

	const cartNumbersOfCartItems: number =
		cart.length > 0 ? cart.reduce((total, product) => total + product.quantityInCart, 0) : 0
	const totalCartPrice: number = cart.reduce((total, product) => total + product.cena * product.quantityInCart, 0)

	useEffect(() => {
		if (cartNumbersOfCartItems > 0) {
			setIsAnimating(true)
			const timer = setTimeout(() => {
				setIsAnimating(false)
			}, 600)
			return () => clearTimeout(timer)
		}
	}, [cartNumbersOfCartItems])

	const handleRemoveFromCart = (e: React.MouseEvent, productId: string, currentQuantity: number) => {
		e.preventDefault()
		e.stopPropagation()

		if (isRemoving.has(productId)) return

		
		setIsHidingScrollbar(true)

		
		if (currentQuantity > 1) {
			setIsRemoving(prev => new Set(prev).add(productId))
			bumpItem(productId)

			
			setTimeout(() => {
				removeFromCart(productId)
				setIsRemoving(prev => {
					const next = new Set(prev)
					next.delete(productId)
					return next
				})
				
				setTimeout(() => setIsHidingScrollbar(false), 300)
			}, 200)
		} else {
			removeFromCart(productId)
			setTimeout(() => setIsHidingScrollbar(false), 300)
		}
	}

	return (
		<div className={styles.cartSheet}>
			<Sheet>
				{cartNumbersOfCartItems > 0 ? (
					<motion.div
						animate={
							isAnimating
								? {
										scale: [0, 1.2, 1],
								  }
								: {}
						}
						transition={{
							duration: 0.6,
							ease: easeInOut,
						}}
						className={styles['cartSheet-btnTrigger']}
					>
						<SheetTrigger>
							<motion.div
								animate={
									isAnimating
										? {
												scale: [1, 1.2, 1],
												rotate: [0, 10, -10, 0],
										  }
										: {}
								}
								transition={{
									duration: 0.6,
									ease: easeInOut,
								}}
							>
								<ShopCartIcon />
							</motion.div>
							<motion.span
								animate={
									isAnimating
										? {
												scale: [1, 1.3, 1],
												y: [0, -5, 0],
										  }
										: {}
								}
								transition={{
									duration: 0.6,
									ease: easeInOut,
								}}
							>
								{cartNumbersOfCartItems > 0 ? (cartNumbersOfCartItems < 10 ? cartNumbersOfCartItems : '9+') : null}
							</motion.span>
						</SheetTrigger>
					</motion.div>
				) : null}
				<SheetContent side='right' className={styles.cartSheet__content}>
					<SheetHeader className={styles.cartSheet__header}>
						<SheetTitle className={styles['cartSheet__header-title']}>
							<ShopCartIcon /> Koszyk ({cartNumbersOfCartItems})
						</SheetTitle>
						<SheetClose className={styles['cartSheet__header-btnClose']}>
							<X />
						</SheetClose>
						<VisuallyHidden>
							<SheetDescription>Koszyk sklepowy</SheetDescription>
						</VisuallyHidden>
					</SheetHeader>
					<div
						className={`${styles.cartSheet__productCartList} ${isHidingScrollbar ? styles['hiding-scrollbar'] : ''}`}
					>
						<AnimatePresence initial={false}>
							{cart.map(product => (
								<motion.div
									key={product.id}
									variants={itemVariants}
									initial='initial'
									animate={bumpIds.has(product.id) ? 'bump' : 'initial'}
									exit='exit'
									layout
									transition={{
										layout: {
											duration: 0.28,
											ease: easeInOut,
											// delay: 0.28,
										},
									}}
								>
									<Link href={`/sklep/${product.produktSlug}`} className={styles['cartSheet__productCartList-item']}>
										<div className={styles['cartSheet__productCartList-item__boxImg']}>
											<Image
												src={getStrapiMedia(product.wyroznioneZdjecie.url) || product.wyroznioneZdjecie.url}
												alt={product.wyroznioneZdjecie.alternativeText || 'Zdjęcie produktu'}
												width={110}
												height={102}
											/>
										</div>
										<div className={styles['cartSheet__productCartList-item__boxText']}>
											<h3>{product.nazwaProduktu}</h3>
											<div>
												<p>
													{product.cena * product.quantityInCart} zł
													<span>x{product.quantityInCart}</span>
													{product.przecena && (
														<span className={styles['cartSheet__productCartList-item-price']}>
															{Number(product.przecena) * product.quantityInCart} zł
														</span>
													)}
												</p>
												<button onClick={e => handleRemoveFromCart(e, product.id, product.quantityInCart)}>
													<TrashIcon />
												</button>
											</div>
										</div>
									</Link>
								</motion.div>
							))}
						</AnimatePresence>
						{cart.length === 0 && (
							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2 }}
							>
								Koszyk jest pusty
							</motion.p>
						)}
					</div>
					<SheetFooter className={styles.cartSheet__footer}>
						<div className={styles['cartSheet__footer-item']}>
							<p>Wysyłka: </p>
							<p>12 zł</p>
						</div>
						<div className={styles['cartSheet__footer-item']}>
							<p>Razem</p>
							<p>{totalCartPrice} zł</p>
						</div>
						<div className={styles['cartSheet__footer-boxBtn']}>
							<p>
								<SmileFaceIcon /> Twój zakup wspiera działania Fundacji Drachma
							</p>
							{cart.length === 0 ? (
								<button disabled={cart.length === 0}>Przejdź do kasy</button>
							) : (
								// <button >
								<Link href='/sklep/finalizacja-zakupu'>Przejdź do kasy</Link>
								// </button>
							)}
						</div>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</div>
	)
}
