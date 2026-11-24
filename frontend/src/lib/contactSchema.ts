import { z } from 'zod'

/** Klucze komunikatów z `mainPage.contactSection.contactForm` */
export type ContactMessageKey =
	| 'name.required'
	| 'name.minLength'
	| 'name.maxLength'
	| 'email.required'
	| 'email.invalid'
	| 'message.required'
	| 'message.minLength'
	| 'message.maxLength'
	| 'agreement.required'

/**
 * Wspólny schemat formularza kontaktowego – używany w ContactForm (z tłumaczeniami)
 * i w API route (bez tłumaczeń). Limity zmieniasz tylko tutaj.
 */
export function createContactSchema(t: (key: ContactMessageKey) => string = key => key) {
	return z.object({
		name: z.string().trim().min(1, t('name.required')).min(3, t('name.minLength')).max(100, t('name.maxLength')),
		email: z.string().trim().min(1, t('email.required')).max(254, t('email.invalid')).email(t('email.invalid')),
		message: z
			.string()
			.trim()
			.min(1, t('message.required'))
			.min(10, t('message.minLength'))
			.max(3000, t('message.maxLength')),
		agreement: z.literal(true, t('agreement.required')),
		contact_reference: z.string().optional(),
	})
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>
