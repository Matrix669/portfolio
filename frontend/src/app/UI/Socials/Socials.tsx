import Link from 'next/link'

import type { SocialsProps } from '@/utils/types'

import styles from './Socials.module.scss'

function selectSocials(name: string, iconsGradient: boolean) {
	if (name.includes('fbIcon')) return iconsGradient ? <FbGradientIcon /> : <FbIcon />
	if (name.includes('igIcon')) return iconsGradient ? <IgGradientIcon /> : <IgIcon />
	if (name.includes('ytIcon')) return iconsGradient ? <YtGradientIcon /> : <YtIcon />
	return null
}

export default function SocialsIcons({
	extraClassName,
	socialsIconsArr,
}: {
	extraClassName?: string
	socialsIconsArr: SocialsProps[]
}) {
	return (
		<div className={`${styles.socials} ${extraClassName ? extraClassName : ''}`}>
			{socialsIconsArr?.map(ico => {
				return (
					<Link href={ico.href} key={ico.id} target='_blank' aria-label={`Link do ${ico.tytul}`}>
						{ico.czyGradient ? selectSocials(ico.ikonySocial, true) : selectSocials(ico.ikonySocial, false)}
					</Link>
				)
			})}
		</div>
	)
}

function FbIcon() {
	return (
		<svg width='31' height='31' viewBox='0 0 31 31' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<g id='Frame' clipPath='url(#clip0_265_2866)'>
				<path
					id='Vector'
					d='M9.04163 12.9167V18.0833H12.9166V27.125H18.0833V18.0833H21.9583L23.25 12.9167H18.0833V10.3333C18.0833 9.99076 18.2194 9.66222 18.4616 9.41999C18.7038 9.17775 19.0324 9.04167 19.375 9.04167H23.25V3.875H19.375C17.6621 3.875 16.0194 4.55543 14.8082 5.7666C13.5971 6.97777 12.9166 8.62048 12.9166 10.3333V12.9167H9.04163Z'
					stroke='white'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</g>
			<defs>
				<clipPath id='clip0_265_2866'>
					<rect width='31' height='31' fill='white' />
				</clipPath>
			</defs>
		</svg>
	)
}

function IgIcon() {
	return (
		<svg width='31' height='31' viewBox='0 0 31 31' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<g id='Frame' clipPath='url(#clip0_265_2869)'>
				<path
					id='Vector'
					d='M5.16663 10.3334C5.16663 8.96307 5.71097 7.64891 6.67991 6.67997C7.64885 5.71103 8.96301 5.16669 10.3333 5.16669H20.6666C22.0369 5.16669 23.3511 5.71103 24.32 6.67997C25.2889 7.64891 25.8333 8.96307 25.8333 10.3334V20.6667C25.8333 22.037 25.2889 23.3511 24.32 24.3201C23.3511 25.289 22.0369 25.8334 20.6666 25.8334H10.3333C8.96301 25.8334 7.64885 25.289 6.67991 24.3201C5.71097 23.3511 5.16663 22.037 5.16663 20.6667V10.3334Z'
					stroke='white'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					id='Vector_2'
					d='M11.625 15.5C11.625 16.5277 12.0333 17.5133 12.76 18.24C13.4867 18.9667 14.4723 19.375 15.5 19.375C16.5277 19.375 17.5133 18.9667 18.24 18.24C18.9667 17.5133 19.375 16.5277 19.375 15.5C19.375 14.4723 18.9667 13.4867 18.24 12.76C17.5133 12.0333 16.5277 11.625 15.5 11.625C14.4723 11.625 13.4867 12.0333 12.76 12.76C12.0333 13.4867 11.625 14.4723 11.625 15.5Z'
					stroke='white'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path id='Vector_3' d='M21.3125 9.6875V9.70083' stroke='white' strokeLinecap='round' strokeLinejoin='round' />
			</g>
			<defs>
				<clipPath id='clip0_265_2869'>
					<rect width='31' height='31' fill='white' />
				</clipPath>
			</defs>
		</svg>
	)
}

