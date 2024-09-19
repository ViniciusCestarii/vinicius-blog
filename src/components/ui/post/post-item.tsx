import { Post } from '@/lib/blog/utils'
import Link from 'next/link'
import PostTime from './post-time'
import { Badge } from '../badge'

interface PostItemProps {
  post: Post
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <li key={post.metadata.title}>
      <Link href={`/blog/${post.metadata.slug}`}>
        <article className="flex flex-col gap-3 bg-card hover:bg-muted-foreground/10 dark:hover:bg-muted-foreground/20 p-3">
          <header className="flex flex-col">
            <h2 className="text-3xl font-semibold">{post.metadata.title}</h2>
            <PostTime date={post.metadata.publishedAt} />
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
