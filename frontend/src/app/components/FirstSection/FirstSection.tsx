import Wrapper from '@/app/UI/Wrapper/Wrapper'
import { ACCORDION_DATA } from '@/app/constants/accordionData'
import { AccordionPage } from '@/app/UI/AccordionPage/AccordionPage'

import styles from './sec.module.scss'


export default function FirstSection() {
	return (
		<section className={styles.sectionPadding}>
			<Wrapper>
				<div>
					<h1>Pierwsza sekcja strony głównej</h1>

					<AccordionPage accordion={ACCORDION_DATA} />
				</div>
			</Wrapper>
		</section>
	)
}
