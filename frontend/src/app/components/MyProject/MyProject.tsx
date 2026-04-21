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

import type { MyProjectsProps } from '@/app/constants/myProjects'
import { MyProjectSwiper } from './MyProjectSwiper'

import styles from '@/app/UI/SectionContent/SectionContent.module.scss'
import stylesMainLink from '@/app/UI/MainLink/MainLink.module.scss'

export default function MyProject({ project }: { project: MyProjectsProps }) {
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
						Read More <RightArrow />
					</MorphingDialogTrigger>
				</div>
				<div className={styles.sectionContent__image}>
					<MorphingDialogImage src={project.images[0].imageSrc} alt={project.images[0].imageAlt} />
				</div>
				<MorphingDialogContainer>
					<MorphingDialogContent
						style={{ borderRadius: '20px' }}
						className='relative h-auto w-full max-w-[900px] bg-background/10 md:bg-background/80 backdrop-blur-sm'
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
									<p className={styles.text}>{project.description}</p>
								</MorphingDialogDescription>
								<MorphingDialogClose className={`${stylesMainLink.mainLink} translate-x-[25%] translate-y-[-50%]`}>
									Close <RightArrow />
								</MorphingDialogClose>
							</div>
						</div>
					</MorphingDialogContent>
				</MorphingDialogContainer>
			</MorphingDialog>
		</article>
	)
}

// function MyProjectSwiper({ project: images }: { project: Pick<MyProjectsProps, 'images'>['images'] }) {
// 	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null)
// 	return (
// 		<>
// 			<Swiper
// 				modules={[Thumbs, Navigation, A11y, Keyboard]}
// 				thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
// 				spaceBetween={10}
// 				grabCursor={true}
// 				// loop={true}
// 				keyboard={{ enabled: true }}
// 				a11y={{
// 					enabled: true,
// 					firstSlideMessage: 'To jest pierwszy slajd',
// 					prevSlideMessage: 'Poprzedni slajd',
// 					nextSlideMessage: 'Następny slajd',
// 					lastSlideMessage: 'To jest ostatni slajd',
// 				}}
// 				observer
// 				observeParents
// 			>
// 				{images.map((image, index) => (
// 					<SwiperSlide key={image.imageAlt}>
// 						{index === 0 ? (
// 							<MorphingDialogImage
// 								className='rounded-[20px] max-h-[300px] lg:max-h-[450px] w-full object-cover'
// 								src={image.imageSrc}
// 								alt={image.imageAlt}
// 							/>
// 						) : (
// 							<Image
// 								className='rounded-[20px] max-h-[300px] lg:max-h-[450px] w-full object-cover'
// 								src={image.imageSrc}
// 								alt={image.imageAlt}
// 								sizes='100vw'
// 								width={900}
// 								height={450}
// 							/>
// 						)}
// 					</SwiperSlide>
// 				))}
// 			</Swiper>
// 			<Swiper
// 				onSwiper={setThumbsSwiper}
// 				modules={[Thumbs, Navigation, A11y]}
// 				slidesPerView={2}
// 				spaceBetween={10}
// 				// watchSlidesProgress
// 				grabCursor={true}
// 				// navigation
// 				a11y={{
// 					enabled: true,
// 					firstSlideMessage: '',
// 					prevSlideMessage: '',
// 					nextSlideMessage: '',
// 					lastSlideMessage: '',
// 				}}
// 				breakpoints={{
// 					768: { spaceBetween: 20 },
// 					992: { slidesPerView: 3 },
// 				}}
// 				className={stylesMyProject.myProjectSwiper__thumbs}
// 			>
// 				{images.map(image => (
// 					<SwiperSlide key={image.imageAlt} className={stylesMyProject['myProjectSwiper__thumbs-slide']}>
// 						{/* <MorphingDialogImage
// 							className='rounded-[20px] max-h-[300px] w-full object-cover'
// 							src={image.imageSrc}
// 							alt={image.imageAlt}
// 						/> */}
// 						<Image
// 							className='rounded-[20px] max-h-[300px] w-full object-cover'
// 							src={image.imageSrc}
// 							alt={image.imageAlt}
// 							sizes='(max-width: 768px) 50vw, 33vw'
// 							width={250}
// 							height={150}
// 						/>
// 					</SwiperSlide>
// 				))}
// 			</Swiper>
// 		</>
// 	)
// }
