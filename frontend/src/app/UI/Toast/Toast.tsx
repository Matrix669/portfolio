export default function Toast({
	children,
	className,
	onClick,
	disabled,
	type
}: {
	children: React.ReactNode
	className?: string
	onClick?: () => void
	disabled?: boolean
	type?: 'button' | 'submit' | 'reset'
}) {
	return (
		<button className={className} onClick={onClick} disabled={disabled} type={type ?? 'button'}>
			{children}
		</button>
	)
}
