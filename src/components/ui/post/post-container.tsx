import { cn } from '@/lib/style/utils'

const BASE_PROSE = 'prose dark:prose-invert text-foreground prose-sky'
const HEADING_PROSE =
  'prose-headings:font-geist-mono prose-headings:tracking-tighter'

interface PostContarinerProps extends React.HTMLAttributes<HTMLDivElement> {}

const PostContariner = ({
  className,
  children,
  ...props
}: PostContarinerProps) => {
  return (
    <article {...props} className={cn(BASE_PROSE, HEADING_PROSE, className)}>
      {children}
    </article>
  )
}

export default PostContariner
