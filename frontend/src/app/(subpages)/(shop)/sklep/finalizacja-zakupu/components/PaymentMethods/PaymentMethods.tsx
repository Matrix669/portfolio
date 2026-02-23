import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { FormData } from '@/app/schemas/ShopFormFinalizationSchema'
import { SHOP_PAYMENT_METHODS } from '../../constants'

import { BORDER_STYLE } from '@/app/(subpages)/wesprzyj-nas/components/FormSupportUs/constants'

import formStyles from '@/app/(subpages)/wesprzyj-nas/components/FormSupportUs/FormSupportUs.module.scss'
import styles from '@/app/(subpages)/(shop)/sklep/finalizacja-zakupu/FinalizingThePucharse.module.scss'

interface PaymentMethodsProps {
	register: UseFormRegister<FormData>
	errors: FieldErrors<FormData>
	selectedPaymentMethod: string
	handlePaymentMethodKeyDown: (e: React.KeyboardEvent<HTMLLabelElement>, value: string) => void
}

export default function PaymentMethods({register, errors, selectedPaymentMethod, handlePaymentMethodKeyDown}: PaymentMethodsProps) {
	return (
		<section
			className={`${formStyles['formSupportUs__container']} ${formStyles['formSupportUs__container--initiatives']} ${styles['finalizingThePucharse__containerMethods']}`}
		>
			<h2 className={formStyles['formSupportUs-title']}>Metoda płatności: </h2>
			<div className={`${formStyles.formSupportUs__boxBtns} ${styles['finalizingThePucharse__boxMethods']}`}>
				{SHOP_PAYMENT_METHODS.map(method => (
					<label
						key={method.title}
						className={`${formStyles['formSupportUs__btn']} ${styles['finalizingThePucharse__boxMethods-btn']}`}
						style={{
							border: selectedPaymentMethod === method.title ? BORDER_STYLE : '',
						}}
						tabIndex={0}
						onKeyDown={e => handlePaymentMethodKeyDown(e, method.title)}
						role='radio'
						aria-checked={selectedPaymentMethod === method.title}
						aria-label={`Wybierz metodę płatności: ${method.title}`}
					>
						<input
							type='radio'
							value={method.title}
							{...register('paymentMethod')}
							className='hidden'
						/>
						<span>{method.icon}</span>
						<h3>{method.title}</h3>
					</label>
				))}
			</div>
				{errors.paymentMethod && <p className={formStyles['errorMsg']}>{errors.paymentMethod.message}</p>}
		</section>
	)
}
