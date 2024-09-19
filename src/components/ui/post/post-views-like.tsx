import React, { Suspense } from 'react'
import PostViews, { PostViewTemplate } from './post-views'
import PostLikes, { PostLikeTemplate } from './post-likes'

interface PostViewsLikeProps {
  slug: string
}

const PostViewsLike = ({ slug }: PostViewsLikeProps) => {
  return (
    <dl className="flex gap-4 m-0">
      <Suspense fallback={<PostViewTemplate views={0} />}>
        <PostViews slug={slug} />
      </Suspense>
      <Suspense fallback={<PostLikeTemplate likes={0} />}>
        <PostLikes slug={slug} />
      </Suspense>
    </dl>
  )
}

export default PostViewsLike
