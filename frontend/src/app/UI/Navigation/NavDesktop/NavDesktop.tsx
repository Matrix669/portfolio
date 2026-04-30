import Link from 'next/link'
// import Link from 'next/link'

import { cn } from '@/lib/utils'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/componentsShadcn/ui/navigation-menu'
import { useTranslations } from 'next-intl'

import type { NavLinksProps } from '@/utils/types'
import styles from '../Navigation.module.scss'

export function NavigationMenuDesktop({ linkiNawigacja }: NavLinksProps) {
	const navTranslations = useTranslations('navigation')
	return (
		<NavigationMenu className='hidden sm:flex ml-auto'>
			<NavigationMenuList className={`gap-3 ${styles.navDesktop}`}>
				{linkiNawigacja.map(link => {
					return (
						<NavigationMenuItem key={link.id}>
							<NavigationMenuLink
								className={cn(navigationMenuTriggerStyle(), 'py-5 px-4 ')}
								render={<Link href={link.href} />}
							>
								{navTranslations(link.labelKey)}
							</NavigationMenuLink>
						</NavigationMenuItem>
					)
				})}
			</NavigationMenuList>
		</NavigationMenu>
	)
}
