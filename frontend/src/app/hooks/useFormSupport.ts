'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormData, formSchema } from '../UI/FormSupportUs/schema'
import convertToSubcurrency from '@/lib/convertToSubcurrency'

export const useFormSupport = () => {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors, isValid },
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			amount: undefined,
			group: '',
			paymentMethod: '',
			monthlySupport: false,
		},
		mode: 'onChange',
	})

	const [, setSubmittedData] = useState<FormData | null>(null)
	const [clientSecret, setClientSecret] = useState<string | null>(null)
	const [sessionId, setSessionId] = useState<string | null>(null)
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const selectedAmount = watch('amount')
	const selectedGroup = watch('group')
	const selectedMonthlySupport = watch('monthlySupport')
	const selectedPaymentMethod = watch('paymentMethod')

	const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value || ''
		setValue('amount', value, { shouldValidate: true })
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>, value: string) => {
		if (e.key === 'Enter') {
			setValue('amount', value, { shouldValidate: true })
		}
	}

	const handleGroupKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>, value: string) => {
		if (e.key === 'Enter') {
			setValue('group', value, { shouldValidate: true })
		}
	}

	const handlePaymentMethodKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>, value: string) => {
		if (e.key === 'Enter') {
			setValue('paymentMethod', value, { shouldValidate: true })
		}
	}

	const onSubmit = async (data: FormData) => {
		if (isValid) {
			setIsLoading(true)
			setSubmittedData(data)
			try {
				const response = await fetch('/api/create-checkout-session', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: data.email,
						amount: convertToSubcurrency(Number(data.amount)),
						group: data.group,
						monthlySupport: data.monthlySupport,
						paymentMethod: data.paymentMethod,
					}),
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
		}
	}

	return {
		register,
		handleSubmit,
		watch,
		setValue,
		errors,
		isValid,
		isLoading,
		clientSecret,
		setClientSecret,
		sessionId,
		isDialogOpen,
		setIsDialogOpen,
		selectedAmount,
		selectedGroup,
		selectedMonthlySupport,
		selectedPaymentMethod,
		handleCustomAmountChange,
		handleKeyDown,
		handleGroupKeyDown,
		handlePaymentMethodKeyDown,
		onSubmit,
	}
}
