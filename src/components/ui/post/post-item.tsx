import { Post } from '@/lib/blog/utils'
import Link from 'next/link'
import PostTime from './post-time'
import { Badge } from '../badge'
import PostViewsLike from './post-views-like'

interface PostItemProps {
  post: Post
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <li key={post.metadata.title}>
      <Link href={`/blog/${post.metadata.slug}`}>
        <article className="flex flex-col gap-3 bg-card hover:bg-muted-foreground/10 dark:hover:bg-muted-foreground/20 p-4 rounded-md">
          <header className="flex flex-col">
            <h2 className="text-3xl font-semibold">{post.metadata.title}</h2>
            <div className="flex justify-between flex-wrap flex-col sm:flex-row sm:items-center gap-1">
              <PostViewsLike slug={post.metadata.slug} />
              <PostTime date={post.metadata.publishedAt} />
            </div>
          </header>
          <p>{post.metadata.description}</p>
          <span className="flex flex-wrap gap-2">
            {post.metadata.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </span>
        </article>
      </Link>
    </li>
  )
}
