'use client'

import { motion, MotionProps } from 'motion/react'

type AnimationBoxProps = {
	children: React.ReactNode
	className?: string
} & MotionProps
export default function AnimationBox({ children, className, ...motionProps }: AnimationBoxProps) {
	return <motion.div className={className} {...motionProps}>{children}</motion.div>
}
