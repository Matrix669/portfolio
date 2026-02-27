import { useMediaQuery } from 'react-responsive'
import { UseFormRegister, FieldErrors, UseFormWatch, UseFormTrigger, UseFormClearErrors } from 'react-hook-form'
import { FormData } from '@/app/schemas/ShopFormFinalizationSchema'

import CustomerDataMobile from './CustomerDataMobile'
import CustomerDataDesktop from './CustomerDataDesktop'

import styles from '@/app/(subpages)/(shop)/sklep/finalizacja-zakupu/FinalizingThePucharse.module.scss'
import formStyles from '@/app/UI/Forms/FormSupportUs/FormSupportUs.module.scss'

interface CustomerDataProps {
	register: UseFormRegister<FormData>
	errors: FieldErrors<FormData>
	isCompany: boolean | undefined
	watch: UseFormWatch<FormData>
	trigger: UseFormTrigger<FormData>
	clearErrors: UseFormClearErrors<FormData>
}

export default function CustomerData({ register, errors, isCompany, trigger, clearErrors, watch }: CustomerDataProps) {
	const isMobile = useMediaQuery({ maxWidth: 1199 })
	return (
		<section
			className={`${formStyles['formSupportUs__container']} ${styles.finalizingThePucharse__containerCustomerData}`}
		>
			<h2 className={formStyles['formSupportUs-title']}>Dane klienta: </h2>
			{isMobile ? (
				<CustomerDataMobile
					register={register}
					errors={errors}
					isCompany={isCompany}
					trigger={trigger}
					clearErrors={clearErrors}
					watch={watch}
				/>
			) : (
				<CustomerDataDesktop register={register} errors={errors} isCompany={isCompany} watch={watch} />
			)}

			<p className={styles['finalizingThePucharse__requireStatement']}>* Pola obowiązkowe</p>
		</section>
	)
}
