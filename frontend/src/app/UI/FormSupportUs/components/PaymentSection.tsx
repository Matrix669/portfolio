import type { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import type { FormData } from '../schema'
import { PAYMENT_PROVIDERS, BORDER_STYLE } from '../constants'
import styles from '../FormSupportUs.module.scss'


interface PaymentSectionProps {
	register: UseFormRegister<FormData>
	errors: FieldErrors<FormData>
	setValue: UseFormSetValue<FormData>
	watch: UseFormWatch<FormData>
}

export const PaymentSection = ({ register, errors, setValue, watch }: PaymentSectionProps) => {
	const selectedPaymentMethod = watch('paymentMethod')
	const selectedMonthlySupport = watch('monthlySupport')

	const handlePaymentMethodKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>, value: string) => {
		if (e.key === 'Enter') {
			setValue('paymentMethod', value, { shouldValidate: true })
		}
	}

	return (
		<div className={`${styles.formSupportUs__container}`}>
			<h2 className={styles['formSupportUs-title']}>Wybierz metodę płatności</h2>
			<div className={styles.formSupportUs__boxBtns}>
				{PAYMENT_PROVIDERS.map(provider => (
					<label
						key={provider.imgAlt}
						className={
							styles['formSupportUs__btn'] +
							(provider.imgAlt === 'Przelewy24' && selectedMonthlySupport
								? ' ' + styles['formSupportUs__btn-disabled']
								: '')
						}
						style={{
							border: selectedPaymentMethod === provider.imgAlt ? BORDER_STYLE : '',
						}}
						tabIndex={0}
						onKeyDown={e => handlePaymentMethodKeyDown(e, provider.imgAlt)}
						role='radio'
						aria-checked={selectedPaymentMethod === provider.imgAlt}
						aria-label={
							provider.imgAlt === 'Przelewy24' && selectedMonthlySupport
								? `Ta metoda płatności (${provider.imgAlt}) jest niedostępna dla płatności cyklicznych`
								: `Wybierz metodę płatności: ${provider.imgAlt}`
						}
					>
						<input
							type='radio'
							value={provider.imgAlt}
							{...register('paymentMethod')}
							className='hidden'
							disabled={provider.imgAlt === 'Przelewy24' && selectedMonthlySupport}
						/>
						<img src={provider.imgSrc} alt={provider.imgAlt} height={83} />
					</label>
				))}
			</div>
			<div className={styles.formSupportUs__monthlySupportBox}>
				<input type='checkbox' id='monthly-support' {...register('monthlySupport')} />
				<label aria-label='Wybierz wsparcie cykliczne miesięczne' htmlFor='monthly-support'>
					Wsparcie cykliczne (miesięczne)
				</label>
			</div>
			{errors.paymentMethod && <p className={styles['errorMsg']}>{errors.paymentMethod.message}</p>}
		</div>
	)
}
