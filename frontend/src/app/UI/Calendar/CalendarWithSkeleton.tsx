'use client'

import { useState, useEffect } from 'react'
import Calendar from './Calendar'
import SkeletonCalendar from '../../skeletons/calendar/SkeletonCalendar'
import type { StrapiCalendarEvent } from '@/utils/types'

interface CalendarWithSkeletonProps {
	events: StrapiCalendarEvent[]
	isLoading?: boolean
	loadingDelay?: number
}

export default function CalendarWithSkeleton({
	events,
	isLoading = false,
	loadingDelay = 500,
}: CalendarWithSkeletonProps) {
	const [showSkeleton, setShowSkeleton] = useState(false)
	const [isReady, setIsReady] = useState(false)

	useEffect(() => {
		if (isLoading) {
			// Pokaż skeleton po określonym opóźnieniu
			const timer = setTimeout(() => {
				setShowSkeleton(true)
			}, loadingDelay)

			return () => clearTimeout(timer)
		} else {
			// Ukryj skeleton i pokaż kalendarz
			setShowSkeleton(false)
			setIsReady(true)
		}
	}, [isLoading, loadingDelay])
	// Pokaż skeleton podczas ładowania
	if (isLoading && showSkeleton) {
		return <SkeletonCalendar />
	}

	// Pokaż kalendarz gdy dane są gotowe
	if (isReady && events.length > 0) {
		return <Calendar events={events} />
	}

	// Pokaż skeleton gdy kalendarz nie jest gotowy
	if (!isReady) {
		return <SkeletonCalendar />
	}
	// Pokaż kalendarz gdy brak danych
	if (events.length === 0) {
		return <Calendar events={events} />
	}

	return null
}
