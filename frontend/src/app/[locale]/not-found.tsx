import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import Wrapper from '../UI/Wrapper/Wrapper'
import MainContent from '../UI/MainContent/MainContent'
import MainLink from '../UI/MainLink/MainLink'
import HeroMe from '../UI/HeroMe/HeroMe'
import { Magnetic } from '@/componentsShadcn/ui/magnetic'
import { TextEffect } from '@/componentsShadcn/ui/text-effect'

import { navMarginTop } from '../constants/forStyles'
import { TextShimmer } from '@/componentsShadcn/ui/text-shimmer'

import ME_404 from '../assets/404/me-shock.png'
import RightArrow from '../icons/RightArrow'

import styles from './404.module.scss'
import AnimationBox from '../UI/AnimationBox/AnimationBox'

export const metadata: Metadata = {
	title: 'Nie znaleziono strony - Błąd 404',
	robots: 'noindex',
}

export default async function NotFound() {
	const tNotFound = await getTranslations('notFound')
	return (
		<>
			<MainContent CSSClassName={styles.mainNotFound} style={{ marginTop: `${navMarginTop}` }}>
				<Wrapper>
					<div className={`${styles.sectionPadding} ${styles.notFound__inner}`}>
						<div className={styles['notFound__inner-boxImg']}>
							<HeroMe imgSrc={ME_404} imgAlt={tNotFound('heroMe.label')} mouseLabel={tNotFound('heroMe.mouseLabel')} />
						</div>
						<div className={styles['notFound__inner-box']}>
							<TextEffect as='h1' per='char' preset='fade' delay={0.3} speedReveal={0.5}>
								{tNotFound('title')}
							</TextEffect>
							<AnimationBox
								initial={{ opacity: 0, rotateX: 90 }}
								animate={{ opacity: 1, rotateX: 0 }}
								transition={{ duration: 0.4, ease: 'easeOut', delay: 0.6 }}
							>
								<TextShimmer as='p' className={styles.text} duration={2} spread={1}>
									{tNotFound('description')}
								</TextShimmer>
							</AnimationBox>
							{/* // ! add gradient! */}
							<AnimationBox
								initial={{ opacity: 0, scale: 0 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{
									opacity: { duration: 0.4, ease: 'easeOut', delay: 0.7 },
									scale: {
										type: 'spring',
										stiffness: 220,
										damping: 14,
										mass: 0.7,
										delay: 0.5,
									},
								}}
							>
								<Magnetic>
									<MainLink href='/'>
										{tNotFound('button')}
										<RightArrow />
									</MainLink>
								</Magnetic>
							</AnimationBox>
						</div>
					</div>
				</Wrapper>
			</MainContent>
		</>
	)
}
