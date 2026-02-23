import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/componentsShadcn/ui/accordion'

import type { AccordionProps } from '@/utils/types'
// import { getIcon } from '@/app/utils/getIcon'

import styles from './AccordionPage.module.scss'

type accordionInfoTypes = {
	accordion: AccordionProps[]
}

export function AccordionPage({ accordion }: accordionInfoTypes) {
	return (
		<Accordion className={`${styles.accordionPage} w-full`}>
			{accordion.map(item => (
				<AccordionItem value={`value-${String(item.id)}`} key={item.id} className={styles['accordionPage-item']}>
					<AccordionTrigger className={styles['accordionPage-trigger']}>
						{/* <span>{getIcon(item.ikona.ikona)}</span> */}
						{item.tytul}
					</AccordionTrigger>
					<AccordionContent className={`${styles.text} ${styles['accordionPage-content']}`}>
						{item.tekst}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	)
}
