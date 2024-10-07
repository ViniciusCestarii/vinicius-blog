'use client'

import { getHeadings } from '@/lib/blog/utils'
import { ArrowUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { cn } from '@/lib/style/utils'

interface PostListOfContentsProps {
  content: string
}

const PostListOfContents = ({ content }: PostListOfContentsProps) => {
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const headings = getHeadings(content)

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSlug(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: '0px 0px -80% 0px', // Detects heading entering the viewport
    })

    headings.forEach((heading) => {
      const element = document.getElementById(heading.slug)
      if (element) observer.observe(element)
    })

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.slug)
        if (element) observer.unobserve(element)
      })
    }
  }, [headings])

  return (
    <aside className="not-prose hidden xl:block xl:col-start-4 h-0 pt-8 sticky top-0 text-muted-foreground">
      <h3 className="text-sm text-muted-foreground/70 uppercase pl-2 border-l border-muted-foreground/50">
        On this page
      </h3>
      <ul>
        {headings.map((heading) => (
          <PostLink
            key={heading.text}
            heading={heading.heading}
            text={heading.text}
            slug={heading.slug}
            isInView={activeSlug === heading.slug}
          />
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

interface PostLinkProps {
  heading: number
  text: string
  slug: string
  isInView: boolean
}

const PostLink = ({ heading, text, slug, isInView }: PostLinkProps) => {
  return (
    <li
      data-spacing={heading}
      className={cn(
        'border-l border-muted-foreground/50 pl-2 transition-colors',
        {
          'border-primary border-l-2': isInView,
        },
      )}
    >
      <a
        className={cn('hover:underline hover:text-foreground', {
          'pl-4': heading === 3,
          'pl-8': heading === 4,
          '-ml-[1px]': isInView,
        })}
        href={`#${slug}`}
      >
        {text}
      </a>
    </li>
  )
}

export default PostListOfContents
