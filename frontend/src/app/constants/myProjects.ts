import IMG1 from '@/app/assets/MyWork/image1.png'
import IMG2 from '@/app/assets/MyWork/image2.png'

import DRACHMA_IMG1 from '@/app/assets/MyWork/drachma-website-shop/img1.png'
import DRACHMA_IMG2 from '@/app/assets/MyWork/drachma-website-shop/img2.png'
import DRACHMA_IMG3 from '@/app/assets/MyWork/drachma-website-shop/img3.png'
import DRACHMA_IMG4 from '@/app/assets/MyWork/drachma-website-shop/img4.png'
import DRACHMA_IMG5 from '@/app/assets/MyWork/drachma-website-shop/img5.png'
import DRACHMA_IMG6 from '@/app/assets/MyWork/drachma-website-shop/img6.png'
import DRACHMA_IMG7 from '@/app/assets/MyWork/drachma-website-shop/img7.png'
import DRACHMA_IMG8 from '@/app/assets/MyWork/drachma-website-shop/img8.png'
import DRACHMA_IMG9 from '@/app/assets/MyWork/drachma-website-shop/img9.png'
import DRACHMA_IMG10 from '@/app/assets/MyWork/drachma-website-shop/img10.png'

import EFFATHA_DIGITAL_LIBRARY_IMG1 from '@/app/assets/MyWork/effatha-digital-library/img1.png'
import EFFATHA_DIGITAL_LIBRARY_IMG2 from '@/app/assets/MyWork/effatha-digital-library/img2.png'
import EFFATHA_DIGITAL_LIBRARY_IMG3 from '@/app/assets/MyWork/effatha-digital-library/img3.png'
import EFFATHA_DIGITAL_LIBRARY_IMG4 from '@/app/assets/MyWork/effatha-digital-library/img4.png'
import EFFATHA_DIGITAL_LIBRARY_IMG5 from '@/app/assets/MyWork/effatha-digital-library/img5.png'
import EFFATHA_DIGITAL_LIBRARY_IMG6 from '@/app/assets/MyWork/effatha-digital-library/img6.png'

import EFFATHA_WEBSITE_IMG1 from '@/app/assets/MyWork/effatha-website/img1.png'
import EFFATHA_WEBSITE_IMG2 from '@/app/assets/MyWork/effatha-website/img2.png'
import EFFATHA_WEBSITE_IMG3 from '@/app/assets/MyWork/effatha-website/img3.png'
import EFFATHA_WEBSITE_IMG4 from '@/app/assets/MyWork/effatha-website/img4.png'
import EFFATHA_WEBSITE_IMG5 from '@/app/assets/MyWork/effatha-website/img5.png'

import EFFATHA_WEBSITE_OLD_IMG1 from '@/app/assets/MyWork/effatha-website-old/img1.png'
import EFFATHA_WEBSITE_OLD_IMG2 from '@/app/assets/MyWork/effatha-website-old/img2.png'
import EFFATHA_WEBSITE_OLD_IMG3 from '@/app/assets/MyWork/effatha-website-old/img3.png'
import EFFATHA_WEBSITE_OLD_IMG4 from '@/app/assets/MyWork/effatha-website-old/img4.png'

import QUADRATIC_FUNCTION_CALCULATOR_IMG1 from '@/app/assets/MyWork/quadratic-function-calculator/img1.png'
import QUADRATIC_FUNCTION_CALCULATOR_IMG2 from '@/app/assets/MyWork/quadratic-function-calculator/img2.png'
type MyProjectsBaseProps = {
	id: number
	images: {
		imageSrc: string
		width?: number
		height?: number
	}[]
	linkHref: string
	technologies: technologiesIT[]
}
export type LocalizedProject = {
	id: number
	title: string
	mainDescription: string
	description: string
	images: {
		imageSrc: string
		imageAlt: string
		width?: number
		height?: number
	}[]
	link: {
		label: string
		href: string
	}
	technologies: technologiesIT[]
}
type technologiesIT =
	/* FRONTEND, REACT things */
	| 'Next.js'
	| 'React'
	| 'TanStack Query'
	| 'react-router'
	| 'react-hook-form'
	| 'zod'
	| 'react hooks'
	| 'react context'
	| 'routing'
	| 'JavaScript'
	/* STYLES */
	| 'SCSS'
	| 'Tailwind CSS'
	| 'CSS Modules'
	| 'shadcn/ui'
	| 'motion'
	/* BACKEND, CMS things */
	| 'TypeScript'
	| 'Strapi'
	| 'supabase'
	| 'headless cms'
	| 'qs'
	/* JS libraries, packages */
	| 'nodemailer'
	| 'swiper'
	| 'chartjs'
	| 'fullcalendar'
	| 'gulp'
	| 'gulp-kit'
	| 'git'
	| 'react-photoswipe-gallery'
	| 'redis'
	/* OTHER */
	| 'HTML'
	| 'Stripe'
	| 'webhooks'

