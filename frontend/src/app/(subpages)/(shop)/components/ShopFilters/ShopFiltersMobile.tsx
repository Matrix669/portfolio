'use client'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/componentsShadcn/ui/sheet'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useCallback, useState } from 'react'

import DropdownIcon from '@/app/icons/DropdownIcon'
import BadgesShopFilters from '../BadgesShopFilters/BadgesShopFilters'
import { FILTERS } from './config/filters'
import { useShopFilters } from './hooks/useShopFilters'

import styles from './ShopFilters.module.scss'
import btnStyles from '@/app/UI/MainLink/MainLink.module.scss'

export default function ShopFiltersMobile() {
	const [isFiltersOpen, setIsFiltersOpen] = useState(false)
	const [isCategoryOpen, setIsCategoryOpen] = useState(false)
	const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false)
	const [isHighlightOpen, setIsHighlightOpen] = useState(false)
	const [isSortOpen, setIsSortOpen] = useState(false)

	const { setFilter, clearFilter, activeBadges } = useShopFilters()

	const handleSelect = useCallback(
		(filterSuperTitle: string, value: string) => {
			setFilter(filterSuperTitle, value)
		},
		[setFilter]
	)

	const handleCloseAllSheets = useCallback(() => {
		setIsCategoryOpen(false)
		setIsAvailabilityOpen(false)
		setIsHighlightOpen(false)
		setIsFiltersOpen(false)
		setIsSortOpen(false)
	}, [])

	const category = FILTERS.find(f => f.id === 'category')!
	const availability = FILTERS.find(f => f.id === 'availability')!
	const highlight = FILTERS.find(f => f.id === 'highlight')!
	const sort = FILTERS.find(f => f.id === 'sort')!

	return (
		<div className={styles.shopFilters__mobile}>
			<div className={styles['shopFilters__mobile-boxFilters']}>
				<Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
					<SheetTrigger className={`${styles['shopFilters__inner-sortFilterBtn']} ${btnStyles.mainBtn}`}>
						Filtry
					</SheetTrigger>
					<SheetContent side='left'>
						<SheetHeader className={styles['shopFilters__mobileSheetFilterList-header']}>
							<SheetTitle>Filtry</SheetTitle>
							<VisuallyHidden>
								<SheetDescription>Więcej filtrów</SheetDescription>
							</VisuallyHidden>
						</SheetHeader>
						<div className={styles['shopFilters__mobileSheetFilterList']}>
							<Sheet open={isCategoryOpen} onOpenChange={setIsCategoryOpen}>
								{/* add icon on right to SheetTrigger */}
								<SheetTrigger className={styles['shopFilters__mobileSheetFilterList-trigger']}>
									{category.superTtitle} <DropdownIcon tailwindCSSClass='-rotate-90' />
								</SheetTrigger>
								<SheetContent>
									<SheetHeader className={styles['shopFilters__mobileSheetFilterList-header']}>
										<SheetTitle>Filtry: {category.superTtitle}</SheetTitle>

										<VisuallyHidden>
											<SheetDescription>Filtruj po kategorii</SheetDescription>
										</VisuallyHidden>
									</SheetHeader>
									<div className={styles['shopFilters__mobileSheetFilterList']}>
										{category.filterContent.map(option => (
											<button
												key={option.value}
												onClick={() => {
													handleSelect(category.superTtitle, option.value)
													handleCloseAllSheets()
												}}
												className={styles['shopFilters__mobileSheetFilterList-trigger']}
											>
												{option.value}
											</button>
										))}
									</div>
								</SheetContent>
							</Sheet>
							<Sheet open={isAvailabilityOpen} onOpenChange={setIsAvailabilityOpen}>
								<SheetTrigger className={styles['shopFilters__mobileSheetFilterList-trigger']}>
									{availability.superTtitle} <DropdownIcon tailwindCSSClass='-rotate-90' />
								</SheetTrigger>
								<SheetContent>
									<SheetHeader className={styles['shopFilters__mobileSheetFilterList-header']}>
										<SheetTitle>Filtry: {availability.superTtitle}</SheetTitle>

										<VisuallyHidden>
											<SheetDescription>Filtruj po dostępności</SheetDescription>
										</VisuallyHidden>
									</SheetHeader>
									<div className={styles['shopFilters__mobileSheetFilterList']}>
										{availability.filterContent.map(option => (
											<button
												key={option.value}
												onClick={() => {
													handleSelect(availability.superTtitle, option.value)
													handleCloseAllSheets()
												}}
												className={styles['shopFilters__mobileSheetFilterList-trigger']}
											>
												{option.value}
											</button>
										))}
									</div>
								</SheetContent>
							</Sheet>
							<Sheet open={isHighlightOpen} onOpenChange={setIsHighlightOpen}>
								<SheetTrigger className={styles['shopFilters__mobileSheetFilterList-trigger']}>
									{highlight.superTtitle} <DropdownIcon tailwindCSSClass='-rotate-90' />
								</SheetTrigger>
								<SheetContent>
									<SheetHeader className={styles['shopFilters__mobileSheetFilterList-header']}>
										<SheetTitle>Filtry: {highlight.superTtitle}</SheetTitle>

										<VisuallyHidden>
											<SheetDescription>Filtruj po wyróżnieniu</SheetDescription>
										</VisuallyHidden>
									</SheetHeader>
									<div className={styles['shopFilters__mobileSheetFilterList']}>
										{highlight.filterContent.map(option => (
											<button
												key={option.value}
												onClick={() => {
													handleSelect(highlight.superTtitle, option.value)
													handleCloseAllSheets()
												}}
												className={styles['shopFilters__mobileSheetFilterList-trigger']}
											>
												{option.value}
											</button>
										))}
									</div>
								</SheetContent>
							</Sheet>
						</div>
					</SheetContent>
				</Sheet>

				<Sheet open={isSortOpen} onOpenChange={setIsSortOpen}>
					<SheetTrigger className={`${styles['shopFilters__inner-sortFilterBtn']} ${btnStyles.mainBtn}`}>
						{sort.superTtitle}
					</SheetTrigger>
					<SheetContent side='bottom'>
						<SheetHeader className={styles['shopFilters__mobileSheetFilterList-header']}>
							<SheetTitle>Sortuj</SheetTitle>
							<VisuallyHidden>
								<SheetDescription>Sortuj według</SheetDescription>
							</VisuallyHidden>
						</SheetHeader>
						<div className={styles['shopFilters__mobileSheetFilterList']}>
							{sort.filterContent.map(option => (
								<button
									key={option.value}
									onClick={() => {
										handleSelect(sort.superTtitle, option.value)
										handleCloseAllSheets()
									}}
									className={styles['shopFilters__mobileSheetFilterList-trigger']}
								>
									{option.value}
								</button>
							))}
						</div>
					</SheetContent>
				</Sheet>
			</div>
			<BadgesShopFilters activeBadges={activeBadges} handleClearBadge={clearFilter} />
		</div>
	)
}
