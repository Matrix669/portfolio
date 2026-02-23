import { Breadcrumbs } from '@/app/UI/Breadcrumbs/Breadcrumbs'
import MainContent from '@/app/UI/MainContent/MainContent'
import Wrapper from '@/app/UI/Wrapper/Wrapper'
import BoxTitle from '@/app/UI/BoxTitle/BoxTitle'
// import { CalendarWithSkeleton } from '@/app/UI/Calendar'

import { navMarginTop } from '@/app/constants/forStyles'
// import { getDemoEvents, /*getEventsCalendar*/ } from '@/data/loaders'

import styles from './calendar.module.scss'
import { Metadata } from 'next'
// import {  StrapiCalendarEvent, StrapiEventRaw } from '@/utils/types'

export const metadata: Metadata = {
	title: 'Kalendarz',
	description: 'Zobacz nasz terminarz spotkań',
}

// async function loader(): Promise<StrapiCalendarEvent[]> {
// 	try {
// 	  const data = await getEventsCalendar();
// 	  if (!data || !data.data) {
// 		console.warn('Brak danych dla strony kalendarz - zwracam pustą tablicę');
// 		return [];
// 	  }
  
// 	  const transformedEvents: StrapiCalendarEvent[] = data.data.map((event: StrapiEventRaw) => ({
// 		id: event.id,
// 		tytul: event.tytul,
// 		startWydarzeniaData: new Date(event.startWydarzeniaData),
// 		koniecWydarzeniaData: event.koniecWydarzeniaData || undefined,
// 		lokalizacja: event.lokalizacja,
// 		kategoria: event.kategoria,
// 		opisWydarzenia: event.opisWydarzenia,
// 		zdjecieWydarzenia: event.zdjecieWydarzenia
// 		  ? {
// 			  url: event.zdjecieWydarzenia.url,
// 			  alternativeText: event.zdjecieWydarzenia.alternativeText,
// 			}
// 		  : null,
// 	  }));
  
// 	  return transformedEvents;
// 	} catch (error) {
// 	  console.error('Błąd pobierania wydarzeń dla strony kalendarz:', error);
// 	  return [];
// 	}
//   }
export default async function CalendarPage() {
	// const events = await loader() //data from cms strapi
	// const eventsData = getDemoEvents()
	// const events = eventsData?.data || []

	//there is error as you can see but if you connected this to cms this should be work :)
	return (
		<>
			<Breadcrumbs styleCSS={{ marginTop: navMarginTop }} pageTitle='kalendarz' />
			<MainContent>
				<section className={`${styles.sectionPadding} ${styles.calendar}`}>
					<Wrapper>
						<div className={styles.calendar__inner}>
							<BoxTitle
								superTitle='Kiedy'
								title='Kalendarz'
								isPage={true}
								className={styles['calendar__inner-title']}
							/>

							{/* Informacja o demo danych */}
							<div className={styles.calendar__demoInfo}>
								<p>
									📅 <strong>Demo kalendarza</strong> - Przykładowe wydarzenia do testowania funkcjonalności. Po
									podłączeniu do CMS Strapi będą wyświetlane rzeczywiste dane.
								</p>
							</div>

							{/* <CalendarWithSkeleton events={events} /> */}
						</div>
					</Wrapper>
				</section>
			</MainContent>
		</>
	)
}
