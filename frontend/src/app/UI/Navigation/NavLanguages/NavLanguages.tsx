'use client'

import { Link, usePathname } from '@/i18n/navigation'
import { useLocale } from 'next-intl'

import styles from '../Navigation.module.scss'

export default function NavLanguages({ className }: { className?: string }) {
	const pathname = usePathname()
	const locale = useLocale()
	return (
		<ul className={`${styles.navDesktop} ${styles.navLanguages} ${className}`}>
			<li>
				<Link href={pathname} locale='pl' className={locale === 'pl' ? styles.active : ''}>PL</Link>
			</li>
			<li>
				<Link href={pathname} locale='en' className={locale === 'en' ? styles.active : ''}>EN</Link>
			</li>
		</ul>
	)
}
