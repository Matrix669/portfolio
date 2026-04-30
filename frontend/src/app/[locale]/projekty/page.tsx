import { getTranslations } from 'next-intl/server'

import MainContent from '@/app/UI/MainContent/MainContent'
import SectionContent from '@/app/UI/SectionContent/SectionContent'

import { navMarginTop } from '@/app/constants/forStyles'
import { getMyProjects } from '@/app/constants/myProjects'

import { MyWorkIcon } from '@/app/icons/MyWorkIcon'

export default async function ProjektyPage() {
	const tWork = await getTranslations('mainPage.workSection')
	return (
		<MainContent style={{ marginTop: navMarginTop, overflowX: 'hidden' }}>
			<SectionContent
				cssClassName='!pt-0'
				sectionId='work'
				subTitle={tWork('subTitle')}
				icon={<MyWorkIcon />}
				workProjects={getMyProjects(tWork)}
			/>
		</MainContent>
	)
}
