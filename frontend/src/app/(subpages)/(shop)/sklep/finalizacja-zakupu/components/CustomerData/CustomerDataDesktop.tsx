import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form'
import { FormData } from '@/app/schemas/ShopFormFinalizationSchema'

import { motion, AnimatePresence } from 'motion/react'

import styles from '@/app/(subpages)/(shop)/sklep/finalizacja-zakupu/FinalizingThePucharse.module.scss'
import formStyles from '@/app/UI/Forms/FormSupportUs/FormSupportUs.module.scss'

interface CustomerDataDesktopProps {
	register: UseFormRegister<FormData>
	errors: FieldErrors<FormData>
	isCompany: boolean | undefined
	watch: UseFormWatch<FormData>
}
export default function CustomerDataDesktop({ register, errors, isCompany, watch }: CustomerDataDesktopProps) {
	const deliveryToAnotherAddressWatch = watch('deliveryToAnotherAddress')

	return (
		<div className={styles['finalizingThePucharse__customerDataContainerDesktop']}>
			<div className={styles.finalizingThePucharse__boxCustomerData}>
				<div className={styles['finalizingThePucharse__boxCustomerData-item']}>
					<label htmlFor='firstName'>Imię *</label>
					<input type='text' id='firstName' {...register('firstName')} />
					{errors.firstName && <p className={formStyles['errorMsg']}>{errors.firstName.message}</p>}
				</div>
				<div className={styles['finalizingThePucharse__boxCustomerData-item']}>
					<label htmlFor='lastName'>Nazwisko *</label>
					<input type='text' id='lastName' {...register('lastName')} />
					{errors.lastName && <p className={formStyles['errorMsg']}>{errors.lastName.message}</p>}
				</div>
			</div>
			<div className={styles.finalizingThePucharse__boxCustomerData}>
				<div className={styles['finalizingThePucharse__boxCustomerData-item']}>
					<label htmlFor='email'>E-mail *</label>
					<input type='text' id='email' {...register('email')} />
					{errors.email && <p className={formStyles['errorMsg']}>{errors.email.message}</p>}
				</div>
				<div className={styles['finalizingThePucharse__boxCustomerData-item']}>
					<label htmlFor='phoneNumber'>Numer telefonu *</label>
					<input type='number' id='phoneNumber' {...register('phoneNumber')} />
					{errors.phoneNumber && <p className={formStyles['errorMsg']}>{errors.phoneNumber.message}</p>}
				</div>
			</div>
			<div className={styles.finalizingThePucharse__boxCustomerData}>
				<div className={styles['finalizingThePucharse__boxCustomerData-item']}>
					<label htmlFor='street'>Ulica *</label>
					<input type='text' id='street' {...register('street')} />
					{errors.street && <p className={formStyles['errorMsg']}>{errors.street.message}</p>}
				</div>
				<div className={styles['finalizingThePucharse__boxCustomerData-item']}>
					<label htmlFor='houseNumber'>Numer domu *</label>
					<input type='number' id='houseNumber' {...register('houseNumber')} />
					{errors.houseNumber && <p className={formStyles['errorMsg']}>{errors.houseNumber.message}</p>}
				</div>
				<div className={styles['finalizingThePucharse__boxCustomerData-item']}>
					<label htmlFor='apartmentNumber'>Numer lokalu</label>
					<input type='number' id='apartmentNumber' {...register('apartmentNumber')} />					
				</div>
			</div>
			<div className={styles.finalizingThePucharse__boxCustomerData}>
				<div className={styles['finalizingThePucharse__boxCustomerData-item']}>
					<label htmlFor='zipCode'>Kod pocztowy *</label>
					<input type='text' id='zipCode' {...register('zipCode')} />
					{errors.zipCode && <p className={formStyles['errorMsg']}>{errors.zipCode.message}</p>}
				</div>
				<div className={styles['finalizingThePucharse__boxCustomerData-item']}>
					<label htmlFor='town'>Miejscowość *</label>
					<input type='text' id='town' {...register('town')} />
					{errors.town && <p className={formStyles['errorMsg']}>{errors.town.message}</p>}
				</div>
			</div>
			<div className={styles.finalizingThePucharse__boxCustomerData}>
				<div
					className={`${formStyles['formSupportUs__monthlySupportBox']} ${styles['finalizingThePucharse__boxCustomerData-checkbox']}`}
				>
					<input type='checkbox' id='isCompany' {...register('isCompany')} />
					<label htmlFor='isCompany'>Zamawiam jako firma</label>
				</div>
			</div>
			<div className={styles.finalizingThePucharse__boxCustomerData}>
				<div className={styles['finalizingThePucharse__boxCustomerData-item']}>
					<label htmlFor='NIP'>NIP *</label>
					<input
						type='number'
						id='NIP'
						{...register('NIP')}
						disabled={!isCompany}
						className={`${formStyles['formSupportUs__input']} ${
							!isCompany ? formStyles['formSupportUs__btn-disabled'] : ''
						}`}
					/>
					{errors.NIP && <p className={formStyles['errorMsg']}>{errors.NIP.message}</p>}
				</div>
				<div className={styles['finalizingThePucharse__boxCustomerData-item']}>
					<label htmlFor='companyName'>Nazwa firmy *</label>
					<input
						type='text'
						id='companyName'
						{...register('companyName')}
						disabled={!isCompany}
						className={`${formStyles['formSupportUs__input']} ${
							!isCompany ? formStyles['formSupportUs__btn-disabled'] : ''
						}`}
					/>
					{errors.companyName && <p className={formStyles['errorMsg']}>{errors.companyName.message}</p>}
				</div>
			</div>
			<div
				className={`${styles.finalizingThePucharse__boxCustomerData} ${styles['finalizingThePucharse__boxCustomerData--delivery']}`}
			>
				<div
					className={`${formStyles['formSupportUs__monthlySupportBox']} ${styles['finalizingThePucharse__boxCustomerData-checkbox']}`}
				>
					<input type='checkbox' id='deliveryToAnotherAddress' {...register('deliveryToAnotherAddress')} />
					<label htmlFor='deliveryToAnotherAddress'>Dostawa pod inny adres</label>
				</div>
				<AnimatePresence initial={false}>
					{deliveryToAnotherAddressWatch && (
						<motion.div
							initial={{ maxHeight: 0, opacity: 0 }}
							animate={{ maxHeight: 2000, opacity: 1 }}
							exit={{ maxHeight: 0, opacity: 0 }}
							transition={{
								duration: 0.3,
								ease: [0.4, 0, 0.2, 1],
								opacity: { duration: 0.2 },
							}}
						>
							<div className={styles.finalizingThePucharse__boxCustomerData}>
								<div className={styles['finalizingThePucharse__boxCustomerData-item']}>
									<label htmlFor='anotherDeliveryStreet'>Ulica *</label>
									<input type='text' id='anotherDeliveryStreet' {...register('anotherStreet')} />
									{errors.anotherStreet && <p className={formStyles['errorMsg']}>{errors.anotherStreet.message}</p>}
								</div>
								<div className={styles['finalizingThePucharse__boxCustomerData-item']}>
									<label htmlFor='anotherDeliveryHouseNumber'>Numer domu *</label>
									<input type='number' id='anotherDeliveryHouseNumber' {...register('anotherHouseNumber')} />
									{errors.anotherHouseNumber && <p className={formStyles['errorMsg']}>{errors.anotherHouseNumber.message}</p>}
								</div>
								<div className={styles['finalizingThePucharse__boxCustomerData-item']}>
									<label htmlFor='anotherDeliveryApartmentNumber'>Numer lokalu</label>
									<input type='number' id='anotherDeliveryApartmentNumber' {...register('anotherApartmentNumber')} />
								</div>
							</div>
							<div className={styles.finalizingThePucharse__boxCustomerData}>
								<div className={styles['finalizingThePucharse__boxCustomerData-item']}>
									<label htmlFor='anotherDeliveryZipCode'>Kod pocztowy *</label>
									<input type='text' id='anotherDeliveryZipCode' {...register('anotherZipCode')} />
									{errors.anotherZipCode && <p className={formStyles['errorMsg']}>{errors.anotherZipCode.message}</p>}
								</div>
								<div className={styles['finalizingThePucharse__boxCustomerData-item']}>
									<label htmlFor='anotherDeliveryTown'>Miejscowość *</label>
									<input type='text' id='anotherDeliveryTown' {...register('anotherTown')} />
									{errors.anotherTown && <p className={formStyles['errorMsg']}>{errors.anotherTown.message}</p>}
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			<div className={styles.finalizingThePucharse__boxCustomerData}>
				<div className={styles['finalizingThePucharse__boxCustomerData-item']}>
					<label htmlFor='additionalComments'>Dodatkowe uwagi</label>
					<textarea id='additionalComments' {...register('additionalComments')} />
					{errors.additionalComments && <p className={formStyles['errorMsg']}>{errors.additionalComments.message}</p>}
				</div>
			</div>
		</div>
	)
}
