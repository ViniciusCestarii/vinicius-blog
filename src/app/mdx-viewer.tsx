import IbgeChart from '@/components/ui/ibge-chart'
import type { MDXComponents } from 'mdx/types'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

const mdxComponents: MDXComponents = {
  IbgeChart,
  h1: (props) => <h2 {...props} />,
  h2: (props) => <h3 {...props} />,
  h3: (props) => <h4 {...props} />,
}

const HEADING_LINK_ANCHOR =
  "before:content-['#'] before:absolute before:-ml-[1em] before:text-primary/0 hover:before:text-primary/50 pl-[1em] -ml-[1em] no-underline"

export const MdxViewer = (props: Pick<MDXRemoteProps, 'source'>) => (
  <MDXRemote
    {...props}
    components={mdxComponents}
    options={{
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
    }}
  />
)
