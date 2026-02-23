import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer'
import styles from '../ProductShop.module.scss'
import { hasMeaningfulBlocks } from '@/lib/strapi/blocks'

export default function ProductTextContainer({
	opis,
	zwrotyReklamacje,
}: {
	opis: BlocksContent
	zwrotyReklamacje: BlocksContent
}) {
	const hasOpis = hasMeaningfulBlocks(opis)
	const hasZwroty = hasMeaningfulBlocks(zwrotyReklamacje)

	// if (!hasOpis && !hasZwroty) return null

	return (
		<article className={styles.productShop__textContainer}>
			{hasOpis && (
				<div className={`${styles['productShop__textContainer--box']} ${styles.text}`}>
					<h2>Opis:</h2>
					<div>
						<BlocksRenderer content={opis} />
					</div>
				</div>
			)}

			{hasZwroty && (
				<div className={`${styles['productShop__textContainer--box']} ${styles.text}`}>
					<h2>Zwroty i reklamacje:</h2>
					<div>
						<BlocksRenderer content={zwrotyReklamacje} />
					</div>
				</div>
			)}
		</article>
	)
}
