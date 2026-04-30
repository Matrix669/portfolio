'use client'

import Image from 'next/image'

import { useTranslations } from 'next-intl'
import { useCursorLabel } from '@/app/contexts/CursorLabelContext'

import Wrapper from '@/app/UI/Wrapper/Wrapper'
import MainLink from '@/app/UI/MainLink/MainLink'
import BgGradient from '@/app/UI/BgGradient/BgGradient'
import { Tilt } from '@/componentsShadcn/ui/tilt'
import { Magnetic } from '@/componentsShadcn/ui/magnetic'

import RightArrow from '@/app/icons/RightArrow'
import HERO_IMG from '@/app/assets/HeroSection/me.png'

import styles from './HeroSection.module.scss'

export default function HeroSection() {
	const { setLabel } = useCursorLabel()

	const tHeroSection = useTranslations('mainPage.heroSection')

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
							<Image src={HERO_IMG} alt={tHeroSection('imgAlt')} width={128} height={128} quality={100} priority />
						</div>
					</Tilt>
					{/* <BgGradient className={styles['heroSectionBox-BgGradient']} /> */}
					<h1>{tHeroSection('description')}</h1>
					<Magnetic>
						<MainLink href={tHeroSection('buttonWork.href')} isNextJSLink>
							{tHeroSection('buttonWork.label')} <RightArrow />
						</MainLink>
					</Magnetic>
				</div>
			</Wrapper>
		</section>
	)
}
