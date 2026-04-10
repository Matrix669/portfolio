import Image from 'next/image'

import Wrapper from '@/app/UI/Wrapper/Wrapper'
import { InfiniteSlider } from '@/componentsShadcn/ui/infinite-slider'

import GIT_LOGO from '@/app/assets/TechSlider/Git-logo.png'
import NEXTJS_LOGO from '@/app/assets/TechSlider/Nextjs-logo.png'
import STRAPI_LOGO from '@/app/assets/TechSlider/Strapi-logo.png'
import TYPESCRIPT_LOGO from '@/app/assets/TechSlider/Typescript-logo.png'
import SCSS_LOGO from '@/app/assets/TechSlider/Scss-logo.png'
import STRIPE_LOGO from '@/app/assets/TechSlider/Stripe-logo.png'
import REACT_LOGO from '@/app/assets/TechSlider/React-logo.png'

import styles from './TechSlider.module.scss'

const TECH_SLIDER_DATA = [
	{
		id: 1,
		imgSrc: GIT_LOGO,
		alt: 'gitIcon',
	},
	{
		id: 2,
		imgSrc: NEXTJS_LOGO,
		alt: 'nextjsIcon',
	},
	{
		id: 3,
		imgSrc: STRAPI_LOGO,
		alt: 'strapiIcon',
	},
	{
		id: 4,
		imgSrc: TYPESCRIPT_LOGO,
		alt: 'typescriptIcon',
	},
	{
		id: 5,
		imgSrc: SCSS_LOGO,
		alt: 'scssIcon',
	},
	{
		id: 6,
		imgSrc: STRIPE_LOGO,
		alt: 'stripeIcon',
	},
	{
		id: 7,
		imgSrc: REACT_LOGO,
		alt: 'reactIcon',
	},
]

export default function TechSlider() {
	return (
		<section className={styles.sectionPadding}>
			<Wrapper>
				<InfiniteSlider speedOnHover={20} speed={75} className={styles.techSlider}>
					{TECH_SLIDER_DATA.map(item => (
						<Image key={item.id} src={item.imgSrc} alt={item.alt} />
					))}
				</InfiniteSlider>
			</Wrapper>
		</section>
	)
}
