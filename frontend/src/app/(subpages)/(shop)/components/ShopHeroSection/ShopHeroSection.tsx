import Wrapper from '@/app/UI/Wrapper/Wrapper'
import { StrapiImage } from '@/app/UI/StrapiImage/StrapiImage'

import { ShopHeroSectionProps } from '@/utils/types'

import styles from './ShopHeroSection.module.scss'

export default function ShopHeroSection(props: ShopHeroSectionProps) {
	return (
		<section>
			<Wrapper>
				<div>
					<div className={styles.shopHeroSection__inner}>
						<div className={styles['shopHeroSection__inner-boxImg']}>
							{props.tloZdjecie && (
								<StrapiImage
									src={props.tloZdjecie.url}
									priority
									alt={props.tloZdjecie.alternativeText || 'Tło bez opisu'}
									placeholder='blur'
									width={1800}
									height={366}
									sizes='100vw'
								/>
							)}
						</div>

						<div className={`${styles['shopHeroSection__inner-boxText']}`}>
							{!props.tytul &&
							!props.tytul2 &&
							!props.tytul3 &&
							!props.wyroznionyTekst &&
							!props.wyroznionyTekst2 ? null : (
								<h1>
									{props.tytul} <span>{props.wyroznionyTekst}</span>
									{props.tytul2}
									<br />
									{props.tytul3} <span>{props.wyroznionyTekst2}</span> {props.tytul4}
								</h1>
							)}
							{props.tekst && <p className={styles.text}>{props.tekst}</p>}
						</div>
					</div>
				</div>
			</Wrapper>
		</section>
	)
}
