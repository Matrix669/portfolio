import PuzzleIcon from '@/icons/boxTitle/PuzzleIcon'

import styles from './BoxTitle.module.scss'

type BoxTitleProps = {
	isPage?: boolean
	title?: string
	className?: string
	superTitle?: string
}

export default function BoxTitle({ title, isPage = false, className, superTitle }: BoxTitleProps) {
	return (
		<header className={`${styles.titleSection} ${className ? className : ''}`}>
			<PuzzleIcon />
			<p>{superTitle}</p>
			{isPage ? <h1>{title}</h1> : <h2>{title}</h2>}
		</header>
	)
}
