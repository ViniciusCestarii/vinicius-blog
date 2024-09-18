import IbgeChart from '@/components/ui/ibge-chart'
import type { MDXComponents } from 'mdx/types'

export const mdxComponents: MDXComponents = {
  IbgeChart,
  h1: (props) => <h2 {...props} />,
  h2: (props) => <h3 {...props} />,
  h3: (props) => <h4 {...props} />,
}
