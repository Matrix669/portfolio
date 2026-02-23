

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/componentsShadcn/ui/dialog'
import { Calendar, Clock, MapPin, Tag, X } from 'lucide-react'
import styles from './DialogEventCalendar.module.scss'

// import { getStrapiMedia } from '@/utils/get-strapi-media'

interface DialogEventCalendarProps {
	isOpen: boolean
	onClose: () => void
	event: {
		title: string
		start: Date | undefined
		end: Date | undefined
		description?: string
		location?: string
		image?: string
		category?: string
		color?: string
	} | null
}

export default function DialogEventCalendar({ isOpen, onClose, event }: DialogEventCalendarProps) {
	if (!event) return null

	const formatDate = (date: Date) => {
		return new Intl.DateTimeFormat('pl-PL', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}).format(date)
	}

	const formatTime = (date: Date) => {
		return new Intl.DateTimeFormat('pl-PL', {
			hour: '2-digit',
			minute: '2-digit',
		}).format(date)
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className={`${styles.dialog}`}>
				<DialogHeader className={styles.dialog__header}>
					<DialogTitle className={styles.dialog__title}>{event.title}</DialogTitle>
					{event.description && (
						<DialogDescription className={styles.dialog__description}>{event.description}</DialogDescription>
					)}
				</DialogHeader>

				<div className={styles.dialog__content}>
					{event.image && (
						<div className={styles.dialog__image}>
							<img
								src={''}
								alt={event.title || 'Zdjęcie wydarzenia'}
								className={styles.dialog__imageImg}
								width={504}
								height={200}
								sizes='100vw'
							/>
						</div>
					)}

					<div className={styles.dialog__details}>
						{event.start && (
							<div className={styles.dialog__detail}>
								<Calendar className={styles.dialog__icon} />
								<span>{formatDate(event.start)}</span>
							</div>
						)}

						{event.start && (
							<div className={styles.dialog__detail}>
								<Clock className={styles.dialog__icon} />
								<span>
									{formatTime(event.start)}
									{event.end ? ` - ${formatTime(event.end)}` : ''}
								</span>
							</div>
						)}

						{event.location && (
							<div className={styles.dialog__detail}>
								<MapPin className={styles.dialog__icon} />
								<span>{event.location}</span>
							</div>
						)}

						{event.category && (
							<div className={styles.dialog__detail}>
								<Tag className={styles.dialog__icon} />
								<span className={styles.dialog__category} style={{ color: event.color }}>
									{event.category}
								</span>
							</div>
						)}
					</div>
				</div>

				<button onClick={onClose} className={styles.dialog__closeButton} aria-label='Zamknij modal'>
					<X className={styles.dialog__closeIcon} />
				</button>
			</DialogContent>
		</Dialog>
	)
}
