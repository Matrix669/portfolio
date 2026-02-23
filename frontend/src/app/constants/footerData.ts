import type { ImageProps, SocialsProps } from '@/utils/types'

export const FOOTER_DATA = {
	logoStopka: {
		id: 1,
		documentId: 'default-logo',
		url: '/logo.svg',
		alternativeText: 'Logo',
		width: 258,
		height: 219,
	} as ImageProps,
	tytulDane: 'Dane firmy',
	tytulInformacje: 'Informacje',
	tytulKontakt: 'Kontakt',
	kontaktTelTytul: 'Telefon',
	kontaktTelNumber: '1234567890',
	kontaktMailTytul: 'Email',
	kontaktMailAdres: 'example@example.com',
	socials: [
		{
			id: 1,
			tytul: 'Facebook',
			ikonySocial: 'fbIcon',
			href: 'https://www.facebook.com',
			czyGradient: false,
		} as SocialsProps,
	],
}
