import { cn } from '@/lib/style/utils'
import React from 'react'

interface AsideProps extends React.HTMLAttributes<HTMLElement> {}

const Aside = ({ children, className, ...props }: AsideProps) => {
  return (
    <aside
      {...props}
      className={cn(
        'border-l-2 border-muted-foreground text-muted-foreground !col-start-2 pl-3 text-sm h-fit not-prose',
        className,
      )}
    >
      {children}
    </aside>
  )
}

export default Aside
