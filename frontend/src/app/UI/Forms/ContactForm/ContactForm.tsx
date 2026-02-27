'use client'

import { useForm } from 'react-hook-form'
import Wrapper from '@/app/UI/Wrapper/Wrapper'

import styles from './ContactForm.module.scss'
import Spinner from '@/app/UI/Spinner/Spinner'
import { useState } from 'react'

type FormValues = {
	name: string
	email: string
	message: string
	general?: string
}

export default function ContactForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		watch,
		reset,
		setError,
	} = useForm<FormValues>({
		mode: 'all',
	})
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const emailValue = watch('email', '')

	async function onSubmit(data: FormValues) {
		if (!isValid) return

		setIsLoading(true)

		// API formularza kontaktowego jest tymczasowo wyłączone,
		// żeby nie powodować błędów dev/404 dla nieistniejącego endpointu.
		console.log('ContactForm submit (API wyłączone):', data)
		reset()
		setIsLoading(false)

		/*
		try {
			const res = await fetch('/api/send-msg-form-contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})
			if (res.ok) {
				console.log(data)
				// toast.success('Wiadomość została wysłana')
				reset()
			} else {
				// toast.error('Błąd podczas wysyłania wiadomości')
				setError('general', {
					message: 'Błąd wysyłania wiadomości',
					type: 'custom',
				})
			}
		} catch (e: unknown) {
			console.error(`Error: ${e}`)
			// toast.error('Wystąpił błąd podczas wysyłania wiadomości')
			setError('general', {
				message: 'Błąd wysyłania wiadomości',
				type: 'custom',
			})
		} finally {
			setIsLoading(false)
		}
		*/
	}
	return (
		<section className={styles.sectionPadding} id='kontakt'>
			<Wrapper>
				<form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} ${isLoading ? styles.form__loading : ''}`} noValidate>
					{isLoading && <Spinner />}
					<h2 className={`${styles.titleSection} ${styles.line}`}>Kontakt</h2>
					<div className={styles.formBox}>
						<input
							className={errors.name ? styles.inputError : ''}
							required
							type='text'
							id='name'
							{...register('name', {
								required: 'Podaj imię',
								minLength: { value: 3, message: 'Imię musi zawierać conajmniej 3 litery' },
							})}
						/>
						<label htmlFor='name'>Imie*</label>
					</div>
					{errors.name && <span className={styles.formError}>{errors.name.message}</span>}
					<div className={styles.formBox}>
						<input
							className={`${errors.email ? styles.inputError : ''} ${emailValue ? styles.emailValid : ''}`}
							required
							type='email'
							id='email'
							{...register('email', {
								required: 'Podaj e-mail',
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									message: 'Podaj poprawny adres e-mail',
								},
							})}
						/>
						<label htmlFor='email'>Adres e-mail*</label>
					</div>
					{errors.email && <span className={styles.formError}>{errors.email.message}</span>}
					<div className={styles.formBox}>
						<textarea
							className={errors.message ? styles.inputError : ''}
							required
							id='msg'
							{...register('message', {
								required: 'Podaj wiadomość',
							})}
						></textarea>
						<label htmlFor='msg'>Wiadomość*</label>
					</div>
					{errors.message && <span className={styles.formError}>{errors.message.message}</span>}
					{errors.general && <span className={styles.formError}>{errors.general.message}</span>}
				</form>
			</Wrapper>
		</section>
	)
}


