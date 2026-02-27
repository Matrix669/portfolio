import { Skeleton } from '@/componentsShadcn/ui/skeleton'
import styles from './SkeletonCalendar.module.scss'

export default function SkeletonCalendar() {
	// Generuj dni tygodnia
	const weekDays = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nd']

	// Generuj komórki kalendarza (35 komórek dla typowego miesiąca)
	const calendarCells = Array.from({ length: 35 }, (_, i) => i)

	return (
		<div className={styles.skeletonCalendar}>
			{/* Header kalendarza */}
			<div className={styles.skeletonCalendar__header}>
				{/* Przyciski nawigacji */}
				<div className={styles.skeletonCalendar__nav}>
					<Skeleton className={styles.skeletonCalendar__navButton} />
					<Skeleton className={styles.skeletonCalendar__navButton} />
					<Skeleton className={styles.skeletonCalendar__todayButton} />
				</div>

				{/* Tytuł miesiąca */}
				<Skeleton className={styles.skeletonCalendar__title} />

				{/* Przyciski widoku */}
				<div className={styles.skeletonCalendar__viewButtons}>
					<Skeleton className={styles.skeletonCalendar__viewButton} />
					<Skeleton className={styles.skeletonCalendar__viewButton} />
				</div>
			</div>

			{/* Dni tygodnia */}
			<div className={styles.skeletonCalendar__weekDays}>
				{weekDays.map((day, index) => (
					<div key={index} className={styles.skeletonCalendar__weekDay}>
						<Skeleton className={styles.skeletonCalendar__weekDayText} />
					</div>
				))}
			</div>

			{/* Komórki kalendarza */}
			<div className={styles.skeletonCalendar__grid}>
				{calendarCells.map((cell, index) => (
					<div key={index} className={styles.skeletonCalendar__cell}>
						{/* Numer dnia */}
						<Skeleton className={styles.skeletonCalendar__dayNumber} />

						{/* Wydarzenia (1-3 skeletony) */}
						{Math.random() > 0.7 && (
							<div className={styles.skeletonCalendar__events}>
								<Skeleton className={styles.skeletonCalendar__event} />
								{Math.random() > 0.8 && <Skeleton className={styles.skeletonCalendar__event} />}
								{Math.random() > 0.9 && <Skeleton className={styles.skeletonCalendar__event} />}
							</div>
						)}

						{/* Link "więcej" dla niektórych komórek */}
						{Math.random() > 0.85 && <Skeleton className={styles.skeletonCalendar__moreLink} />}
					</div>
				))}
			</div>
		</div>
	)
}
