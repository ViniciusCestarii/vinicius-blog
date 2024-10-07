import { cn } from '@/lib/style/utils'
import React from 'react'

interface ExternalLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const ExternalLink = ({ children, className, ...props }: ExternalLinkProps) => {
  return (
    <a
      className={cn('underline', className)}
      rel="noopener noreferrer"
      target="_blank"
      {...props}
    >
      {children}
    </a>
  )
}

export default ExternalLink
