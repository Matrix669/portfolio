'use client'

import { useEffect, useState } from 'react'

import Wrapper from '../Wrapper/Wrapper'
import { SheetMobile } from './SheetMobile/SheetMobile'
import { NavigationMenuDesktop } from './NavDesktop/NavDesktop'

import Logo from '../Logo/Logo'
import type { ImageProps } from '@/utils/types'

import styles from './Navigation.module.scss'
import { usePathname } from 'next/navigation'

interface NavigationProps {
	data: {
		logoNav: ImageProps
		linkiNawigacja: {
			id: number
			nazwa: string
			href: string
			czyLinkiDropdown: boolean
			czySpecjalnaGrupa: boolean
			linkiNawigacjaDropdown?: {
				id: number
				nazwa: string
				href: string
			}[]
		}[]
	}
}

export default function Navigation({ data }: NavigationProps) {
	const [navShadow, setNavShadow] = useState(false)
	const pathname = usePathname()

	useEffect(() => {
		const handleShadowNav = () => {
			if (window.scrollY >= 200) {
				setNavShadow(true)
			} else {
				setNavShadow(false)
			}
		}

		window.addEventListener('scroll', handleShadowNav)
		return () => {
			window.removeEventListener('scroll', handleShadowNav)
		}
	}, [])

	return (
		<header
			className={`${styles.nav} ${navShadow ? styles.navShadow : ''} ${pathname !== '/' ? styles.navSubpage : ''}`}
		>
			<Wrapper>
				<nav className={styles.nav__inner}>
					{data.logoNav && <Logo logoNav={data.logoNav} />}

					<SheetMobile linkiNawigacja={data.linkiNawigacja} />
					<NavigationMenuDesktop linkiNawigacja={data.linkiNawigacja} />
				</nav>
			</Wrapper>
		</header>
	)
}
