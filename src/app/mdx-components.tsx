import { MDXComponents } from 'next-mdx-remote-client'
import IbgeChart from '@/components/ui/ibge-chart'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { MDXRemoteProps } from 'next-mdx-remote-client/rsc'
import {
  rehypePrettyCodeClasses,
  rehypePrettyCodeOptions,
} from '@/lib/rehype/rehype-pretty-code'

import Children from 'react-children-utilities'
import CopyButton from '@/components/ui/copy-button'
import ExternalLink from '@/components/ui/external-link'
import { cn } from '@/lib/style/utils'
import Aside from '@/components/ui/aside'

export const mdxComponents: MDXComponents = {
  IbgeChart,
  Aside,
  code: ({ children, className, ...props }) => (
    <code
      {...props}
      className={cn(
        'not-prose bg-muted-foreground/20 px-1 rounded-md',
        className,
      )}
    >
      {children}
    </code>
  ),
  ExternalLink,
  pre: ({ children, className, ...props }) => {
    const code = Children.onlyText(children)

    return (
      <pre {...props} className={cn(className, 'relative group')}>
        <CopyButton
          content={code}
          className="absolute right-0 hidden group-hover:inline-flex"
        />
        {children}
      </pre>
    )
  },
}

export const HEADING_LINK_ANCHOR =
  "before:content-['#'] before:absolute before:-ml-[1em] before:text-primary/0 hover:before:text-primary/50 pl-[1em] -ml-[1em] no-underline"

export const mdxOptions: MDXRemoteProps['options'] = {
  mdxOptions: {
    rehypePlugins: [
      [rehypePrettyCode, rehypePrettyCodeOptions],
      [rehypePrettyCodeClasses],
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
