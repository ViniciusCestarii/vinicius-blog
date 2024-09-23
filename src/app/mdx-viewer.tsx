import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote-client/rsc'
import { mdxComponents, mdxOptions } from './mdx-components'

export const MdxViewer = (props: Pick<MDXRemoteProps, 'source'>) => (
  <MDXRemote {...props} components={mdxComponents} options={mdxOptions} />
)
