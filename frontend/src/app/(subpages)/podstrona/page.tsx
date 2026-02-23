import type { Metadata } from 'next'
import { navMarginTop } from '@/app/constants/forStyles'
import MainContent from '@/app/UI/MainContent/MainContent'
import Wrapper from '@/app/UI/Wrapper/Wrapper'

export const metadata: Metadata = {
	title: 'Podstrona',
	description: 'Podstrona z przykładowym opisem, podobnie jak na innych stronach projektu.',
}

export default function Podstrona() {
	return (
		<MainContent style={{marginTop: navMarginTop}}>
			<section>
				<Wrapper>
					<div>
						<h1>Podstrona</h1>
					</div>
				</Wrapper>
			</section>
		</MainContent>
	)
}
