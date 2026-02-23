// import type { BlocksContent } from '@strapi/blocks-react-renderer'

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// function nodeHasMeaningfulContent(node: any): boolean {
// 	// Text node: check for any non-whitespace characters
// 	if (node?.type === 'text') {
// 		return typeof node.text === 'string' && node.text.trim().length > 0
// 	}

// 	// Images or media-like nodes should be considered meaningful outright
// 	if (node?.type === 'image' || node?.type === 'video' || node?.type === 'file') {
// 		return true
// 	}

// 	// Links can be meaningful even if their child text is empty (conservative: check children too)
// 	if (node?.type === 'link') {
// 		if (typeof node?.url === 'string' && node.url.trim().length > 0) return true
// 	}

// 	// Recurse into children if present
// 	if (Array.isArray(node?.children)) {
// 		// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 		return node.children.some((child: any) => nodeHasMeaningfulContent(child))
// 	}

// 	return false
// }

// export function hasMeaningfulBlocks(blocks?: BlocksContent | null): boolean {
// 	if (!blocks || (Array.isArray(blocks) && blocks.length === 0)) {
// 		return false
// 	}

// 	// Strapi Blocks are arrays of nodes at the root
// 	if (Array.isArray(blocks)) {
// 		return blocks.some(block => nodeHasMeaningfulContent(block))
// 	}

// 	// Fallback for unexpected shapes
// 	return false
// }
