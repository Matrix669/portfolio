import MainContent from '@/app/UI/MainContent/MainContent'
import Wrapper from '@/app/UI/Wrapper/Wrapper'
import SectionTitle from '@/app/UI/SectionTitle/SectionTitle'
import BoxTitle from '@/app/UI/BoxTitle/BoxTitle'
import BoxText from '@/app/UI/BoxText/BoxText'
import BoxImageText from '@/app/UI/BoxImageText/BoxImageText'
import BoxImagePuzzle from '@/app/UI/BoxImagePuzzle/BoxImagePuzzle'
import MainLink from '@/app/UI/MainLink/MainLink'
import Logo from '@/app/UI/Logo/Logo'
import { Breadcrumbs } from '@/app/UI/Breadcrumbs/Breadcrumbs'
import Navigation from '@/app/UI/Navigation/Navigation'
import { NavigationMenuDesktop } from '@/app/UI/Navigation/NavDesktop/NavDesktop'
import NavGroupBtn from '@/app/UI/Navigation/NavGroupBtn/NavGroupBtn'
import { SheetMobile } from '@/app/UI/Navigation/SheetMobile/SheetMobile'
import Calendar from '@/app/UI/Calendar/Calendar'
import CalendarWithSkeleton from '@/app/UI/Calendar/CalendarWithSkeleton'
import CmsWarning from '@/app/UI/CmsWarning/CmsWarning'
import ContactForm from '@/app/UI/Forms/ContactForm/ContactForm'
import DialogEventCalendar from '@/app/UI/DialogEventCalendar/DialogEventCalendar'
import Footer from '@/app/UI/Footer/Footer'
import { FormSupportUs } from '@/app/UI/Forms/FormSupportUs/FormSupportUs'
import FormShop from '@/app/UI/Forms/FormShop'
import GroupNavBtn from '@/app/UI/GroupNavBtn/GroupNavBtn'
import PageTitle from '@/app/UI/PageTitle/PageTitle'
import Pagination from '@/app/UI/Pagination/Pagination'
import PostSwiper from '@/app/UI/PostSwiper/PostSwiper'
import Socials from '@/app/UI/Socials/Socials'
import Spinner from '@/app/UI/Spinner/Spinner'
import { Spinner as SpinnerShadcn } from '@/componentsShadcn/ui/spinner'

import { navMarginTop } from '@/app/constants/forStyles'

