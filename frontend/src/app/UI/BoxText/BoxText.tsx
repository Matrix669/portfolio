import RightArrow from '@/app/icons/RightArrow'
import BoxTitle from '../BoxTitle/BoxTitle'
import MainLink from '../MainLink/MainLink'
import styles from './BoxText.module.scss'

interface BoxTextProps {
	title?: string
	superTitle?: string
	isPage?: boolean
	text: string
	linkHref?: string
	linkText?: string
}

export default function BoxText({ title, superTitle, isPage = false, text, linkHref, linkText }: BoxTextProps) {
	return (
		<>
			<BoxTitle title={title} superTitle={superTitle} isPage={isPage} />
			<p className={`${styles.text} ${styles['boxText--text']}`} dangerouslySetInnerHTML={{ __html: text }} />
			{linkHref && linkText && (
				<MainLink href={linkHref}>
					{linkText}
					<RightArrow />
				</MainLink>
			)}
		</>
	)
}
