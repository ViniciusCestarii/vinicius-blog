'use client'

import Link from 'next/link'
import { Badge } from '../badge'
import { Post } from '@/lib/blog/types'
import PostStatus from './post-status'
import AdminOnly from '@/components/auth/admin-only'
import PostItemHeader from './post-item-header'
import { useAuth } from '@/context/auth-context'

interface PostItemProps {
  post: Post
}

export default function PostItem({ post }: PostItemProps) {
  const { isAdmin } = useAuth()
  return (
    <li key={post.metadata.title}>
      <Link
        href={
          isAdmin
            ? `/admin/blog/${post.metadata.slug}`
            : `/blog/${post.metadata.slug}`
        }
        className="flex focus-visible:outline-none focus-visible:ring-2 rounded-sm focus-visible:ring-offset-2 focus-visible:ring-ring ring-offset-background"
      >
        <article className="flex flex-1 flex-col gap-3 bg-card hover:bg-muted-foreground/10 dark:hover:bg-muted-foreground/20 p-4 rounded-md border border-border shadow-sm">
          <header className="flex flex-col">
            <PostItemHeader post={post} />
          </header>
          <p>{post.metadata.description}</p>
          <span className="flex flex-wrap gap-2">
            {post.metadata.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </span>
          <AdminOnly>
            <PostStatus status={post.metadata.status} />
          </AdminOnly>
        </article>
      </Link>
    </li>
  )
}
