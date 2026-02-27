'use client'
import { useSearchParams } from 'next/navigation'

import Link from 'next/link'
import MainLink from '../UI/MainLink/MainLink'
import { navMarginTop } from '@/app/constants/forStyles'
import { Breadcrumbs } from '@/app/UI/Breadcrumbs/Breadcrumbs'
import MainContent from '@/app/UI/MainContent/MainContent'
import Wrapper from '@/app/UI/Wrapper/Wrapper'

import BG_BREADCRUMBS from '@/app/assets/formSupport/bg-breadcrumbs.png'

import styles from './Subscription.module.scss'
export function SubscriptionErrorContent() {
	const searchParams = useSearchParams()
	const error = searchParams.get('error')

	const errorMessages = {
		'invalid-token': {
			title: '🔗 Nieprawidłowy link',
			message: 'Link jest nieprawidłowy lub został już użyty.',
			hint: 'Linki są jednorazowe i wygasają po pierwszym kliknięciu.',
		},
		'expired-token': {
			title: '⏱️ Link wygasł',
			message: 'Link wygasł lub został już użyty.',
			hint: 'Linki są jednorazowe i ważne przez 15 minut.',
		},
		'portal-error': {
			title: '❌ Błąd portalu',
			message: 'Nie udało się otworzyć portalu zarządzania.',
			hint: 'Spróbuj ponownie za chwilę.',
		},
	}

	const errorData = error ? errorMessages[error as keyof typeof errorMessages] : null

	if (!errorData) {
		return null
	}
	return (
		<>
			<Breadcrumbs
				pageTitle={errorData.title}
				bgBreadcrumbs={BG_BREADCRUMBS.src}
				styleCSS={{ marginTop: `${navMarginTop}` }}
			/>
			<MainContent>
				<Wrapper style={{ maxWidth: 900 }}>
					<div className={`${styles.sectionPadding} flex items-center justify-center`}>
						<div className='max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center'>
							<h1 className='font-bold mb-4'>{errorData.title}</h1>
							<div className='mb-6'>
								<p className='text-gray-600'>{errorData.message}</p>
								<p className='text-sm text-gray-500'>{errorData.hint}</p>
							</div>
							<MainLink href='/zarzadzaj-subskrypcja' isBlack>
								Wyślij nowy link
							</MainLink>

							<p className='mt-4 text-sm text-gray-500'>
								Potrzebujesz pomocy?
								<Link href='/kontakt' className='underline hover:text-MYadditional'>
									Skontaktuj się z nami
								</Link>
							</p>
						</div>
					</div>
				</Wrapper>
			</MainContent>
		</>
	)
}

