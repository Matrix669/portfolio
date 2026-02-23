import type { AccordionProps } from '@/utils/types'

export const ACCORDION_DATA: AccordionProps[] = [
	{
		id: 1,
		tytul: 'Czym jest nasza organizacja?',
		ikona: { ikona: 'infoIcon' },
		tekst: 'Nasza organizacja zajmuje się wspieraniem lokalnej społeczności poprzez różnorodne inicjatywy i projekty.',
	},
	{
		id: 2,
		tytul: 'Jak mogę dołączyć?',
		ikona: { ikona: 'joinIcon' },
		tekst: 'Aby dołączyć, wystarczy wypełnić formularz zgłoszeniowy dostępny na naszej stronie internetowej.',
	},
	{
		id: 3,
		tytul: 'Jakie są korzyści z członkostwa?',
		ikona: { ikona: 'benefitIcon' },
		tekst: 'Członkowie mają dostęp do szkoleń, wydarzeń oraz mogą aktywnie uczestniczyć w realizacji projektów.',
	},
]
