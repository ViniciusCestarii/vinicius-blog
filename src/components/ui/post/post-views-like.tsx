import React from 'react'
import PostViews from './post-views'
import PostLikes from './post-likes'
import { getLikedBlogs } from '@/lib/cookie'
import { Post } from '@/lib/blog/utils'

interface PostViewsLikeProps {
  post: Post
  likeable?: boolean
}

const PostViewsLike = ({ post, likeable }: PostViewsLikeProps) => {
  const { metadata } = post
  const likedPosts = getLikedBlogs()
  const isLiked = likedPosts.includes(metadata.slug)
  return (
    <span className="flex gap-4">
      <PostViews initialViews={metadata.views} slug={metadata.slug} />
      <PostLikes
        initialLikes={metadata.likes}
        slug={metadata.slug}
        isLiked={isLiked}
        likeable={likeable}
      />
    </span>
  )
}

export default PostViewsLike
