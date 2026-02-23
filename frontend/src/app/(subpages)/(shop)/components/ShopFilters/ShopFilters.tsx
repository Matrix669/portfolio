import Wrapper from '@/app/UI/Wrapper/Wrapper'
import ShopFiltersMobile from './ShopFiltersMobile'
import ShopFiltersDesktop from './ShopFiltersDesktop'

import styles from './ShopFilters.module.scss'


export default function ShopFilters() {
	return (
		<section className={`${styles.sectionPadding} ${styles.shopFilters}`}>
			<Wrapper>
				<div className={`${styles.shopFilters__inner}`}>
					<ShopFiltersMobile />
					<ShopFiltersDesktop />
				</div>
			</Wrapper>
		</section>
	)
}
