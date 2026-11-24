import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getMyProjects } from '@/app/constants/myProjects'
import { getAlternates } from '@/app/constants/site'
import { MyWorkIcon } from '@/app/icons/MyWorkIcon'
import MainContent from '@/app/UI/MainContent/MainContent'
import SectionContent from '@/app/UI/SectionContent/SectionContent'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params
	const tWork = await getTranslations('mainPage.workSection')
	return {
		title: tWork('metadata.title'),
		description: tWork('metadata.description'),
		keywords: tWork('metadata.keywords'),
		alternates: getAlternates('/projekty', locale),
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
