import { fetchAPI } from '@/utils/fetch-api'
import { getStrapiURL } from '@/utils/get-strapi-url'
import qs from 'qs'
const homePageQuery = qs.stringify({
	populate: {
		bloki: {
			on: {
				'bloki.sekcja-hero': {
					populate: {
						link: true,
						bgImg: {
							fields: ['url', 'alternativeText'],
						},
						socials: true,
					},
				},
				'bloki.sekcja-kim-jestesmy': {
					populate: {
						link: true,
						leweGorneZdjecie: {
							fields: ['url', 'alternativeText'],
						},
						leweDolneZdjecie: {
							fields: ['url', 'alternativeText'],
						},
						srodkoweZdjecie: {
							fields: ['url', 'alternativeText'],
						},
						praweGorneZdjecie: {
							fields: ['url', 'alternativeText'],
						},
						praweDolneZdjecie: {
							fields: ['url', 'alternativeText'],
						},
					},
				},
				'bloki.sekcja-co-robimy': {
					populate: {
						zdjecieLewo: {
							fields: ['url', 'alternativeText'],
						},
						karty: {
							populate: {
								fields: ['tytul', 'tekst'],
								ikona: true,
								LinkKarta: true,
							},
						},
					},
				},
				'bloki.sekcja-nasze-dzialania': {
					populate: {
						karty: {
							populate: {
								fields: ['tytul', 'tekst'],
								ikona: true,
							},
						},
					},
				},
				'bloki.sekcja-hero-wolontariusz': {
					populate: {
						tloZdjecie: {
							fields: ['url'],
						},
						tabletki: true,
						link: true,
					},
				},
				'bloki.sekcja-zyskaj-pomagajac-innym': {
					populate: {
						akordeon: {
							populate: {
								fields: ['tytul', 'tekst'],
								ikona: true,
							},
						},
						leweZdjecie: {
							fields: ['url', 'alternativeText'],
						},
						srodkoweGorneZdjecie: {
							fields: ['url', 'alternativeText'],
						},
						srodkoweDolneZdjecie: {
							fields: ['url', 'alternativeText'],
						},
						praweZdjecie: {
							fields: ['url', 'alternativeText'],
						},
						link: true,
					},
				},
			},
		},
	},
})

export async function getHomePage() {
	const path = '/api/strona-glowna'
	const BASE_URL = getStrapiURL()

	const url = new URL(path, BASE_URL)
	url.search = homePageQuery

	return fetchAPI(url.href, { method: 'GET' })
}

const globalDataQuery = qs.stringify({
	populate: {
		nawigacja: {
			populate: {
				logoNav: {
					fields: ['url', 'alternativeText'],
				},
				linkiNawigacja: {
					populate: {
						fields: ['nazwa', 'czyLinkiDropdown'],
						linkiNawigacjaDropdown: true,
					},
				},
			},
		},
		stopka: {
			populate: {
				logoStopka: {
					fields: ['url', 'alternativeText'],
				},
				socials: true,
			},
		},
	},
})

export async function getGlobalData() {
	const path = '/api/global'
	const BASE_URL = getStrapiURL()
	const url = new URL(path, BASE_URL)
	url.search = globalDataQuery

	return fetchAPI(url.href, { method: 'GET' })
}



const projectByCategoryQuery = (category: string) =>
	qs.stringify({
		filters: {
			category: {
				$eq: category,
			},
		},
		fields: ['tytul', 'opis', 'slowaKluczowe'],
	})
export async function getProjectsByCategory(category: string) {
	const path = '/api/projekties'
	const BASE_URL = getStrapiURL()
	const url = new URL(path, BASE_URL)
	url.search = projectByCategoryQuery(category)

	return await fetchAPI(url.href, { method: 'GET' })
}

const postBySlugQuery = (slug: string) =>
	qs.stringify({
		filters: {
			slug: {
				$eq: slug,
			},
		},
		fields: ['tytul', 'slug', 'tekst', 'opis'],
		populate: {
			zdjecia: {
				fields: ['url', 'alternativeText'],
			},
		},
	})
export async function getPostBySlug(slug: string) {
	const path = '/api/post-projekts'
	const BASE_URL = getStrapiURL()
	const url = new URL(path, BASE_URL)
	url.search = postBySlugQuery(slug)

	return await fetchAPI(url.href, { method: 'GET' })
}

const allPostsWithoutCategoryQuery = () =>
	qs.stringify({
		sort: ['createdAt:desc'],
		fields: ['slug'],
	})

