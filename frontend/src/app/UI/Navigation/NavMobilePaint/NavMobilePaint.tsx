import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslations } from 'next-intl'

import { AnimatePresence, motion } from 'motion/react'

import NavLanguages from '../NavLanguages/NavLanguages'
import BurgerBtn from '../../BurgerBtn/BurgerBtn'
import { Link } from '@/i18n/navigation'

import type { NavLinksProps } from '@/utils/types'

import styles from '@/app/UI/Navigation/Navigation.module.scss'
import paintStyles from '@/app/UI/Navigation/NavMobilePaint/NavMobilePaint.module.scss'
import { contentVariants, createPaintVariants, itemVariants } from './variants'

export default function NavMobilePaint({ linkiNawigacja }: NavLinksProps) {
	const [open, setOpen] = useState(false)
	const [origin, setOrigin] = useState<{ x: number; y: number; maxRadius: number } | null>(null)
	const burgerBtnRef = useRef<HTMLButtonElement>(null)

	const navTranslations = useTranslations('navigation')

	useEffect(() => {
		if (!open) return
		const previous = document.body.style.overflow

		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = previous
		}
	}, [open])
	const openMenu = () => {
		const rect = burgerBtnRef.current!.getBoundingClientRect()
		const x = rect.left + rect.width / 2
		const y = rect.top + rect.height / 2
		const maxRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

		setOrigin({
			x,
			y,
			maxRadius,
		})
		setOpen(true)
	}
	const closeMenu = () => {
		setOpen(false)
	}

	const paintVariants = useMemo(() => (origin ? createPaintVariants(origin) : undefined), [origin])

	return (
		<>
			<BurgerBtn
				className={open ? paintStyles.burgerInHeaderHidden : undefined}
				ref={burgerBtnRef}
				onClick={() => (open ? closeMenu() : openMenu())}
				aria-expanded={open}
			/>
			{typeof document !== 'undefined' &&
				createPortal(
					<AnimatePresence>
						{open && origin && (
							<motion.div
								key='nav-mobile-paint'
								className={paintStyles.overlay}
								initial='closed'
								animate='open'
								exit='closed'
								role='dialog'
							>
								<motion.div
									className={paintStyles.paint}
									initial='closed'
									animate='open'
									exit='closed'
									variants={paintVariants}
								/>
								<motion.div
									className={paintStyles.content}
									initial='closed'
									animate='open'
									exit='closed'
									variants={contentVariants}
								>
									<motion.ul className={styles.navMobile}>
										<motion.li variants={itemVariants}>
											<BurgerBtn
												className={paintStyles.burgerBtnClose}
												onClick={closeMenu}
												aria-label={navTranslations('mobileMenu.close')}
											/>
										</motion.li>
										{linkiNawigacja.map(link => {
											return (
												<motion.li key={link.id} variants={itemVariants}>
													{link.href.startsWith('#') || link.href.startsWith('/#') ? (
														<Link
															href={{ pathname: '/', hash: link.href.replace(/^\/?#/, '') }}
															title={navTranslations(link.labelKey)}
															onClick={() => closeMenu()}
														>
															{navTranslations(link.labelKey)}
														</Link>
													) : (
														<Link
															href={link.href === '/projekty' ? '/projekty' : '/'}
															title={navTranslations(link.labelKey)}
															onClick={() => closeMenu()}
														>
															{navTranslations(link.labelKey)}
														</Link>
													)}
												</motion.li>
											)
										})}
									</motion.ul>
									<motion.div variants={itemVariants}>
										<NavLanguages className={styles.navLanguages__mobile} />
									</motion.div>
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>,
					document.body
				)}
		</>
	)
}
