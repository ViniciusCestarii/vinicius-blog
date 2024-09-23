import { MDXComponents } from 'next-mdx-remote-client'
import IbgeChart from '@/components/ui/ibge-chart'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { MDXRemoteProps } from 'next-mdx-remote-client/rsc'

export const mdxComponents: MDXComponents = {
  IbgeChart,
  h1: (props) => <h2 {...props} />,
  h2: (props) => <h3 {...props} />,
  h3: (props) => <h4 {...props} />,
}

export const HEADING_LINK_ANCHOR =
  "before:content-['#'] before:absolute before:-ml-[1em] before:text-primary/0 hover:before:text-primary/50 pl-[1em] -ml-[1em] no-underline"

export const mdxOptions: MDXRemoteProps['options'] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [rehypeSlug],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: [HEADING_LINK_ANCHOR],
          },
        },
      ],
    ],
  },
}
