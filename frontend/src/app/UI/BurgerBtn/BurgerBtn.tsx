import { forwardRef } from 'react'
import styles from './BurgerBtn.module.scss'


const BurgerBtn = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
	(props, ref) => {
	return (
		<button className={styles.burgerBtn} aria-label='navigation button' ref={ref} {...props}>
			<div className={styles.burgerBtn__Box}>
				<div className={styles.burgerBtn__Bars}></div>
			</div>
		</button>
	)}
)


export default BurgerBtn