const MY_PROJECTS: MyProjectsBaseProps[] = [
	{
		id: 5,
		images: [
			{
				imageSrc: DRACHMA_IMG1.src,
				width: DRACHMA_IMG1.width,
				height: DRACHMA_IMG1.height,
			},
			{
				imageSrc: DRACHMA_IMG2.src,
				width: DRACHMA_IMG2.width,
				height: DRACHMA_IMG2.height,
			},
			{
				imageSrc: DRACHMA_IMG3.src,
				width: DRACHMA_IMG3.width,
				height: DRACHMA_IMG3.height,
			},
			{
				imageSrc: DRACHMA_IMG4.src,
				width: DRACHMA_IMG4.width,
				height: DRACHMA_IMG4.height,
			},
			{
				imageSrc: DRACHMA_IMG5.src,
				width: DRACHMA_IMG5.width,
				height: DRACHMA_IMG5.height,
			},
			// shop ============
			// {
			// 	imageSrc: DRACHMA_IMG6.src,
			// 	width: DRACHMA_IMG6.width,
			// 	height: DRACHMA_IMG6.height,
			// },
			// {
			// 	imageSrc: DRACHMA_IMG7.src,
			// 	width: DRACHMA_IMG7.width,
			// 	height: DRACHMA_IMG7.height,
			// },
			// {
			// 	imageSrc: DRACHMA_IMG8.src,
			// 	width: DRACHMA_IMG8.width,
			// 	height: DRACHMA_IMG8.height,
			// },
			// {
			// 	imageSrc: DRACHMA_IMG9.src,
			// 	width: DRACHMA_IMG9.width,
			// 	height: DRACHMA_IMG9.height,
			// },
			// {
			// 	imageSrc: DRACHMA_IMG10.src,
			// 	width: DRACHMA_IMG10.width,
			// 	height: DRACHMA_IMG10.height,
			// },
		],
		linkHref: 'https://www.drachma.org.pl/',
		technologies: [
			'Next.js',
			'react context',
			'react hooks',
			'SCSS',
			'Tailwind CSS',
			'CSS Modules',
			'shadcn/ui',
			'motion',
			'TypeScript',
			'Strapi',
			'headless cms',
			'react-hook-form',
			'zod',
			'swiper',
			'qs',
			'nodemailer',
			'react-photoswipe-gallery',
			'git',
			'Stripe',
			'webhooks',
			'redis'
		],
	},
	{
		id: 4,
		// --- dialog ---
		images: [
			{
				imageSrc: EFFATHA_DIGITAL_LIBRARY_IMG1.src,
				width: EFFATHA_DIGITAL_LIBRARY_IMG1.width,
				height: EFFATHA_DIGITAL_LIBRARY_IMG1.height,
			},
			{
				imageSrc: EFFATHA_DIGITAL_LIBRARY_IMG2.src,
				width: EFFATHA_DIGITAL_LIBRARY_IMG2.width,
				height: EFFATHA_DIGITAL_LIBRARY_IMG2.height,
			},
			{
				imageSrc: EFFATHA_DIGITAL_LIBRARY_IMG3.src,
				width: EFFATHA_DIGITAL_LIBRARY_IMG3.width,
				height: EFFATHA_DIGITAL_LIBRARY_IMG3.height,
			},
			{
				imageSrc: EFFATHA_DIGITAL_LIBRARY_IMG4.src,
				width: EFFATHA_DIGITAL_LIBRARY_IMG4.width,
				height: EFFATHA_DIGITAL_LIBRARY_IMG4.height,
			},
			{
				imageSrc: EFFATHA_DIGITAL_LIBRARY_IMG5.src,
				width: EFFATHA_DIGITAL_LIBRARY_IMG5.width,
				height: EFFATHA_DIGITAL_LIBRARY_IMG5.height,
			},
			{
				imageSrc: EFFATHA_DIGITAL_LIBRARY_IMG6.src,
				width: EFFATHA_DIGITAL_LIBRARY_IMG6.width,
				height: EFFATHA_DIGITAL_LIBRARY_IMG6.height,
			},
		],
		linkHref: 'https://biblioteka.effathagliwice.pl/',
		technologies: [
			'React',
			'SCSS',
			'TypeScript',
			'TanStack Query',
			'react-router',
			'supabase',
			'git',
			'react hooks',
			'react context',
			'CSS Modules',
		],
	},
	{
		id: 3,
		// --- dialog ---
		images: [
			{
				imageSrc: EFFATHA_WEBSITE_IMG1.src,
				width: EFFATHA_WEBSITE_IMG1.width,
				height: EFFATHA_WEBSITE_IMG1.height,
			},
			{
				imageSrc: EFFATHA_WEBSITE_IMG2.src,
				width: EFFATHA_WEBSITE_IMG2.width,
				height: EFFATHA_WEBSITE_IMG2.height,
			},
			{
				imageSrc: EFFATHA_WEBSITE_IMG3.src,
				width: EFFATHA_WEBSITE_IMG3.width,
				height: EFFATHA_WEBSITE_IMG3.height,
			},
			{
				imageSrc: EFFATHA_WEBSITE_IMG4.src,
				width: EFFATHA_WEBSITE_IMG4.width,
				height: EFFATHA_WEBSITE_IMG4.height,
			},
			{
				imageSrc: EFFATHA_WEBSITE_IMG5.src,
				width: EFFATHA_WEBSITE_IMG5.width,
				height: EFFATHA_WEBSITE_IMG5.height,
			},
		],
		linkHref: 'https://www.effathagliwice.pl/',
		technologies: [
			'Next.js',
			'Tailwind CSS',
			'SCSS',
			'TypeScript',
			'Strapi',
			'shadcn/ui',
			'headless cms',
			'react-hook-form',
			'zod',
			'nodemailer',
			'swiper',
			'qs',
			'git',
			'fullcalendar',
			'CSS Modules',
		],
	},
	{
		id: 2,
		// --- dialog ---
		images: [
			{
				imageSrc: EFFATHA_WEBSITE_OLD_IMG1.src,
				width: EFFATHA_WEBSITE_OLD_IMG1.width,
				height: EFFATHA_WEBSITE_OLD_IMG1.height,
			},
			{
				imageSrc: EFFATHA_WEBSITE_OLD_IMG2.src,
				width: EFFATHA_WEBSITE_OLD_IMG2.width,
				height: EFFATHA_WEBSITE_OLD_IMG2.height,
			},
			{
				imageSrc: EFFATHA_WEBSITE_OLD_IMG3.src,
				width: EFFATHA_WEBSITE_OLD_IMG3.width,
				height: EFFATHA_WEBSITE_OLD_IMG3.height,
			},
			{
				imageSrc: EFFATHA_WEBSITE_OLD_IMG4.src,
				width: EFFATHA_WEBSITE_OLD_IMG4.width,
				height: EFFATHA_WEBSITE_OLD_IMG4.height,
			},
		],
		linkHref: 'https://matrix669.github.io/Effatha-website/',
		technologies: ['HTML', 'SCSS', 'JavaScript', 'gulp', 'gulp-kit'],
	},
	{
		id: 1,
		// --- dialog ---
		images: [
			{
				imageSrc: QUADRATIC_FUNCTION_CALCULATOR_IMG1.src,
				width: QUADRATIC_FUNCTION_CALCULATOR_IMG1.width,
				height: QUADRATIC_FUNCTION_CALCULATOR_IMG1.height,
			},
			{
				imageSrc: QUADRATIC_FUNCTION_CALCULATOR_IMG2.src,
				width: QUADRATIC_FUNCTION_CALCULATOR_IMG2.width,
				height: QUADRATIC_FUNCTION_CALCULATOR_IMG2.height,
			},
		],
		linkHref: 'https://quadratic-function-calculator.netlify.app/',
		technologies: ['React', 'JavaScript', 'routing', 'react-router', 'chartjs'],
	},
]

export function getMyProjects(t: any): LocalizedProject[] {
	return MY_PROJECTS.map(project => ({
		id: project.id,
		title: t(`projects.${project.id}.title`),
		mainDescription: t(`projects.${project.id}.mainDescription`),
		description: t(`projects.${project.id}.description`),
		link: {
			label: t(`projects.${project.id}.link.label`),
			href: project.linkHref,
		},
		technologies: project.technologies,
		images: project.images.map((img, index) => ({
			imageSrc: img.imageSrc,
			imageAlt: t(`projects.${project.id}.images.${index}.imageAlt`),
			width: img.width,
			height: img.height,
		})),
	}))
}
