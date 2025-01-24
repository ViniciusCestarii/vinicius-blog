'use client'

import { ArrowUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { cn } from '@/lib/style/utils'
import { ContentHeading } from '@/lib/blog/utils'

interface PostTableOfContentsProps {
  headings: ContentHeading[]
}

const PostTableOfContents = ({ headings }: PostTableOfContentsProps) => {
  const [activeSlug, setActiveSlug] = useState<string | null>(null)

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSlug(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: '0px 0px -95% 0px',
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
    <aside className="not-prose hidden xl:block xl:col-start-4 h-0 pt-4 sticky top-0 text-muted-foreground">
      <h3 className="text-sm text-muted-foreground/70 uppercase pl-2 border-l border-transparent">
        On this page
      </h3>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <PostLink
            onClick={() => setActiveSlug(heading.slug)}
            key={heading.slug}
            heading={heading.heading}
            text={heading.text}
            slug={heading.slug}
          />
        ))}
        <div
          className="absolute -left-1 w-1 rounded-md h-5 top-1 bg-primary transition-all duration-300"
          style={{
            transition: 'opacity 0.3s, transform 0.3s',
            opacity: activeSlug ? 1 : 0,
            transform: `translateY(${activeSlug ? calculateIndicatorPosition(activeSlug) + 'px' : '1.75rem'})`,
          }}
        />
      </ul>
      <div className="border-t border-muted-foreground/50 flex mt-4">
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="text-sm text-muted-foreground/70 hover:text-foreground hover:underline py-2 flex items-center gap-1 pt-4"
        >
          Back to top <ArrowUp className="size-3" />
        </button>
      </div>
    </aside>
  )
}

interface PostLinkProps {
  heading: number
  text: string
  slug: string
  onClick?: () => void
}

const INDICATOR_OFFSET = -12

const calculateIndicatorPosition = (slug: string) => {
  const activeElement = document.querySelector(`li[data-header-slug="${slug}"]`)

  if (!activeElement) return 0

  const elementRect = activeElement.getBoundingClientRect()
  const offsetTop = elementRect.top

  return offsetTop + INDICATOR_OFFSET
}

const PostLink = ({ heading, text, slug, ...props }: PostLinkProps) => {
  return (
    <li
      data-header-slug={slug}
      className="pl-2 transition-colors relative text-sm"
      title={text}
    >
      <a
        {...props}
        className={cn('hover:underline hover:text-foreground', {
          'pl-4': heading === 3,
          'pl-8': heading === 4,
          'pl-12': heading === 5,
        })}
        href={`#${slug}`}
      >
        {text}
      </a>
    </li>
  )
}

PostLink.displayName = 'PostLink'

export default PostTableOfContents
