'use client'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from '@/componentsShadcn/ui/breadcrumb'
import Wrapper from '@/app/UI/Wrapper/Wrapper'

import { generateBreadcrumbs } from '@/app/utils/breadcrumbs'

import { ChevronLeft } from 'lucide-react'
import styles from './Breadcrumbs.module.scss'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function Breadcrumbs({
	styleCSS,
	bgBreadcrumbs,
	pageTitle,
}: {
	styleCSS: React.CSSProperties
	bgBreadcrumbs?: string
	pageTitle?: string
}) {
	const pathname = usePathname()
	const breadcrumbs = generateBreadcrumbs(pathname)

	const isCategoryPage = /^\/(projekty-aktualne|projekty-cykliczne|projekty-zakonczone)$/.test(pathname)

	if (breadcrumbs.length === 0 && pageTitle) {
		return (
			<Breadcrumb className={styles.breadcrumbs} style={styleCSS}>
				<Wrapper>
					<BreadcrumbList className={styles.breadcrumbs__inner} style={{ backgroundImage: `url(${bgBreadcrumbs})` }}>
						<BreadcrumbItem>
							<BreadcrumbPage className={styles['breadcrumbs__inner-activeLink']}>{pageTitle}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Wrapper>
			</Breadcrumb>
		)
	}

	if (pageTitle && breadcrumbs.length > 0 && !isCategoryPage) {
		breadcrumbs[breadcrumbs.length - 1].title = pageTitle
	}

	return (
		<Breadcrumb className={styles.breadcrumbs} style={styleCSS}>
			<Wrapper>
				<BreadcrumbList className={styles.breadcrumbs__inner} style={{ backgroundImage: `url(${bgBreadcrumbs})` }}>
					<BreadcrumbItem>
						<BreadcrumbLink className={styles['breadcrumbs__inner-link']}>
							<Link href='/' aria-label='Powrót do strony głównej'>
								<ChevronLeft />
							</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					{breadcrumbs.map((crumb, index) => (
						<BreadcrumbItem key={crumb.href}>
							{index < breadcrumbs.length - 1 ? (
								<>
									<BreadcrumbLink className={styles['breadcrumbs__inner-link']}>
										<Link href={crumb.href}>{crumb.title}</Link>
									</BreadcrumbLink>
									<span className={styles['breadcrumbs__inner-separator']}>/</span>
								</>
							) : (
								<BreadcrumbPage className={styles['breadcrumbs__inner-activeLink']}>{crumb.title}</BreadcrumbPage>
							)}
						</BreadcrumbItem>
					))}
				</BreadcrumbList>
			</Wrapper>
		</Breadcrumb>
	)
}
