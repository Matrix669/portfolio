'use client'

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { useRef } from 'react'
import type { CSSProperties, ReactNode } from 'react'

import styles from './MyProject.module.scss'

type TopBorderRevealProps = {
	from: 'left' | 'right'
	children: ReactNode
	className?: string
}

type VerticalBorderRevealProps = {
	side: 'left' | 'right'
	children: ReactNode
	className?: string
	showOnMobile?: boolean
}

export function TopBorderReveal({ from, children, className }: TopBorderRevealProps) {
	const shouldReduceMotion = useReducedMotion()
	const targetRef = useRef<HTMLDivElement>(null)
	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ['start end', 'end start'],
	})
	const scaleProgress = useTransform(scrollYProgress, [0, 0.6], [0, 1])
	const smoothScale = useSpring(scaleProgress, { stiffness: 140, damping: 28, mass: 0.25 })

	return (
		<motion.div
			ref={targetRef}
			className={`${styles.topBorderReveal} ${className ?? ''}`.trim()}
			style={
				{
					'--top-border-origin': from === 'left' ? 'left center' : 'right center',
					'--top-border-scale': shouldReduceMotion ? 1 : smoothScale,
				} as CSSProperties
			}
		>
			{children}
		</motion.div>
	)
}

export function VerticalBorderReveal({
	side,
	children,
	className,
	showOnMobile = true,
}: VerticalBorderRevealProps) {
	const shouldReduceMotion = useReducedMotion()
	const targetRef = useRef<HTMLDivElement>(null)
	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ['start end', 'end start'],
	})
	const scaleProgress = useTransform(scrollYProgress, [0, 0.75], [0, 1])
	const smoothScale = useSpring(scaleProgress, { stiffness: 150, damping: 30, mass: 0.25 })

	return (
		<motion.div
			ref={targetRef}
			className={`${styles.verticalBorderReveal} ${className ?? ''}`.trim()}
			data-side={side}
			data-mobile={showOnMobile ? 'true' : 'false'}
			style={
				{
					'--vertical-border-scale': shouldReduceMotion ? 1 : smoothScale,
				} as CSSProperties
			}
		>
			{children}
		</motion.div>
	)
}
