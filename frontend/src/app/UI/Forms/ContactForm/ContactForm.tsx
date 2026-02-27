'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
// import Toast from '@/app/UI/Toast/Toast'
// import { toast } from 'sonner'
import RightArrow from '@/app/icons/RightArrow'
import MainLink from '@/app/UI/MainLink/MainLink'
import Spinner from '../../Spinner/Spinner'

import styles from './ContactForm.module.scss'
import stylesBtnToast from '@/app/UI/MainLink/MainLink.module.scss'

type FormValues = {
	name: string
	email: string
	message: string
	agreement: boolean
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

	// async function onSubmit(data: FormValues) {
	// 	if (isValid) {
	// 		setIsLoading(true)
	// 		try {
	// 			const res = await fetch('/api/send-msg-form-contact', {
	// 				method: 'POST',
	// 				headers: {
	// 					'Content-Type': 'application/json',
	// 				},
	// 				body: JSON.stringify(data),
	// 			})
	// 			if (res.ok) {
	// 				console.log(data)
	// 				toast.success('Wiadomość została wysłana')
	// 				reset()
	// 			} else {
	// 				toast.error('Błąd podczas wysyłania wiadomości')
	// 				setError('general', {
	// 					message: 'Błąd wysyłania wiadomości',
	// 					type: 'custom',
	// 				})
	// 			}
	// 		} catch (e: unknown) {
	// 			console.error(`Error: ${e}`)
	// 			toast.error('Wystąpił błąd podczas wysyłania wiadomości')
	// 			setError('general', {
	// 				message: 'Błąd wysyłania wiadomości',
	// 				type: 'custom',
	// 			})
	// 		}finally {
	// 			setIsLoading(false)
	// 		}
	// 	}
	// }
	return (
		<form
			// onSubmit={handleSubmit(onSubmit)}
			className={`${styles.form} ${isLoading ? styles.form__loading : ''}`}
			noValidate
		>
			{isLoading && <Spinner />}
			<div className={styles.formBoxUp}>
				<div className={styles.formBox}>
					<label htmlFor='name'>Imię</label>
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
					{errors.name && <span className={styles.formError}>{errors.name.message}</span>}
				</div>
				<div className={styles.formBox}>
					<label htmlFor='email'>Adres e-mail</label>
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
					{errors.email && <span className={styles.formError}>{errors.email.message}</span>}
				</div>
			</div>
			<div className={styles.formBox}>
				<label htmlFor='msg'>Wiadomość</label>
				<textarea
					className={errors.message ? styles.inputError : ''}
					required
					id='msg'
					{...register('message', {
						required: 'Podaj wiadomość',
					})}
				></textarea>
				{errors.message && <span className={styles.formError}>{errors.message.message}</span>}
			</div>
			{errors.general && <span className={styles.formError}>{errors.general.message}</span>}

			<div className={styles.formBox__agreement}>
				<div>
					<div className={styles.formBox__agreementItem}>
						<input
							type='checkbox'
							id='checkbox'
							{...register('agreement', {
								required: 'Musisz wyrazić zgodę na przetwarzanie danych osobowych',
							})}
						/>
						<label htmlFor='checkbox' className={styles.text}>
							Wyrażam zgodę na przetwarzanie <Link href='/polityka-prywatnosci'> danych osobowych</Link>
						</label>
					</div>
					{errors.agreement && <span className={styles.formError}>{errors.agreement.message}</span>}
				</div>
				{/* <Toast className={stylesBtnToast.mainBtn}> */}
				<MainLink href='#'>
					wyślij wiadomość
					<RightArrow />
				</MainLink>
				{/* </Toast> */}
			</div>
		</form>
	)
}
