import React, { Suspense } from 'react'
import PostViews, { PostViewTemplate } from './post-views'
import PostLikes from './post-likes'
import PostLikeTemplate from './post-like-template'

interface PostViewsLikeProps {
  slug: string
  likeable?: boolean
}

const PostViewsLike = (props: PostViewsLikeProps) => {
  return (
    <dl className="flex gap-4 m-0">
      <Suspense fallback={<PostViewTemplate />}>
        <PostViews {...props} />
      </Suspense>
      <Suspense fallback={<PostLikeTemplate />}>
        <PostLikes {...props} />
      </Suspense>
    </dl>
  )
}

export default PostViewsLike
