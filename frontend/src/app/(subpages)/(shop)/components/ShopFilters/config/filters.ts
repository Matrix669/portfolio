export type FilterOption = {
	value: string
}

export type FilterConfig = {
	id: string
	superTtitle: string
	filterName: string
	type: 'filter' | 'sort'
	filterContent: FilterOption[]
	defaultValue: string
}

export const FILTERS: FilterConfig[] = [
	{
		id: 'category',
		superTtitle: 'Kategoria',
		filterName: 'Wszystko',
		type: 'filter',
		filterContent: [
			{ value: 'Wszystko' },
			{ value: 'Biżuteria' },
			{ value: 'Dekoracje' },
			{ value: 'Ceramika' },
			{ value: 'Rękodzieło' },
			{ value: 'Odzież' },
			{ value: 'Plakaty' },
			{ value: 'Torby' },
			{ value: 'Teatr Tańca Szofar' },
		],
		defaultValue: 'Wszystko',
	},
	{
		id: 'availability',
		superTtitle: 'Dostępność',
		filterName: 'Wszystko',
		type: 'filter',
		filterContent: [{ value: 'Wszystko' }, { value: 'Dostępne' }, { value: 'Niedostępne' }],
		defaultValue: 'Wszystko',
	},
	{
		id: 'highlight',
		superTtitle: 'Wyróżnienie',
		filterName: 'Wszystko',
		type: 'filter',
		filterContent: [{ value: 'Wszystko' }, { value: 'Nowość' }, { value: 'Promocja' }],
		defaultValue: 'Wszystko',
	},
	{
		id: 'sort',
		superTtitle: 'Sortuj według',
		filterName: 'Cena: Rosnąco',
		type: 'sort',
		filterContent: [{ value: 'Cena: Rosnąco' }, { value: 'Cena: Malejąco' }],
		defaultValue: 'Cena: Rosnąco',
	},
]
