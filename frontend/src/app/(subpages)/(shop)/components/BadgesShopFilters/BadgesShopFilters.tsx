import styles from './BadgesShopFilters.module.scss'
import btnStyles from '@/app/UI/MainLink/MainLink.module.scss'

interface BadgesShopFiltersProps {
	activeBadges: {
		superTitle: string
		value: string
	}[]
	handleClearBadge: (superTitle: string) => void
}
export default function BadgesShopFilters({ activeBadges, handleClearBadge }: BadgesShopFiltersProps) {
	return (
		<>
			{activeBadges.length > 0 && (
				<div className={styles.badgesShopFilters}>
					{activeBadges.map(({ superTitle, value }) => (
						<button
							key={`${superTitle}-${value}`}
							aria-label={`Usuń filtr ${superTitle}`}
							onClick={() => handleClearBadge(superTitle)}
							className={btnStyles.mainBtn}
						>
							{value} X
						</button>
					))}
				</div>
			)}
		</>
	)
}
