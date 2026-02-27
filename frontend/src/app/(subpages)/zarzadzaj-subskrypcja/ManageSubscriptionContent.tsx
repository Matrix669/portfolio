'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import stylesSubscription from './ManageSubscription.module.scss'
import styles from '@/app/(subpages)/(shop)/sklep/finalizacja-zakupu/FinalizingThePucharse.module.scss'
import formStyles from '@/app/UI/Forms/FormSupportUs/FormSupportUs.module.scss'

interface FormData {
	emailCustomer: string
}

type CooldownType = 'normal' | 'rateLimit'
export function ManageSubscriptionContent() {
	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm<FormData>()

	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const [cooldown, setCooldown] = useState(0)
	const [cooldownType, setCooldownType] = useState<CooldownType>('normal')
	const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null)

	// useEffect dla odliczania cooldownu
	useEffect(() => {
		if (cooldown <= 0) {
			if (errors.emailCustomer?.type === 'cooldown' || errors.emailCustomer?.type === 'rateLimit') {
				clearErrors('emailCustomer')
			}
			return
		}

		const timer = setInterval(() => {
			setCooldown(prev => {
				const newValue = prev - 1

				// Aktualizuj komunikat podczas odliczania
				if (newValue > 0) {
					if (cooldownType === 'rateLimit') {
						setError('emailCustomer', {
							type: 'rateLimit',
							message: `Przekroczono limit prób. Poczekaj ${formatTime(newValue)} przed ponowną próbą`,
						})
					} else {
						setError('emailCustomer', {
							type: 'cooldown',
							message: `Poczekaj ${formatTime(newValue)} przed wysłaniem kolejnego linku`,
						})
					}
				}

				// Gdy dojdzie do 0, wyczyść błąd
				if (newValue <= 0) {
					clearInterval(timer)
					if (errors.emailCustomer?.type === 'cooldown' || errors.emailCustomer?.type === 'rateLimit') {
						clearErrors('emailCustomer')
					}
					return 0
				}

				return newValue
			})
		}, 1000)

		return () => clearInterval(timer)
	}, [cooldown, cooldownType, errors.emailCustomer?.type, setError, clearErrors])

	const onSubmit = async (data: FormData) => {
		if (cooldown > 0) {
			if (cooldownType === 'rateLimit') {
				setError('emailCustomer', {
					type: 'rateLimit',
					message: `Przekroczono limit prób. Poczekaj ${formatTime(cooldown)} przed ponowną próbą`,
				})
			} else {
				setError('emailCustomer', {
					type: 'cooldown',
					message: `Poczekaj ${formatTime(cooldown)} przed wysłaniem kolejnego linku`,
				})
			}
			return
		}

		setLoading(true)

		// Wysyłka magic-linka do Stripe portal jest tymczasowo wyłączona,
		// żeby nie wywoływać nieistniejącego endpointu /api/stripe/portal/magic-link.
		console.log('ManageSubscriptionContent onSubmit (API wyłączone) dla email:', data.emailCustomer)

		// Symulujemy "sukces" na potrzeby UI.
		setSuccess(true)
		setCooldown(0)
		setCooldownType('normal')
		setAttemptsLeft(3)
		setLoading(false)

		/*
		try {
			const response = await fetch('/api/stripe/portal/magic-link', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: data.emailCustomer }),
			})

			const result = await response.json()

			if (!response.ok) {
				// Obsługa rate limit (15 minut)
				if (response.status === 429 && result.rateLimitCooldown) {
					setCooldown(result.rateLimitCooldown)
					setCooldownType('rateLimit')
					setError('emailCustomer', {
						type: 'rateLimit',
						message: `Przekroczono limit prób. Poczekaj ${formatTime(result.rateLimitCooldown)} przed ponowną próbą`,
					})
					setLoading(false)
					return
				}

				// Obsługa cooldown (60 sekund) z backendu
				if (response.status === 429 && result.cooldown) {
					setCooldown(result.cooldown)
					setCooldownType('normal')
					setError('emailCustomer', {
						type: 'cooldown',
						message: `Poczekaj ${formatTime(result.cooldown)} przed wysłaniem kolejnego linku`,
					})
					setLoading(false)
					return
				}

				setError('emailCustomer', {
					type: 'server',
					message: result.error || 'Wystąpił błąd',
				})
				setLoading(false)
				return
			}

			// Sukces
			setSuccess(true)
			setCooldown(60) // Ustaw cooldown na 60 sekund
			setCooldownType('normal')

			// Ustaw informację o pozostałych próbach
			if (result.attemptsLeft !== undefined) {
				setAttemptsLeft(result.attemptsLeft)
			}
		} catch (err) {
			setError('emailCustomer', {
				type: 'server',
				message: 'Błąd połączenia z serwerem. Spróbuj ponownie.',
			})
			console.error('Błąd połączenia z serwerem', err)
		} finally {
			setLoading(false)
		}
		*/
	}

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60)
		const secs = seconds % 60
		return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`
	}
	return (
		<div className={`${stylesSubscription.sectionPadding} ${stylesSubscription.containerManageSubscription}`}>
			<h1>Zarządzaj subskrypcją</h1>

			{success ? (
				<div className={stylesSubscription.successMessage}>
					<div className={stylesSubscription.successIcon}>✉️</div>
					<h2>Link został wysłany!</h2>
					<p>Sprawdź swoją skrzynkę email. Wysłaliśmy Ci bezpieczny link do zarządzania subskrypcją.</p>

					<div className={stylesSubscription.importantNote}>
						<p className={stylesSubscription.subText}>
							<strong>⚠️ Ważne:</strong>
						</p>
						<ul style={{ textAlign: 'left', lineHeight: '1.8' }}>
							<li>
								Link jest <strong>jednorazowy</strong> - po kliknięciu wygasa
							</li>
							<li>
								Link jest ważny przez <strong>15 minut</strong>
							</li>
							<li>Jeśli potrzebujesz ponownie wejść, wyślij sobie nowy link</li>
						</ul>
					</div>

					{attemptsLeft !== null && attemptsLeft > 0 && (
						<p className={stylesSubscription.attemptsInfo}>
							📊 Pozostało prób: <strong>{attemptsLeft}/3</strong> (resetuje się po 15 minutach)
						</p>
					)}

					{cooldown > 0 ? (
						<div className={stylesSubscription.cooldownMessage}>
							<p>⏱️ Możesz wysłać kolejny link za: {formatTime(cooldown)}</p>
						</div>
					) : (
						<button
							onClick={() => {
								setSuccess(false)
								setAttemptsLeft(null)
							}}
							className={formStyles.formButtonSupport}
							style={{ marginTop: '20px' }}
						>
							Wyślij nowy link
						</button>
					)}
				</div>
			) : (
				<>
					<p className={stylesSubscription.description}>
						Podaj adres email użyty przy zakupie subskrypcji. Wyślemy Ci bezpieczny link do zarządzania płatnościami.
					</p>

					<form onSubmit={handleSubmit(onSubmit)}>
						<div className={styles['finalizingThePucharse__boxCustomerData-item']}>
							<label htmlFor='emailCustomer'>Email *</label>
							<input
								type='email'
								id='emailCustomer'
								placeholder='twoj@email.pl'
								disabled={cooldown > 0}
								{...register('emailCustomer', {
									required: 'Podaj adres email',
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: 'Nieprawidłowy format emaila',
									},
								})}
							/>
							{errors.emailCustomer && <p className={formStyles['errorMsg']}>{errors.emailCustomer.message}</p>}
						</div>

						<button
							type='submit'
							disabled={loading || cooldown > 0}
							className={formStyles.formButtonSupport}
							aria-label={
								loading ? 'Wysyłam link...' : cooldown > 0 ? `Poczekaj ${formatTime(cooldown)}` : 'Wyślij link'
							}
						>
							{loading
								? 'Wysyłam link...'
								: cooldown > 0
								? `Poczekaj ${formatTime(cooldown)}`
								: 'Wyślij bezpieczny link'}
						</button>
					</form>

					<div className={stylesSubscription.infoBox}>
						<h3>Co możesz zrobić? 📋</h3>
						<ul>
							<li>✓ Anulować subskrypcję</li>
							<li>✓ Zmienić metodę płatności</li>
							<li>✓ Zobaczyć historię płatności</li>
							<li>✓ Pobrać faktury</li>
						</ul>
					</div>

					<p className={stylesSubscription.securityNote}>🔒 Bezpieczne połączenie z Stripe</p>
				</>
			)}
		</div>
	)
}
