import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import MainContent from '@/app/UI/MainContent/MainContent'
import SectionContent from '@/app/UI/SectionContent/SectionContent'

import { getMyProjects } from '@/app/constants/myProjects'

import { MyWorkIcon } from '@/app/icons/MyWorkIcon'

export async function generateMetadata(): Promise<Metadata> {
	const tWork = await getTranslations('mainPage.workSection')
	return {
		title: tWork('metadata.title'),
		description: tWork('metadata.description'),
		keywords: tWork('metadata.keywords'),
	}
}

export default async function ProjektyPage() {
	const tWork = await getTranslations('mainPage.workSection')
	return (
		<MainContent style={{ marginTop: 60, overflowX: 'hidden' }}>
			<SectionContent
				sectionId='work'
				subTitle={tWork('subTitle')}
				icon={<MyWorkIcon />}
				workProjects={getMyProjects(tWork)}
			/>
		</MainContent>
	)
}
