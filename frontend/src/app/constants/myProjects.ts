import { StaticImageData } from 'next/image'

import IMG1 from '@/app/assets/MyWork/image1.png'
import IMG2 from '@/app/assets/MyWork/image2.png'

export type MyProjectsProps = {
	id: number
	title: string
	mainDescription: string
	description: string
	mainImage: {
		imageSrc: string
		imageAlt: string
	}
	images: {
		imageSrc: string
		imageAlt: string
		width?: number
		height?: number
	}[]
	link: {
		label: string
		href: string
	}[]
	technologies: string[]
}

export const MY_PROJECTS: MyProjectsProps[] = [
	{
		id: 1,
		title: 'Project 1',
		mainDescription: `Fusce porttitor mi dolor, sit amet posuere ipsum commodo at. Integer congue tellus quam, ut sagittis lorem luctus eget. Ut feugiat, mauris ac viverra viverra, nunc tellus tempus mauris, vitae ornare enim nulla sit amet arcu. 

Nulla id purus et massa lacinia rhoncus in porta dolor. Maecenas eu ante aliquam, malesuada magna vitae, auctor turpis. Fusce diam tellus, aliquam at leo id, tincidunt bibendum lorem. Duis metus justo, euismod eget dignissim sed, finibus at dolor.`,
		mainImage: {
			imageSrc: IMG1.src,
			imageAlt: 'Image 1',
		},

		// --- dialog ---
		images: [
			{
				imageSrc: IMG1.src,
				imageAlt: 'Image 2',
				width: IMG1.width,
				height: IMG1.height,
			},
			{
				imageSrc: IMG2.src,
				imageAlt: 'Image 3',
				width: IMG2.width,
				height: IMG2.height,
			},
			{
				imageSrc: IMG2.src,
				imageAlt: 'Image 4',
				width: IMG2.width,
				height: IMG2.height,
			},
			{
				imageSrc: IMG2.src,
				imageAlt: 'Image 5',
				width: IMG2.width,
				height: IMG2.height,
			},
		],
		link: [
			{
				label: 'Link 1',
				href: 'https://www.google.com',
			},
			{
				label: 'Link 2',
				href: 'https://www.google.com',
			},
		],
		technologies: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
		description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, qui numquam vero modi nulla earum ab nam exercitationem totam quia repellendus id eveniet mollitia dolores consequatur autem quidem quo? Non fugiat aut, ex molestias ut eveniet eos enim sed laboriosam quos quia quod accusamus provident repellendus soluta eum beatae quidem.`,
	},
	{
		id: 2,
		title: 'Project 2',
		mainDescription: `Fusce porttitor mi dolor, sit amet posuere ipsum commodo at. Integer congue tellus quam, ut sagittis lorem luctus eget. Ut feugiat, mauris ac viverra viverra, nunc tellus tempus mauris, vitae ornare enim nulla sit amet arcu.`,
		mainImage: {
			imageSrc: IMG2.src,
			imageAlt: 'Image 1',
		},

		// --- dialog ---
		images: [
			{
				imageSrc: IMG1.src,
				imageAlt: 'Image 4',
				width: IMG1.width,
				height: IMG1.height,
			},
			{
				imageSrc: IMG2.src,
				imageAlt: 'Image 5',
				width: IMG2.width,
				height: IMG2.height,
			},
		],
		link: [
			{
				label: 'Link 1',
				href: 'https://www.google.com',
			},
			{
				label: 'Link 2',
				href: 'https://www.google.com',
			},
		],
		technologies: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
		description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, qui numquam vero modi nulla earum ab nam exercitationem totam quia repellendus id eveniet mollitia dolores consequatur autem quidem quo? Non fugiat aut, ex molestias ut eveniet eos enim sed laboriosam quos quia quod accusamus provident repellendus soluta eum beatae quidem.`,
	},
	{
		id: 3,
		title: 'Project 3',
		mainDescription: `at, mauris ac viverra viverra, nunc tellus tempus mauris, vitae ornare enim nulla sit amet arcu. 

Nulla id purus et massa lacinia rhoncus in porta dolor. Maecenas eu ante aliquam, malesuada magna vitae, auctor turpis. Fusce diam tellus, aliquam at leo id, tincidunt bibendum lorem. Duis metus justo, euismod eget dignissim sed, finibus at dolor.`,
		mainImage: {
			imageSrc: IMG1.src,
			imageAlt: 'Image 1',
		},

		// --- dialog ---
		images: [
			{
				imageSrc: IMG1.src,
				imageAlt: 'Image 6',
				width: IMG1.width,
				height: IMG1.height,
			},
			{
				imageSrc: IMG2.src,
				imageAlt: 'Image 7',
				width: IMG2.width,
				height: IMG2.height,
			},
		],
		link: [
			{
				label: 'Link 1',
				href: 'https://www.google.com',
			},
			{
				label: 'Link 2',
				href: 'https://www.google.com',
			},
		],
		technologies: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
		description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, qui numquam vero modi nulla earum ab nam exercitationem totam quia repellendus id eveniet mollitia dolores consequatur autem quidem quo? Non fugiat aut, ex molestias ut eveniet eos enim sed laboriosam quos quia quod accusamus provident repellendus soluta eum beatae quidem.`,
	},
]
