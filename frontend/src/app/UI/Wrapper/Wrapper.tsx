import styles from './Wrapper.module.scss'

export default function Wrapper({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
	return <div style={style} className={styles.wrapper}>{children}</div>
}
