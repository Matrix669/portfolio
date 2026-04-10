import { Link } from '@/i18n/navigation'

import styles from './MainLink.module.scss'

type ButtonProps = {
	children: React.ReactNode
	href: string
	CSSClassname?: string
	target?: string
}

export default function MainLink({ href, children, CSSClassname, target }: ButtonProps) {
	return (
		<Link href={href} className={`${styles.mainLink} ${CSSClassname}`} target={target}>
			{children}
		</Link>
	)
}
