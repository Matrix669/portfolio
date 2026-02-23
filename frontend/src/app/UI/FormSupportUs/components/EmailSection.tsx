import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import type { FormData } from '../schema'
import styles from '../FormSupportUs.module.scss'

interface EmailSectionProps {
	register: UseFormRegister<FormData>
	errors: FieldErrors<FormData>
}

export const EmailSection = ({ register, errors }: EmailSectionProps) => {
	return (
		<div className={styles.formSupportUs__container}>
			<h2 className={styles['formSupportUs-title']}>Podaj swój adres e-mail</h2>
			<input
				className={styles['formSupportUs-emailInput']}
				type='email'
				placeholder='Wpisz swój adres e-mail'
				{...register('email')}
			/>
			{errors.email && <p className={styles['errorMsg']}>{errors.email.message}</p>}
		</div>
	)
}
