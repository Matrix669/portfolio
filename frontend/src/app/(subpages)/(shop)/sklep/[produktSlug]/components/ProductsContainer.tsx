import SectionTitle from '@/app/UI/SectionTitle/SectionTitle'
import Product from '../../../components/Product/Product'

import { CardLink } from '@/app/components/WhatWeDoSection/WhatWeDoSection'
import CircleArrowGradientIcon from '@/app/icons/whatWeDo/CircieArrowGradientIcon'

import BG_SECTION_TITLE from '@/app/assets/shop/productList/product page/section-title.png'
import { ShopProductsProps, convertShopProductToProductLink } from '@/app/types/shop'


import styles from '../ProductShop.module.scss'

interface ProductListProps {
	shopProducts: ShopProductsProps[]
}
export default function ProductsContainer({shopProducts} : ProductListProps) {

	return (
		<section className={`${styles.productShop__productsContainer}`}>
			<div className={styles['productShop__productsContainer--upper']}>
				<SectionTitle
					title='Zobacz inne produkty'
					bgImg={BG_SECTION_TITLE.src}
					className={styles['productShop__productsContainer--upper-boxSectionTitle']}
				/>
				<CardLink href='/sklep'>
					Zobacz wszystko <CircleArrowGradientIcon />
				</CardLink>
			</div>
			<div className={`${styles['productShop__productsContainer--bottom']} `}>
				{shopProducts.map(product => (
					<Product
						key={product.id}
						product={convertShopProductToProductLink(product)}
					/>
				))}
			</div>
		</section>
	)
}
