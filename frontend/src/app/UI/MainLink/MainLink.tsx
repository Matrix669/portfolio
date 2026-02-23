import Link from 'next/link'

import styles from './MainLink.module.scss'

type ButtonProps = {
	children: React.ReactNode
	href: string
	isBlack?: boolean
	CSSClassname?: string
	target?: string
}

export default function MainLink({ href, children, isBlack, CSSClassname, target }: ButtonProps) {
	return (
		<Link href={href} className={`${styles.mainBtn} ${isBlack ? styles.blackMainBtn : ''} ${CSSClassname}`} target={target}>
			{children}
		</Link>
	)
}
