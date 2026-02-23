import Wrapper from '@/app/UI/Wrapper/Wrapper'
import styles from './ProductList.module.scss'
import { Skeleton } from '@/componentsShadcn/ui/skeleton'

export default function ProductListSkeleton() {
	const getBadgeVariant = () => {
		const random = Math.random()
		if (random < 0.33) return null 
		if (random < 0.66) return 'left' 
		return 'right'
	}

	return (
		<section className={`${styles.productList} ${styles['productList--skeleton']}`}>
			<Wrapper>
				<div className={styles.productList__inner}>
					{Array.from({ length: 8 }).map((_, idx) => {
						const badgeVariant = getBadgeVariant()
						
						return (
							<div key={idx} className='flex flex-col gap-3 relative z-0'>
								<Skeleton className='h-[323px] w-full' />
								{badgeVariant === 'left' && (
									<Skeleton className='h-9 w-1/5 absolute left-4 top-6 bg-primary/10' />
								)}
								{badgeVariant === 'right' && (
									<Skeleton className='h-9 w-1/5 absolute right-4 top-6 bg-primary/10' />
								)}

								<div className='flex flex-col gap-2'>
									<Skeleton className='h-4 w-1/5' />
									<div className='flex justify-between gap-2'>
										<Skeleton className='h-8 w-1/5' />
										<Skeleton className='h-9 w-1/4' />
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</Wrapper>
		</section>
	)
}
