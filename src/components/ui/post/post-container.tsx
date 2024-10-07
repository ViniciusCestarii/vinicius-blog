import { cn } from '@/lib/style/utils'

const CONTAINER_STYLE = 'pb-16'
const BASE_PROSE = 'prose dark:prose-invert text-foreground prose-sky'
const HEADING_PROSE =
  'prose-headings:font-geist-mono prose-headings:tracking-tighter'

interface PostContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const PostContainer = ({
  className,
  children,
  ...props
}: PostContainerProps) => {
  return (
    <article
      {...props}
      className={cn(
        CONTAINER_STYLE,
        BASE_PROSE,
        HEADING_PROSE,
        'max-w-full page-layout',
        className,
      )}
    >
      {children}
    </article>
  )
}

export default PostContainer
