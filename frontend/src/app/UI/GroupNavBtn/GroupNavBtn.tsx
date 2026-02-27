import Link from 'next/link'
import styles from '@/app/UI/Navigation/NavGroupBtn/NavGroupBtn.module.scss'
type GroupNavBtnProps = {
	href: string
	text: string
	icon: React.ComponentType
	styleGradient: string
}

export default function GroupNavBtn({ href, text, icon: Icon, styleGradient }: GroupNavBtnProps) {
	return (
		<Link className={styles.navGroupBtnLink} href={href} style={{ background: styleGradient }} title={text}>
			<Icon />
			{text}
		</Link>
	)
}
