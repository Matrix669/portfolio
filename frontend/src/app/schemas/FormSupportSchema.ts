import { z } from 'zod'

export const formSchema = z
	.object({
		email: z.email({
			error: iss =>
				iss.code === 'invalid_type' || iss.input === undefined
					? 'Musisz podać adres e-mail'
					: 'Adres e-mail musi być poprawnym adresem e-mail',
		}),
		amount: z
			.string({
				error: 'Musisz wybrać lub wpisać kwotę',
			})
			.regex(/^\d+(\.\d+)?$/, 'Kwota musi być liczbą dodatnią')
			.refine(val => Number(val) >= 5, {
				message: 'Minimalna kwota wsparcia to 5 zł',
			}),
		customAmount: z
			.number({
				error: 'Musisz wpisać kwotę',
			})
			.min(1, 'Kwota musi być większa niż 0')
			.optional(),
		group: z
			.string({
				error: 'Musisz wybrać grupę',
			})
			.min(1, 'Musisz wybrać grupę'),
		paymentMethod: z
			.string({
				error: 'Musisz wybrać metodę płatności',
			})
			.min(1, 'Musisz wybrać metodę płatności'),
		monthlySupport: z.boolean(),
		acceptDataFormSupport: z.literal(true, {
			error: () => ({ message: 'Musisz zaakceptować warunki' }),
		}),
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
