import Link from 'next/link'

import type { ImageProps } from '@/utils/types'
// import { getStrapiURL } from '@/utils/get-strapi-url'

import styles from './Logo.module.scss'

interface LogoProps {
	logoNav: ImageProps
}
// change to SVG if the logo doesn't got from CMS
export default function Logo({ logoNav }: LogoProps) {
	return (
		<Link className={styles.logo} href='/'>
			<img src={logoNav.url} alt={logoNav.alternativeText || 'logo'} width={118} height={100} />
		</Link>
	)
}
