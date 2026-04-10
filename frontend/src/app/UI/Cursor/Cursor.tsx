'use client'

import { useCursorLabel } from '@/app/contexts/CursorLabelContext'
import MouseIcon from '@/app/icons/MouseIcon'
import { Cursor as CursorMotion } from '@/componentsShadcn/ui/cursor'
import { AnimatePresence, motion } from 'motion/react'

export default function Cursor() {
	const { label } = useCursorLabel()

	return (
		<CursorMotion className='hidden lg:block'>
			{/* Stały pivot pod translate -50%/-50% w cursor.tsx — etykieta poza flow (absolute), żeby nie zmieniać rozmiaru boxa */}
			<div className='relative h-[25px] w-[25px] shrink-0'>
				<MouseIcon />
				<AnimatePresence mode='wait'>
					{label ? (
						<motion.span
							key='cursor-label'
							role='status'
							aria-live='polite'
							initial={{ scale: 0.3, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.3, opacity: 0 }}
							transition={{ ease: 'easeInOut', duration: 0.15 }}
							className='pointer-events-none absolute left-full top-1/4 z-10 ml-2 flex items-center justify-center whitespace-nowrap rounded-[24px] bg-foreground text-background py-2 px-4 text-sm backdrop-blur-md'
						>
							{label}
						</motion.span>
					) : null}
				</AnimatePresence>
			</div>
		</CursorMotion>
	)
}
