import { Metadata } from 'next'

import { navMarginTop } from '@/app/constants/forStyles'
import { Breadcrumbs } from '@/app/UI/Breadcrumbs/Breadcrumbs'
import MainContent from '@/app/UI/MainContent/MainContent'
import Wrapper from '@/app/UI/Wrapper/Wrapper'
import { ManageSubscriptionContent } from './ManageSubscriptionContent'

import BG_BREADCRUMBS from '@/app/assets/subpages/supportUs/bg-breadcrumbs.png'

export const metadata: Metadata ={
	title: "Zarządzaj subskrypcją",
	description: "Zarządzaj swoją subskrypcją.",	
	robots: 'noindex, nofollow'
}

export default function ManageSubscription() {
	return (
		<>
			<Breadcrumbs
				pageTitle={'Zarządzaj subskrypcją'}
				bgBreadcrumbs={BG_BREADCRUMBS.src}
				styleCSS={{ marginTop: `${navMarginTop}` }}
			/>
			<MainContent>
				<Wrapper style={{ maxWidth: 900 }}>
					<ManageSubscriptionContent />
				</Wrapper>
			</MainContent>
		</>
	)
}
