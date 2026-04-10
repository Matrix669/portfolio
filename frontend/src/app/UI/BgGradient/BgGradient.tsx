import styles from '@/app/UI/BgGradient/BgGradient.module.scss'

export default function BgGradient({ className }: { className?: string }) {
	return <div className={`${styles.bgGradient} ${className ? className : ''}`}></div>
}