function YtIcon() {
	return (
		<svg width='31' height='31' viewBox='0 0 31 31' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<g id='Frame' clipPath='url(#clip0_265_2874)'>
				<path
					id='Vector'
					d='M2.58337 10.3334C2.58337 8.96307 3.12772 7.64891 4.09666 6.67997C5.06559 5.71103 6.37976 5.16669 7.75004 5.16669H23.25C24.6203 5.16669 25.9345 5.71103 26.9034 6.67997C27.8724 7.64891 28.4167 8.96307 28.4167 10.3334V20.6667C28.4167 22.037 27.8724 23.3511 26.9034 24.3201C25.9345 25.289 24.6203 25.8334 23.25 25.8334H7.75004C6.37976 25.8334 5.06559 25.289 4.09666 24.3201C3.12772 23.3511 2.58337 22.037 2.58337 20.6667V10.3334Z'
					stroke='white'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					id='Vector_2'
					d='M12.9166 11.625L19.375 15.5L12.9166 19.375V11.625Z'
					stroke='white'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</g>
			<defs>
				<clipPath id='clip0_265_2874'>
					<rect width='31' height='31' fill='white' />
				</clipPath>
			</defs>
		</svg>
	)
}

function FbGradientIcon() {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width='31' height='32' viewBox='0 0 31 32' fill='none'>
			<g clipPath='url(#clip0_265_2029)'>
				<path
					d='M9.0415 13.4167V18.5833H12.9165V27.625H18.0832V18.5833H21.9582L23.2498 13.4167H18.0832V10.8333C18.0832 10.4908 18.2193 10.1622 18.4615 9.91999C18.7037 9.67775 19.0323 9.54167 19.3748 9.54167H23.2498V4.375H19.3748C17.662 4.375 16.0193 5.05543 14.8081 6.2666C13.5969 7.47777 12.9165 9.12048 12.9165 10.8333V13.4167H9.0415Z'
					stroke='url(#paint0_linear_265_2029)'
					strokeWidth='1.4'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M9.0415 13.4167V18.5833H12.9165V27.625H18.0832V18.5833H21.9582L23.2498 13.4167H18.0832V10.8333C18.0832 10.4908 18.2193 10.1622 18.4615 9.91999C18.7037 9.67775 19.0323 9.54167 19.3748 9.54167H23.2498V4.375H19.3748C17.662 4.375 16.0193 5.05543 14.8081 6.2666C13.5969 7.47777 12.9165 9.12048 12.9165 10.8333V13.4167H9.0415Z'
					stroke='white'
					strokeOpacity='0.2'
					strokeWidth='1.4'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</g>
			<defs>
				<linearGradient
					id='paint0_linear_265_2029'
					x1='9.27831'
					y1='0.8875'
					x2='25.7223'
					y2='1.98264'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#21A7E1' />
					<stop offset='0.705018' stopColor='#0074A7' />
				</linearGradient>
				<clipPath id='clip0_265_2029'>
					<rect width='31' height='31' fill='white' transform='translate(0 0.5)' />
				</clipPath>
			</defs>
		</svg>
	)
}

