'use client'

import Image, { StaticImageData } from 'next/image'
import { motion } from 'motion/react'

import { useTranslations } from 'next-intl'
import { useCursorLabel } from '@/app/contexts/CursorLabelContext'

import { Tilt } from '@/componentsShadcn/ui/tilt'


import styles from '@/app/components/HeroSection/HeroSection.module.scss'

type HeroMeProps = {
	imgSrc: StaticImageData
	imgAlt: string
	mouseLabel?: string
	className?: string
}
export default function HeroMe({ imgSrc, imgAlt, mouseLabel, className }: HeroMeProps) {
	const { setLabel } = useCursorLabel()

	const tHeroSection = useTranslations('mainPage.heroSection')

	return (
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
            className={className}
		>
			<Tilt rotationFactor={12} isRevese className={styles.heroSectionBox__Tilt}>
				<div
					className={styles.heroSectionBox__TiltImage}
					onMouseEnter={() => setLabel(mouseLabel || tHeroSection('title'))}
					onMouseLeave={() => setLabel(null)}
				>
					<Image src={imgSrc} alt={imgAlt} width={128} height={128} quality={100} priority />
				</div>
			</Tilt>
		</motion.div>
	)
}