export default function UiPreviewPage() {
	return (
		<MainContent style={{ marginTop: navMarginTop }}>
			<Wrapper>
				<SectionTitle title='Przegląd komponentów UI' />

				<section>
					<h2>Typografia / Boxy</h2>
					<BoxTitle title='Przykładowy BoxTitle' />
					<BoxText text='To jest przykładowy tekst BoxText.' />
					<BoxImageText
						title='BoxImageText'
						text='Przykładowy opis pod obrazkiem.'
						imgAlt='Podgląd'
						imgSrc='/placeholder/product-1.jpg'
					/>
					<BoxImagePuzzle imgSrc='/placeholder/product-2.jpg' imgAlt='Podgląd 1' icon={null} isIcon={false} />
				</section>

				<section>
					<h2>Nawigacja</h2>
					<Logo
						logoNav={{
							id: 1,
							documentId: 'logo',
							url: '/placeholder/footer-logo.jpg',
							alternativeText: 'Logo',
						}}
					/>
					<MainLink href='/'>Przykładowy link</MainLink>
					<Navigation
						data={{
							logoNav: {
								id: 1,
								documentId: 'logo',
								url: '/placeholder/footer-logo.jpg',
								alternativeText: 'Logo',
							},
							linkiNawigacja: [
								{
									id: 1,
									nazwa: 'Strona główna',
									href: '/',
									czyLinkiDropdown: false,
									czySpecjalnaGrupa: false,
								},
							],
						}}
					/>
					<NavigationMenuDesktop
						linkiNawigacja={[
							{
								id: 1,
								nazwa: 'Strona główna',
								href: '/',
								czyLinkiDropdown: false,
								czySpecjalnaGrupa: false,
							},
						]}
					/>
					<NavGroupBtn />
					<SheetMobile
						linkiNawigacja={[
							{
								id: 1,
								nazwa: 'Strona główna',
								href: '/',
								czyLinkiDropdown: false,
								czySpecjalnaGrupa: false,
							},
						]}
					/>
					<Breadcrumbs styleCSS={{}} pageTitle='Breadcrumbs podgląd' />
				</section>

				<section>
					<h2>Formularze i akcje</h2>
					<ContactForm />
					<FormSupportUs />
					<FormShop />
				</section>

				<section>
					<h2>Kalendarz i dialogi</h2>
					<Calendar
						events={[
							{
								id: 1,
								tytul: 'Wydarzenie testowe',
								startWydarzeniaData: new Date(),
								koniecWydarzeniaData: new Date(),
								lokalizacja: 'Bielsko-Biała',
								kategoria: 'Test',
								opisWydarzenia: 'Opis testowego wydarzenia',
								zdjecieWydarzenia: null,
							},
						]}
					/>
					<CalendarWithSkeleton
						events={[
							{
								id: 1,
								tytul: 'Wydarzenie testowe',
								startWydarzeniaData: new Date(),
								koniecWydarzeniaData: new Date(),
								lokalizacja: 'Bielsko-Biała',
								kategoria: 'Test',
								opisWydarzenia: 'Opis testowego wydarzenia',
								zdjecieWydarzenia: null,
							},
						]}
						isLoading={false}
					/>
					<DialogEventCalendar
						isOpen={false}
						event={{
							title: 'Wydarzenie testowe',
							start: new Date(),
							end: new Date(),
							description: 'Opis testowego wydarzenia',
							location: 'Bielsko-Biała',
							image: undefined,
							category: 'Test',
							color: '#000000',
						}}
					/>
				</section>

				<section>
					<h2 className='mt-2'>Inne komponenty</h2>
					<PageTitle CSSClassname='my-4' title='Przykładowy tytuł strony' />
					<Pagination currentPage={1} totalPages={5} />
					<PostSwiper
						slides={[
							{
								url: '/placeholder/product-1.jpg',
								alternativeText: 'Slide 1',
								width: 1024,
								height: 680,
							},
						]}
					/>
					<Socials
						socialsIconsArr={[
							{
								id: 1,
								tytul: 'Facebook',
								ikonySocial: 'fbIcon',
								href: '#',
								czyGradient: false,
							},
						]}
					/>
					<CmsWarning showCmsWarning>Przykładowe ostrzeżenie CMS.</CmsWarning>
					<div style={{ position: 'relative', height: 80 }}>
						<p>Spinner (ten większy)</p>
						<Spinner />
						<p>SpinnerShadcn (ten mniejszy)</p>
						<SpinnerShadcn />
					</div>
				</section>

				<section className='mb-5'>
					<h2>Stopka</h2>
					<Footer
						data={{
							logoStopka: {
								id: 1,
								documentId: 'footer-logo',
								url: '/placeholder/footer-logo.jpg',
								alternativeText: 'Logo',
							},
							tytulDane: 'Dane fundacji',
							tytulInformacje: 'Informacje',
							tytulKontakt: 'Kontakt',
							kontaktTelTytul: 'Telefon',
							kontaktTelNumber: '000000000',
							kontaktMailTytul: 'E-mail',
							kontaktMailAdres: 'biuro@example.com',
							socials: [
								{
									id: 1,
									tytul: 'Facebook',
									ikonySocial: 'fbIcon',
									href: '#',
									czyGradient: false,
								},
							],
						}}
					/>
				</section>
			</Wrapper>
		</MainContent>
	)
}
