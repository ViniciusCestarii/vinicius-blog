'use client'

import React, { useState } from 'react'
import { Button, ButtonProps } from './button'
import { Copy, Check } from 'lucide-react'

interface CopyButtonProps extends ButtonProps {
  content: string
}

const CopyButton = ({ content, ...props }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <Button
      onClick={copyCode}
      size="icon"
      variant="outline"
      title="copy code"
      aria-label="Copy code"
      {...props}
    >
      {copied ? (
        <Check className="size-icon" />
      ) : (
        <Copy className="size-icon" />
      )}
    </Button>
  )
}

export default CopyButton
