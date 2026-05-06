import { Toaster } from 'sonner'

export default function Toast({
	children,
	className,
	onClick,
	disabled,
}: {
	children: React.ReactNode
	className?: string
	onClick?: () => void
	disabled?: boolean
}) {
	return (
		<button className={className} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	)
}
