'use client'
import { useState } from 'react'

import { Popover, PopoverContent, PopoverTrigger } from '@/componentsShadcn/ui/popover'
import { Command, CommandGroup, CommandItem, CommandList } from '@/componentsShadcn/ui/command'

import DropdownIcon from '@/app/icons/DropdownIcon'

import { FILTERS } from './config/filters'
import { useShopFilters } from './hooks/useShopFilters'

import styles from './ShopFilters.module.scss'
import btnStyles from '@/app/UI/MainLink/MainLink.module.scss'
import BadgesShopFilters from '../BadgesShopFilters/BadgesShopFilters'

export default function ShopFiltersDesktop() {
	const [openIndex, setOpenIndex] = useState<number | null>(null)
	const { filterValues, setFilter, clearFilter, activeBadges } = useShopFilters()
	return (
		<div className={styles.shopFilters__desktop}>
			<div className={styles['shopFilters__desktop__boxFilters']}>
				{FILTERS.map((filter, index) => (
					<Popover
						open={openIndex === index}
						onOpenChange={isOpen => setOpenIndex(isOpen ? index : null)}
						key={filter.id}
					>
						<PopoverTrigger
							className={`${styles['shopFilters__inner-sortFilterBtn']} ${btnStyles.mainBtn} ${styles['shopFilters__inner-btnDesktop']}`}
							role='combobox'
							aria-expanded={openIndex === index}
						>
							<span className={styles['shopFilters__inner-btnDesktop--superTitle']}>{filter.superTtitle}</span>
							{filterValues[filter.superTtitle] || filter.filterName}
							<DropdownIcon
								tailwindCSSClass={`${openIndex === index ? 'rotate-180' : ''} ${styles['shopFilters-icon']}`}
							/>
						</PopoverTrigger>
						<PopoverContent>
							<Command>
								<CommandList>
									<CommandGroup>
										{filter.filterContent.map(filterContent => (
											<CommandItem
												key={`${filter.id}-${filterContent.value}`}
												value={filterContent.value}
												onSelect={currentValue => {
													setFilter(filter.superTtitle, currentValue)
													setOpenIndex(null)
												}}
												className={`${styles['shopFilters__commandGroup-item']} ${
													filterValues[filter.superTtitle] === filterContent.value
														? styles['shopFilters__commandGroup-item--selected']
														: ''
												}`}
											>
												{filterContent.value}
												<DropdownIcon
													tailwindCSSClass={`rotate-90 ${
														filterValues[filter.superTtitle] === filterContent.value ? 'opacity-100' : 'opacity-0'
													} `}
												/>
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
				))}
			</div>

			<BadgesShopFilters activeBadges={activeBadges} handleClearBadge={clearFilter} />
		</div>
	)
}
