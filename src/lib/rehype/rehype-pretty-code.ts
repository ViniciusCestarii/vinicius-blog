/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Options } from 'rehype-pretty-code'

import { visit } from 'unist-util-visit'

export function rehypePrettyCodeClasses() {
  return (tree: any) => {
    visit(
      tree,
      (node: any) => {
        return Boolean(
          typeof node?.properties?.['data-rehype-pretty-code-figure'] !==
            'undefined',
        )
      },
      (node: any) => {
        node.properties.className = [
          ...(node.properties.className || []),
          'not-prose',
        ]
        return node
      },
    )
  }
}

// see https://rehype-pretty.pages.dev/

export const rehypePrettyCodeOptions: Partial<Options> = {
  theme: {
    dark: 'github-dark-dimmed',
    light: 'github-light',
  },
  onVisitHighlightedLine(node) {
    node.properties.className = node.properties.className || []
    node.properties.className.push('line-highlighted')
  },
}
