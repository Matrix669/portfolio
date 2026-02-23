'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FILTERS } from '../config/filters'

export type FilterValues = {
	category?: string
	availability?: string
	highlight?: string
	sort?: string
}

const PARAM_KEY_MAP: Record<string, keyof FilterValues> = {
	Kategoria: 'category',
	Dostępność: 'availability',
	Wyróżnienie: 'highlight',
	'Sortuj według': 'sort',
}

export function useShopFilters() {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	// Inicjalizacja wartości domyślnych
	const defaultValues = useMemo(() => {
		const init: Record<string, string> = {}
		for (const filter of FILTERS) {
			init[filter.superTtitle] = filter.defaultValue
		}
		return init
	}, [])

	const [filterValues, setFilterValues] = useState<Record<string, string>>(defaultValues)

	// Synchronizacja z URL przy montowaniu i zmianach searchParams
	useEffect(() => {
		const nextValues: Record<string, string> = {}
		for (const filter of FILTERS) {
			const paramKey = PARAM_KEY_MAP[filter.superTtitle]
			const urlValue = paramKey ? searchParams.get(paramKey) : null
			nextValues[filter.superTtitle] = urlValue && urlValue !== '' ? urlValue : defaultValues[filter.superTtitle]
		}
		setFilterValues(nextValues)
	}, [searchParams, defaultValues])

	// Aktualizacja URL bez przeładowania strony
	const updateURL = useCallback(
		(superTitle: string, value: string) => {
			const paramKey = PARAM_KEY_MAP[superTitle]
			if (!paramKey) return

			const sp = new URLSearchParams(searchParams.toString())

			if (value && value !== '' && value !== defaultValues[superTitle]) {
				sp.set(paramKey, value)
			} else {
				sp.delete(paramKey)
			}

			// Reset paginacji przy zmianie filtrów
			sp.delete('page')

			const newUrl = sp.toString() ? `${pathname}?${sp.toString()}` : pathname
			router.push(newUrl, { scroll: false })
		},
		[searchParams, pathname, router, defaultValues]
	)

	// Ustawienie wartości filtra
	const setFilter = useCallback(
		(superTitle: string, value: string) => {
			setFilterValues(prev => ({ ...prev, [superTitle]: value }))
			updateURL(superTitle, value)
		},
		[updateURL]
	)

	// Czyszczenie pojedynczego filtra
	const clearFilter = useCallback(
		(superTitle: string) => {
			setFilterValues(prev => ({ ...prev, [superTitle]: defaultValues[superTitle] }))
			updateURL(superTitle, '')
		},
		[defaultValues, updateURL]
	)

	// Aktywne badge'e (filtry różne od domyślnych)
	const activeBadges = useMemo(() => {
		return FILTERS.filter(f => filterValues[f.superTtitle] !== defaultValues[f.superTtitle]).map(f => ({
			superTitle: f.superTtitle,
			value: filterValues[f.superTtitle],
		}))
	}, [filterValues, defaultValues])

	// Konwersja do formatu API
	const apiFilters = useMemo((): FilterValues => {
		return {
			category: filterValues['Kategoria'] !== defaultValues['Kategoria'] ? filterValues['Kategoria'] : undefined,
			availability: filterValues['Dostępność'] !== defaultValues['Dostępność'] ? filterValues['Dostępność'] : undefined,
			highlight: filterValues['Wyróżnienie'] !== defaultValues['Wyróżnienie'] ? filterValues['Wyróżnienie'] : undefined,
			sort:
				filterValues['Sortuj według'] !== defaultValues['Sortuj według'] ? filterValues['Sortuj według'] : undefined,
		}
	}, [filterValues, defaultValues])

	return {
		filterValues,
		setFilter,
		clearFilter,
		activeBadges,
		apiFilters,
	}
}
