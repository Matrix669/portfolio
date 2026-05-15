import type { Variants } from 'motion/react'

export const PAINT_EASE = [0.22, 1, 0.36, 1] as const

export const contentVariants: Variants = {
	closed: {
		opacity: 0,
		transition: {
			staggerChildren: 0.07,
			staggerDirection: -1,
		},
	},
	open: {
		opacity: 1,
		transition: {
			delayChildren: 0.2,
			staggerChildren: 0.07,
		},
	},
}
export const itemVariants: Variants = {
	closed: { opacity: 0, y: 16, transition: { duration: 0.2 } },
	open: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

type PaintOrigin = { x: number; y: number; maxRadius: number }

export function createPaintVariants({ x, y, maxRadius }: PaintOrigin): Variants {
	return {
		closed: {
			clipPath: `circle(0px at ${x}px ${y}px)`,
			transition: { delay: 0.35, duration: 0.55, ease: PAINT_EASE },
		},
		open: {
			clipPath: `circle(${maxRadius}px at ${x}px ${y}px)`,
			transition: { duration: 0.55, ease: PAINT_EASE },
		},
	}
}

export function createReducedPaintVariants(): Variants {
    return {
      closed: { opacity: 0 },
      open: { opacity: 1, transition: { duration: 0.2 } },
    }
  }