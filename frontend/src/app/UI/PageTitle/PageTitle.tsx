import styles from './PageTitle.module.scss'

type PageTitleProps = {
    title: string
    CSSClassname?: string
}

export default function PageTitle({title, CSSClassname}: PageTitleProps) {
	return (
		<header className={`${styles.pageTitle} ${CSSClassname}`}>
			<h1>{title}</h1>
		</header>
	)
}
