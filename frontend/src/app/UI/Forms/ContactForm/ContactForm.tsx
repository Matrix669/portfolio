'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import RightArrow from '@/app/icons/RightArrow'
import stylesBtnToast from '@/app/UI/MainLink/MainLink.module.scss'
import Toast from '@/app/UI/Toast/Toast'
import { Magnetic } from '@/componentsShadcn/ui/magnetic'
import { Spinner } from '@/componentsShadcn/ui/spinner'
import { type ContactFormValues, createContactSchema } from '@/lib/contactSchema'
import styles from './ContactForm.module.scss'

export default function ContactForm() {
	const tContactForm = useTranslations('mainPage.contactSection.contactForm')
	const schema = createContactSchema(key => tContactForm(key))

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setError,
		clearErrors,
	} = useForm({
		mode: 'all',
		resolver: zodResolver(schema),
	})
	const [isLoading, setIsLoading] = useState<boolean>(false)

	async function onSubmit(data: ContactFormValues) {
		clearErrors('root.general')
		setIsLoading(true)
		try {
			const res = await fetch('/api/send-msg-form-contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})
			if (res.ok) {
				toast.success(tContactForm('toast.success'))
				reset()
				return
			}
			const payload = await res.json().catch(() => null)
			const message =
				payload?.errorCode === 'RATE_LIMIT'
					? tContactForm('toast.tooManyAttempts')
					: payload?.errorCode === 'INVALID_FORM'
						? tContactForm('toast.error')
						: res.status === 429
							? tContactForm('toast.tooManyAttempts')
							: tContactForm('toast.error')
			toast.error(message)
			setError('root.general', {
				message: message,
				type: 'custom',
			})
		} catch (e: unknown) {
			console.error(`Error: ${e}`)
			const message = tContactForm('toast.error')
			toast.error(message)
			setError('root.general', {
				message: message,
				type: 'custom',
			})
		} finally {
			setIsLoading(false)
		}
	}
	const onInvalid = () => {
		toast.error(tContactForm('toast.error'))
	}

	return (
		<form onSubmit={handleSubmit(onSubmit, onInvalid)} className={styles.form} noValidate>
			<div className={styles.formBoxUp}>
				<input
					type='text'
					tabIndex={-1}
					autoComplete='off'
					aria-hidden='true'
					style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
					{...register('contact_reference')}
				/>
				<div className={styles.formBox}>
					<label htmlFor='name'>{tContactForm('name.label')}</label>
					<input
						className={errors.name ? styles.inputError : ''}
						placeholder=''
						required
						disabled={isLoading}
						type='text'
						id='name'
						maxLength={100}
						{...register('name')}
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
						disabled={isLoading}
						type='email'
						id='email'
						{...register('email')}
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
					disabled={isLoading}
					placeholder=''
					required
					id='msg'
					maxLength={3000}
					minLength={10}
					{...register('message')}
				></textarea>
				<AnimatedError show={!!errors.message} errorKey='message-error'>
					{errors.message?.message}
				</AnimatedError>
			</div>
			<AnimatedError show={!!errors.root?.general} errorKey='general-error'>
				{errors.root?.general?.message}
			</AnimatedError>

			<div className={styles.formBox__agreement}>
				<div>
					<div className={styles.formBox__agreementItem}>
						<div className={styles.formBox__agreementControl}>
							<input type='checkbox' id='checkbox' {...register('agreement')} />
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
				<Magnetic>
					<Toast className={stylesBtnToast.mainLink} disabled={isLoading} type='submit'>
						<AnimatePresence mode='wait' initial={false}>
							{isLoading ? (
								<motion.span
									key='textLoading'
									initial={{ opacity: 0, x: -50 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: 50 }}
									transition={{
										opacity: { duration: 0.4, ease: 'easeOut', delay: 0.1 },
										x: {
											type: 'spring',
											stiffness: 160,
											damping: 12,
											mass: 0.3,
											delay: 0.3,
										},
									}}
								>
									{tContactForm('sendingMessage')}
								</motion.span>
							) : (
								<motion.span
									key='text'
									initial={{ opacity: 0, x: -50 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: 50 }}
									transition={{
										opacity: { duration: 0.4, ease: 'easeOut', delay: 0.1 },
										x: {
											type: 'spring',
											stiffness: 160,
											damping: 12,
											mass: 0.3,
											delay: 0.2,
										},
									}}
								>
									{tContactForm('sendMessage')}
								</motion.span>
							)}
						</AnimatePresence>
						<AnimatePresence mode='wait' initial={false}>
							{isLoading ? (
								<motion.span
									key='spinner'
									initial={{ opacity: 0, scale: 0 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0 }}
									transition={{
										opacity: { duration: 0.4, ease: 'easeOut', delay: 0.1 },
										scale: {
											type: 'spring',
											stiffness: 220,
											damping: 14,
											mass: 0.7,
											// delay: 0.5,
										},
									}}
								>
									<Spinner />
								</motion.span>
							) : (
								<motion.span
									key='arrow'
									initial={{ opacity: 0, scale: 0 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0 }}
									transition={{
										opacity: { duration: 0.4, ease: 'easeOut', delay: 0.1 },
										scale: {
											type: 'spring',
											stiffness: 220,
											damping: 14,
											mass: 0.7,
											// delay: 0.5,
										},
									}}
								>
									<RightArrow />
								</motion.span>
							)}
						</AnimatePresence>
					</Toast>
				</Magnetic>
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
