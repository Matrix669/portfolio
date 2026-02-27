import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/componentsShadcn/ui/alert-dialog'
// import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'
// import { loadStripe } from '@stripe/stripe-js'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

import RightArrow from '@/app/icons/RightArrow'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { X } from 'lucide-react'
import stylesBtn from '@/app/UI/MainLink/MainLink.module.scss'

export interface ShopButtonProps {
	className: string
	disabled: boolean
	type: 'submit' | 'button' | 'reset'
	ariaLabel: string
	text: string
}

interface AlertDialogShopCheckoutProps {
	clientSecret: string | null
	sessionId: string | null
	open: boolean
	onOpenChange: (open: boolean) => void
	buttonProps: ShopButtonProps
	paymentMethod: string
	isLoading: boolean
}

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

// Funkcja debounce
function debounce<T extends (...args: unknown[]) => unknown>(func: T, wait: number): (...args: Parameters<T>) => void {
	let timeout: NodeJS.Timeout

	return function executedFunction(...args: Parameters<T>) {
		const later = () => {
			clearTimeout(timeout)
			func(...args)
		}

		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
	}
}

export default function AlertDialogShopCheckout({
	clientSecret,
	sessionId,
	open,
	onOpenChange,
	buttonProps,
	paymentMethod,
	isLoading,
}: AlertDialogShopCheckoutProps) {
	const [isCancelling, setIsCancelling] = useState(false)
	const router = useRouter()

	// const checkSessionStatus = useCallback(async () => {
	// 	if (!sessionId) return

	// 	try {
	// 		const response = await fetch(`/api/check-session-status?session_id=${sessionId}`)
	// 		const data = await response.json()

	// 		if (data.status === 'complete') {
	// 			router.push(`/paymentResult?session_id=${sessionId}`)
	// 		}
	// 	} catch (error) {
	// 		console.error('Błąd podczas sprawdzania statusu sesji:', error)
	// 	}
	// }, [sessionId, router])

	// useEffect(() => {
	// 	if (!sessionId) return

	// 	// Zastosuj debounce do funkcji sprawdzającej status
	// 	// const debouncedCheck = debounce(checkSessionStatus, 2000)

	// 	// Sprawdzaj status co 3 sekundy
	// 	const interval = setInterval(debouncedCheck, 3000)

	// 	return () => {
	// 		clearInterval(interval)
	// 	}
	// }, [sessionId, checkSessionStatus])

	const handleCancel = async () => {
		if (!sessionId) {
			return
		}

		setIsCancelling(true)

		// try {
		// 	await fetch('/api/cancel-checkout-session', {
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 		},
		// 		body: JSON.stringify({ sessionId }),
		// 	})
		// 	onOpenChange(false)
		// } catch (error) {
		// 	console.error('Error during cancellation:', error)
		// } finally {
		// 	setIsCancelling(false)
		// }
	}

	return (
		<AlertDialog
			open={open}
			onOpenChange={open => {
				if (!open && !isCancelling) {
					handleCancel()
				}
			}}
		>
			<AlertDialogTrigger
				render={
					<button
						className={buttonProps.className}
						disabled={buttonProps.disabled}
						type={buttonProps.type}
						aria-label={buttonProps.ariaLabel}
					>
						{isLoading ? (
							<div className='flex items-center gap-2'>
								<div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
								Przetwarzanie...
							</div>
						) : (
							buttonProps.text
						)}
					</button>
				}
			/>
			<AlertDialogContent className='my-4 p-4 sm:p-6 max-w-screen-xl h-[80svh] z-[910]'>
				<div className='relative grid w-full h-full p-6 overflow-auto'>
					{isCancelling && (
						<div className='fixed inset-0 w-full h-full flex items-center justify-center bg-black/30 backdrop-blur-[2px] z-50'>
							<div
								className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white'
								role='status'
							>
								<span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
									Anulowanie...
								</span>
							</div>
						</div>
					)}
					<AlertDialogHeader>
						<div className='flex justify-between items-center mb-auto'>
							<AlertDialogTitle className='inline-block'>Finalizacja zakupu</AlertDialogTitle>
							<AlertDialogCancel className='bg-none border-none shadow-none mt-0'>
								<X className='h-8 w-8' />
								<span className='sr-only'>Zamknij</span>
							</AlertDialogCancel>
						</div>
						<VisuallyHidden>
							<AlertDialogDescription>Finalizuj zakup poprzez uzupełnienie danych płatności</AlertDialogDescription>
						</VisuallyHidden>
						{clientSecret ? (
							<div>
								{(paymentMethod === 'Karta' || paymentMethod === 'Blik') && (
									<div className='bg-blue-50 p-4 rounded-lg mb-4 text-sm text-blue-800'>
										<p className='font-medium mb-1'>Uwaga dotycząca płatności:</p>
										<p>
											Płatności nie mogą być anulowane po rozpoczęciu procesu płatności. Jeśli chcesz przerwać płatność,
											zamknij to okno przed wprowadzeniem danych. W przeciwnym wypadku płatność{' '}
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
							<div className='flex items-center justify-center'>
								<div
									className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white'
									role='status'
								>
									<span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
										Ładowanie...
									</span>
								</div>
							</div>
						)}
					</AlertDialogHeader>
					<AlertDialogFooter className='self-end sm:justify-center xl:justify-end mt-4'>
						<AlertDialogCancel
							render={
								<button
									className={`${stylesBtn.mainBtn} ${stylesBtn.blackMainBtn} sm:w-[100%] sm:max-w-[412px] xl:w-[unset] xl:max-w-[unset]`}
									disabled={isCancelling}
								>
									{isCancelling ? (
										<>Anulowanie...</>
									) : (
										<>
											<RightArrow className='rotate-180' /> Powrót
										</>
									)}
								</button>
							}
						/>
					</AlertDialogFooter>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	)
}
