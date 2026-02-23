'use client'

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/componentsShadcn/ui/pagination'
import { useEffect, useState } from 'react'

import styles from './Pagination.module.scss'
interface PaginationComponentProps {
	currentPage: number
	totalPages: number
	onPageChange?: (page: number) => void
}

export default function PaginationComponent({ currentPage, totalPages, onPageChange }: PaginationComponentProps) {
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const mediaQuery = window.matchMedia('(max-width: 576px)')
		const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)

		// set initial
		setIsMobile(mediaQuery.matches)

		// subscribe
		if (typeof mediaQuery.addEventListener === 'function') {
			mediaQuery.addEventListener('change', onChange)
			return () => mediaQuery.removeEventListener('change', onChange)
		} else {
			// Safari
			const legacyHandler = (e: MediaQueryListEvent) => onChange(e)
			mediaQuery.addListener(legacyHandler)
			return () => mediaQuery.removeListener(legacyHandler)
		}
	}, [])

	const generatePageNumbers = () => {
		const pages: Array<number | 'ellipsis'> = []

		if (isMobile) {
			// Mobile: maksymalnie 2 liczby widoczne w "głównym" segmencie
			if (totalPages <= 3) {
				for (let i = 1; i <= totalPages; i++) pages.push(i)
				return pages
			}

			if (currentPage <= 2) {
				pages.push(1, 2, 'ellipsis', totalPages)
				return pages
			}

			if (currentPage >= totalPages - 1) {
				pages.push(1, 'ellipsis', totalPages - 1, totalPages)
				return pages
			}

			pages.push(1, 'ellipsis', currentPage, 'ellipsis', totalPages)
			return pages
		}

		// Desktop: dotychczasowa logika (maks ~5 widocznych)
		const maxVisiblePages = 4
		if (totalPages <= maxVisiblePages) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i)
			}
		} else {
			if (currentPage <= 3) {
				for (let i = 1; i <= 3; i++) {
					pages.push(i)
				}
				pages.push('ellipsis')
				pages.push(totalPages)
			} else if (currentPage >= totalPages - 2) {
				pages.push(1)
				pages.push('ellipsis')
				for (let i = totalPages - 2; i <= totalPages; i++) {
					pages.push(i)
				}
			} else {
				pages.push(1)
				pages.push('ellipsis')
				pages.push(currentPage)
				pages.push(currentPage + 1)
				pages.push('ellipsis')
				pages.push(totalPages)
			}
		}

		return pages
	}

	const pageNumbers = generatePageNumbers()

	return (
		<Pagination className={`${styles.pagination} ${styles.sectionPadding}`}>
			<PaginationContent className={styles.pagination__content}>
				<PaginationItem>
					{onPageChange ? (
						<button
							onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
							disabled={currentPage <= 1}
							className={`${styles['pagination-btn']} ${styles['pagination--arrowBtn']} ${
								currentPage <= 1 ? styles['pagination--arrowBtn-disabled'] : ''
							}`}
						>
							{/* Poprzednia */}
						</button>
					) : (
						<PaginationPrevious
							href={currentPage > 1 ? `?page=${currentPage - 1}` : '#'}
							className={`${styles['pagination-btn']} ${styles['pagination--arrowBtn']} ${
								currentPage <= 1 ? styles['pagination--arrowBtn-disabled'] : ''
							}`}
						/>
					)}
				</PaginationItem>
				<div className={styles['pagination__boxNumbers']}>
					{pageNumbers.map((page, index) => (
						<PaginationItem key={index}>
							{page === 'ellipsis' ? (
								<PaginationEllipsis />
							) : onPageChange ? (
								<button
									onClick={() => onPageChange(page)}
									className={`${styles['pagination-btn']} ${
										currentPage === page ? styles['pagination-btn--active'] : ''
									}`}
								>
									{page}
								</button>
							) : (
								<PaginationLink
									className={`${styles['pagination-btn']} ${
										currentPage === page ? styles['pagination-btn--active'] : ''
									}`}
									href={`?page=${page}`}
									isActive={currentPage === page}
								>
									<span>{page}</span>
								</PaginationLink>
							)}
						</PaginationItem>
					))}
				</div>
				<PaginationItem>
					{onPageChange ? (
						<button
							onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
							disabled={currentPage >= totalPages}
							className={`${styles['pagination-btn']} ${styles['pagination--arrowBtn']} ${
								currentPage >= totalPages ? styles['pagination--arrowBtn-disabled'] : ''
							}`}
						>
							{/* Następna */}
						</button>
					) : (
						<PaginationNext
							href={currentPage < totalPages ? `?page=${currentPage + 1}` : '#'}
							className={`${styles['pagination-btn']} ${styles['pagination--arrowBtn']} ${
								currentPage >= totalPages ? styles['pagination--arrowBtn-disabled'] : ''
							}`}
						/>
					)}
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
