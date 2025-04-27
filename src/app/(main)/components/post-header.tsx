import { Button } from '@/components/ui/button'
import { Post } from '@/lib/blog/types'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import EditPostDialog from './edit-post-dialog'
import { ContentHeading } from '@/lib/blog/utils'
import AdminOnly from '@/components/auth/admin-only'
import DeletePostDialog from '@/app/(home)/delete-post-dialog'
import PostItemHeader from '@/components/ui/post/post-item-header'

interface PostHeaderProps {
  editable?: boolean
  post: Post
  headings: ContentHeading[]
}

const PostHeader = ({ post, headings, editable }: PostHeaderProps) => {
  return (
    <header>
      <div className="py-4">
        <Button asChild variant="ghost" className="group not-prose p-2 h-fit">
          <Link
            href={editable ? '/admin' : '/'}
            aria-label="Visit Vinicius Cestarii Github"
            title="See all posts"
            className="flex gap-1"
          >
            <ArrowLeft className="size-4" />
            All posts
          </Link>
        </Button>
      </div>
      {editable && (
        <AdminOnly>
          <div className="flex justify-end gap-2 pb-2">
            <EditPostDialog post={post} headings={headings} />
            <DeletePostDialog
              slug={post.metadata.slug}
              title={post.metadata.title}
            />
          </div>
        </AdminOnly>
      )}
      <PostItemHeader likeable incrementViews post={post} />
    </header>
  )
}

export default PostHeader
