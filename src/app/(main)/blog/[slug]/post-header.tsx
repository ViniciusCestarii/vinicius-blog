import { Button } from '@/components/ui/button'
import PostTime from '@/components/ui/post/post-time'
import PostViewsLikes from '@/components/ui/post/post-views-like'
import { Post } from '@/lib/blog/types'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import EditPostDialog from './edit-post-dialog'
import { ContentHeading } from '@/lib/blog/utils'
import AdminOnly from '@/components/auth/admin-only'
import DeletePostDialog from '@/app/(home)/delete-post-dialog'

interface PostHeaderProps {
  post: Post
  headings: ContentHeading[]
}

const PostHeader = ({ post, headings }: PostHeaderProps) => {
  return (
    <header>
      <div className="py-4">
        <Button asChild variant="ghost" className="group not-prose p-2 h-fit">
          <Link
            href="/"
            aria-label="Visit Vinicius Cestarii Github"
            title="See all posts"
            className="flex gap-1"
          >
            <ArrowLeft className="size-4" />
            All posts
          </Link>
        </Button>
      </div>
      <AdminOnly>
        <div className="flex justify-end gap-2 pb-2">
          <EditPostDialog post={post} headings={headings} />
          <DeletePostDialog
            slug={post.metadata.slug}
            title={post.metadata.title}
          />
        </div>
      </AdminOnly>{' '}
      <h1>{post.metadata.title}</h1>
      <div className="flex justify-between flex-wrap items-center gap-8">
        <PostViewsLikes
          post={post}
          likeable={post.metadata.status === 'published'}
          incrementViews={post.metadata.status === 'published'}
        />
        <PostTime date={post.metadata.publishedAt} />
      </div>
    </header>
  )
}

export default PostHeader
