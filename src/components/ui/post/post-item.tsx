import Link from 'next/link'
import PostTime from './post-time'
import { Badge } from '../badge'
import PostViewsLikes from './post-views-like'
import PostTitle from './post-title'
import { PostDTOs } from '@/lib/blog/types'
import PostStatus from './post-status'
import AdminOnly from '@/components/auth/admin-only'

interface PostItemProps {
  post: PostDTOs
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <li key={post.metadata.title}>
      <Link href={`/blog/${post.metadata.slug}`}>
        <article className="flex flex-col gap-3 bg-card hover:bg-muted-foreground/10 dark:hover:bg-muted-foreground/20 p-4 rounded-md">
          <header className="flex flex-col">
            <PostTitle>{post.metadata.title}</PostTitle>
            <div className="flex justify-between flex-wrap flex-col sm:flex-row sm:items-center gap-1">
              <PostViewsLikes post={post} />
              <PostTime date={post.metadata.publishedAt} />
            </div>
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
