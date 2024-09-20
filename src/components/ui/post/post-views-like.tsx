import React, { Suspense } from 'react'
import PostViews from './post-views'
import PostLikes from './post-likes'
import PostLikeTemplate from './post-like-template'

interface PostViewsLikeProps {
  slug: string
  viewsProps?: {
    increment?: boolean
  }
  likesProps?: {
    likeable?: boolean
  }
}

const PostViewsLike = ({
  likesProps,
  viewsProps,
  ...props
}: PostViewsLikeProps) => {
  return (
    <dl className="flex gap-4 m-0">
      <PostViews {...props} {...viewsProps} />
      <Suspense fallback={<PostLikeTemplate />}>
        <PostLikes {...props} {...likesProps} />
      </Suspense>
    </dl>
  )
}

export default PostViewsLike
