import {
	MorphingDialog,
	MorphingDialogTitle,
	MorphingDialogDescription,
	MorphingDialogClose,
	MorphingDialogTrigger,
	MorphingDialogImage,
	MorphingDialogContainer,
	MorphingDialogContent,
} from '@/componentsShadcn/ui/morphing-dialog'

import RightArrow from '@/app/icons/RightArrow'

import { Badge } from '@/componentsShadcn/ui/badge'

import type { LocalizedProject } from '@/app/constants/myProjects'
import { MyProjectSwiper } from './MyProjectSwiper'

import styles from '@/app/UI/SectionContent/SectionContent.module.scss'
import stylesMainLink from '@/app/UI/MainLink/MainLink.module.scss'
import Link from 'next/link'
import MainLink from '@/app/UI/MainLink/MainLink'
import { getTranslations } from 'next-intl/server'

export default async function MyProject({ project }: { project: LocalizedProject }) {
	const tWorkProject = await getTranslations('mainPage.workSection.projects')
	return (
		<article key={project.id} className={styles.sectionContent__itemProject}>
			<MorphingDialog
				transition={{
					type: 'spring',
					stiffness: 200,
					damping: 24,
				}}
			>
				<div className={styles.sectionContent__description}>
					<MorphingDialogTitle>
						<h2>{project.title}</h2>
					</MorphingDialogTitle>
					<MorphingDialogDescription>
						<p className={styles.text}>{project.mainDescription}</p>
					</MorphingDialogDescription>
					<MorphingDialogTrigger className={stylesMainLink.mainLink}>
						{tWorkProject('triggerWorkProject')} <RightArrow />
					</MorphingDialogTrigger>
				</div>
				<div className={styles.sectionContent__image}>
					<MorphingDialogImage src={project.images[0].imageSrc} alt={project.images[0].imageAlt} />
				</div>
				<MorphingDialogContainer>
					<MorphingDialogContent
						style={{
							borderRadius: '20px',
							// boxShadow:
							// 	'0 10px 30px color-mix(in srgb, var(--foreground) 18%, transparent), 0 2px 10px color-mix(in srgb, var(--foreground) 10%, transparent)',
						}}
						className='relative h-auto w-full max-w-[900px] bg-background/50 md:bg-background/80 backdrop-blur-sm py-6'
					>
						<div className='h-[90vh] overflow-y-auto'>
							<div className='p-6 '>
								<MyProjectSwiper project={project.images} />
							</div>
							<div className='flex flex-wrap gap-2 px-6'>
								{project.technologies.map(technologia => (
									<Badge key={technologia}>{technologia}</Badge>
								))}
							</div>
							<div className='p-6'>
								<MorphingDialogTitle>
									<h2 className='font-bold'>{project.title}</h2>
								</MorphingDialogTitle>

								<MorphingDialogDescription>
									<p className={`${styles.text} my-4`}>{project.description}</p>
								</MorphingDialogDescription>
								<div className='flex justify-end'>
									<MainLink
										prefetch={false}
										className='align-self-end'
										href={project.link.href}
										target='_blank'
										rel='noopener noreferrer'
										isNextJSLink
									>
										{project.link.label} <RightArrow />
									</MainLink>
								</div>
								<MorphingDialogClose className={`${stylesMainLink.mainLink} translate-x-[25%] translate-y-[-50%]`}>
									{tWorkProject('closeDialog')} <RightArrow />
								</MorphingDialogClose>
							</div>
						</div>
					</MorphingDialogContent>
				</MorphingDialogContainer>
			</MorphingDialog>
		</article>
	)
}
