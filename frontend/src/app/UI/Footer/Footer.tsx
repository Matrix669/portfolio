import Link from 'next/link'

import Wrapper from '@/app/UI/Wrapper/Wrapper'
import SocialsIcons from '../Socials/Socials'

import Logo from '../Logo/Logo'
import { SOCIALS_DATA } from '@/app/constants/socialsData'

import styles from './Footer.module.scss'
import NavLanguages from '../Navigation/NavLanguages/NavLanguages'
import { NavigationMenuDesktop } from '../Navigation/NavDesktop/NavDesktop'
import { NAVIGATION_DATA } from '@/app/constants/navigationData'

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<Wrapper>
				<div className={`${styles.sectionPadding} ${styles.footer__inner}`}>
					<div className={styles.bgGradient}></div>
					<div className={styles.footer__inner__logoBox}>
						<Logo />
						<p>
							<strong>Maks Tkaczyk</strong>
						</p>
					</div>
					<SocialsIcons socialsIconsArr={SOCIALS_DATA} />
					<div className={styles.footer__inner__navBox}>
						<NavigationMenuDesktop linkiNawigacja={NAVIGATION_DATA.linkiNawigacja} />
						<NavLanguages />
					</div>
				</div>
			</Wrapper>
		</footer>
	)
}
