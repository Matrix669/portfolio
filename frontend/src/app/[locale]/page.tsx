import MainContent from '@/app/UI/MainContent/MainContent'
import HeroSection from '@/app/components/HeroSection/HeroSection'
import TechSlider from '@/app/components/TechSlider/TechSlider'

import { navMarginTop } from '@/app/constants/forStyles'

export default function Home() {
	return (
		<MainContent style={{ marginTop: navMarginTop, overflowX: 'hidden' }}>
			<HeroSection />
			<TechSlider />
		</MainContent>
	)
}
