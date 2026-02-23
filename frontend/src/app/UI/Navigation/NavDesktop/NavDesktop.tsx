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

import type { NavLinksProps } from '@/utils/types'
import Link from 'next/link'

export function NavigationMenuDesktop({ linkiNawigacja }: NavLinksProps) {
	return (
		<NavigationMenu className='hidden sm:flex ml-auto'>
			<NavigationMenuList className='gap-3'>
				{linkiNawigacja.map(link => {
					if (link.czySpecjalnaGrupa) return null

					if (link.czyLinkiDropdown && link.linkiNawigacjaDropdown) {
						return (
							<NavigationMenuItem key={link.id}>
								<NavigationMenuTrigger className='py-2 px-4 font-normal'>{link.nazwa}</NavigationMenuTrigger>
								<NavigationMenuContent className='relative z-200'>
									<ul>
										{link.linkiNawigacjaDropdown.map(dropdownLink => (
											<li key={dropdownLink.id}>
												<NavigationMenuLink
													className={cn(navigationMenuTriggerStyle(), 'py-5 px-4')}
													render={<Link href={dropdownLink.href} />}
												>
													{dropdownLink.nazwa}
												</NavigationMenuLink>
											</li>
										))}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
						)
					}

					return (
						<NavigationMenuItem key={link.id}>
							<NavigationMenuLink
								className={cn(navigationMenuTriggerStyle(), 'py-5 px-4 ')}
								render={<Link href={link.href} />}
							>
								{link.nazwa}
							</NavigationMenuLink>
						</NavigationMenuItem>
					)
				})}
			</NavigationMenuList>
		</NavigationMenu>
	)
}