export async function getAllPostsWithoutCategory() {
	const path = '/api/post-projekts'
	const BASE_URL = getStrapiURL()
	const url = new URL(path, BASE_URL)
	url.search = allPostsWithoutCategoryQuery()

	return await fetchAPI(url.href, { method: 'GET' })
}
const allPostsQuery = (category: string) =>
	qs.stringify({
		sort: ['createdAt:desc'],
		filters: {
			category: {
				$eq: category,
			},
		},
		fields: ['id', 'tytul', 'slug', 'category'],
		populate: {
			wyroznioneZdjecie: {
				fields: ['url', 'alternativeText'],
			},
		},
	})
export async function getAllPosts(category: string) {
	const path = '/api/post-projekts'
	const BASE_URL = getStrapiURL()
	const url = new URL(path, BASE_URL)
	url.search = allPostsQuery(category)

	return await fetchAPI(url.href, { method: 'GET' })
}

const supportUsPageQuery = qs.stringify({
	fields: ['tytul', 'opis', 'slowaKluczowe'],
})

export async function getSupportUsPage() {
	const path = '/api/wesprzyj-nas'
	const BASE_URL = getStrapiURL()
	const url = new URL(path, BASE_URL)
	url.search = supportUsPageQuery

	return fetchAPI(url.href, { method: 'GET' })
}

const allPostsWithPaginationQuery = (page: number = 1, pageSize: number = 12) =>
	qs.stringify({
		sort: ['dataCzas:desc'],
		pagination: {
			page,
			pageSize,
		},
		fields: ['id', 'tytul', 'slug', 'dataCzas'],
		populate: {
			wyroznioneZdjecie: {
				fields: ['url', 'alternativeText'],
			},
		},
	})
export async function getAllPostsWithPagination(page: number = 1, pageSize: number = 12) {
	const path = '/api/aktualnosci-posts'
	const BASE_URL = getStrapiURL()
	const url = new URL(path, BASE_URL)
	url.search = allPostsWithPaginationQuery(page, pageSize)

	return await fetchAPI(url.href, { method: 'GET' })
}
// Query dla wydarzeń z wtyczki Strapi Calendar (wydarzenie w strapi tworzysz tworząc kolekcje)
const eventsCalendarQuery = () =>
	qs.stringify({
		// sort: ['start:asc'],
		fields: [
			'id',
			'tytul',
			'startWydarzeniaData',
			'koniecWydarzeniaData',
			'lokalizacja',
			'kategoria',
			'opisWydarzenia',
		],
		populate: {
			zdjecieWydarzenia: {
				fields: ['url', 'alternativeText'],
			},
		},
	})

export async function getEventsCalendar() {
	const path = '/api/wydarzenias'
	const BASE_URL = getStrapiURL()
	const url = new URL(path, BASE_URL)
	url.search = eventsCalendarQuery()

	return await fetchAPI(url.href, { method: 'GET' })
}

