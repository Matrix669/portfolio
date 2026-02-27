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
		{
			id: 4,
			nazwa: 'Post',
			href: '/postname',
			czyLinkiDropdown: true,
			czySpecjalnaGrupa: false,
			linkiNawigacjaDropdown: [
				{
					id: 34,
					nazwa: 'Podstrona 3',
					href: '/oferta/podstrona-1',
				},
				{
					id: 35,
					nazwa: 'Podstrona 4',
					href: '/oferta/podstrona-2',
				},
			],
		},		
		{
			id: 6,
			nazwa: 'Sklep',
			href: '/sklep',
			czyLinkiDropdown: false,
			czySpecjalnaGrupa: false,
		},
		{
			id: 8,
			nazwa: 'Zarządzaj subskrypcją',
			href: '/zarzadzaj-subskrypcja',
			czyLinkiDropdown: false,
			czySpecjalnaGrupa: false,
		},
		{
			id: 9,
			nazwa: 'UI preview',
			href: '/ui-preview',
			czyLinkiDropdown: false,
			czySpecjalnaGrupa: false,
		},
	],
}