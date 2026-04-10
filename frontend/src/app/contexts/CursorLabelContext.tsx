'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

type CursorLabelContextValue = {
	label: string | null
	setLabel: (label: string | null) => void
}

const CursorLabelContext = createContext<CursorLabelContextValue | null>(null)

export default function CursorLabelProvider({ children }: { children: React.ReactNode }) {
	const [label, setLabelState] = useState<string | null>(null)
	const setLabel = useCallback((value: string | null) => {
		setLabelState(value)
	}, [])

	const value = useMemo(() => ({ label, setLabel }), [label, setLabel])
    
	return <CursorLabelContext.Provider value={value}>{children}</CursorLabelContext.Provider>
}

export function useCursorLabel() {
	const context = useContext(CursorLabelContext)
	if (!context) {
		throw new Error('useCursorLabel must be used within a CursorLabelProvider')
	}
	return context
}
