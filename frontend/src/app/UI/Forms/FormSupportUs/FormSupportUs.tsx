'use client'

import { useFormSupport } from '@/app/hooks/useFormSupport'
import { EmailSection, AmountSection, InitiativeSection, PaymentSection } from './components'
import Wrapper from '@/app/UI/Wrapper/Wrapper'
import styles from './FormSupportUs.module.scss'
import AlertDialogCheckout from '@/app/UI/AlertDialogCheckout/AlertDialogCheckout'
import SummarySection from './components/SummarySection'
import Spinner from '@/app/UI/Spinner/Spinner'

interface ButtonProps {
	className: string
	disabled: boolean
	type: 'submit' | 'button' | 'reset'
	ariaLabel: string
	text: string
}

export const FormSupportUs = () => {
	const {
		register,
		handleSubmit,
		errors,
		setValue,
		watch,
		onSubmit,
		isValid,
		selectedAmount,
		isDialogOpen,
		setIsDialogOpen,
		clientSecret,
		sessionId,
		isLoading,
	} = useFormSupport()

	const buttonProps: ButtonProps = {
		className: styles.formButtonSupport,
		disabled: !isValid || isLoading,
		type: 'submit',
		ariaLabel: `Wpłać ${selectedAmount || 0} złotych`,
		text: isLoading ? 'Ładowanie...' : `Wpłać ${watch('amount') || watch('customAmount') || 0} zł`,
	}
	const selectedPaymentMethod = watch('paymentMethod')

	return (
		<section className={styles.sectionPadding}>
			<Wrapper>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className={`${styles.formSupportUs} ${isLoading ? styles.formSupportUs__loading : ''}`}
				>
					{isLoading && <Spinner />}
					<EmailSection register={register} errors={errors} />
					<AmountSection register={register} errors={errors} setValue={setValue} watch={watch} />
					<InitiativeSection register={register} errors={errors} setValue={setValue} watch={watch} />
					<PaymentSection register={register} errors={errors} setValue={setValue} watch={watch} />
					<div className={styles.formSupportUs__summary}>
						<SummarySection watch={watch} />
						<AlertDialogCheckout
							open={isDialogOpen}
							onOpenChange={setIsDialogOpen}
							clientSecret={clientSecret}
							sessionId={sessionId}
							buttonProps={buttonProps}
							paymentMethod={selectedPaymentMethod}
						/>
					</div>
				</form>
			</Wrapper>
		</section>
	)
}


