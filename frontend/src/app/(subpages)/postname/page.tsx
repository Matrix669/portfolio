import { notFound } from 'next/navigation'
import { Metadata } from 'next'

import { Breadcrumbs } from '@/app/UI/Breadcrumbs/Breadcrumbs'
import { navMarginTop } from '@/app/constants/forStyles'
import MainContent from '@/app/UI/MainContent/MainContent'
import Wrapper from '@/app/UI/Wrapper/Wrapper'
import PostSwiper from '@/app/UI/PostSwiper/PostSwiper'
import PageTitle from '@/app/UI/PageTitle/PageTitle'


import { getAllPostsWithoutCategory, getPostBySlug } from '@/data/loaders'
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer'
import { getImageWithBlur } from '@/utils/getImageWithBlur'

import styles from './PostEvent.module.scss'
import { MetadataProps } from '@/utils/types'


import TEST_IMG from '@/app/assets/subpages/error/error.png'
import TEST_IMG2 from '@/app/assets/subpages/404/404.png'


interface PostContentProps {
	tytul: string
	tekst: BlocksContent
	slug: string
	zdjecia: {
		url: string
		alternativeText: string
	}[]
}
interface PostProps {
	params: Promise<{ slug: string }>
}

interface StaticPostProps {
	data: {
		slug: string
	}[]
}

// export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
// 	const { slug } = await params
// 	try {
// 		const { data } = await getPostBySlug(slug)
// 		if (!data || (Array.isArray(data) && data.length === 0)) {
// 			return { title: 'Nie znaleziono strony', description: '' }
// 		}
// 		const pageData: MetadataProps = Array.isArray(data) ? data[0] : data
// 		return {
// 			title: pageData.tytul || 'Strona',
// 			description: pageData.opis || pageData.tytul,
// 		}
// 	} catch (error) {
// 		console.error('Błąd generowania metadata:', error)
// 		return { title: 'Nie znaleziono strony - Błąd 404', description: '' }
// 	}
// }

// export async function generateStaticParams() {
// 	try {
// 		const posts: StaticPostProps = await getAllPostsWithoutCategory()
// 		return posts.data.map(post => ({
// 			slug: post.slug,
// 		}))
// 	} catch (error) {
// 		console.error('Błąd generowania statycznych parametrów dla postu', error)
// 		return []
// 	}
// }
// async function loaderPost(slug: string) {
// 	try {
// 		if (!slug || typeof slug !== 'string' || slug.trim() === '') {
// 			notFound()
// 		}
// 		const { data } = await getPostBySlug(slug)
// 		if (!data || (Array.isArray(data) && data.length === 0)) {
// 			notFound()
// 		}

// 		if (!data || data.length === 0) {
// 			notFound()
// 		}
// 		return Array.isArray(data) ? data[0] : data
// 	} catch (error) {
// 		console.error('Błąd pobierania posta:', slug, error)
// 		throw error
// 	}
// }
// const mapZdjeciaToSlides = (
// 	zdjecia: { url: string; alternativeText: string; blurDataURL?: string }[]
// ): { url: string; alternativeText: string; width: number; height: number; blurDataURL?: string }[] => {
// 	return zdjecia.map(zdjecie => ({
// 		url: zdjecie.url,
// 		alternativeText: zdjecie.alternativeText,
// 		width: 1024,
// 		height: 680,
// 		blurDataURL: zdjecie.blurDataURL,
// 	}))
// }

export default async function PostEvent({ params }: PostProps) {
	// const { slug } = await params
	// const post: PostContentProps = await loaderPost(slug)

	// const slidesWithBlur = await Promise.all(
	// 	post.zdjecia.map(async slide => ({
	// 		...slide,
	// 		blurDataURL: await getImageWithBlur(slide.url),
	// 	}))
	// )
	const SWIPER_TEST = [
		{
			url: TEST_IMG.src,
			alternativeText: 'pierwszy obrazek',
			width: 1024,
			height: 680,
		},
		{
			url: TEST_IMG2.src,
			alternativeText: 'drugi obrazek',
			width: 1024,
			height: 680,
		},
	]
	return (
		<>
			<Breadcrumbs
				styleCSS={{ marginTop: `${navMarginTop}` }}
				// pageTitle={post.tytul || 'post'}
			/>
			<MainContent CSSClassName={styles.mainPostEvent}>
				<section className={styles.sectionPadding}>
					<Wrapper>
						<article className={styles.postEvent__inner}>
							{/* {post.tytul && <PageTitle CSSClassname={styles['postEvent__inner-boxTitle']} title={post.tytul} />} */}
							<PageTitle CSSClassname={styles['postEvent__inner-boxTitle']} title={'To jest tytuł posta'} />
							<div className={styles.postEvent__container}>
								{/* {post.zdjecia && <PostSwiper slides={mapZdjeciaToSlides(slidesWithBlur)} />} */}
								<PostSwiper slides={SWIPER_TEST} />
								{/* {post.tekst && ( */}
									<div className={`${styles.text} ${styles['postEvent__inner-boxText']}`}>
										{/* <BlocksRenderer content={post.tekst} /> */}
										tekst Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum illo temporibus beatae. Fuga voluptatem esse, pariatur omnis tenetur et? Maiores, hic. Nostrum impedit, quia quis recusandae sed eveniet porro vitae id hic, ex voluptatem reiciendis vel. Itaque repudiandae voluptate exercitationem!
									</div>
								{/* )} */}
							</div>
						</article>
					</Wrapper>
				</section>
			</MainContent>
		</>
	)
}