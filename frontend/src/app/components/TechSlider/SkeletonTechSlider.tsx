import Wrapper from '@/app/UI/Wrapper/Wrapper'
import { Skeleton } from '@/componentsShadcn/ui/skeleton'
import { cn } from '@/lib/utils'

import styles from './TechSlider.module.scss'

export default function SkeletonTechSlider() {
	return (
		<section className={styles.sectionPadding}>
			<Wrapper>
				<div className='flex items-center justify-center gap-10 w-full h-full'>
					{Array.from({ length: 7 }).map((_, index) => (
						<Skeleton
							key={index}
							className={cn(
								'w-[110px] h-[55px] sm:w-[130px] sm:h-[60px] md:w-[160px]',
								index >= 3 && 'hidden sm:block', // mobile: tylko 3
								index >= 5 && 'sm:hidden md:block' // od sm: 5, od md: 7
							)}
						/>
					))}
				</div>
			</Wrapper>
		</section>
	)
}
