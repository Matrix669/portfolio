import Image from 'next/image'
import { Metadata } from 'next'

import Wrapper from '../UI/Wrapper/Wrapper'
import MainContent from '../UI/MainContent/MainContent'
import MainLink from '../UI/MainLink/MainLink'
import { Breadcrumbs } from '../UI/Breadcrumbs/Breadcrumbs'

import { navMarginTop } from '../constants/forStyles'

import img_404 from '../assets/subpages/404/404.png'
import RightArrow from '../icons/RightArrow'

import styles from './404.module.scss'

export const metadata: Metadata = {
	title: 'Nie znaleziono strony - Błąd 404',
	robots: 'noindex',
}

export default function NotFound() {
	return (
		<>
			<Breadcrumbs styleCSS={{ marginTop: `${navMarginTop}` }} pageTitle='Błąd 404' />
			<MainContent CSSClassName={styles.mainNotFound}>
				<Wrapper>
					<div className={`${styles.sectionPadding} ${styles.notFound__inner}`}>
						<div className={styles['notFound__inner-boxImg']}>
							<Image src={img_404} alt='404 - nie znaleziono' />
						</div>
						<div className={styles['notFound__inner-box']}>
							<h1>Przepraszamy, zgubiliśmy krok. Proszę wróć na naszą ścieżkę!</h1>
							<p className={styles.text}>
								Błąd 404. Strona, której szukasz, nie istnieje lub została przeniesiona. Możesz wrócić na stronę główną
								lub spróbować ponownie.
							</p>
							<MainLink href='/'>
								<RightArrow />
								Wróć na stronę główną
							</MainLink>
						</div>
					</div>
				</Wrapper>
			</MainContent>
		</>
	)
}
