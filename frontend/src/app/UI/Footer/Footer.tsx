import Link from 'next/link'
// import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer'

import Wrapper from '@/app/UI/Wrapper/Wrapper'
import SocialsIcons from '../Socials/Socials'

import type { ImageProps, SocialsProps } from '@/utils/types'
// import { StrapiImage } from '../StrapiImage/StrapiImage'

import HavaheIcon from '@/app/icons/footer/HavaheIcon'
import LocationIcon from '@/app/icons/footer/LocationIcon'
import InfoIcon from '@/app/icons/footer/InfoIcon'
import ContactIcon from '@/app/icons/footer/ContactIcon'
// import DRACHMA_LOGOIMG from '@/app/assets/footer/logo2.png'

import styles from './Footer.module.scss'

interface FooterProps {
	data: {
		logoStopka: ImageProps
		tytulDane: string
		// daneFirmyTekst: BlocksContent
		tytulInformacje: string
		tytulKontakt: string
		kontaktTelTytul: string
		kontaktTelNumber: string
		kontaktMailTytul: string
		kontaktMailAdres: string
		socials: SocialsProps[]
	}
}

export default function Footer({ data }: FooterProps) {
	if (!data) return null

	const {
		// logoStopka,
		tytulDane,
		// daneFirmyTekst,
		tytulInformacje,
		tytulKontakt,
		kontaktTelTytul,
		kontaktTelNumber,
		kontaktMailTytul,
		kontaktMailAdres,
		socials,
	} = data
	return (
		<footer className={styles.footer}>
			<Wrapper>
				<div className={`${styles.sectionPadding} ${styles.footer__inner}`}>
					{/* <img src={DRACHMA_LOGOIMG.src} alt='' className={styles['footer__inner-logoIcon']} loading='lazy' /> */}
					<div className={styles['footer__inner-bgMiddle']}></div>
					<div className={styles.footer__top}>
						<div className={styles.footer__col}>
							<div className={styles['footer__col-boxImg']}>
								{/* <StrapiImage
									src={logoStopka.url}
									alt={logoStopka.alternativeText || 'Obraz bez opisu'}
									width={258}
									height={219}
								/> */}
							</div>
							<div className={styles['footer__col-box']}>
								<h2>
									<span>
										<LocationIcon />
									</span>
									{tytulDane}
								</h2>
								<div className={`${styles.text} ${styles['footer__col-text']}`}>
									{/* <BlocksRenderer content={daneFirmyTekst} /> */} tekst
								</div>
							</div>
						</div>
						<div className={styles.footer__col}>
							<div className={styles['footer__col-box']}>
								<h2>
									<span>
										<InfoIcon />
									</span>
									{tytulInformacje}
								</h2>
								<div className={`${styles.text} ${styles['footer__col-text']} ${styles['footer__col-links']}`}>
									<Link href='/'>Polityka prywatności</Link>
									<Link href='/'>Statut</Link>
									<Link href='/'>Sprawozdania</Link>
								</div>
							</div>
							<div className={styles['footer__col-box']}>
								<h2>
									<span>
										<ContactIcon />
									</span>
									{tytulKontakt}
								</h2>
								<div className={`${styles.text} ${styles['footer__col-text']}`}>
									<p>
										{kontaktTelTytul} <a href={`tel:${kontaktTelNumber}`}> +48 602 334 317</a>
									</p>
									<p>
										{kontaktMailTytul} <a href={`mailto:${kontaktMailAdres}`}> biuro@drachma.org.pl</a>
									</p>
									<SocialsIcons socialsIconsArr={socials} extraClassName={styles['footer__col-text-icons']} />
								</div>
							</div>
						</div>
					</div>
					<div className={styles.footer__bar}>
						<p>
							Projekt:
							<a href={'https://jare.ma/'} target='_blank' aria-label='Link do strony designera projektu'>
								<span>
									<HavaheIcon />
								</span>
							</a>
						</p>
						<p>
							Wykonawca:
							<a href='https://github.com/Matrix669' target='_blank' aria-label='Link do Githuba wykonawcy strony'>
								Maks
							</a>
						</p>
					</div>
				</div>
			</Wrapper>
		</footer>
	)
}
