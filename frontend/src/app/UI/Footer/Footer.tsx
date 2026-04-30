
import Wrapper from '@/app/UI/Wrapper/Wrapper'
import SocialsIcons from '../Socials/Socials'

import Logo from '@/app/UI/Logo/Logo'
import { SOCIALS_DATA } from '@/app/constants/socialsData'
import BgGradient from '@/app/UI/BgGradient/BgGradient'
import NavLanguages from '@/app/UI/Navigation/NavLanguages/NavLanguages'
import { NavigationMenuDesktop } from '@/app/UI/Navigation/NavDesktop/NavDesktop'


import { NAVIGATION_DATA } from '@/app/constants/navigationData'

import styles from './Footer.module.scss'

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<Wrapper>
				<div className={`${styles.sectionPadding} ${styles.footer__inner}`}>
					{/* <BgGradient /> */}
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
