import Link from 'next/link'

import styles from './CardLink.module.scss'

export function CardLink({ href, children }: { href: string; children: React.ReactNode }) {
	return (
		<Link href={href} className={styles.cardLink}>
			{children}
		</Link>
	)
}
