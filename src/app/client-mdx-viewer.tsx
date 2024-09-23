'use client'

import { serialize } from 'next-mdx-remote-client/serialize'
import { useEffect, useState } from 'react'

import { mdxComponents, mdxOptions } from './mdx-components'
import { MDXClient } from 'next-mdx-remote-client'

interface ClientMdxViewerProps {
  source: string
}

const ClientMdxViewer = ({ source }: ClientMdxViewerProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [mdxSource, setMdxSource] = useState<any>(null)

  useEffect(() => {
    const compile = async () => {
      const result = await serialize({
        source,
        options: mdxOptions,
      })

      setMdxSource(result)
    }

    compile()
  }, [source])

  if (!mdxSource) {
    return null
  }

  return <MDXClient {...mdxSource} components={mdxComponents} />
}

export default ClientMdxViewer
