import type { ReactElement } from 'react'
import TheatreIcon from '@/app/icons/formSupport/TheatreIcon'
import InvicibleGroupIcon from '@/app/icons/formSupport/InvicibleGroupIcon'
import WorkShopsIcon from '@/app/icons/formSupport/WorkShopsIcon'
import TransportIcon from '@/app/icons/formSupport/TransportIcon'
import PiggyBankIcon from '@/app/icons/formSupport/PiggyBankIcon'

import GOOGLEPAY_IMG from '@/app/assets/formSupport/google-pay.png'
import APPLEPAY_IMG from '@/app/assets/formSupport/apple-pay.png'
import PAYPAL_IMG from '@/app/assets/formSupport/paypal.png'
import PRZELEWY24_IMG from '@/app/assets/formSupport/przelewy24.png'

export const AMOUNTS = [
	{ amountValue: '1000' },
	{ amountValue: '500' },
	{ amountValue: '300' },
	{ amountValue: '100', isPopular: true },
	{ amountValue: '70' },
	{ amountValue: '50' },
	{ amountValue: '20' },
	{ amountValue: 'custom', isCustom: true },
]

interface Initiative {
	icon: ReactElement
	title: string
}

export const INITIATIVES: Initiative[] = [
	{ icon: <TheatreIcon />, title: 'Grupa Teatr Tańca Szofar' },
	{ icon: <InvicibleGroupIcon />, title: 'Grupa Niepokonanych' },
	{ icon: <WorkShopsIcon />, title: 'Warsztaty' },
	{ icon: <TransportIcon />, title: 'Wsparcie wyjazdów dla dzieci z ubogich rodzin' },
	{ icon: <PiggyBankIcon />, title: 'Cele statutowe' },
]

export const PAYMENT_PROVIDERS = [
	{ imgSrc: GOOGLEPAY_IMG, imgAlt: 'Google Pay' },
	{ imgSrc: APPLEPAY_IMG, imgAlt: 'Apple Pay' },
	{ imgSrc: PAYPAL_IMG, imgAlt: 'Paypal' },
	{ imgSrc: PRZELEWY24_IMG, imgAlt: 'Przelewy24' },
]

export const BORDER_STYLE = '3px solid #21A7E1'

