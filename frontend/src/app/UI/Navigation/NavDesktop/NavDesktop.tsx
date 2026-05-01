// import Link from 'next/link'
import { Link } from '@/i18n/navigation'

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
								render={
									link.href.startsWith('#') || link.href.startsWith('/#') ? (
										<Link href={{ pathname: '/', hash: link.href.replace(/^\/?#/, '') }} />
									) : (
										<Link href={link.href === '/projekty' ? '/projekty' : '/'} />
									)
								}
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
