'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import Wrapper from '../Wrapper/Wrapper'
import Logo from '../Logo/Logo'
import SocialsIcons from '@/app/UI/Socials/Socials'
import NavLanguages from './NavLanguages/NavLanguages'
import NavMobilePaint from './NavMobilePaint/NavMobilePaint'
import { NavigationMenuDesktop } from './NavDesktop/NavDesktop'

import { SOCIALS_DATA } from '@/app/constants/socialsData'

import styles from './Navigation.module.scss'

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
	const [navStyle, setNavStyle] = useState(false)
	const pathname = usePathname()
	const isHomePage = pathname === '/' || pathname === '/en' || pathname === '/pl'
	const threshold = isHomePage ? 200 : 10

	useEffect(() => {
		const handleShadowNav = () => {
			setNavStyle(window.scrollY >= threshold)
		}

		handleShadowNav()
		window.addEventListener('scroll', handleShadowNav)
		return () => {
			window.removeEventListener('scroll', handleShadowNav)
		}
	}, [threshold])

	return (
		<header className={styles.nav}>
			<Wrapper>
				<nav className={`${styles.nav__inner} ${navStyle ? styles.navPill : ''}`}>
					<Logo />
					<SocialsIcons socialsIconsArr={SOCIALS_DATA} />

					<NavMobilePaint linkiNawigacja={data.linkiNawigacja} />
					<NavigationMenuDesktop linkiNawigacja={data.linkiNawigacja} />
					<NavLanguages className={styles.navLanguages__desktop} />
				</nav>
			</Wrapper>
		</header>
	)
}
