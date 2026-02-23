'use client'

import { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { EventInput, EventClickArg } from '@fullcalendar/core'
import DialogEventCalendar from '@/app/UI/DialogEventCalendar/DialogEventCalendar'
import type { StrapiCalendarEvent } from '@/utils/types'
import styles from './Calendar.module.scss'


interface CalendarProps {
	events: StrapiCalendarEvent[]
}

interface SelectedEvent {
	title: string
	start: Date | undefined
	end: Date | undefined
	description?: string
	location?: string
	image?: string
	category?: string
	color?: string
}

export default function Calendar({ events }: CalendarProps) {
	const [calendarEvents, setCalendarEvents] = useState<EventInput[]>([])
	const [selectedEvent, setSelectedEvent] = useState<SelectedEvent | null>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)

	useEffect(() => {
		if (events && events.length > 0) {
			const formattedEvents = events.map(event => ({
				id: event.id.toString(),
				title: event.tytul,
				start: event.startWydarzeniaData,
				end: event.koniecWydarzeniaData,
				extendedProps: {
					description: event.opisWydarzenia,
					location: event.lokalizacja,
					image: event.zdjecieWydarzenia?.url,
					category: event.kategoria,
				},				
			}))
			setCalendarEvents(formattedEvents)
		}
	}, [events])

	const handleEventClick = (clickInfo: EventClickArg) => {
		const event = clickInfo.event
		const { description, location, image, category, color } = event.extendedProps as {
			description?: string
			location?: string
			image?: string
			category?: string
			color?: string
		}

		setSelectedEvent({
			title: event.title || '',
			start: event.start || undefined,
			end: event.end || undefined,
			description,
			location,
			image,
			category,
			color,
		})
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
		setSelectedEvent(null)
	}

	return (
		<>
			<div className={styles.calendar}>
				<FullCalendar
					plugins={[dayGridPlugin, interactionPlugin]}
					initialView='dayGridMonth'
					headerToolbar={{
						left: 'prev,next today',
						center: 'title',
						right: 'dayGridMonth,dayGridWeek',
					}}
					locale='pl'
					buttonText={{
						today: 'Dzisiaj',
						month: 'Miesiąc',
						week: 'Tydzień',
					}}
					events={calendarEvents}
					eventClick={handleEventClick}
					height='auto'
					dayMaxEvents={true}
					moreLinkClick='popover'
					eventDisplay='block'
					eventTimeFormat={{
						hour: '2-digit',
						minute: '2-digit',
						hour12: false,
					}}
				/>
			</div>

			<DialogEventCalendar isOpen={isModalOpen} onClose={closeModal} event={selectedEvent} />
		</>
	)
}