'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { CartContextProps, CartItem, CartOperationResult, ProductLinkProps } from '../types/shop'
import { verifyProductStockAction } from '@/app/(subpages)/(shop)/actions/verify-product-stock'

const CartContext = createContext<CartContextProps | undefined>(undefined)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
	const [cart, setCart] = useState<CartItem[]>([])
	const [, setShouldAnimateCart] = useState(false)

	useEffect(() => {
		const savedCart = localStorage.getItem('cart')
		if (savedCart) {
			setCart(JSON.parse(savedCart))
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart))
	}, [cart])

	const addToCart = async (product: ProductLinkProps): Promise<CartOperationResult> => {
		const existingQuantity = cart.find(item => item.id === product.id)?.quantityInCart ?? 0
		const requestedQuantity = existingQuantity + 1

		const serverResult = await verifyProductStockAction({
			productId: product.id,
			requestedQuantity,
		})

		if (!serverResult.success) {
			return serverResult
		}

		setCart(prevCart => {
			const existingProduct = prevCart.find(item => item.id === product.id)
			if (existingProduct) {
				return prevCart.map(item =>
					item.id === product.id ? { ...item, quantityInCart: item.quantityInCart + 1 } : item
				)
			}
			return [...prevCart, { ...product, quantityInCart: 1 }]
		})

		// Wywołaj animację po dodaniu produktu
		triggerCartAnimation()

		return serverResult
	}

	const triggerCartAnimation = () => {
		setShouldAnimateCart(true)
		// Resetuj stan animacji po krótkim czasie
		setTimeout(() => {
			setShouldAnimateCart(false)
		}, 1000)
	}

	const removeFromCart = (id: string) => {
		setCart(prevCart => {
			const exisitingItem = prevCart.find(item => item.id === id)
			if (!exisitingItem) return prevCart
			if (exisitingItem.quantityInCart === 1) {
				return prevCart.filter(item => item.id !== id)
			}
			return prevCart.map(item => (item.id === id ? { ...item, quantityInCart: item.quantityInCart - 1 } : item))
		})
	}

	const updateCartItemQuantity = (id: string, quantity: number) => {
		setCart(prevCart => prevCart.map(item => (item.id === id ? { ...item, quantityInCart: quantity } : item)))
	}

	const clearCart = () => {
		setCart([])
	}

	return (
		<CartContext.Provider
			value={{ cart, addToCart, removeFromCart, updateCartItemQuantity, clearCart, triggerCartAnimation }}
		>
			{children}
		</CartContext.Provider>
	)
}

export const useCart = () => {
	const context = useContext(CartContext)
	if (context === undefined) {
		throw new Error('useCart must be used within a CartProvider')
	}
	return context
}
