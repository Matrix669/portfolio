import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/componentsShadcn/ui/dialog'
// import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'
// import { Stripe } from '@stripe/stripe-js'
import { useState } from 'react'

import RightArrow from '@/app/icons/RightArrow'

import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import stylesBtn from '@/UI/MainLink/MainLink.module.scss'
import Spinner from '../Spinner/Spinner'

interface DialogCheckoutButtonProps {
	// stripePromise: Promise<Stripe | null>
	clientSecret: string | null
	sessionId: string | null
	buttonProps: {
		className: string
		disabled: boolean
		type: 'submit' | 'button' | 'reset'
		ariaLabel: string
		text: string
	}
	isDialogOpen: boolean
	setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
	paymentMethod: string
}

export default function DialogCheckoutButton({
	// stripePromise,
	clientSecret,
	sessionId,
	buttonProps,
	isDialogOpen,
	setIsDialogOpen,
	paymentMethod,
}: DialogCheckoutButtonProps) {
	const [isCancelling, setIsCancelling] = useState(false)

	const handleCancel = async () => {
		if (!sessionId) {
			return
		}

		setIsCancelling(true)

		// Anulowanie sesji Stripe po stronie API jest tymczasowo wyłączone,
		// żeby nie wywoływać nieistniejącego endpointu /api/cancel-checkout-session.
		console.log('DialogCheckoutButton handleCancel (API wyłączone) dla sessionId:', sessionId)
		setIsDialogOpen(false)
		setIsCancelling(false)

		/*
		try {
			await fetch('/api/cancel-checkout-session', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ sessionId }),
			})
			setIsDialogOpen(false)
		} catch (error) {
			console.error('Error during cancellation:', error)
		} finally {
			setIsCancelling(false)
		}
		*/
	}

	return (
		<Dialog
			open={isDialogOpen}
			onOpenChange={open => {
				if (!open && !isCancelling) {
					handleCancel()
				}
			}}
		>
			<DialogTrigger>
				<button
					className={buttonProps.className}
					disabled={buttonProps.disabled}
					type={buttonProps.type}
					aria-label={buttonProps.ariaLabel}
				>
					{buttonProps.text}
				</button>
			</DialogTrigger>
			<DialogContent className='my-4 p-12 max-w-screen-xl h-[75svh] overflow-scroll z-[910]'>
				<DialogHeader className='justify-between'>
					<DialogTitle className='inline-block mb-6 z-0'>Potwierdź płatność</DialogTitle>
					<VisuallyHidden>
						<DialogDescription>Potwierdź płatność poprzez uzupełnienie danych</DialogDescription>
					</VisuallyHidden>
					{clientSecret ? (
						<div>
							{(paymentMethod === 'Google Pay' || paymentMethod === 'Apple Pay') && (
								<div className='bg-blue-50 p-4 rounded-lg mb-4 text-sm text-blue-800'>
									<p className='font-medium mb-1'>Uwaga dotycząca płatności kartą:</p>
									<p>
										Płatności kartą nie mogą być anulowane po rozpoczęciu procesu płatności. Jeśli chcesz przerwać
										płatność, zamknij to okno przed wprowadzeniem danych karty. W przeciwnym wypadku płatność{' '}
										<span className='font-bold'>i tak się wykona</span>!
									</p>
								</div>
							)}
							{/* <EmbeddedCheckoutProvider
								stripe={stripePromise}
								options={{
									clientSecret,
								}}
							>
								<EmbeddedCheckout />
							</EmbeddedCheckoutProvider> */}
						</div>
					) : (
						<Spinner />
					)}
				</DialogHeader>
				<DialogFooter className='self-end'>
					<DialogClose>
						<button className={`${stylesBtn.mainBtn} ${stylesBtn.blackMainBtn}`} disabled={isCancelling}>
							{isCancelling ? (
								<>Anulowanie...</>
							) : (
								<>
									<RightArrow className='rotate-180' /> Powrót
								</>
							)}
						</button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
