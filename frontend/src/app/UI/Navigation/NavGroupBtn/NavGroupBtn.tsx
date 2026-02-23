import HeartIcon from '@/app/icons/HeartIcon'
import GroupNavBtn from '../../GroupNavBtn/GroupNavBtn'
import ShopCheckoutIcon from '@/app/icons/ShopCheckoutIcon'

import styles from './NavGroupBtn.module.scss'

export default function NavGroupBtn() {
	const blueGradinet = `linear-gradient(0deg, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0.20) 100%), linear-gradient(96deg, #21A7E1 0.03%, #0074A7 73.93%)`
	const greenGradient = 'linear-gradient(96deg, #41A75B 0.03%, #27703A 73.93%)'
	return (
		<ul className={styles.navGroupBtn}>
			<li>
				<GroupNavBtn href='/wesprzyj-nas' text='Wesprzyj nas!' icon={HeartIcon} styleGradient={blueGradinet} />
			</li>
			<li>
				<GroupNavBtn href='/strona-w-budowie' text='Sklep' icon={ShopCheckoutIcon} styleGradient={greenGradient} />
			</li>
		</ul>
	)
}
