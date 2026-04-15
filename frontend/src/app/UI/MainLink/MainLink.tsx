import { Link as LinkI18N} from '@/i18n/navigation'
import Link from 'next/link'
import styles from './MainLink.module.scss'

type ButtonProps = {
	children: React.ReactNode
	href: string
	CSSClassname?: string
	target?: string
	rel?: string
	isNextJSLink?: boolean
}

export default function MainLink({ href, children, CSSClassname, target, rel, isNextJSLink = false }: ButtonProps) {
	if (isNextJSLink) {
		return (
			<Link href={href} className={`${styles.mainLink} ${CSSClassname}`} target={target} rel={rel}>
				{children}
			</Link>
		)
	}
	return (
		<LinkI18N href={href} className={`${styles.mainLink} ${CSSClassname}`} target={target} rel={rel}>
			{children}
		</LinkI18N>
	)
}
