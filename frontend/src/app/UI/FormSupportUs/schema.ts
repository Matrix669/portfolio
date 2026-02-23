import { z } from 'zod'

export const formSchema = z
	.object({
		email: z
			.string({
				required_error: 'Musisz podać adres e-mail',
				invalid_type_error: 'Adres e-mail musi być poprawnym adresem e-mail',
			})
			.email('Adres e-mail musi być poprawnym adresem e-mail'),
		amount: z
			.string({
				required_error: 'Musisz wybrać lub wpisać kwotę',
				invalid_type_error: 'Kwota musi być liczbą',
			})
			.regex(/^\d+(\.\d+)?$/, 'Kwota musi być poprawną liczbą')
			.refine(val => Number(val) >= 1, {
				message: 'Kwota musi być większa niż 0',
			}),
		customAmount: z
			.number({
				required_error: 'Musisz wpisać kwotę',
				invalid_type_error: 'Kwota musi być liczbą',
			})
			.min(1, 'Kwota musi być większa niż 0')
			.optional(),
		group: z
			.string({
				required_error: 'Musisz wybrać grupę',
			})
			.min(1, 'Musisz wybrać grupę'),
		paymentMethod: z
			.string({
				required_error: 'Musisz wybrać metodę płatności',
			})
			.min(1, 'Musisz wybrać metodę płatności'),
		monthlySupport: z.boolean(),
	})
	.refine(data => data.amount !== undefined || data.customAmount !== undefined, {
		message: 'Musisz wybrać lub wpisać kwotę',
		path: ['amount'],
	})
	.refine(data => !(data.monthlySupport && data.paymentMethod === 'Przelewy24'), {
		message: 'Przelewy24 nie obsługuje płatności cyklicznych',
		path: ['paymentMethod'],
	})

export type FormData = z.infer<typeof formSchema>
