export interface BreadcrumbItem {
	title: string
	href: string
}

const categoryTitleMap: Record<string, string> = {
	'projekty-obecne': 'Projekty / Obecne',
	'projekty-zakonczone': 'Projekty / Zakończone',
	'informacje/statut': 'Statut',
	'informacje/polityka-prywatnosc': 'Polityka prywatności',
}

export function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
	// Normalizuj pathname, usuwając początkowe i końcowe ukośniki
	const normalizedPathname = pathname === '/' ? '' : pathname.replace(/^\/|\/$/g, '')
	const pathSegments = normalizedPathname.split('/').filter(Boolean)

	// Jeśli brak segmentów (strona główna), zwróć pustą tablicę
	if (pathSegments.length === 0) {
		return []
	}

	// Jeśli pierwszy segment to "informacje", pomijamy go przy wyświetlaniu
	const trimInfo = pathSegments[0] === 'informacje'
	const displaySegments = trimInfo ? pathSegments.slice(1) : pathSegments

	const breadcrumbs: BreadcrumbItem[] = []

	displaySegments.forEach((seg, i) => {
		// Oryginalny index w pathSegments
		const origIndex = trimInfo ? i + 1 : i

		// Budujemy href z oryginalnych segmentów
		const href = ('/' + pathSegments.slice(0, origIndex + 1).join('/'))

		// Klucz do mapy to zawsze połączone ścieżki od początku
		const fullKey = pathSegments.slice(0, origIndex + 1).join('/')

		let title: string
		if (categoryTitleMap[fullKey]) {
			title = categoryTitleMap[fullKey]
		} else {
			// Domyślna kapitalizacja pojedynczego segmentu
			const decoded = decodeURIComponent(seg)
			title = decoded.charAt(0).toUpperCase() + decoded.slice(1)
		}

		breadcrumbs.push({ title, href })
	})

	return breadcrumbs
}