// Demo dane dla testowania kalendarza przed podłączeniem do CMS
export function getDemoEvents() {
	// const now = new Date()
	// const currentMonth = now.getMonth()
	// const currentYear = now.getFullYear()

	// Generuj daty dla bieżącego miesiąca
	// const generateDate = (day: number, hour: number = 9) => {
	// 	return new Date(currentYear, currentMonth, day, hour, 0, 0)
	// }
	//change this response to accurate response:
	/*
{
    "data": [
        {
            "id": 2,
            "documentId": "wemli9iromuaq1ko1qwohzam",
            "tytul": "Spotkanie Pokoleniowe",
            "startWydarzeniaData": "2025-08-24T22:00:00.000Z",
            "koniecWydarzeniaData": null,
            "startWydarzeniaGodzina": "18:00:00.000",
            "koniecWydarzeniaGodzina": null,
            "lokalizacja": "Centrum Jana Pawła II",
            "kategoria": "Spotkanie otwarte",
            "opisWydarzenia": "Spotkanie wspólnoty Effatha, na którym będzie konferencja, a także uwielbienie. Do zobaczenia! ❤",
            "zdjecieWydarzenia": null
        },
        {
            "id": 5,
            "documentId": "jzduo034jqzjp2oc7d3vrydg",
            "tytul": "Speed friending",
            "startWydarzeniaData": "2025-08-18T17:00:00.000Z",
            "koniecWydarzeniaData": "2025-08-18T19:30:00.000Z",
            "startWydarzeniaGodzina": "19:00:00.000",
            "koniecWydarzeniaGodzina": null,
            "lokalizacja": "Centrum Jana Pawła II",
            "kategoria": "Spotkanie ",
            "opisWydarzenia": "Gromadzimy się w parach. Po 5 minutach następuje zmiana",
            "zdjecieWydarzenia": {
                "id": 6,
                "documentId": "rj0aazuma9lol9qvwkaezxon",
                "url": "/uploads/img3_42d665338a.jpg",
                "alternativeText": null
            }
        }
    ],
    "meta": {
        "pagination": {
            "page": 1,
            "pageSize": 25,
            "pageCount": 1,
            "total": 2
        }
    }
}

	remember about StrapiCalendarEvent!
	and firstly try to change this data as if it were from cms :)
*/
	return {
		data: [
			{
				id: 1,
				tytul: 'Spotkanie zespołu',
				startWydarzeniaData: '2025-08-05T12:00:00.000Z',
				koniecWydarzeniaData: '2025-08-27T22:00:00.000Z',
				opisWydarzenia: 'Cotygodniowe spotkanie zespołu projektowego. Omówienie postępów i planowanie kolejnych zadań.',
				lokalizacja: 'Sala konferencyjna A',
				zdjecieWydarzenia: {
					url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop',
					alternativeText: 'Spotkanie zespołu',
				},
				kategoria: 'Spotkania',
			},
			{
				id: 2,
				tytul: 'Warsztaty kreatywne',
				startWydarzeniaData: '2025-09-30T10:00:00.000Z',
				koniecWydarzeniaData: '2025-09-31T22:00:00.000Z',
				opisWydarzenia: 'Warsztaty z kreatywnego myślenia i rozwiązywania problemów. Praktyczne ćwiczenia i case study.',
				lokalizacja: 'Sala warsztatowa B',
				zdjecieWydarzenia: {
					url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop',
					alternativeText: 'Spotkanie zespołu',
				},
				kategoria: 'Warsztaty',
			},
			{
				id: 3,
				tytul: 'Prezentacja projektu',
				startWydarzeniaData: '2025-07-20T22:00:00.000Z',
				koniecWydarzeniaData: '2025-07-27T22:00:00.000Z',
				opisWydarzenia: 'Prezentacja finalnej wersji projektu klientowi. Omówienie funkcjonalności i harmonogramu wdrożenia.',
				lokalizacja: 'Sala konferencyjna A',
				zdjecieWydarzenia: {
					url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop',
					alternativeText: 'Spotkanie zespołu',
				},
				kategoria: 'Prezentacja',
			},
			{
				id: 4,
				tytul: 'Sesja mentoringowa',
				startWydarzeniaData: '2025-08-29T8:30:00.000Z',
				koniecWydarzeniaData: '2025-08-29T10:30:00.000Z',
				opisWydarzenia: 'Indywidualna sesja mentoringowa dla junior developerów. Omówienie kodu, best practices i rozwoju kariery.',
				lokalizacja: 'Biuro mentora',
				zdjecieWydarzenia: {
					url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop',
					alternativeText: 'Spotkanie zespołu',
				},
				kategoria: 'Mentoring',
			},
			{
				id: 5,
				tytul: 'Retrospective sprint',
				startWydarzeniaData: '2025-08-27T22:00:00.000Z',
				koniecWydarzeniaData: '2025-08-27T22:00:00.000Z',
				opisWydarzenia: ' projektowego. Omówienie postępów i planowanie kolejnych zadań.',
				lokalizacja: 'Sala konferencyjna A',
				zdjecieWydarzenia: {
					url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop',
					alternativeText: 'Spotkanie zespołu',
				},
				kategoria: 'Spotkania',
			},
			{
				id: 6,
				tytul: 'Code review',
				startWydarzeniaData: '2025-08-27T22:00:00.000Z',
				koniecWydarzeniaData: '2025-08-27T22:00:00.000Z',
				opisWydarzenia: ' spotkanie zespołu projektowego. Omówienie postępów i planowanie. trololo',
				lokalizacja: 'Sala konferencyjna A',
				zdjecieWydarzenia: {
					url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop',
					alternativeText: 'Spotkanie zespołu',
				},
				kategoria: 'Development',
			},
			{
				id: 7,
				tytul: 'Spotkanie z klientem',
				startWydarzeniaData: '2025-09-13T19:00:00.000Z',
				koniecWydarzeniaData: '2025-09-13T22:00:00.000Z',
				opisWydarzenia: 'Cotygodniowe spotkanie zespołu projektowego. Omówienie postępów i planowanie kolejnych zadań.',
				lokalizacja: 'Sala konferencyjna A',
				zdjecieWydarzenia: {
					url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop',
					alternativeText: 'Spotkanie zespołu',
				},
				kategoria: 'Spotkania',
			},
		],
	}
}
