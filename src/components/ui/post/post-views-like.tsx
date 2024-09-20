import React from 'react'
import PostViews from './post-views'
import PostLikes from './post-likes'
import { getLikedBlogs } from '@/lib/cookie'

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
  const likedPosts = getLikedBlogs()
  const isLiked = likedPosts.includes(props.slug)
  return (
    <dl className="flex gap-4 m-0">
      <PostViews {...props} {...viewsProps} />
      <PostLikes {...props} {...likesProps} isLiked={isLiked} />
    </dl>
  )
}

export default PostViewsLike
