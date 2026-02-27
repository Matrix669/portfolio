import { useForm } from 'react-hook-form'
import { FormData, shopFormSchema } from '../schemas/ShopFormFinalizationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'

export default function useShopForm() {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors, isValid },
		trigger,
		clearErrors,
	} = useForm<FormData>({
		resolver: zodResolver(shopFormSchema),
		defaultValues: {
			delivery: 'Inpost Kurier',
			paymentMethod: '',
			isCompany: false,
			deliveryToAnotherAddress: false,
		},
		mode: 'onChange',
	})
	const [isLoading, setIsLoading] = useState(false)
	const [clientSecret, setClientSecret] = useState<string | null>(null)
	const [sessionId, setSessionId] = useState<string | null>(null)
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	// Watched values
	const selectedPaymentMethod = watch('paymentMethod')
	const selectedDeliveryMethod = watch('delivery')
	const isCompany = watch('isCompany')
	const deliveryToAnotherAddress = watch('deliveryToAnotherAddress')

	useEffect(() => {
		if (!isCompany) {
			clearErrors(['NIP', 'companyName'])
		}
	}, [isCompany, clearErrors])

	useEffect(() => {
		if (!deliveryToAnotherAddress) {
			clearErrors(['anotherStreet', 'anotherHouseNumber', 'anotherApartmentNumber', 'anotherZipCode', 'anotherTown'])
		}
	}, [deliveryToAnotherAddress, clearErrors])

	// Handler functions for tile clicks
	const handlePaymentMethodKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>, value: string) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault()
			setValue('paymentMethod', value, { shouldValidate: true })
		}
	}

	const handleDeliveryMethodKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>, value: string) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault()
			setValue('delivery', value, { shouldValidate: true })
		}
	}

	const onSubmit = async (data: FormData) => {
		if (!isValid) return

		setIsLoading(true)

		// Tworzenie sesji płatności sklepu jest tymczasowo wyłączone,
		// żeby nie wywoływać nieistniejącego endpointu /api/create-pucharse-shop-session.
		console.log('useShopForm onSubmit (API wyłączone):', data)

		// Tu również można podstawić przykładowe clientSecret/sessionId do testów UI.
		setIsLoading(false)

		/*
		try {
			const response = await fetch('/api/create-pucharse-shop-session', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})
			if (!response.ok) {
				throw new Error('Błąd podczas tworzenia sesji płatności')
			}
			const { clientSecret, sessionId } = await response.json()
			setClientSecret(clientSecret)
			setSessionId(sessionId)
			setIsDialogOpen(true)
		} catch (error) {
			console.error('Błąd w onSubmit', error)
		} finally {
			setIsLoading(false)
		}
		*/
	}
	return {
		register,
		handleSubmit,
		watch,
		setValue,
		errors,
		isValid,
		onSubmit,
		isLoading,
		clientSecret,
		sessionId,
		isDialogOpen,
		setIsDialogOpen,
		selectedPaymentMethod,
		selectedDeliveryMethod,
		isCompany,
		handlePaymentMethodKeyDown,
		handleDeliveryMethodKeyDown,
		trigger,
		clearErrors,
	}
}
