'use client'

import Image from 'next/image'

import { useTranslations } from 'next-intl'
import { useCursorLabel } from '@/app/contexts/CursorLabelContext'

import { motion } from 'motion/react'

import Wrapper from '@/app/UI/Wrapper/Wrapper'
import MainLink from '@/app/UI/MainLink/MainLink'
import BgGradient from '@/app/UI/BgGradient/BgGradient'
import { Tilt } from '@/componentsShadcn/ui/tilt'
import { Magnetic } from '@/componentsShadcn/ui/magnetic'
import { TextEffect } from '@/componentsShadcn/ui/text-effect'

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
					<motion.div
						  initial={{ opacity: 0, scale: 0.75 }}
						  animate={{ opacity: 1, scale: 1 }}
						  transition={{
							opacity: { duration: 0.45, ease: 'easeOut', delay: 0.3 },
							scale: {
							  type: 'spring',
							  stiffness: 220,
							  damping: 14,
							  mass: 0.7,
							  delay: 0.3,
							},
						  }}
					>
						<Tilt rotationFactor={12} isRevese className={styles.heroSectionBox__Tilt}>
							<div
								className={styles.heroSectionBox__TiltImage}
								onMouseEnter={() => setLabel(tHeroSection('title'))}
								onMouseLeave={() => setLabel(null)}
							>
								<Image src={HERO_IMG} alt={tHeroSection('imgAlt')} width={128} height={128} quality={100} priority />
							</div>
						</Tilt>
					</motion.div>
					{/* <BgGradient className={styles['heroSectionBox-BgGradient']} /> */}
					<TextEffect as='h1' per='char' preset='fade' delay={0.3}>
						{tHeroSection('description')}
					</TextEffect>
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
