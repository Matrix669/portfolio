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
			id: 3,
			nazwa: 'Oferta',
			href: '/',
			czyLinkiDropdown: true,
			czySpecjalnaGrupa: false,
			linkiNawigacjaDropdown: [
				{
					id: 31,
					nazwa: 'Podstrona 1',
					href: '/oferta/podstrona-1',
				},
				{
					id: 32,
					nazwa: 'Podstrona 2',
					href: '/oferta/podstrona-2',
				},
			],
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
			id: 5,
			nazwa: 'Kontakt',
			href: '/kontakt',
			czyLinkiDropdown: false,
			czySpecjalnaGrupa: false,
		},
	],
}