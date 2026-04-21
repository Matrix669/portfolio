import { StaticImageData } from 'next/image'

import IMG1 from '@/app/assets/MyWork/image.png'

type MyProjectsProps = {
	id: number
	title: string
	description: string
	mainImage: {
		imageSrc: StaticImageData
		imageAlt: string
	}
	images: {
		imageSrc: StaticImageData
		imageAlt: string
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
		description: `Fusce porttitor mi dolor, sit amet posuere ipsum commodo at. Integer congue tellus quam, ut sagittis lorem luctus eget. Ut feugiat, mauris ac viverra viverra, nunc tellus tempus mauris, vitae ornare enim nulla sit amet arcu. 

Nulla id purus et massa lacinia rhoncus in porta dolor. Maecenas eu ante aliquam, malesuada magna vitae, auctor turpis. Fusce diam tellus, aliquam at leo id, tincidunt bibendum lorem. Duis metus justo, euismod eget dignissim sed, finibus at dolor.`,
		mainImage: {
			imageSrc: IMG1,
			imageAlt: 'Image 1',
		},

		// --- dialog ---
		images: [
			{
				imageSrc: 'image1.jpg',
				imageAlt: 'Image 1',
			},
			{
				imageSrc: 'image2.jpg',
				imageAlt: 'Image 2',
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
	},
	{
		id: 2,
		title: 'Project 2',
		description: `Fusce porttitor mi dolor, sit amet posuere ipsum commodo at. Integer congue tellus quam, ut sagittis lorem luctus eget. Ut feugiat, mauris ac viverra viverra, nunc tellus tempus mauris, vitae ornare enim nulla sit amet arcu.`,
		mainImage: {
			imageSrc: IMG1,
			imageAlt: 'Image 1',
		},

		// --- dialog ---
		images: [
			{
				imageSrc: 'image1.jpg',
				imageAlt: 'Image 1',
			},
			{
				imageSrc: 'image2.jpg',
				imageAlt: 'Image 2',
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
	},
	{
		id: 3,
		title: 'Project 3',
		description: `at, mauris ac viverra viverra, nunc tellus tempus mauris, vitae ornare enim nulla sit amet arcu. 

Nulla id purus et massa lacinia rhoncus in porta dolor. Maecenas eu ante aliquam, malesuada magna vitae, auctor turpis. Fusce diam tellus, aliquam at leo id, tincidunt bibendum lorem. Duis metus justo, euismod eget dignissim sed, finibus at dolor.`,
		mainImage: {
			imageSrc: IMG1,
			imageAlt: 'Image 1',
		},

		// --- dialog ---
		images: [
			{
				imageSrc: 'image1.jpg',
				imageAlt: 'Image 1',
			},
			{
				imageSrc: 'image2.jpg',
				imageAlt: 'Image 2',
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
	},
]
