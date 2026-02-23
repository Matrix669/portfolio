'use client'

// import { Toaster } from 'sonner'
import { CartProvider } from '@/app/context/CartContext'

export default function ShopLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			{/* <Toaster richColors position='bottom-right' expand /> */}
			<CartProvider>{children}</CartProvider>
		</>
	)
}
