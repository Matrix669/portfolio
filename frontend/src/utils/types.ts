import { type BlocksContent } from '@strapi/blocks-react-renderer'

export interface MetadataProps {
	tytul: string
	opis: string
	slowaKluczowe?: string
}

export interface NavLinksProps {
	linkiNawigacja: {
		id: number
		nazwa: string
		href: string
		czyLinkiDropdown: boolean
		czySpecjalnaGrupa: boolean
		onClick?: () => void
		linkiNawigacjaDropdown?: {
			id: number
			nazwa: string
			href: string
		}[]
	}[]
}

export interface LinkProps {
	id: number
	tekst: string
	href: string
	czyZewnetrzny?: boolean
	czyCzarny?: boolean
}

export interface ImageProps {
	id: number
	documentId: string
	url: string
	alternativeText: string
	width?: number
	height?: number
}

export interface SocialsProps {
	id: number
	tytul: string
	ikonySocial: 'fbIcon' | 'igIcon' | 'ytIcon'
	href: string
	czyGradient: boolean
}

export interface CardSectionProps {
	id: number
	tytul: string
	tekst: string
	ikona: IconsProps
	LinkKarta?: LinkProps
}

export interface IconsProps {
	ikona: string
}
export interface AccordionProps {
	id: number
	tytul: string
	ikona: IconsProps
	tekst: string
}

export interface textAndPhotosProps {
	id: number
	tytul?: string
	tekst: BlocksContent
	socials?: SocialsProps[]
	malyTekst?: string
	czySociale?: boolean
	link?: LinkProps
	pierwszeZdjecie: ImageProps
	drugieZdjecie?: ImageProps
}

// export interface StrapiCalendarEvent {
// 	id: number
// 	tytul: string
// 	startWydarzeniaData: string
// 	koniecWydarzeniaData?: string
// 	lokalizacja?: string | null
// 	kategoria?: string | null
// 	opisWydarzenia?: string | null
// 	zdjecieWydarzenia?: ImageProps | null
// }
export interface StrapiCalendarEvent {
	id: number
	tytul: string
	startWydarzeniaData: Date | undefined
	koniecWydarzeniaData?: Date | undefined
	lokalizacja?: string | null
	kategoria?: string | null
	opisWydarzenia?: string | null
	zdjecieWydarzenia?: ImageProps | null
}

export interface StrapiEventRaw {
	id: number;
	documentId: string;
	tytul: string;
	startWydarzeniaData: string;
	koniecWydarzeniaData: string | null;
	lokalizacja: string | null;
	kategoria: string | null;
	opisWydarzenia: string | null;
	zdjecieWydarzenia: {
	  id: number;
	  documentId: string;
	  url: string;
	  alternativeText: string | null;
	} | null;
  }
  
// =================== SECTIONS

type ComponentType =
	| 'bloki.sekcja-hero'

interface Base<T extends ComponentType, D extends object = Record<string, unknown>> {
	id: number
	__component?: T
	documentId?: string
	createdAt?: string
	updatedAt?: string
	publishedAt?: string
	data?: D
}

export type Block =
	| HeroSectionProps

export interface HeroSectionProps extends Base<'bloki.sekcja-hero'> {
	tytul: string
	wyroznionyTytul: string
	text: string
	bgImg: ImageProps
	link: LinkProps
	socials: SocialsProps[]
	przyciskDolTekst: string
}
