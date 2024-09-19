import { getLikes } from '@/server/storage'
import React from 'react'
import PostLikeTemplate from './post-like-template'
import { getLikedBlogs } from '@/lib/cookie'

interface PostLikesProps {
  slug: string
  likeable?: boolean
}

const PostLikes = async ({ slug, likeable }: PostLikesProps) => {
  const promises = Promise.all([getLikes(slug), getLikedBlogs()])

  const [likes, likedBlogs] = await promises

  const isLiked = !!likedBlogs?.includes(slug)

  return (
    <PostLikeTemplate
      likes={likes}
      isLiked={isLiked}
      likeable={likeable ? { slug } : undefined}
    />
  )
}

export default PostLikes
