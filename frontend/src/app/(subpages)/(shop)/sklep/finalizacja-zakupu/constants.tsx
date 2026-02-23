import BankTransferIcon from '@/app/icons/shop/BankTransferIcon'
import BlikIcon from '@/app/icons/shop/BlikIcon'
import CardIcon from '@/app/icons/shop/CardIcon'
import INPOST_IMG from '@/app/assets/shop/productList/product page/inpost.png'
import DPD_IMG from '@/app/assets/shop/productList/product page/dpd.png'
import { StaticImageData } from 'next/image'
interface PaymentMethodsProps {
	title: string
	icon: React.ReactNode
}
interface DeliveryMethodsProps {
	title: string
	imgSrc: StaticImageData
	imgAlt: string
	deliveryAmount: string
}
export const SHOP_PAYMENT_METHODS: PaymentMethodsProps[] = [
	{
		title: 'Przelew Bankowy',
		icon: <BankTransferIcon />,
	},
	{
		title: 'Blik',
		icon: <BlikIcon />,
	},
	{
		title: 'Karta',
		icon: <CardIcon />,
	},
]

export const SHOP_DELIVERY_METHODS: DeliveryMethodsProps[] = [
	{
		title: 'Inpost Kurier',
		imgSrc: INPOST_IMG,
		imgAlt: 'Inpost ',
		deliveryAmount: '12',
	},
	{
		title: 'DPD Kurier',
		imgSrc: DPD_IMG,
		imgAlt: 'DPD',
		deliveryAmount: '12',
	},
	{
		title: 'Inpost Paczkomat',
		imgSrc: INPOST_IMG,
		imgAlt: 'Inpost',
		deliveryAmount: '10',
	},
]
