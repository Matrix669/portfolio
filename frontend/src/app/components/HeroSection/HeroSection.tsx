import { getTranslations } from 'next-intl/server'

import Wrapper from '@/app/UI/Wrapper/Wrapper'
import MainLink from '@/app/UI/MainLink/MainLink'
import BgGradient from '@/app/UI/BgGradient/BgGradient'
import HeroMe from '@/app/UI/HeroMe/HeroMe'
import { Magnetic } from '@/componentsShadcn/ui/magnetic'
import { TextEffect } from '@/componentsShadcn/ui/text-effect'

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
					{/* <BgGradient className={styles['heroSectionBox-BgGradient']} /> */}
					<TextEffect as='h1' per='char' preset='fade' delay={0.3}>
						{tHeroSection('description')}
					</TextEffect>
					<Magnetic>
						<MainLink href={tHeroSection('buttonWork.href')} isNextJSLink>
							{tHeroSection('buttonWork.label')} <RightArrow />
						</MainLink>
					</Magnetic>
				</div>
			</Wrapper>
		</section>
	)
}
