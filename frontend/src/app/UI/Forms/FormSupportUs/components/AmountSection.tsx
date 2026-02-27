import type { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import type { FormData } from '@/app/schemas/FormSupportSchema'
import { AMOUNTS, BORDER_STYLE } from '../constants'
import PopularChoiceIcon from '@/app/icons/formSupport/PopularChoiceIcon'
import styles from '../FormSupportUs.module.scss'

interface AmountSectionProps {
	register: UseFormRegister<FormData>
	errors: FieldErrors<FormData>
	setValue: UseFormSetValue<FormData>
	watch: UseFormWatch<FormData>
}

export const AmountSection = ({ register, errors, setValue, watch }: AmountSectionProps) => {
	const selectedAmount = watch('amount')
	const isCustomAmountSelected = Boolean(selectedAmount && !AMOUNTS.some(a => a.amountValue === selectedAmount))

	const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value || ''
		setValue('amount', value, { shouldValidate: true })
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>, value: string) => {
		if (e.key === 'Enter') {
			setValue('amount', value, { shouldValidate: true })
		}
	}

	return (
		<>
			<div className={styles.formSupportUs__container}>
				<h2 className={styles['formSupportUs-title']}>Wybierz, ile chcesz wpłacić</h2>
				<div className={styles.formSupportUs__boxBtns}>
					{AMOUNTS.map(amount =>
						amount.isPopular ? (
							<label
								key={amount.amountValue}
								htmlFor={`amount-${amount.amountValue}`}
								className={`${styles['formSupportUs__btn']} ${styles['formSupportUs__btn--popular']}`}
								style={{
									border: selectedAmount === amount.amountValue ? BORDER_STYLE : '',
								}}
								tabIndex={0}
								onKeyDown={e => handleKeyDown(e, amount.amountValue)}
								role='radio'
								aria-checked={selectedAmount === amount.amountValue}
								aria-label={`Wybierz kwotę ${amount.amountValue} złotych, popularny wybór`}
							>
								<input
									type='radio'
									value={amount.amountValue}
									{...register('amount')}
									id={`amount-${amount.amountValue}`}
									className='hidden'
								/>
								<span>{amount.amountValue} zł</span>
								<div className={styles['formSupportUs__btn--popular-infoBox']}>
									<PopularChoiceIcon />
									<p>Popularny wybór</p>
								</div>
							</label>
						) : amount.isCustom ? (
							<label
								key={amount.amountValue}
								className={`${styles['formSupportUs__btn']} ${styles['formSupportUs__btn--freeAmount']}`}
								htmlFor='customAmount-freeAmount'
								style={{
									border: selectedAmount && !AMOUNTS.some(a => a.amountValue === selectedAmount) ? BORDER_STYLE : '',
								}}
								tabIndex={0}
								onKeyDown={e => handleKeyDown(e, amount.amountValue)}
								role='radio'
								aria-checked={isCustomAmountSelected}
								aria-label='Wpisz własną kwotę'
							>
								<input
									type='radio'
									value={amount.amountValue}
									{...register('amount')}
									id={`amount-${amount.amountValue}`}
									className='hidden'
								/>
								<input
									type='number'
									onChange={handleCustomAmountChange}
									value={selectedAmount || ''}
									className='w-full outline-none bg-transparent'
								/>
								<p>Wpisz inną kwotę</p>
							</label>
						) : (
							<label
								key={amount.amountValue}
								htmlFor={`amount-${amount.amountValue}`}
								className={styles['formSupportUs__btn']}
								style={{
									border: selectedAmount === amount.amountValue ? BORDER_STYLE : '',
								}}
								tabIndex={0}
								onKeyDown={e => handleKeyDown(e, amount.amountValue)}
								role='radio'
								aria-checked={selectedAmount === amount.amountValue}
								aria-label={`Wybierz kwotę ${amount.amountValue} złotych`}
							>
								<input
									type='radio'
									value={amount.amountValue}
									{...register('amount')}
									id={`amount-${amount.amountValue}`}
									className='hidden'
								/>
								{amount.amountValue} zł
							</label>
						)
					)}
				</div>
			</div>
			{errors.amount && <p className={styles['errorMsg']}>{errors.amount.message}</p>}
		</>
	)
}

