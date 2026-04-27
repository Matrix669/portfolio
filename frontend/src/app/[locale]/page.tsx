import { getTranslations } from 'next-intl/server'

import MainContent from '@/app/UI/MainContent/MainContent'
import HeroSection from '@/app/components/HeroSection/HeroSection'
import TechSlider from '@/app/components/TechSlider/TechSlider'
import SectionContent from '@/app/UI/SectionContent/SectionContent'
import ContactForm from '@/app/UI/Forms/ContactForm/ContactForm'

import { navMarginTop } from '@/app/constants/forStyles'

import { AboutMeIcon } from '@/app/icons/AboutMeIcon'
import { MyWorkIcon } from '@/app/icons/MyWorkIcon'
import { ContactMeIcon } from '@/app/icons/ContactMeIcon'
import { getMyPproject } from '../constants/myProjects'

export default async function Home() {
	const tAbout = await getTranslations('mainPage.aboutSection')
	const tWork = await getTranslations('mainPage.workSection')
	const tContact = await getTranslations('mainPage.contactSection')

	return (
		<MainContent style={{ marginTop: navMarginTop, overflowX: 'hidden' }}>
			<HeroSection />
			<TechSlider />
			<SectionContent
				sectionId='about'
				subTitle={tAbout('subTitle')}
				icon={<AboutMeIcon />}
				title={tAbout('title')}
				description={tAbout('description')}
				link={{ href: tAbout('buttonAbout.href'), text: tAbout('buttonAbout.label'), isNewTab: true }}
			/>
			<SectionContent
				sectionId='work'
				subTitle={tWork('subTitle')}
				icon={<MyWorkIcon />}
				workProjects={getMyPproject(tWork)}
				limitProjects={3}
			/>
			<SectionContent
				sectionId='contact'
				subTitle={tContact('subTitle')}
				icon={<ContactMeIcon />}
				title={tContact('title')}
				children={<ContactForm />}
				isContact
			/>
		</MainContent>
	)
}
