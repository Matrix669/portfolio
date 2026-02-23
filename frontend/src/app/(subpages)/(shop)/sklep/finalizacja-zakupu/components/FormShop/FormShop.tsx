'use client'
import useShopForm from '@/app/hooks/useShopForm'

import CustomerData from '@/app/(subpages)/(shop)/sklep/finalizacja-zakupu/components/CustomerData/CustomerData'
import Delivery from '@/app/(subpages)/(shop)/sklep/finalizacja-zakupu/components/Delivery/Delivery'
import PaymentMethods from '@/app/(subpages)/(shop)/sklep/finalizacja-zakupu/components/PaymentMethods/PaymentMethods'
import Summary from '@/app/(subpages)/(shop)/sklep/finalizacja-zakupu/components/Summary/Summary'

import styles from '@/app/(subpages)/(shop)/sklep/finalizacja-zakupu/FinalizingThePucharse.module.scss'
export default function FormShop() {
	const {
		register,
		handleSubmit,
		watch,
		errors,
		isValid,
		onSubmit,
		selectedPaymentMethod,
		selectedDeliveryMethod,
		isCompany,
		handlePaymentMethodKeyDown,
		handleDeliveryMethodKeyDown,
		clientSecret,
		sessionId,
		isDialogOpen,
		setIsDialogOpen,
		isLoading,
		trigger,
		clearErrors
	} = useShopForm()
	return (
		<form
			className={`${styles['finalizingThePucharse__form']} ${styles.sectionPadding}`}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className={styles['finalizingThePucharse__formUp']}>
				<CustomerData register={register} errors={errors} isCompany={isCompany} watch={watch} trigger={trigger} clearErrors={clearErrors}/>
				<div className={styles['finalizingThePucharse__formUp-left']}>
					<PaymentMethods
						register={register}
						errors={errors}
						selectedPaymentMethod={selectedPaymentMethod}
						handlePaymentMethodKeyDown={handlePaymentMethodKeyDown}
					/>
					<Delivery
						register={register}
						errors={errors}
						selectedDeliveryMethod={selectedDeliveryMethod}
						handleDeliveryMethodKeyDown={handleDeliveryMethodKeyDown}
					/>
				</div>
			</div>
			<Summary
				register={register}
				errors={errors}
				clientSecret={clientSecret}
				sessionId={sessionId}
				isDialogOpen={isDialogOpen}
				setIsDialogOpen={setIsDialogOpen}
				isLoading={isLoading}
				selectedPaymentMethod={selectedPaymentMethod}
				isValid={isValid}
			/>
		</form>
	)
}
