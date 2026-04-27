import Wrapper from '@/app/UI/Wrapper/Wrapper'
import MainLink from '@/app/UI/MainLink/MainLink'
import RightArrow from '@/app/icons/RightArrow'
import MyProject from '@/app/components/MyProject/MyProject'

import { LocalizedProject } from '@/app/constants/myProjects'

import styles from './SectionContent.module.scss'

type SectionContentProps = {
	subTitle: string
	icon: React.ReactNode
	title?: string
	description?: string
	sectionId?: string
	link?: {
		href: string
		text: string
		isNewTab?: boolean
	}
	isContact?: boolean
	children?: React.ReactNode
	workProjects?: LocalizedProject[]
	limitProjects?: number
}
export default function SectionContent(props: SectionContentProps) {
	if (props.workProjects) {
		const workProjects = props.limitProjects ? props.workProjects.slice(0, props.limitProjects) : props.workProjects
		return (
			<section id={props.sectionId} className={styles.sectionPadding}>
				<Wrapper>
					<div className={`${styles.sectionContent} ${props.workProjects ? styles.sectionContent__myWork : ''}`}>
						<div className={styles.sectionContent__subTitle}>
							{props.icon} <span>{props.subTitle}</span>
						</div>
						{workProjects.map(project => (
							<MyProject key={project.id} project={project} />
						))}
					</div>
				</Wrapper>
			</section>
		)
	}
	return (
		<section id={props.sectionId} className={styles.sectionPadding}>
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
