import styles from './BoxImagePuzzle.module.scss'

interface BoxImagePuzzleProps {
	imgSrc: string
	imgAlt: string
	icon: React.ReactNode
	className?: string
	isIcon?: boolean
}
export default function BoxImagePuzzle({ imgSrc, imgAlt, icon, className, isIcon = false }: BoxImagePuzzleProps) {
	return (
		<div className={`${styles.boxImagePuzzle} ${className ? className : ''}`}>
			{isIcon && icon}
			<img src={imgSrc} alt={imgAlt} />
		</div>
	)
}
