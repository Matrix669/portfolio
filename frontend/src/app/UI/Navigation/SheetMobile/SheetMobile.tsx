'use client'

import { useState } from 'react'

import { Link } from '@/i18n/navigation'
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

import type { NavLinksProps } from '@/utils/types'

import styles from '@/app/UI/Navigation/Navigation.module.scss'
import NavLanguages from '../NavLanguages/NavLanguages'
import { useTranslations } from 'next-intl'


export function SheetMobile({ linkiNawigacja }: NavLinksProps) {
	const [open, setOpen] = useState(false)
	const navTranslations = useTranslations('navigation')

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
					<ul className={styles.navMobile}>
						{linkiNawigacja.map(link => {// Zwykły link (bez dropdownu)
							return (
								<li key={link.id}>
									<SheetClose
										render={() => (
											<Link href={link.href} title={navTranslations(link.labelKey)} onClick={() => setOpen(false)}>
												{navTranslations(link.labelKey)}
											</Link>
										)}
									></SheetClose>
								</li>
							)
						})}
					</ul>
					<NavLanguages className={styles.navLanguages__mobile} />
			</SheetContent>
		</Sheet>
	)
}
