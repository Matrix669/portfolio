import Image from 'next/image'

import Wrapper from '@/app/UI/Wrapper/Wrapper'
import MainLink from '@/app/UI/MainLink/MainLink'
import RightArrow from '@/app/icons/RightArrow'

import { MY_PROJECTS } from '@/app/constants/myProjects'

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
	isMyWork?: boolean
}
export default function SectionContent(props: SectionContentProps) {
	if (props.isMyWork) {
		return (
			<section className={styles.sectionPadding}>
				<Wrapper>
					<div className={`${styles.sectionContent} ${props.isMyWork ? styles.sectionContent__myWork : ''}`}>
						<div className={styles.sectionContent__subTitle}>
							{props.icon} <span>{props.subTitle}</span>
						</div>
						{MY_PROJECTS.map(project => (
							<article key={project.id} className={styles.sectionContent__itemProject}>
								<div className={styles.sectionContent__description}>
									<h2>{project.title}</h2>
									<p className={styles.text}>{project.description}</p>
									<MainLink href={project.link[0].href} target='_blank' rel='noopener noreferrer'>
										Read More <RightArrow />
									</MainLink>
								</div>
								<div className={styles.sectionContent__image}>
									<Image
										src={project.mainImage.imageSrc}
										alt={project.mainImage.imageAlt}
										placeholder='blur'
										sizes='@media(max-width: 768px) 100vw, 50vw'
									/>
								</div>
							</article>
						))}
					</div>
				</Wrapper>
			</section>
		)
	}
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
