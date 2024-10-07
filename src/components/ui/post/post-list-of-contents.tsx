import { getHeadings } from '@/lib/blog/utils'
import { cn } from '@/lib/style/utils'
import { ArrowUp } from 'lucide-react'
import React from 'react'

interface PostListOfContentsProps {
  content: string
}

const PostListOfContents = ({ content }: PostListOfContentsProps) => {
  const headings = getHeadings(content)

  return (
    <aside className="not-prose hidden xl:block xl:col-start-4 h-0 pt-8 sticky top-0 text-muted-foreground">
      <h3 className="text-sm text-muted-foreground/70 uppercase">
        On this page
      </h3>
      <ul>
        {headings.map((heading) => (
          <li key={heading.text} data-spacing={heading.heading}>
            <a
              className={cn('hover:underline hover:text-foreground', {
                'pl-4': heading.heading === 3,
                'pl-8': heading.heading === 4,
              })}
              href={`#${heading.slug}`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
      <div className="border-t border-muted-foreground/50 flex mt-4">
        <a
          href="#"
          className="text-sm text-muted-foreground/70 hover:text-foreground hover:underline py-2 flex items-center gap-1 pt-4"
        >
          Back to top <ArrowUp className="size-3" />
        </a>
      </div>
    </aside>
  )
}

export default PostListOfContents
