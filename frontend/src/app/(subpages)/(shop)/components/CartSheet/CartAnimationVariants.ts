// Przykładowe warianty animacji dla koszyka
// Możesz użyć tych wariantów w CartSheet.tsx dla bardziej zaawansowanych animacji
import { easeInOut, easeOut, type Variants } from 'motion'
export const cartAnimationVariants: Variants = {
	// Animacja "bounce" dla całego przycisku
	bounce: {
		scale: [1, 1.15, 1],
		y: [0, -8, 0],
		transition: {
			duration: 0.8,
			ease: easeInOut,
			times: [0, 0.5, 1],
		},
	},

	// Animacja "shake" dla ikony koszyka
	shake: {
		rotate: [0, -15, 15, -10, 10, -5, 5, 0],
		scale: [1, 1.1, 1],
		transition: {
			duration: 0.6,
			ease: easeInOut,
		},
	},

	// Animacja "pulse" dla liczby produktów
	pulse: {
		scale: [1, 1.4, 1],
		backgroundColor: ['rgba(65, 167, 91, 0.2)', 'rgba(65, 167, 91, 0.8)', 'rgba(65, 167, 91, 0.2)'],
		transition: {
			duration: 0.7,
			ease: easeInOut,
		},
	},

	// Animacja "wiggle" - bardziej subtelna
	wiggle: {
		rotate: [0, 5, -5, 3, -3, 0],
		scale: [1, 1.05, 1],
		transition: {
			duration: 0.5,
			ease: easeInOut,
		},
	},

	// Animacja "spring" - bardziej dynamiczna
	spring: {
		scale: [1, 1.2, 0.95, 1.05, 1],
		y: [0, -10, 5, -3, 0],
		transition: {
			duration: 0.8,
			ease: easeOut,
			times: [0, 0.2, 0.4, 0.6, 1],
		},
	},
}
export const itemVariants: Variants = {
	initial: {
		opacity: 1,
		y: 0,
		scale: 1,
		rotate: 0,
	},
	bump: {
		scale: [1, 0.97, 1.02, 1],
		backgroundColor: ['transparent', 'rgba(65,167,91,0.12)', 'rgba(65,167,91,0.08)', 'transparent'],
		transition: {
			duration: 0.4,
			ease: easeInOut,
			scale: {
				times: [0, 0.3, 0.7, 1],
			},
		},
	},
	exit: {
		opacity: 0,
		x: -20,
		height: 0,
		marginTop: 0,
		marginBottom: 0,
		paddingTop: 0,
		paddingBottom: 0,
		transition: {
			duration: 0.28,
			ease: easeInOut,
		},
	},
}

// Przykład użycia w komponencie:
/*
<motion.div
  variants={cartAnimationVariants}
  animate={isAnimating ? "bounce" : "initial"}
  initial="initial"
>
  <SheetTrigger>
    <motion.div
      variants={cartAnimationVariants}
      animate={isAnimating ? "shake" : "initial"}
    >
      <ShopCartIcon />
    </motion.div>
    <motion.span
      variants={cartAnimationVariants}
      animate={isAnimating ? "pulse" : "initial"}
    >
      {cartNumbersOfCartItems}
    </motion.span>
  </SheetTrigger>
</motion.div>
*/
