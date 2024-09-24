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

// "fix" for https://github.com/rehype-pretty/rehype-pretty-code/issues/208

function transformerCopyButton() {
  return {
    name: '@rehype-pretty/transformers/copy-button',
    code(node: any) {
      node.children.push({
        type: 'element',
        tagName: 'button',
        properties: {
          type: 'button',
          title: 'Copy code',
          'aria-label': 'Copy code',
          data: (this as any).source,
          class: 'rehype-pretty-copy',
        },
        children: [
          {
            type: 'element',
            tagName: 'svg',
            properties: {
              xmlns: 'http://www.w3.org/2000/svg',
              width: 24,
              height: 24,
              viewBox: '0 0 24 24',
              fill: 'none',
              stroke: 'currentColor',
              strokeWidth: 2,
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              class: 'lucide lucide-copy ready',
            },
            children: [
              {
                type: 'element',
                tagName: 'rect',
                properties: {
                  width: 14,
                  height: 14,
                  x: 8,
                  y: 8,
                  rx: 2,
                  ry: 2,
                },
                children: [],
              },
              {
                type: 'element',
                tagName: 'path',
                properties: {
                  d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2',
                },
                children: [],
              },
            ],
          },
          {
            type: 'element',
            tagName: 'svg',
            properties: {
              xmlns: 'http://www.w3.org/2000/svg',
              width: 24,
              height: 24,
              viewBox: '0 0 24 24',
              fill: 'none',
              stroke: 'currentColor',
              strokeWidth: 2,
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              class: 'lucide lucide-check success',
            },
            children: [
              {
                type: 'element',
                tagName: 'path',
                properties: {
                  d: 'M20 6 9 17l-5-5',
                },
                children: [],
              },
            ],
          },
        ],
      })
    },
  }
}

// see https://rehype-pretty.pages.dev/
// see themes https://shiki.style/themes#themes

export const rehypePrettyCodeOptions: Partial<Options> = {
  theme: {
    dark: 'github-dark-dimmed',
    light: 'github-light',
  },
  transformers: [transformerCopyButton()],
  onVisitHighlightedLine(node) {
    node.properties.className = node.properties.className || []
    node.properties.className.push('line-highlighted')
  },
}
