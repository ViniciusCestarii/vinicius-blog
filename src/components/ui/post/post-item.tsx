import { Post } from '@/lib/blog/utils'
import Link from 'next/link'
import PostTime from './post-time'

interface PostItemProps {
  post: Post
}

export default async function PostItem({ post }: PostItemProps) {
  return (
    <li key={post.metadata.title}>
      <Link href={`/blog/${post.metadata.slug}`}>
        <article className="flex flex-col gap-3 bg-card hover:bg-muted-foreground/10 dark:hover:bg-muted-foreground/20 p-3">
          <header className="flex flex-col">
            <h2 className="text-3xl font-semibold">{post.metadata.title}</h2>
            <PostTime date={post.metadata.publishedAt} />
          </header>
          <p>{post.metadata.description}</p>
          <span>
            {post.metadata.tags.map((tag) => (
              <span key={tag} className="mr-2">
                {tag}
              </span>
            ))}
          </span>
        </article>
      </Link>
    </li>
  )
}
