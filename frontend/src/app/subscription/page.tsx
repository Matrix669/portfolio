import { Metadata } from 'next'
import { Suspense } from 'react'

import { navMarginTop } from '@/app/constants/forStyles'
import { Breadcrumbs } from '@/app/UI/Breadcrumbs/Breadcrumbs'
import MainContent from '@/app/UI/MainContent/MainContent'
import Wrapper from '@/app/UI/Wrapper/Wrapper'
import { SubscriptionErrorContent } from './SubscriptionStatusContent'

import BG_BREADCRUMBS from '@/app/assets/subpages/supportUs/bg-breadcrumbs.png'

export const metadata: Metadata = {
	title: 'Błąd subskrypcji',
	description: 'Wystąpił problem podczas zarządzania subskrypcją.',
	robots: 'noindex, nofollow',
}
export default function SubscriptionStatusContent() {
	return (
		<Suspense
			fallback={
				<>
					<Breadcrumbs
						pageTitle='Ładowanie...'
						bgBreadcrumbs={BG_BREADCRUMBS.src}
						styleCSS={{ marginTop: `${navMarginTop}` }}
					/>
					<MainContent>
						<Wrapper>
							<div className='min-h-screen bg-[#FAF9F5] flex items-center justify-center'>
								<div className='text-center'>
									<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#499652] mx-auto'></div>
									<p className='mt-4 text-gray-600'>Ładowanie...</p>
								</div>
							</div>
						</Wrapper>
					</MainContent>
				</>
			}
		>
			<SubscriptionErrorContent />
		</Suspense>
	)
}
