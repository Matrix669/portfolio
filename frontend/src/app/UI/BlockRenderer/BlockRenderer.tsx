import FirstSection from '@/app/components/FirstSection/FirstSection'
import type { Block } from '@/utils/types'

function blockRenderer(block: Block, index: number) {
	switch (block.__component) {
		case 'bloki.sekcja-hero':
			return <FirstSection {...block} key={index} />
		default:
			return null
	}
}

export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
	return blocks.map((block, index) => blockRenderer(block, index))
}
