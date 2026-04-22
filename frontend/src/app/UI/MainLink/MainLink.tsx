import type { ComponentProps, ReactNode } from 'react'
import { Link as LinkI18N } from '@/i18n/navigation'
import Link from 'next/link'
import styles from './MainLink.module.scss'

type NextLinkProps = ComponentProps<typeof Link>
type I18nLinkProps = ComponentProps<typeof LinkI18N>

type MainLinkProps =
	| ({
			isNextJSLink: true
			children: ReactNode
			className?: string
	  } & Omit<NextLinkProps, 'children' | 'className'>)
	| ({
			isNextJSLink?: false
			children: ReactNode
			className?: string
	  } & Omit<I18nLinkProps, 'children' | 'className'>)

export default function MainLink(props: MainLinkProps) {
	const { children, className } = props

	if (props.isNextJSLink) {
		const { isNextJSLink, ...linkProps } = props
		return (
			<Link {...linkProps} className={`${styles.mainLink} ${className ?? ''}`.trim()}>
				{children}
			</Link>
		)
	}

	const { isNextJSLink, ...linkProps } = props
	return (
		<LinkI18N {...linkProps} className={`${styles.mainLink} ${className ?? ''}`.trim()}>
			{children}
		</LinkI18N>
	)
}
