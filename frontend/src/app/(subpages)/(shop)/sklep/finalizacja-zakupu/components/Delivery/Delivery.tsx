import Image from 'next/image'
import { SHOP_DELIVERY_METHODS } from '../../constants'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { FormData } from '@/app/schemas/ShopFormFinalizationSchema'

import { BORDER_STYLE } from '@/app/UI/Forms/FormSupportUs/constants'

import formStyles from '@/app/UI/Forms/FormSupportUs/FormSupportUs.module.scss'
import styles from '@/app/(subpages)/(shop)/sklep/finalizacja-zakupu/FinalizingThePucharse.module.scss'


interface DeliveryProps {
	register: UseFormRegister<FormData>
	errors: FieldErrors<FormData>
	selectedDeliveryMethod: string
	handleDeliveryMethodKeyDown: (e: React.KeyboardEvent<HTMLLabelElement>, value: string) => void
}
export default function Delivery({register, errors, selectedDeliveryMethod, handleDeliveryMethodKeyDown}: DeliveryProps) {
	return (
		<section
			className={`${formStyles['formSupportUs__container']} ${formStyles['formSupportUs__container--initiatives']} ${styles['finalizingThePucharse__containerMethods']}`}
		>
			<h2 className={formStyles['formSupportUs-title']}>Dostawa: </h2>
			<div className={`${formStyles.formSupportUs__boxBtns} ${styles['finalizingThePucharse__boxMethods']}`}>
				{SHOP_DELIVERY_METHODS.map(method => (
					<label
						key={method.title}
						className={`${formStyles['formSupportUs__btn']} ${styles['finalizingThePucharse__boxMethods-btn']}`}
						style={{
							border: selectedDeliveryMethod === method.title ? BORDER_STYLE : '',
						}}
						tabIndex={0}
						onKeyDown={e => handleDeliveryMethodKeyDown(e, method.title)}
						role='radio'
						aria-checked={selectedDeliveryMethod === method.title}
						aria-label={`Wybierz metodę dostawy: ${method.title} - ${method.deliveryAmount} zł`}
					>
						<input
							type='radio'
							value={method.title}
							{...register('delivery')}
							className='hidden'
						/>
						<Image src={method.imgSrc} alt={method.imgAlt} height={46} />
						<h3>{method.title}</h3>
						<p>{method.deliveryAmount} zł</p>
					</label>
				))}
				{errors.delivery && <p className={formStyles['errorMsg']}>{errors.delivery.message}</p>}
			</div>
		</section>
	)
}
