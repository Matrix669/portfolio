import FirstSection from '../components/FirstSection/FirstSection'
import MainContent from '../UI/MainContent/MainContent'

import { navMarginTop } from '../constants/forStyles'

// async function loader() {
// 	try {
// 		const data = await getHomePage()
// 		if(!data || !data.data) {
// 			throw new Error("Błąd pobierania danych dla strony głównej")
// 		}
// 		return { ...data.data }
// 	} catch (error) {
// 		console.error('Błąd pobierania danych dla strony głównej:', error)
// 		throw error
// 	}
// }

// export async function generateMetadata(): Promise<Metadata> {
// 	try {
// 		const homepage: MetadataProps = await loader()
// 		if (!homepage) {
// 			return {
// 				title: 'Strona główna',
// 				description:
// 					'Naszą misją jest budowanie społeczności,w której wsparcie emocjonalne, duchowość i sztuka chrześcijańska tworzą przestrzeń dla osobistego rozwoju i integracji społecznej. Dążymy do tego,aby każda osoba,niezależnie od swojej sytuacji życiowej, mogła odnaleźć swoje miejsce, wiarę i radość we wspólnym wzrastaniu. Inspirujemy do duchowego i kulturalnego rozwoju poprzez sztukę i wspólne działanie',
// 			}
// 		}
// 		return {
// 			title: `${homepage.tytul} - Drachma`,
// 			description: homepage.opis,
// 			keywords: homepage.slowaKluczowe,
// 		}
// 	} catch (error) {
// 		console.error('Błąd generowania metadata dla strony głównej:', error)
// 		return {
// 			title: 'Strona główna',
// 			description:
// 				'Naszą misją jest budowanie społeczności,w której wsparcie emocjonalne, duchowość i sztuka chrześcijańska tworzą przestrzeń dla osobistego rozwoju i integracji społecznej. Dążymy do tego,aby każda osoba,niezależnie od swojej sytuacji życiowej, mogła odnaleźć swoje miejsce, wiarę i radość we wspólnym wzrastaniu. Inspirujemy do duchowego i kulturalnego rozwoju poprzez sztukę i wspólne działanie',
// 		}
// 	}
// }

export default function Home() {
	return (
		<MainContent style={{ marginTop: navMarginTop }}>
			<FirstSection />
		</MainContent>
	)
}
