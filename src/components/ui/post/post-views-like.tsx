import React from 'react'
import PostViews from './post-views'
import PostLikes from './post-likes'
import { PostView } from '@/lib/blog/utils'

interface PostViewsLikeProps {
  post: PostView
  likeable?: boolean
  incrementViews?: boolean
}

const PostViewsLike = ({
  post,
  likeable,
  incrementViews,
}: PostViewsLikeProps) => {
  const { metadata } = post

  return (
    <span className="flex gap-4">
      <PostViews slug={metadata.slug} increment={incrementViews} />
      <PostLikes
        slug={metadata.slug}
        isLiked={metadata.isLiked}
        likeable={likeable}
      />
    </span>
  )
}

export default PostViewsLike
