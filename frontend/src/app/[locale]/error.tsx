'use client'

import Image from 'next/image'
import { Metadata } from 'next'
import { useEffect } from 'react'
import { navMarginTop } from '../constants/forStyles'

import Wrapper from '../UI/Wrapper/Wrapper'
import MainContent from '../UI/MainContent/MainContent'
import { Breadcrumbs } from '../UI/Breadcrumbs/Breadcrumbs'

import error_img from '../assets/subpages/error/error.png'

import styles from './404.module.scss'
import stylesBtn from '@/app/UI/MainLink/MainLink.module.scss'

export const metadata: Metadata = {
	title: 'Błąd - coś poszło nie tak',
	robots: 'noindex',
}

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<>
			<Breadcrumbs styleCSS={{ marginTop: `${navMarginTop}` }} pageTitle='Błąd - Coś poszło nie tak!' />
			<MainContent CSSClassName={styles.mainNotFound}>
				<Wrapper>
					<div className={`${styles.sectionPadding} ${styles.notFound__inner}`}>
						<div className={styles['notFound__inner-boxImg']}>
							<Image src={error_img} alt='Błąd - coś poszło nie tak' priority />
						</div>
						<div className={styles['notFound__inner-box']}>
							<h1>Scena na chwilę zgasła, ale sztuka trwa!</h1>
							<p className={styles.text}>Błąd coś poszło nie tak!</p>
							<button className={`${stylesBtn.mainBtn} ${stylesBtn.blackMainBtn}`} onClick={() => reset()}>
								Reset
							</button>
						</div>
					</div>
				</Wrapper>
			</MainContent>
		</>
	)
}
