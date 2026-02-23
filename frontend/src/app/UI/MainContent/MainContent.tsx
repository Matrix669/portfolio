
type MainContentProps = {
    children: React.ReactNode
    style?: React.CSSProperties
    CSSClassName?: string
}

export default function MainContent({children, style, CSSClassName}: MainContentProps) {
    return <main style={style} className={CSSClassName}>{children}</main>
}