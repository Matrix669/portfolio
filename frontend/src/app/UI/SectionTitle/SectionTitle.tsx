import React from 'react'
import styles from './SectionTitle.module.scss'

type SectionTitleProps = {
	bgImg?: string
	title: string
	children?: React.ReactNode
	className?: string
}

export default function SectionTitle({ title, bgImg, children, className }: SectionTitleProps) {
	return (
		<header className={`${styles.titleSection} ${className}`}>
			{children}
			<h2>{title}</h2>
			{bgImg && <img src={bgImg} alt='' />}
		</header>
	)
}
