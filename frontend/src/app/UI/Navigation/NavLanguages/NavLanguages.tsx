import Link from 'next/link'
import styles from '../Navigation.module.scss'
export default function NavLanguages({className}: {className?: string}) {
	return (
		<ul className={`${styles.navDesktop} ${styles.navLanguages}  ${className}`}>
			<li>
				<Link href='/'>PL</Link>
			</li>
			<li>
				<Link href='/'>EN</Link>
			</li>
		</ul>
	)
}
