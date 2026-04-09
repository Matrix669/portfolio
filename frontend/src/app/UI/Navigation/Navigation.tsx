'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import Wrapper from '../Wrapper/Wrapper'
import { SheetMobile } from './SheetMobile/SheetMobile'
import { NavigationMenuDesktop } from './NavDesktop/NavDesktop'
import Logo from '../Logo/Logo'
import SocialsIcons from '@/app/UI/Socials/Socials'

import { SOCIALS_DATA } from '@/app/constants/socialsData'

import styles from './Navigation.module.scss'
import NavLanguages from './NavLanguages/NavLanguages'

interface NavigationProps {
	data: {
		linkiNawigacja: {
			id: number
			labelKey: string
			href: string
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
					<Logo />
					<SocialsIcons socialsIconsArr={SOCIALS_DATA} />

					<SheetMobile linkiNawigacja={data.linkiNawigacja} />
					<NavigationMenuDesktop linkiNawigacja={data.linkiNawigacja} />
					<NavLanguages className={styles.navLanguages__desktop} />
				</nav>
			</Wrapper>
		</header>
	)
}
