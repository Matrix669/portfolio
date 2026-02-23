import { z } from 'zod'

export const shopFormSchema = z
	.object({
		//customer data
		firstName: z
			.string({
				required_error: 'Musisz wpisać imię',
				invalid_type_error: 'Imię musi być poprawnym imieniem',
			})
			.min(3, 'Imię musi zawierać co najmniej 3 litery'),
		lastName: z
			.string({
				required_error: 'Musisz wpisać nazwisko',
				invalid_type_error: 'Nazwisko musi być poprawnym nazwiskiem',
			})
			.min(3, 'Nazwisko musi zawierać co najmniej 3 liter'),
		email: z
			.string({
				required_error: 'Musisz wpisać adres e-mail',
				invalid_type_error: 'Adres e-mail musi być poprawnym adresem e-mail',
			})
			.email('Adres e-mail musi być poprawnym adresem e-mail'),
		phoneNumber: z
			.string({
				required_error: 'Musisz wpisać numer telefonu',
				invalid_type_error: 'Numer telefonu musi być poprawnym numerem telefonu',
			})
			.min(9, 'Numer telefonu musi zawierać co najmniej 9 znaków'),
		street: z
			.string({
				required_error: 'Musisz wpisać ulicę',
				invalid_type_error: 'Ulica musi być poprawnym ulicą',
			})
			.min(3, 'Ulica musi zawierać co najmniej 3 znaki'),
		houseNumber: z
			.string({
				required_error: 'Musisz podać numer domu',
				invalid_type_error: 'Number domu musi być poprawnym numerem',
			})
			.min(1, 'Number domu musi zawierać co najmniej 1 znak')
			.refine(val => Number(val) >= 0, {
				message: 'Numer domu musi być nieujemny',
			}),
		apartmentNumber: z.string({
			required_error: 'Musisz podać numer lokalu',
			invalid_type_error: 'Number lokalu musi być poprawnym numerem',
		}),
		town: z
			.string({
				required_error: 'Musisz wpisać miasto',
				invalid_type_error: 'Miasto musi być poprawnym miastem',
			})
			.min(2, 'Miasto musi zawierać co najmniej 2 znaki'),
		zipCode: z
			.string({
				required_error: 'Musisz wpisać kod pocztowy',
				invalid_type_error: 'Kod pocztowy musi być poprawnym kodem pocztowym',
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
			required_error: 'Musisz zaakceptować warunki',
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
