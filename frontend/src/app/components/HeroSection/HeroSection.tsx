import { getTranslations } from 'next-intl/server'

import Wrapper from '@/app/UI/Wrapper/Wrapper'
import MainLink from '@/app/UI/MainLink/MainLink'
import BgGradient from '@/app/UI/BgGradient/BgGradient'
import HeroMe from '@/app/UI/HeroMe/HeroMe'
import AnimationBox from '@/app/UI/AnimationBox/AnimationBox'
import HeroText from '@/app/UI/HeroText/HeroText'
import { Magnetic } from '@/componentsShadcn/ui/magnetic'

import RightArrow from '@/app/icons/RightArrow'
import HERO_IMG from '@/app/assets/HeroSection/me.png'

import styles from './HeroSection.module.scss'

export default async function HeroSection() {
	const tHeroSection = await getTranslations('mainPage.heroSection')

	return (
		<section className={styles.sectionPadding}>
			<Wrapper>
				<div className={styles.heroSectionBox}>
					<HeroMe imgSrc={HERO_IMG} imgAlt={tHeroSection('imgAlt')} mouseLabel={tHeroSection('title')} />
					<HeroText />
					<AnimationBox
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							opacity: { duration: 0.4, ease: 'easeOut', delay: 0.7 },
							scale: {
								type: 'spring',
								stiffness: 220,
								damping: 14,
								mass: 0.7,
								delay: 0.5,
							},
						}}
					>
						<Magnetic>
							<MainLink href={tHeroSection('buttonWork.href')} isNextJSLink>
								{tHeroSection('buttonWork.label')} <RightArrow />
							</MainLink>
						</Magnetic>
					</AnimationBox>
				</div>
			</Wrapper>
		</section>
	)
}
