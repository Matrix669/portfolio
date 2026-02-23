import BoxImagePuzzle from '../BoxImagePuzzle/BoxImagePuzzle'
import BoxText from '../BoxText/BoxText'
import styles from './BoxImageText.module.scss'

interface BoxImageTextProps {
	imgSrc: string
	imgAlt: string
	icon?: React.ReactNode
	
	title?: string
	superTitle?: string
	isPage?: boolean
	text: string
	linkHref?: string
	linkText?: string
	isIcon?: boolean
	
	extraClassNameBoxImageText?: string
	extraClassNameBoxPuzzle?: string
	extraClassNameTextBox?: string
}
export default function BoxImageText({
	icon,
	imgAlt,
	imgSrc,
	linkHref,
	linkText,
	superTitle,
	text,
	title,
	isPage = false,
	isIcon,
	extraClassNameBoxPuzzle,
	extraClassNameTextBox,
	extraClassNameBoxImageText,
}: BoxImageTextProps) {
	return (
		<div className={`${styles.boxImageText} ${extraClassNameBoxImageText ? extraClassNameBoxImageText : ''}`}>
			<BoxImagePuzzle icon={icon} imgAlt={imgAlt} imgSrc={imgSrc} className={extraClassNameBoxPuzzle ? extraClassNameBoxPuzzle : ''} isIcon={isIcon}/>
			<div className={`${styles.boxImageText__text} ${extraClassNameTextBox ? extraClassNameTextBox : ''}`}>
				<BoxText
					linkHref={linkHref}
					linkText={linkText}
					superTitle={superTitle}
					text={text}
					title={title}
					isPage={isPage}
				/>
			</div>
		</div>
	)
}
