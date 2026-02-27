import { useState } from 'react'

import { UseFormRegister, FieldErrors, UseFormTrigger, UseFormClearErrors, UseFormWatch } from 'react-hook-form'
import { FormData } from '@/app/schemas/ShopFormFinalizationSchema'
import { motion, AnimatePresence } from 'motion/react'

import RightArrow from '@/app/icons/RightArrow'

import styles from '@/app/(subpages)/(shop)/sklep/finalizacja-zakupu/FinalizingThePucharse.module.scss'
import formStyles from '@/app/UI/Forms/FormSupportUs/FormSupportUs.module.scss'
import btnStyles from '@/app/UI/MainLink/MainLink.module.scss'

interface CustomerDataMobileProps {
	register: UseFormRegister<FormData>
	errors: FieldErrors<FormData>
	isCompany: boolean | undefined
	trigger: UseFormTrigger<FormData>
	clearErrors: UseFormClearErrors<FormData>
	watch: UseFormWatch<FormData>
}
export default function CustomerDataMobile({
	register,
	errors,
	isCompany,
	trigger,
	clearErrors,
	watch,
}: CustomerDataMobileProps) {
	const [currentStep, setCurrentStep] = useState(0)
	const [direction, setDirection] = useState(1)
	const [isValidating, setIsValidating] = useState(false)

	const deliveryToAnotherAddressWatch = watch('deliveryToAnotherAddress')

	const steps = [
		{
			id: 0,
			title: 'Dane klienta',
		},
		{
			id: 1,
			title: 'Dane adresowe',
		},
		{
			id: 2,
			title: 'Firma',
		},
		{
			id: 3,
			title: 'Dodatkowe uwagi',
		},
	]
	const getFieldsForStep = (step: number): (keyof FormData)[] => {
		switch (step) {
			case 0:
				return ['firstName', 'lastName', 'email', 'phoneNumber']
			case 1:
				return ['street', 'houseNumber', 'zipCode', 'town']
			case 2:
				return isCompany ? (['NIP', 'companyName'] as const) : []
			case 3:
				return []
			default:
				return []
		}
	}
	const handleNext = async () => {
		setIsValidating(true)
		const fieldsToValidate = getFieldsForStep(currentStep)

		if (currentStep === 2 && !isCompany) {
			clearErrors(['NIP', 'companyName'])
		}
		if (fieldsToValidate.length === 0) {
			if (currentStep < steps.length - 1) {
				setDirection(1)
				setCurrentStep(prev => prev + 1)
			}
			setIsValidating(false)
			return
		}

		const isValid = await trigger(fieldsToValidate)

		if (isValid && currentStep < steps.length - 1) {
			setDirection(1)
			setCurrentStep(prev => prev + 1)
		}
		setIsValidating(false)
	}
	const handlePrev = () => {
		if (currentStep > 0) {
			setDirection(-1)
			setCurrentStep(prev => prev - 1)
		}
	}

	const variants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 300 : -300,
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: (direction: number) => ({
			x: direction > 0 ? -300 : 300,
			opacity: 0,
		}),
	}
	const renderStepContent = () => {
		switch (currentStep) {
			case 0:
				return (
					<div
						className={`${styles['finalizingThePucharse__boxCustomerDataMobile']} ${styles['finalizingThePucharse__boxCustomerDataMobile--first']}`}
					>
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
				)
			case 1:
				return (
					<div
						className={`${styles['finalizingThePucharse__boxCustomerDataMobile']} ${styles['finalizingThePucharse__boxCustomerDataMobile--second']}`}
					>
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
				)
			case 2:
				return (
					<div
						className={`${styles['finalizingThePucharse__boxCustomerDataMobile']} ${styles['finalizingThePucharse__boxCustomerDataMobile--third']}`}
					>
						<div
							className={`${formStyles['formSupportUs__monthlySupportBox']} ${styles['finalizingThePucharse__boxCustomerData-checkbox']}`}
						>
							<input type='checkbox' id='isCompanyMobile' {...register('isCompany')} />
							<label htmlFor='isCompanyMobile'>Zamawiam jako firma</label>
						</div>

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
							<label htmlFor='companyNameMobile'>Nazwa firmy *</label>
							<input
								type='text'
								id='companyNameMobile'
								{...register('companyName')}
								disabled={!isCompany}
								className={`${formStyles['formSupportUs__input']} ${
									!isCompany ? formStyles['formSupportUs__btn-disabled'] : ''
								}`}
							/>
							{errors.companyName && <p className={formStyles['errorMsg']}>{errors.companyName.message}</p>}
						</div>
					</div>
				)
			case 3:
				return (
					<div
						className={`${styles['finalizingThePucharse__boxCustomerDataMobile']} ${
							styles['finalizingThePucharse__boxCustomerDataMobile--fourth']
						} ${deliveryToAnotherAddressWatch ? styles['finalizingThePucharse__boxCustomerData--delivery'] : ''}`}
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
									className={styles['finalizingThePucharse__boxCustomerData-item--delivery-motion']}
								>
									<div className={styles.finalizingThePucharse__boxCustomerData}>
										<div className={styles['finalizingThePucharse__boxCustomerData-item']}>
											<label htmlFor='anotherDeliveryStreetMobile'>Ulica *</label>
											<input type='text' id='anotherDeliveryStreetMobile' {...register('anotherStreet')} />
											{errors.anotherStreet && <p className={formStyles['errorMsg']}>{errors.anotherStreet.message}</p>}
										</div>
										<div className={styles['finalizingThePucharse__boxCustomerData-item']}>
											<label htmlFor='anotherDeliveryHouseNumberMobile'>Numer domu *</label>
											<input type='number' id='anotherDeliveryHouseNumberMobile' {...register('anotherHouseNumber')} />
											{errors.anotherHouseNumber && (
												<p className={formStyles['errorMsg']}>{errors.anotherHouseNumber.message}</p>
											)}
										</div>
										<div className={styles['finalizingThePucharse__boxCustomerData-item']}>
											<label htmlFor='anotherDeliveryApartmentNumberMobile'>Numer lokalu</label>
											<input
												type='number'
												id='anotherDeliveryApartmentNumberMobile'
												{...register('anotherApartmentNumber')}
											/>
										</div>
									</div>
									<div className={styles.finalizingThePucharse__boxCustomerData}>
										<div className={styles['finalizingThePucharse__boxCustomerData-item']}>
											<label htmlFor='anotherDeliveryZipCodeMobile'>Kod pocztowy *</label>
											<input type='text' id='anotherDeliveryZipCodeMobile' {...register('anotherZipCode')} />
											{errors.anotherZipCode && (
												<p className={formStyles['errorMsg']}>{errors.anotherZipCode.message}</p>
											)}
										</div>
										<div className={styles['finalizingThePucharse__boxCustomerData-item']}>
											<label htmlFor='anotherDeliveryTownMobile'>Miejscowość *</label>
											<input type='text' id='anotherDeliveryTownMobile' {...register('anotherTown')} />
											{errors.anotherTown && <p className={formStyles['errorMsg']}>{errors.anotherTown.message}</p>}
										</div>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
						<div className={styles['finalizingThePucharse__boxCustomerData-item']}>
							<label htmlFor='additionalComments'>Dodatkowe uwagi</label>
							<textarea id='additionalComments' {...register('additionalComments')} />
							{errors.additionalComments && (
								<p className={formStyles['errorMsg']}>{errors.additionalComments.message}</p>
							)}
						</div>
					</div>
				)
			default:
				return null
		}
	}
	return (
		<>
			<div className={styles['finalizingThePucharse__containerCustomerDataMobile']}>
				<div className={styles['finalizingThePucharse__progressBar']}>
					<motion.div
						initial={{ width: '0%' }}
						animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
						transition={{ duration: 0.3 }}
					/>
				</div>
				<AnimatePresence initial={false} custom={direction} mode='wait'>
					<motion.div
						key={currentStep}
						custom={direction}
						variants={variants}
						initial='enter'
						animate='center'
						exit='exit'
						transition={{
							x: { type: 'spring', stiffness: 300, damping: 30 },
							opacity: { duration: 0.2 },
						}}
					>
						{renderStepContent()}
					</motion.div>
				</AnimatePresence>

				<div className={styles['finalizingThePucharse__btnContainer']}>
					<button type='button' onClick={handlePrev} className={btnStyles['mainBtn']} disabled={currentStep === 0}>
						<RightArrow />
						Wstecz
					</button>
					<button
						type='button'
						onClick={handleNext}
						className={btnStyles['mainBtn']}
						disabled={isValidating || currentStep === steps.length - 1}
					>
						Dalej
						<RightArrow />
					</button>
				</div>
			</div>
		</>
	)
}
