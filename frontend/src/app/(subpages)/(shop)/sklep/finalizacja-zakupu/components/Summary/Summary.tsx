import Link from 'next/link'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { FormData } from '@/app/schemas/ShopFormFinalizationSchema'
import AlertDialogShopCheckout from '@/app/UI/AlertDialogShopCheckout/AlertDialogShopCheckout'

import formStyles from '@/app/(subpages)/wesprzyj-nas/components/FormSupportUs/FormSupportUs.module.scss'
import styles from '@/app/(subpages)/(shop)/sklep/finalizacja-zakupu/FinalizingThePucharse.module.scss'
import { useCart } from '@/app/context/CartContext'

interface SummaryInteface {
	register: UseFormRegister<FormData>
	errors: FieldErrors<FormData>
	clientSecret: string | null
	sessionId: string | null
	isDialogOpen: boolean
	setIsDialogOpen: (open: boolean) => void
	isLoading: boolean
	selectedPaymentMethod: string
	isValid: boolean
}
export default function Summary({
	register,
	errors,
	clientSecret,
	sessionId,
	isDialogOpen,
	setIsDialogOpen,
	isLoading,
	selectedPaymentMethod,
	isValid,
}: SummaryInteface) {
	const { cart: CART_ITEMS } = useCart()

	const totalCartPrice: number = CART_ITEMS.reduce((total, product) => total + product.cena * product.quantityInCart, 0)
	const totalWithDelivery: number = totalCartPrice + 12

	return (
		<section
			className={`${formStyles['formSupportUs__container']} ${formStyles['formSupportUs__summary']} ${styles['finalizingThePucharse__summary']}`}
		>
			<h2 className={formStyles['formSupportUs-title']}>Podsumowanie</h2>
			{CART_ITEMS.length > 0 ? (
				CART_ITEMS.map(item => (
					<div
						className={`${formStyles['formSupportUs__summary-box']} ${styles['finalizingThePucharse__summary-box']}`}
						key={item.id}
					>
						<h3>
							{item.nazwaProduktu} <span className={formStyles['formSupportUs__summary-box-span']}>x{item.quantityInCart}</span>
						</h3>
						<hr />
						<p>{item.cena * item.quantityInCart} zł</p>
					</div>
				))
			) : (
				<p>Brak produktów do kupienia</p>
			)}

			<div className={`${formStyles['formSupportUs__summary-box']} ${styles['finalizingThePucharse__summary-box']}`}>
				<h3>Dostawa</h3>
				<hr />
				<p>12 zł</p>
			</div>

			<div className={`${formStyles['formSupportUs__summary-box']} ${styles.finalizingThePucharse__totalPriceBox}`}>
				<h3>
					Razem: <span>{totalWithDelivery} zł</span>
				</h3>
			</div>
			<div className={styles.finalizingThePucharse__boxCustomerData}>
				<div
					className={`${formStyles['formSupportUs__monthlySupportBox']} ${styles['finalizingThePucharse__boxCustomerData-checkbox']}`}
				>
					<input type='checkbox' id='acceptData' {...register('acceptData')} />
					<label htmlFor='acceptData'>
						Akceptuję <Link href='/informacje/regulamin'>Regulamin</Link> i{' '}
						<Link href='/informacje/polityka-prywatnosci'> Politykę Prywatności</Link>
					</label>
				</div>
				{errors.acceptData && <p className={formStyles['errorMsg']}>{errors.acceptData.message}</p>}
			</div>
			<AlertDialogShopCheckout
				open={isDialogOpen}
				onOpenChange={setIsDialogOpen}
				clientSecret={clientSecret}
				sessionId={sessionId}
				buttonProps={{
					className: formStyles.formButtonSupport,
					disabled: !isValid || isLoading,
					type: 'submit',
					ariaLabel: `Złóż zamówienie (${totalWithDelivery} zł)`,
					text: `Złóż zamówienie (${totalWithDelivery} zł)`,
				}}
				paymentMethod={selectedPaymentMethod}
				isLoading={isLoading}
			/>
		</section>
	)
}
