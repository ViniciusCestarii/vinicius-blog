'use client'

import { serialize } from 'next-mdx-remote-client/serialize'
import React, { useEffect, useState } from 'react'

import { mdxComponents, mdxOptions } from './mdx-components'
import { MDXClient } from 'next-mdx-remote-client'
import { Button } from '@/components/ui/button'

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

  return (
    <ClientMdxViewerErrorBoundary>
      <MDXClient {...mdxSource} components={mdxComponents} />
    </ClientMdxViewerErrorBoundary>
  )
}

export default ClientMdxViewer

/* eslint-disable @typescript-eslint/no-explicit-any */
class ClientMdxViewerErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props)

    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_error: any) {
    return { hasError: true }
  }

  componentDidCatch(_error: any, errorInfo: any) {
    console.log({ errorInfo })
  }

  render() {
    if ((this.state as any).hasError) {
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <p>
            Couldn&apos;t render the post. You probably entered invalid mdx.
            Check if the component is valid and is on the mdxComponent array.
          </p>
          <Button onClick={() => this.setState({ hasError: false })}>
            Try again?
          </Button>
        </div>
      )
    }

    return (this.props as any).children
  }
}
