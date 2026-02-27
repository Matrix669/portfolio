import type { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import type { FormData } from '@/app/schemas/FormSupportSchema'
import { INITIATIVES, BORDER_STYLE } from '../constants'
import styles from '../FormSupportUs.module.scss'

interface InitiativeSectionProps {
	register: UseFormRegister<FormData>
	errors: FieldErrors<FormData>
	setValue: UseFormSetValue<FormData>
	watch: UseFormWatch<FormData>
}

export const InitiativeSection = ({ register, errors, setValue, watch }: InitiativeSectionProps) => {
	const selectedGroup = watch('group')

	const handleGroupKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>, value: string) => {
		if (e.key === 'Enter') {
			setValue('group', value, { shouldValidate: true })
		}
	}

	return (
		<>
			<div
				className={`${styles.formSupportUs__container} ${styles['formSupportUs__container--initiatives']}`}
			>
				<h2 className={styles['formSupportUs-title']}>Wybierz inicjatywę, którą chcesz wesprzeć</h2>
				<div className={styles.formSupportUs__boxBtns}>
					{INITIATIVES.map(initiative => (
						<label
							key={initiative.title}
							className={styles['formSupportUs__btn']}
							style={{
								border: selectedGroup === initiative.title ? BORDER_STYLE : '',
							}}
							tabIndex={0}
							onKeyDown={e => handleGroupKeyDown(e, initiative.title)}
							role='radio'
							aria-checked={selectedGroup === initiative.title}
							aria-label={`Wybierz inicjatywę: ${initiative.title}`}
						>
							<input type='radio' value={initiative.title} {...register('group')} className='hidden' />
							<span>{initiative.icon}</span>
							<h3>{initiative.title}</h3>
						</label>
					))}
				</div>
			</div>
			{errors.group && <p className={styles['errorMsg']}>{errors.group.message}</p>}
		</>
	)
}

