import { cn } from '@/lib/style/utils'
import React from 'react'

interface AsideProps extends React.HTMLAttributes<HTMLElement> {}

const Aside = ({ children, className, ...props }: AsideProps) => {
  return (
    <aside
      {...props}
      className={cn('border-l-2 !col-start-2 pl-4 h-fit not-prose', className)}
    >
      {children}
    </aside>
  )
}

export default Aside
