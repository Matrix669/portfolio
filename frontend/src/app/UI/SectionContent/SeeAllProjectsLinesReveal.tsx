'use client'

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { useRef } from 'react'
import type { CSSProperties, ReactNode } from 'react'

import styles from './SectionContent.module.scss'

type SeeAllProjectsLinesRevealProps = {
	children: ReactNode
	className?: string
}

export default function SeeAllProjectsLinesReveal({ children, className }: SeeAllProjectsLinesRevealProps) {
	const shouldReduceMotion = useReducedMotion()
	const targetRef = useRef<HTMLDivElement>(null)
	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ['start end', 'end start'],
	})
	const lineProgress = useTransform(scrollYProgress, [0, 0.6], [0, 1])
	const smoothLineProgress = useSpring(lineProgress, { stiffness: 150, damping: 30, mass: 0.25 })

	return (
		<motion.div
			ref={targetRef}
			className={`${styles.sectionContent__seeAllProjects} ${className ?? ''}`.trim()}
			style={
				{
					'--see-all-line-scale': shouldReduceMotion ? 1 : smoothLineProgress,
				} as CSSProperties
			}
		>
			<span
				aria-hidden='true'
				className={`${styles.sectionContent__seeAllProjectsLine} ${styles.sectionContent__seeAllProjectsLineLeft}`}
			/>
			{children}
			<span
				aria-hidden='true'
				className={`${styles.sectionContent__seeAllProjectsLine} ${styles.sectionContent__seeAllProjectsLineRight}`}
			/>
		</motion.div>
	)
}
