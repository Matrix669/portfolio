'use client'

import Image from 'next/image'

import { useTranslations } from 'next-intl'
import { useCursorLabel } from '@/app/contexts/CursorLabelContext'

import Wrapper from '@/app/UI/Wrapper/Wrapper'
import MainLink from '@/app/UI/MainLink/MainLink'
import BgGradient from '@/app/UI/BgGradient/BgGradient'
import { Tilt } from '@/componentsShadcn/ui/tilt'

import RightArrow from '@/app/icons/RightArrow'
import HERO_IMG from '@/app/assets/HeroSection/me.png'

import styles from './HeroSection.module.scss'

export default function HeroSection() {
	const { setLabel } = useCursorLabel()

	const tHeroSection = useTranslations('mainPage.heroSection')
	const tButton = useTranslations('button')

	return (
		<section className={styles.sectionPadding}>
			<Wrapper>
				<div className={styles.heroSectionBox}>
					<Tilt rotationFactor={12} isRevese className={styles.heroSectionBox__Tilt}>
						<div
							className={styles.heroSectionBox__TiltImage}
							onMouseEnter={() => setLabel(tHeroSection('title'))}
							onMouseLeave={() => setLabel(null)}
						>
							<Image src={HERO_IMG} alt={tHeroSection('imgAlt')} />
						</div>
					</Tilt>
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
