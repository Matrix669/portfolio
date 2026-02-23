'use client'

import { useState } from 'react'

import Link from 'next/link'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/componentsShadcn/ui/sheet'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/componentsShadcn/ui/accordion'

import BurgerBtn from '../../BurgerBtn/BurgerBtn'
// import DropdownIcon from '@/icons/DropdownIcon'

// import ShopCheckoutIcon from '@/app/icons/ShopCheckoutIcon'
// import HeartIcon from '@/app/icons/HeartIcon'

import type { NavLinksProps } from '@/utils/types'

import styles from '@/app/UI/Navigation/Navigation.module.scss'

// import stylesNGB from '@/app/UI/NavGroupBtn/NavGroupBtn.module.scss'
// import stylesNGBL from '@/app/UI/NavGroupBtn/NavGroupBtn.module.scss'

export function SheetMobile({ linkiNawigacja }: NavLinksProps) {
	const [open, setOpen] = useState(false)

	// const blueGradinet = `linear-gradient(0deg, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0.20) 100%), linear-gradient(96deg, #21A7E1 0.03%, #0074A7 73.93%)`
	// const greenGradient = 'linear-gradient(96deg, #41A75B 0.03%, #27703A 73.93%)'
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger render={props => <BurgerBtn {...props} />}></SheetTrigger>
			<SheetContent className='p-6 z-999'>
				<SheetHeader>
					<VisuallyHidden>
						<SheetTitle>Nav mobile</SheetTitle>
					</VisuallyHidden>
					<VisuallyHidden>
						<SheetDescription>Nav mobile links</SheetDescription>
					</VisuallyHidden>
				</SheetHeader>
				<Accordion className='w-full'>
					<ul className={styles.navMobile}>
						{linkiNawigacja.map(link => {
							// Pomijamy specjalne grupy (Wesprzyj nas, Sklep itp.)
							if (link.czySpecjalnaGrupa) return null

							const hasDropdown = link.czyLinkiDropdown && link.linkiNawigacjaDropdown

							if (hasDropdown) {
								return (
									<AccordionItem key={link.id} value={`item-${link.id}`} className='border-b-0'>
										<AccordionTrigger className={styles.navDropdownLink}>
											<span>{link.nazwa}</span>
										</AccordionTrigger>

										<AccordionContent className='pb-1 pl-4'>
											<ul className='space-y-2'>
												{link.linkiNawigacjaDropdown?.map(linkDropdown => (
													<li key={linkDropdown.id}>
														<SheetClose
															render={() => (
																<Link
																	className='no-underline'
																	href={linkDropdown.href}
																	title={linkDropdown.nazwa}
																	onClick={() => setOpen(false)}
																>
																	{linkDropdown.nazwa}
																</Link>
															)}
														></SheetClose>
													</li>
												))}
											</ul>
										</AccordionContent>
									</AccordionItem>
								)
							}

							// Zwykły link (bez dropdownu)
							return (
								<li key={link.id}>
									<SheetClose
										render={() => (
											<Link href={link.href} title={link.nazwa} onClick={() => setOpen(false)}>
												{link.nazwa}
											</Link>
										)}
									></SheetClose>
								</li>
							)
						})}
					</ul>
				</Accordion>
			</SheetContent>
		</Sheet>
	)
}
