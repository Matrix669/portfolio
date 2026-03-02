import type { ImageProps } from '@/utils/types'

export const NAVIGATION_DATA = {
	logoNav: {
		id: 1,
		documentId: 'default-logo-nav',
		url: '/',
		alternativeText: 'Logo nawigacji',
		width: 120,
		height: 40,
	} as ImageProps,
	linkiNawigacja: [
		{
			id: 1,
			nazwa: 'Strona główna',
			href: '/',
			czyLinkiDropdown: false,
			czySpecjalnaGrupa: false,
		},
		{
			id: 2,
			nazwa: 'podstrona',
			href: '/podstrona',
			czyLinkiDropdown: false,
			czySpecjalnaGrupa: false,
		},
	],
}