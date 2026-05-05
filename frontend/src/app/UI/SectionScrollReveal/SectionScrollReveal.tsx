'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'

export default function SectionScrollReveal({ children }: { children: React.ReactNode }) {
	const shouldReduceMotion = useReducedMotion()
	const targetRef = useRef<HTMLDivElement>(null)
	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ['start end', 'end start'],
	})

	const opacityProgress = useTransform(scrollYProgress, [0, 0.45], [0, 1])
	const yProgress = useTransform(scrollYProgress, [0, 0.45], [100, 1])
	const scaleProgress = useTransform(scrollYProgress, [0, 0.45], [0.96, 1])

	const smoothOpacity = useSpring(opacityProgress, { stiffness: 150, damping: 26, mass: 0.15 })
	const smoothY = useSpring(yProgress, { stiffness: 110, damping: 30, mass: 0.4 })
	const smoothScale = useSpring(scaleProgress, { stiffness: 130, damping: 26, mass: 0.35 })
	return (
		<motion.div
			ref={targetRef}
			className=''
			style={{
				opacity: shouldReduceMotion ? 1 : smoothOpacity,
				y: shouldReduceMotion ? 0 : smoothY,
				scale: shouldReduceMotion ? 1 : smoothScale,
			}}
		>
			{children}
		</motion.div>
	)
}
