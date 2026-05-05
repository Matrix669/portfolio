'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'

export default function MyProjectScrollReveal({ children, fromXEven }: { children: React.ReactNode, fromXEven: number }) {
	const shouldReduceMotion = useReducedMotion()
	const targetRef = useRef<HTMLDivElement>(null)
	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ['start end', 'end start'],
	})
	const fromScale = useTransform(scrollYProgress, [0, 0.6], [0.95, 1])
	const fromX = useTransform(scrollYProgress, [0, .35], [fromXEven, 0])
	const fromOpacity = useTransform(scrollYProgress, [0, 0.45], [0.35, 1])

	const smoothScale = useSpring(fromScale, { stiffness: 125, damping: 35, mass: 0.35 })
	const smoothX = useSpring(fromX, { stiffness: 120, damping: 25, mass: 0.3 })
	const smoothOpacity = useSpring(fromOpacity, { stiffness: 150, damping: 35, mass: 0.5 })
	return (
		<motion.div
			ref={targetRef}
			className=''
			style={{
				scale: shouldReduceMotion ? 1 : smoothScale,
				x: shouldReduceMotion ? 0 : smoothX,
				opacity: shouldReduceMotion ? 1 : smoothOpacity,
			}}
		>
			{children}
		</motion.div>
	)
}