function IgGradientIcon() {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width='31' height='32' viewBox='0 0 31 32' fill='none'>
			<g clipPath='url(#clip0_265_2032)'>
				<path
					d='M5.1665 10.8333C5.1665 9.46301 5.71085 8.14885 6.67979 7.17991C7.64872 6.21097 8.96289 5.66663 10.3332 5.66663H20.6665C22.0368 5.66663 23.3509 6.21097 24.3199 7.17991C25.2888 8.14885 25.8332 9.46301 25.8332 10.8333V21.1666C25.8332 22.5369 25.2888 23.8511 24.3199 24.82C23.3509 25.7889 22.0368 26.3333 20.6665 26.3333H10.3332C8.96289 26.3333 7.64872 25.7889 6.67979 24.82C5.71085 23.8511 5.1665 22.5369 5.1665 21.1666V10.8333Z'
					stroke='url(#paint0_linear_265_2032)'
					strokeWidth='1.4'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M5.1665 10.8333C5.1665 9.46301 5.71085 8.14885 6.67979 7.17991C7.64872 6.21097 8.96289 5.66663 10.3332 5.66663H20.6665C22.0368 5.66663 23.3509 6.21097 24.3199 7.17991C25.2888 8.14885 25.8332 9.46301 25.8332 10.8333V21.1666C25.8332 22.5369 25.2888 23.8511 24.3199 24.82C23.3509 25.7889 22.0368 26.3333 20.6665 26.3333H10.3332C8.96289 26.3333 7.64872 25.7889 6.67979 24.82C5.71085 23.8511 5.1665 22.5369 5.1665 21.1666V10.8333Z'
					stroke='white'
					strokeOpacity='0.4'
					strokeWidth='1.4'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M11.625 16C11.625 17.0277 12.0333 18.0133 12.76 18.74C13.4867 19.4667 14.4723 19.875 15.5 19.875C16.5277 19.875 17.5133 19.4667 18.24 18.74C18.9667 18.0133 19.375 17.0277 19.375 16C19.375 14.9723 18.9667 13.9867 18.24 13.26C17.5133 12.5333 16.5277 12.125 15.5 12.125C14.4723 12.125 13.4867 12.5333 12.76 13.26C12.0333 13.9867 11.625 14.9723 11.625 16Z'
					stroke='url(#paint1_linear_265_2032)'
					strokeWidth='1.4'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M11.625 16C11.625 17.0277 12.0333 18.0133 12.76 18.74C13.4867 19.4667 14.4723 19.875 15.5 19.875C16.5277 19.875 17.5133 19.4667 18.24 18.74C18.9667 18.0133 19.375 17.0277 19.375 16C19.375 14.9723 18.9667 13.9867 18.24 13.26C17.5133 12.5333 16.5277 12.125 15.5 12.125C14.4723 12.125 13.4867 12.5333 12.76 13.26C12.0333 13.9867 11.625 14.9723 11.625 16Z'
					stroke='white'
					strokeOpacity='0.4'
					strokeWidth='1.4'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M21.3125 10.1875V10.2008'
					stroke='url(#paint2_linear_265_2032)'
					strokeWidth='1.4'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M21.3125 10.1875V10.2008'
					stroke='white'
					strokeOpacity='0.4'
					strokeWidth='1.4'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</g>
			<defs>
				<linearGradient
					id='paint0_linear_265_2032'
					x1='5.51095'
					y1='2.56663'
					x2='29.2537'
					y2='5.15407'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#41A75B' />
					<stop offset='0.705018' stopColor='#27703A' />
				</linearGradient>
				<linearGradient
					id='paint1_linear_265_2032'
					x1='11.7542'
					y1='10.9625'
					x2='20.6577'
					y2='11.9328'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#41A75B' />
					<stop offset='0.705018' stopColor='#27703A' />
				</linearGradient>
				<linearGradient
					id='paint2_linear_265_2032'
					x1='21.3292'
					y1='10.1855'
					x2='21.3463'
					y2='10.3256'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#41A75B' />
					<stop offset='0.705018' stopColor='#27703A' />
				</linearGradient>
				<clipPath id='clip0_265_2032'>
					<rect width='31' height='31' fill='white' transform='translate(0 0.5)' />
				</clipPath>
			</defs>
		</svg>
	)
}

function YtGradientIcon() {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width='31' height='32' viewBox='0 0 31 32' fill='none'>
			<g clipPath='url(#clip0_265_2037)'>
				<path
					d='M2.5835 10.8333C2.5835 9.46301 3.12784 8.14885 4.09678 7.17991C5.06572 6.21097 6.37988 5.66663 7.75016 5.66663H23.2502C24.6204 5.66663 25.9346 6.21097 26.9035 7.17991C27.8725 8.14885 28.4168 9.46301 28.4168 10.8333V21.1666C28.4168 22.5369 27.8725 23.8511 26.9035 24.82C25.9346 25.7889 24.6204 26.3333 23.2502 26.3333H7.75016C6.37988 26.3333 5.06572 25.7889 4.09678 24.82C3.12784 23.8511 2.5835 22.5369 2.5835 21.1666V10.8333Z'
					stroke='#FACD53'
					strokeWidth='1.4'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M12.9165 12.125L19.3748 16L12.9165 19.875V12.125Z'
					stroke='#FACD53'
					strokeWidth='1.4'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</g>
			<defs>
				<clipPath id='clip0_265_2037'>
					<rect width='31' height='31' fill='white' transform='translate(0 0.5)' />
				</clipPath>
			</defs>
		</svg>
	)
}
