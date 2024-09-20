import React from 'react'
import PostViews from './post-views'
import PostLikes from './post-likes'
import { getLikedBlogs } from '@/lib/cookie'
import { Post } from '@/lib/blog/utils'

interface PostViewsLikeProps {
  post: Post
}

const PostViewsLike = ({ post }: PostViewsLikeProps) => {
  const { metadata } = post
  const likedPosts = getLikedBlogs()
  const isLiked = likedPosts.includes(metadata.slug)
  return (
    <ul className="flex gap-4 m-0">
      <PostViews initialViews={metadata.views} slug={metadata.slug} />
      <PostLikes
        initialLikes={metadata.likes}
        slug={metadata.slug}
        isLiked={isLiked}
      />
    </ul>
  )
}

export default PostViewsLike
