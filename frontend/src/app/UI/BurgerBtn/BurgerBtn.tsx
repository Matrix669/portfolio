import { forwardRef } from 'react'
import { motion, useAnimationControls } from 'motion/react'

import styles from './BurgerBtn.module.scss'
const OFFSET = 10 // odległość od środka do rogu

const dots = [
	{ id: 1, rest: { x: -OFFSET, y: -OFFSET } },
	{ id: 2, rest: { x: OFFSET, y: -OFFSET } },
	{ id: 3, rest: { x: -OFFSET, y: OFFSET } },
	{ id: 4, rest: { x: OFFSET, y: OFFSET } },
]

const BurgerBtn = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => {
	const controls = useAnimationControls()
	return (
		<button
			{...props}
			className={styles.burgerBtn}
			aria-label='navigation button'
			ref={ref}
			onMouseEnter={e => {
				props.onMouseEnter?.(e)
				controls.start('hover')
			}}
			onMouseLeave={e => {
				props.onMouseLeave?.(e)
				controls.start('rest')
			}}
			onFocus={e => {
				props.onFocus?.(e)
				controls.start('hover')
			}}
			onBlur={e => {
				props.onBlur?.(e)
				controls.start('rest')
			}}
		>
			<motion.div
				initial='rest'
				animate={controls}
				style={{
					position: 'relative',
					width: 30,
					height: 30,
					cursor: 'pointer',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{dots.map(({ id, rest }) => (
					<motion.div
						key={id}
						variants={{
							rest: { ...rest, width: 8, height: 8 },
							hover: { x: 0, y: 0, width: 20, height: 20 }, // 👈 zlatują się + rosną
						}}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
						style={{
							position: 'absolute',
							borderRadius: '50%',
							backgroundColor: 'white',
						}}
					/>
				))}
			</motion.div>
		</button>
	)
})

export default BurgerBtn
