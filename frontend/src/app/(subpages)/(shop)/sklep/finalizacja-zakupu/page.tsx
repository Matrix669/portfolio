import { Metadata } from 'next'

import { Breadcrumbs } from '@/app/UI/Breadcrumbs/Breadcrumbs'
import Wrapper from '@/app/UI/Wrapper/Wrapper'
import MainContent from '@/app/UI/MainContent/MainContent'

import { navMarginTop } from '@/app/constants/forStyles'

import BG_BREADCRUMBS from '@/app/assets/shop/productList/product page/bg-breadcrumbs.png'
import FormShop from './components/FormShop/FormShop'
import CartSheet from '../../components/CartSheet/CartSheet'

export const metadata:Metadata = {
	title: 'Finalizacja zakupu',
	description: "Dokończ swoje zakupy",
	robots: 'noindex, nofollow'
}
export default function FinalizingThePucharse() {
	
	return (
		<>
			<Breadcrumbs
				bgBreadcrumbs={BG_BREADCRUMBS.src}
				styleCSS={{ marginTop: `${navMarginTop}` }}
				pageTitle='Finalizacja zakupu'
			/>
			<MainContent>
				<Wrapper>
					<FormShop />
					<CartSheet />
				</Wrapper>
			</MainContent>
		</>
	)
}
