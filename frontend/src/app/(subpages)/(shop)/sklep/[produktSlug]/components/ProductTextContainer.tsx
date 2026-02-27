import styles from '../ProductShop.module.scss'

interface ProductTextContainerProps {
	opis?: string
	zwrotyReklamacje?: string
}

export default function ProductTextContainer({ opis, zwrotyReklamacje }: ProductTextContainerProps) {
	if (!opis && !zwrotyReklamacje) {
		return null
	}

	return (
		<article className={styles.productShop__textContainer}>
			{opis && (
				<div className={`${styles['productShop__textContainer--box']} ${styles.text}`}>
					<h2>Opis:</h2>
					<p>{opis}</p>
				</div>
			)}

			{zwrotyReklamacje && (
				<div className={`${styles['productShop__textContainer--box']} ${styles.text}`}>
					<h2>Zwroty i reklamacje:</h2>
					<p>{zwrotyReklamacje}</p>
				</div>
			)}
		</article>
	)
}
