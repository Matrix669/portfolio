import { getTranslations } from 'next-intl/server'
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
import { MyProjectSwiper } from './MyProjectSwiper'
import MainLink from '@/app/UI/MainLink/MainLink'
import { Magnetic } from '@/componentsShadcn/ui/magnetic'
import { TopBorderReveal, VerticalBorderReveal } from './AnimatedBorders'

import type { LocalizedProject } from '@/app/constants/myProjects'

import styles from '@/app/UI/SectionContent/SectionContent.module.scss'
import stylesMainLink from '@/app/UI/MainLink/MainLink.module.scss'
import stylesProject from './MyProject.module.scss'

export default async function MyProject({ project, index }: { project: LocalizedProject; index: number }) {
	const tWorkProject = await getTranslations('mainPage.workSection.projects')
	const isEvenItem = index % 2 === 0

	return (
		<article key={project.id}>
			<TopBorderReveal className={styles.sectionContent__itemProject} from={isEvenItem ? 'left' : 'right'}>
				<MorphingDialog
					transition={{
						type: 'spring',
						stiffness: 200,
						damping: 24,
					}}
				>
					<VerticalBorderReveal
						side={isEvenItem ? 'right' : 'left'}
						showOnMobile={false}
						className={styles.sectionContent__description}
					>
						<MorphingDialogTitle>
							<h2>{project.title}</h2>
						</MorphingDialogTitle>
						<MorphingDialogDescription>
							<p className={styles.text}>{project.mainDescription}</p>
						</MorphingDialogDescription>
						<Magnetic className='mt-auto inline-block w-fit'>
							<MorphingDialogTrigger className={stylesMainLink.mainLink}>
								{tWorkProject('triggerWorkProject')} <RightArrow />
							</MorphingDialogTrigger>
						</Magnetic>
					</VerticalBorderReveal>
					<VerticalBorderReveal side='left' showOnDesktop={false} className={styles.sectionContent__image}>
						<MorphingDialogImage src={project.images[0].imageSrc} alt={project.images[0].imageAlt} />
					</VerticalBorderReveal>
					<MorphingDialogContainer>
						<MorphingDialogContent
							style={{
								borderRadius: '20px',
								// boxShadow:
								// '0 10px 30px color-mix(in srgb, var(--foreground) 18%, transparent), 0 2px 10px color-mix(in srgb, var(--foreground) 10%, transparent)',
							}}
							className={`${stylesProject.morphingDialogContent} relative h-auto w-full max-w-[900px] bg-background/50 md:bg-background/80 backdrop-blur-sm py-6`}
						>
							<div className={`${stylesProject.morphingDialogContent__scroll} h-[90vh] overflow-y-auto`}>
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
										<Magnetic>
											{/* <MorphingDialogTrigger> */}
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
											{/* </MorphingDialogTrigger> */}
										</Magnetic>
									</div>
									<MorphingDialogClose className={`translate-x-[25%] translate-y-[-50%]`}>
										<Magnetic className={`${stylesMainLink.mainLink} ${stylesProject.morphingDialogContent__close}`}>
											{tWorkProject('closeDialog')} <RightArrow />
										</Magnetic>
									</MorphingDialogClose>
								</div>
							</div>
						</MorphingDialogContent>
					</MorphingDialogContainer>
				</MorphingDialog>
			</TopBorderReveal>
		</article>
	)
}
