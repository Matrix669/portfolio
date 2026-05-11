import { getTranslations } from 'next-intl/server'

import { TextEffect } from '@/componentsShadcn/ui/text-effect'
import { TextLoop } from '@/componentsShadcn/ui/text-loop'

export default async function HeroText() {
	const tHeroSection = await getTranslations('mainPage.heroSection')

	return (
		<TextLoop interval={5} mode='wait' className={`block w-full max-w-[469px] mx-auto whitespace-normal text-center`}>
			<TextEffect as='h1' per='char' preset='fade' delay={0.3}>
				{tHeroSection('description.first')}
			</TextEffect>
			<TextEffect as='h1' per='char' preset='fade' delay={0}>
				{tHeroSection('description.second')}
			</TextEffect>
		</TextLoop>
	)
}
