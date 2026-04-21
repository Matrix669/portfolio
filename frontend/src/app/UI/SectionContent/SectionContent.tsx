'use client'
import { useState } from 'react'
import Image from 'next/image'

import Wrapper from '@/app/UI/Wrapper/Wrapper'
import MainLink from '@/app/UI/MainLink/MainLink'
import RightArrow from '@/app/icons/RightArrow'
import { Badge } from '@/componentsShadcn/ui/badge'
import MyProject from '@/app/components/MyProject/MyProject'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'

import {
	MorphingDialog,
	MorphingDialogClose,
	MorphingDialogContainer,
	MorphingDialogContent,
	MorphingDialogDescription,
	MorphingDialogImage,
	MorphingDialogTitle,
	MorphingDialogTrigger,
} from '@/componentsShadcn/ui/morphing-dialog'

import { MY_PROJECTS } from '@/app/constants/myProjects'

import styles from './SectionContent.module.scss'
import stylesMainLink from '@/app/UI/MainLink/MainLink.module.scss'
import { A11y, Navigation, Thumbs } from 'swiper/modules'

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
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null)
	if (props.isMyWork) {
		return (
			<section className={styles.sectionPadding}>
				<Wrapper>
					<div className={`${styles.sectionContent} ${props.isMyWork ? styles.sectionContent__myWork : ''}`}>
						<div className={styles.sectionContent__subTitle}>
							{props.icon} <span>{props.subTitle}</span>
						</div>
						{MY_PROJECTS.map(project => (
							<MyProject key={project.id} project={project}/>
							// <article key={project.id} className={styles.sectionContent__itemProject}>
							// 	<MorphingDialog
							// 		transition={{
							// 			type: 'spring',
							// 			stiffness: 200,
							// 			damping: 24,
							// 		}}
							// 	>
							// 		<div className={styles.sectionContent__description}>
							// 			<MorphingDialogTitle>
							// 				<h2>{project.title}</h2>
							// 			</MorphingDialogTitle>
							// 			<p className={styles.text}>{project.mainDescription}</p>
							// 			<MorphingDialogTrigger className={stylesMainLink.mainLink}>
							// 				Read More <RightArrow />
							// 			</MorphingDialogTrigger>
							// 		</div>
							// 		<div className={styles.sectionContent__image}>
							// 			<MorphingDialogImage src={project.mainImage.imageSrc} alt={project.mainImage.imageAlt} />
							// 		</div>
							// 		{/* <div className={styles.sectionContent__image}>
							// 				<Image
							// 					src={project.mainImage.imageSrc}
							// 					alt={project.mainImage.imageAlt}
							// 					placeholder='blur'
							// 					sizes='@media(max-width: 768px) 100vw, 50vw'
							// 				/>
							// 			</div> */}
							// 		<MorphingDialogContainer>
							// 			<MorphingDialogContent
							// 				style={{ borderRadius: '20px' }}
							// 				className='relative h-auto w-full max-w-[900px] bg-background/80 backdrop-blur-sm'
							// 			>
							// 				<div className='h-[90vh]'>
							// 					<div className='p-6 '>
							// 						<Swiper
							// 							modules={[Thumbs, Navigation, A11y]}
							// 							thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
							// 							spaceBetween={10}
							// 							grabCursor={true}
							// 							navigation
							// 							loop={true}
							// 							keyboard={{ enabled: true }}
							// 							a11y={{
							// 								enabled: true,
							// 								firstSlideMessage: 'To jest pierwszy slajd',
							// 								prevSlideMessage: 'Poprzedni slajd',
							// 								nextSlideMessage: 'Następny slajd',
							// 								lastSlideMessage: 'To jest ostatni slajd',
							// 							}}
							// 						>
							// 							{project.images.map(image => (
							// 								<SwiperSlide key={image.imageAlt}>
							// 									<MorphingDialogImage
							// 										className='rounded-[20px] max-h-[300px] w-full object-cover'
							// 										src={image.imageSrc}
							// 										alt={image.imageAlt}
							// 									/>
							// 								</SwiperSlide>
							// 							))}
							// 						</Swiper>
							// 						<Swiper
							// 							onSwiper={setThumbsSwiper}
							// 							modules={[Thumbs, Navigation, A11y]}
							// 							slidesPerView={2}
							// 							spaceBetween={10}
							// 							watchSlidesProgress
							// 							navigation
							// 							a11y={{
							// 								enabled: true,
							// 								firstSlideMessage: '',
							// 								prevSlideMessage: '',
							// 								nextSlideMessage: '',
							// 								lastSlideMessage: '',
							// 							}}
							// 						>
							// 							{project.images.map(image => (
							// 								<SwiperSlide key={image.imageAlt}>
							// 									<MorphingDialogImage
							// 										className='rounded-[20px] max-h-[300px] w-full object-cover'
							// 										src={image.imageSrc}
							// 										alt={image.imageAlt}
							// 									/>
							// 								</SwiperSlide>
							// 							))}
							// 						</Swiper>
							// 					</div>
							// 					<div className='flex flex-wrap gap-2 px-6'>
							// 						{project.technologies.map(technologia => (
							// 							<Badge key={technologia}>{technologia}</Badge>
							// 						))}
							// 					</div>
							// 					<div className='p-6'>
							// 						<MorphingDialogTitle>
							// 							<h2 className='font-bold'>{project.title}</h2>
							// 						</MorphingDialogTitle>

							// 						<MorphingDialogDescription>
							// 							<p className={styles.text}>{project.description}</p>
							// 						</MorphingDialogDescription>
							// 						<MorphingDialogClose
							// 							className={`${stylesMainLink.mainLink} translate-x-[25%] translate-y-[-50%]`}
							// 						>
							// 							Close <RightArrow />
							// 						</MorphingDialogClose>
							// 					</div>
							// 				</div>
							// 			</MorphingDialogContent>
							// 		</MorphingDialogContainer>
							// 	</MorphingDialog>
							// </article>
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
