import Link from 'next/link'

import LogoIcon from '@/app/icons/LogoIcon'

import styles from './Logo.module.scss'


export default function Logo() {
	return (
		<Link className={styles.logo} href='/' aria-label='logo'>
			<LogoIcon />
		</Link>
	)
}
