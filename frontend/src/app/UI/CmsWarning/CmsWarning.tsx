export default function CmsWarning({ showCmsWarning, children }: { showCmsWarning: boolean; children: React.ReactNode }) {
	return showCmsWarning ? (
		<div
			role='alert'
			aria-live='polite'
			style={{
				backgroundColor: '#fff3cd',
				border: '1px solid #ffeeba',
				color: '#856404',
				padding: '12px 16px',
				borderRadius: 6,
				marginBottom: 16,
			}}
		>
			{children}
		</div>
	) : null
}
