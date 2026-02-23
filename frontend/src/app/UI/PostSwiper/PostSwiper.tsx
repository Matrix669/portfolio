'use client'

import { useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, Navigation, Keyboard, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/thumbs'
import 'swiper/css/navigation'
import SwiperCore from 'swiper'
import { Gallery, Item } from 'react-photoswipe-gallery'
import 'photoswipe/dist/photoswipe.css'

// import { getStrapiMedia } from '@/utils/get-strapi-media'

import './customButtonsSwiper.scss'
import styles from './PostSwiper.module.scss'

interface SlideProps {
	url: string
	alternativeText: string
	width: number
	height: number
	blurDataURL?: string
}

interface PostSwiperProps {
	slides: SlideProps[]
}

export const PostSwiper = ({ slides }: PostSwiperProps) => {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null)

	return (
		<div className={styles.postSwiper} role='region' aria-label='Galeria'>
			<Gallery>
				<Swiper
					thumbs={{ swiper: thumbsSwiper }}
					modules={[Thumbs, Navigation, Keyboard, A11y]}
					spaceBetween={10}
					grabCursor={true}
					navigation
					loop={true}
					keyboard={{ enabled: true }}
					a11y={{
						enabled: true,
						firstSlideMessage: 'To jest pierwszy slajd',
						prevSlideMessage: 'Poprzedni slajd',
						nextSlideMessage: 'Następny slajd',
						lastSlideMessage: 'To jest ostatni slajd',
					}}
					className={styles['postSwiper__swiper']}
				>
					{slides.length > 0 ? (
						slides.map(slide => (
							<SwiperSlide
								key={slide.url}
								className={styles['postSwiper__swiper-slide']}
								role='group'
								aria-roledescription='slide'
								aria-label={slide.alternativeText}
							>
								<Item
									original={slide.url}
									thumbnail={slide.url}
									width={slide.width}
									height={slide.height}
									alt={slide.alternativeText}
								>
									{({ ref, open }) => (
										<img
											ref={ref}
											onClick={open}
											src={slide.url}
											width={870}
											height={520}
											alt={slide.alternativeText || 'Obraz bez opisu'}
											sizes='(min-width: 1200px) 50vw, 100vw'
										/>
									)}
								</Item>
							</SwiperSlide>
						))
					) : (
						<p>Brak zawartości do wyświetlenia</p>
					)}
				</Swiper>
				<Swiper
					onSwiper={setThumbsSwiper}
					slidesPerView={2}
					spaceBetween={10}
					watchSlidesProgress
					modules={[Thumbs, Navigation, A11y]}
					navigation
					a11y={{
						enabled: true,
						firstSlideMessage: '',
						prevSlideMessage: '',
						nextSlideMessage: '',
						lastSlideMessage: '',
					}}
					className={styles['postSwiper__thumbs-swiper']}
					breakpoints={{
						639: { slidesPerView: 3 },
						768: { spaceBetween: 20 },
						992: { slidesPerView: 4 },
						1200: { slidesPerView: 3 },
						1400: { slidesPerView: 4 },
					}}
				>
					{slides.length > 0 ? (
						slides.map(slide => (
							<SwiperSlide
								key={slide.url}
								className={styles['postSwiper__thumbs-swiper-slide']}
								role='group'
								aria-roledescription='group-slide-thumbs'
							>
								<img
									src={slide.url}
									alt={slide.alternativeText || 'Obraz bez opisu'}
									sizes='(min-width: 639px) 33vw, (min-width: 992px) 25vw, (min-width: 1200px) 33vw, (min-width: 1400px) 25vw, 50vw'
								/>
							</SwiperSlide>
						))
					) : (
						<p>Brak zawartości do wyświetlenia</p>
					)}
				</Swiper>
			</Gallery>
		</div>
	)
}
export default PostSwiper
