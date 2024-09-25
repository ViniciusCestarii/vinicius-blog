import React from 'react'
import PostDTOss from './post-views'
import PostLikes from './post-likes'
import { PostDTOs } from '@/lib/blog/types'

interface PostDTOssLikeProps {
  post: PostDTOs
  likeable?: boolean
  incrementViews?: boolean
}

const PostDTOssLike = ({
  post,
  likeable,
  incrementViews,
}: PostDTOssLikeProps) => {
  const { metadata } = post

  return (
    <span className="flex gap-4">
      <PostDTOss slug={metadata.slug} increment={incrementViews} />
      <PostLikes
        slug={metadata.slug}
        isLiked={metadata.isLiked}
        likeable={likeable}
      />
    </span>
  )
}

export default PostDTOssLike
