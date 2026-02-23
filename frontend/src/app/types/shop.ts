import { ImageProps } from '@/utils/types'

export interface ProductLinkProps {
	id: string
	nazwaProduktu: string
	cena: number
	produktSlug: string
	wyroznioneZdjecie: ImageProps
	czyNowy?: boolean
	czyPromocja?: boolean
	iloscProduktu: number
	przecena?: string
}
export interface CartItem extends ProductLinkProps {
	quantityInCart: number
}

export type CartOperationResult =
	| { success: true; availableQuantity: number }
	| {
			success: false
			reason: 'OUT_OF_STOCK' | 'NOT_FOUND' | 'NETWORK_ERROR'
			availableQuantity?: number
	  }

export interface CartContextProps {
	cart: CartItem[]
	addToCart: (product: ProductLinkProps) => Promise<CartOperationResult>
	removeFromCart: (id: string) => void
	updateCartItemQuantity: (id: string, quantity: number) => void
	clearCart: () => void
	triggerCartAnimation: () => void
}
export interface ShopProductsProps {
	id: number
	nazwaProduktu: string
	produktSlug: string
	cena: number
	czyNowy: boolean
	czyPromocja: boolean
	iloscProduktu: number
	przecena: string
	kategoria:
		| 'Biżuteria'
		| 'Dekoracje'
		| 'Ceramika'
		| 'Rękodzieło'
		| 'Odzież'
		| 'Plakaty'
		| 'Torby'
		| 'Teatr Tańca Szofar'
	wyroznioneZdjecie: ImageProps
}

// Funkcja konwertująca ShopProductsProps na ProductLinkProps
export function convertShopProductToProductLink(shopProduct: ShopProductsProps): ProductLinkProps {
	return {
		id: shopProduct.id.toString(),
		nazwaProduktu: shopProduct.nazwaProduktu,
		cena: shopProduct.cena,
		produktSlug: shopProduct.produktSlug,
		wyroznioneZdjecie: shopProduct.wyroznioneZdjecie,
		czyNowy: shopProduct.czyNowy,
		czyPromocja: shopProduct.czyPromocja,
		iloscProduktu: shopProduct.iloscProduktu,
		przecena: shopProduct.przecena,
	}
}
