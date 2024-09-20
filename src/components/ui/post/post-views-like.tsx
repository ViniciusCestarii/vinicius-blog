import React from 'react'
import PostViews from './post-views'
import PostLikes from './post-likes'
import { Post } from '@/lib/blog/utils'

interface PostViewsLikeProps {
  post: Post
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
      <PostViews
        initialViews={metadata.views}
        slug={metadata.slug}
        increment={incrementViews}
      />
      <PostLikes
        initialLikes={metadata.likes}
        slug={metadata.slug}
        isLiked={metadata.isLiked}
        likeable={likeable}
      />
    </span>
  )
}

export default PostViewsLike
