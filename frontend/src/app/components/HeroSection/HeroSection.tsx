import Image from 'next/image'

import { useTranslations } from 'next-intl'

import Wrapper from '@/app/UI/Wrapper/Wrapper'
import MainLink from '@/app/UI/MainLink/MainLink'
import BgGradient from '@/app/UI/BgGradient/BgGradient'


import RightArrow from '@/app/icons/RightArrow'
import HERO_IMG from '@/app/assets/HeroSection/me.png'

import styles from './HeroSection.module.scss'

export default function HeroSection() {
	const tHeroSection = useTranslations('mainPage.heroSection')
	const tButton = useTranslations('button')
	return (
		<section className={styles.sectionPadding}>
			<Wrapper>
				<div className={styles.heroSectionBox}>
					<Image src={HERO_IMG} alt='me, Maks Tkaczyk' />
					<BgGradient className={styles['heroSectionBox-BgGradient']} />
					<h1>{tHeroSection('description')}</h1>
					<MainLink href='#work'>
						{tButton('work')} <RightArrow />
					</MainLink>
				</div>
			</Wrapper>
		</section>
	)
}
