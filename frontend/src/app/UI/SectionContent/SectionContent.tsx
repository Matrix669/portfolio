import Wrapper from '@/app/UI/Wrapper/Wrapper'
import MainLink from '@/app/UI/MainLink/MainLink'
import RightArrow from '@/app/icons/RightArrow'

import styles from './SectionContent.module.scss'

type SectionContentProps = {
	subTitle: string
	icon: React.ReactNode
	title: string
	description?: string
	link?: {
		href: string
		text: string
		isNewTab?: boolean
	}
	isContact?: boolean
	children?: React.ReactNode
}
export default function SectionContent(props: SectionContentProps) {
	return (
		<section className={styles.sectionPadding}>
			<Wrapper>
				<div className={styles.sectionContent}>
					<div className={styles.sectionContent__subTitle}>
						{props.icon} <span>{props.subTitle}</span>
					</div>
					<h2>{props.title}</h2>
					<div className={styles.sectionContent__description}>
						{!props.isContact && <p className={styles.text}>{props.description}</p>}
						{!props.isContact && props.link && (
							<MainLink
								href={props.link.href}
								target={props.link.isNewTab ? '_blank' : '_self'}
								rel={props.link.isNewTab ? 'noopener noreferrer' : undefined}
								isNextJSLink
							>
								{props.link.text}
								<RightArrow />
							</MainLink>
						)}
						{props.isContact && props.children}
					</div>
				</div>
			</Wrapper>
		</section>
	)
}
