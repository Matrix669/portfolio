import type { UseFormWatch } from 'react-hook-form'
import type { FormData } from '@/app/schemas/FormSupportSchema'
import styles from '../FormSupportUs.module.scss'

interface SummarySectionProps {
	watch: UseFormWatch<FormData>
}

export default function SummarySection({ watch }: SummarySectionProps) {
	return (
		<>
			<h2 className={styles['formSupportUs-title']}>Podsumowanie</h2>
			<div className={styles['formSupportUs__summary-box']}>
				<h3>Suma kosztów</h3>
				<p>{watch('amount') || watch('customAmount') ? `${watch('amount')} zł` : 'Nie wybrano'}</p>
			</div>
			<div className={styles['formSupportUs__summary-box']}>
				<h3>Wybrana inicjatywa</h3>
				<p>{watch('group') || 'Nie wybrano'}</p>
			</div>
			<div className={styles['formSupportUs__summary-box']}>
				<h3>Metoda płatności</h3>
				<p>{watch('paymentMethod') || 'Nie wybrano'}</p>
			</div>
			<div className={styles['formSupportUs__summary-box']}>
				<h3>Rodzaj płatności</h3>
				<p>{watch('monthlySupport') ? 'Cykliczna, miesięczna' : 'Jednorazowa'}</p>
			</div>
		</>
	)
}

