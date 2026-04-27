import IMG1 from '@/app/assets/MyWork/image1.png'
import IMG2 from '@/app/assets/MyWork/image2.png'

type MyProjectsBaseProps = {
	id: number
	images: {
		imageSrc: string
		width?: number
		height?: number
	}[]
	linkHref: string
	technologies: string[]
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
	technologies: string[]
}

const MY_PROJECTS: MyProjectsBaseProps[] = [
	{
		id: 1,
		// --- dialog ---
		images: [
			{
				imageSrc: IMG1.src,
				width: IMG1.width,
				height: IMG1.height,
			},
			{
				imageSrc: IMG2.src,
				width: IMG2.width,
				height: IMG2.height,
			},
			{
				imageSrc: IMG2.src,
				width: IMG2.width,
				height: IMG2.height,
			},
			{
				imageSrc: IMG2.src,
				width: IMG2.width,
				height: IMG2.height,
			},
		],
		linkHref: 'https://www.google.com',
		technologies: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
	},
]

export function getMyPproject(t: any): LocalizedProject[] {
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
