import { getTranslations } from 'next-intl/server'
import HeroSection from '@/app/components/HeroSection/HeroSection'
import TechSlider from '@/app/components/TechSlider/TechSlider'
import { navMarginTop } from '@/app/constants/forStyles'
import { AboutMeIcon } from '@/app/icons/AboutMeIcon'
import { ContactMeIcon } from '@/app/icons/ContactMeIcon'
import { MyWorkIcon } from '@/app/icons/MyWorkIcon'
import ContactForm from '@/app/UI/Forms/ContactForm/ContactForm'
import MainContent from '@/app/UI/MainContent/MainContent'
import SectionContent from '@/app/UI/SectionContent/SectionContent'
import { getMyProjects } from '../constants/myProjects'
import SectionScrollReveal from '../UI/SectionScrollReveal/SectionScrollReveal'

export default async function Home() {
	const tAbout = await getTranslations('mainPage.aboutSection')
	const tWork = await getTranslations('mainPage.workSection')
	const tContact = await getTranslations('mainPage.contactSection')

	return (
		<MainContent style={{ marginTop: navMarginTop, overflow: 'hidden' }}>
			<HeroSection />
			<TechSlider />
			<SectionScrollReveal>
				<SectionContent
					sectionId='about'
					subTitle={tAbout('subTitle')}
					icon={<AboutMeIcon />}
					title={tAbout('title')}
					description={tAbout('description')}
					link={{ href: tAbout('buttonAbout.href'), text: tAbout('buttonAbout.label'), isNewTab: true }}
				/>
			</SectionScrollReveal>
			<SectionScrollReveal>
				<SectionContent
					sectionId='work'
					subTitle={tWork('subTitle')}
					icon={<MyWorkIcon />}
					workProjects={getMyProjects(tWork)}
					limitProjects={3}
				/>
			</SectionScrollReveal>

			<SectionScrollReveal>
				<SectionContent
					sectionId='contact'
					subTitle={tContact('subTitle')}
					icon={<ContactMeIcon />}
					title={tContact('title')}
					isContact
				>
					<ContactForm />
				</SectionContent>
			</SectionScrollReveal>
		</MainContent>
	)
}
