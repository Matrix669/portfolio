import { z } from 'zod'

export const shopFormSchema = z
	.object({
		//customer data
		firstName: z
			.string({
				error: 'Musisz wpisać imię',
			})
			.min(3, 'Imię musi zawierać co najmniej 3 litery'),
		lastName: z
			.string({
				error: 'Musisz wpisać nazwisko',
			})
			.min(3, 'Nazwisko musi zawierać co najmniej 3 liter'),
		email: z
			.string({
				error: 'Musisz wpisać adres e-mail',
			})
			.email('Adres e-mail musi być poprawnym adresem e-mail'),
		phoneNumber: z
			.string({
				error: 'Musisz wpisać numer telefonu',
			})
			.min(9, 'Numer telefonu musi zawierać co najmniej 9 znaków'),
		street: z
			.string({
				error: 'Musisz wpisać ulicę',
			})
			.min(3, 'Ulica musi zawierać co najmniej 3 znaki'),
		houseNumber: z
			.string({
				error: 'Musisz podać numer domu',
			})
			.min(1, 'Number domu musi zawierać co najmniej 1 znak')
			.refine(val => Number(val) >= 0, {
				message: 'Numer domu musi być nieujemny',
			}),
		apartmentNumber: z.string({
			error: 'Musisz podać numer lokalu',
		}),
		town: z
			.string({
				error: 'Musisz wpisać miasto',
			})
			.min(2, 'Miasto musi zawierać co najmniej 2 znaki'),
		zipCode: z
			.string({
				error: 'Musisz wpisać kod pocztowy',
			})
			.regex(/^\d{2}-\d{3}$/, 'Kod pocztowy musi być w formacie XX-XXX'),
		isCompany: z.boolean().optional(),
		NIP: z.string().optional(),
		companyName: z.string().optional(),

		//another address
		deliveryToAnotherAddress: z.boolean(),

		anotherStreet: z.string().optional(),
		anotherHouseNumber: z.string().optional(),
		anotherApartmentNumber: z.string().optional(),
		anotherZipCode: z.string().optional(),
		anotherTown: z.string().optional(),

		//additional comments

		additionalComments: z.string().optional(),

		//payment methods
		paymentMethod: z.string().min(1, 'Musisz wybrać metodę płatności'),

		//delivery
		delivery: z.string().min(1, 'Musisz wybrać metodę dostawy'),
		acceptData: z.boolean({
			error: 'Musisz zaakceptować warunki',
		}),
	})
	.superRefine((data, ctx) => {
		// Walidacja dla akceptacji warunków - PIERWSZA, żeby nie blokowała reszty
		if (!data.acceptData) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Musisz zaakceptować warunki',
				path: ['acceptData'],
			})
		}

		// Walidacja dla firmy
		if (data.isCompany) {
			if (!data.NIP || data.NIP.length < 10) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'NIP musi zawierać co najmniej 10 cyfr',
					path: ['NIP'],
				})
			}
			if (!data.companyName || data.companyName.length < 3) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Nazwa firmy musi zawierać co najmniej 3 znaki',
					path: ['companyName'],
				})
			}
		}

		// Walidacja dla innego adresu dostawy
		if (data.deliveryToAnotherAddress) {
			if (!data.anotherStreet || data.anotherStreet.length < 3) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Ulica musi zawierać co najmniej 3 znaki',
					path: ['anotherStreet'],
				})
			}
			if (!data.anotherHouseNumber || data.anotherHouseNumber.length < 1) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Number domu musi zawierać co najmniej 1 znak',
					path: ['anotherHouseNumber'],
				})
			}
			if (data.anotherHouseNumber && Number(data.anotherHouseNumber) < 0) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Numer domu musi być nieujemny',
					path: ['anotherHouseNumber'],
				})
			}
			if (!data.anotherZipCode || !/^\d{2}-\d{3}$/.test(data.anotherZipCode)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Kod pocztowy musi być w formacie XX-XXX',
					path: ['anotherZipCode'],
				})
			}
			if (!data.anotherTown || data.anotherTown.length < 2) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Miasto musi zawierać co najmniej 2 znaki',
					path: ['anotherTown'],
				})
			}
		}
	})

export type FormData = z.infer<typeof shopFormSchema>
