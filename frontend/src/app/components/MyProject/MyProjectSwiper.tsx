'use client'
import { useState } from 'react'
import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs } from 'swiper/modules'
import { Navigation } from 'swiper/modules'
import { A11y } from 'swiper/modules'
import { Keyboard } from 'swiper/modules'

import SwiperCore from 'swiper'
import 'swiper/css'
import 'swiper/css/thumbs'
import 'swiper/css/navigation'

import { MorphingDialogImage } from '@/componentsShadcn/ui/morphing-dialog'

import { Gallery, Item } from 'react-photoswipe-gallery'
import 'photoswipe/dist/photoswipe.css'

import type { LocalizedProject } from '@/app/constants/myProjects'

import stylesMyProject from './MyProject.module.scss'


export function MyProjectSwiper({ project: images }: { project: Pick<LocalizedProject, 'images'>['images'] }) {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null)
	return (
		<div role='region' aria-label='Galeria zdjęć projektu'>
			<Gallery>
				<Swiper
					modules={[Thumbs, Navigation, A11y, Keyboard]}
					thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
					spaceBetween={10}
					loop
					grabCursor
					keyboard={{ enabled: true }}
					a11y={{
						enabled: true,
						firstSlideMessage: 'To jest pierwszy slajd',
						prevSlideMessage: 'Poprzedni slajd',
						nextSlideMessage: 'Następny slajd',
						lastSlideMessage: 'To jest ostatni slajd',
					}}
					observer
					observeParents
				>
					{images.map((image, index) => (
						<SwiperSlide key={image.imageAlt}>
							{index === 0 ? (
								<Item
									original={image.imageSrc}
									thumbnail={image.imageSrc}
									width={image.width}
									height={image.height}
									alt={image.imageAlt}
								>
									{({ ref, open }) => (
										<MorphingDialogImage
											ref={ref}
											onClick={open}
											className='rounded-[20px] max-h-[300px] lg:max-h-[450px] w-full h-full object-cover'
											src={image.imageSrc}
											alt={image.imageAlt}
										/>
									)}
								</Item>
							) : (
								<Item
									original={image.imageSrc}
									thumbnail={image.imageSrc}
									width={image.width}
									height={image.height}
									alt={image.imageAlt}
								>
									{({ ref, open }) => (
										<Image
											ref={ref}
											onClick={open}
											className='rounded-[20px] max-h-[300px] lg:max-h-[450px] w-full h-full object-cover'
											src={image.imageSrc}
											alt={image.imageAlt}
											sizes='100vw'
											width={900}
											height={450}
										/>
									)}
								</Item>
							)}
						</SwiperSlide>
					))}
				</Swiper>
				<Swiper
					onSwiper={setThumbsSwiper}
					modules={[Thumbs, Navigation, A11y]}
					slidesPerView={2}
					spaceBetween={10}
					// watchSlidesProgress
					grabCursor
					// navigation
					a11y={{
						enabled: true,
						firstSlideMessage: '',
						prevSlideMessage: '',
						nextSlideMessage: '',
						lastSlideMessage: '',
					}}
					breakpoints={{
						768: { spaceBetween: 20 },
						992: { slidesPerView: 3 },
					}}
					className={stylesMyProject.myProjectSwiper__thumbs}
				>
					{images.map(image => (
						<SwiperSlide key={image.imageAlt} className={stylesMyProject['myProjectSwiper__thumbs-slide']}>
							<Image
								className='rounded-[20px] max-h-[150px] w-full object-cover'
								src={image.imageSrc}
								alt={image.imageAlt}
								sizes='(max-width: 768px) 50vw, 33vw'
								width={250}
								height={150}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</Gallery>
		</div>
	)
}
