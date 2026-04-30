'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useTranslations } from 'next-intl'

// import Toast from '@/app/UI/Toast/Toast'
// import { toast } from 'sonner'
import RightArrow from '@/app/icons/RightArrow'
import MainLink from '@/app/UI/MainLink/MainLink'
import Spinner from '../../Spinner/Spinner'

import styles from './ContactForm.module.scss'
import stylesBtnToast from '@/app/UI/MainLink/MainLink.module.scss'
import { AnimatePresence, motion } from 'motion/react'

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
	const tContactForm = useTranslations('mainPage.contactSection.contactForm')
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
					<label htmlFor='name'>{tContactForm('name.label')}</label>
					<input
						className={errors.name ? styles.inputError : ''}
						placeholder=''
						required
						type='text'
						id='name'
						{...register('name', {
							required: tContactForm('name.required'),
							minLength: { value: 3, message: tContactForm('name.minLength') },
						})}
					/>
					<AnimatedError show={!!errors.name} errorKey='name-error'>
						{errors.name?.message}
					</AnimatedError>
				</div>
				<div className={styles.formBox}>
					<label htmlFor='email'>{tContactForm('email.label')}</label>
					<input
						className={`${errors.email ? styles.inputError : ''}`}
						placeholder=''
						required
						type='email'
						id='email'
						{...register('email', {
							required: tContactForm('email.required'),
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
								message: tContactForm('email.invalid'),
							},
						})}
					/>
					<AnimatedError show={!!errors.email} errorKey='email-error'>
						{errors.email?.message}
					</AnimatedError>
				</div>
			</div>
			<div className={styles.formBox}>
				<label htmlFor='msg'>{tContactForm('message.label')}</label>
				<textarea
					className={errors.message ? styles.inputError : ''}
					placeholder=''
					required
					id='msg'
					{...register('message', {
						required: tContactForm('message.required'),
					})}
				></textarea>
				<AnimatedError show={!!errors.message} errorKey='message-error'>
					{errors.message?.message}
				</AnimatedError>
			</div>
			<AnimatedError show={!!errors.general} errorKey='general-error'>
				{errors.general?.message}
			</AnimatedError>

			<div className={styles.formBox__agreement}>
				<div>
					<div className={styles.formBox__agreementItem}>
						<div className={styles.formBox__agreementControl}>
							<input
								type='checkbox'
								id='checkbox'
								{...register('agreement', {
									required: tContactForm('agreement.required'),
								})}
							/>
							<div className={styles.formBox__agreementItemRing} />
						</div>
						<label htmlFor='checkbox' className={styles.text}>
							{tContactForm('agreement.label')}
							{/* <Link href='/polityka-prywatnosci'>{tContactForm('agreement.link')}</Link> */}
						</label>
					</div>
					<AnimatedError show={!!errors.agreement} errorKey='agreement-error'>
						{errors.agreement?.message}
					</AnimatedError>
				</div>
				{/* <Toast className={stylesBtnToast.mainBtn}> */}
				<MainLink href='#' isNextJSLink>
					{tContactForm('sendMessage')}
					<RightArrow />
				</MainLink>
				{/* </Toast> */}
			</div>
		</form>
	)
}

type AnimatedErrorProps = {
	show: boolean
	children?: React.ReactNode
	errorKey: string
}

function AnimatedError({ show, children, errorKey }: AnimatedErrorProps) {
	return (
		<AnimatePresence mode='wait' initial={false}>
			{show && (
				<motion.span
					key={errorKey}
					className={styles.formError}
					initial={{ opacity: 0, y: -6, height: 0 }}
					animate={{ opacity: 1, y: 0, height: 'auto' }}
					exit={{ opacity: 0, y: -6, height: 0 }}
					transition={{ duration: 0.2, ease: 'easeInOut' }}
				>
					{children}
				</motion.span>
			)}
		</AnimatePresence>
	)
}
