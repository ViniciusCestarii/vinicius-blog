'use server'

import { likeBlog, unlikeBlog } from '@/lib/blog/utils'
import client from './redis-client'
import { getLikedBlogs } from '@/lib/cookie'

export const incrementViews = async (slug: string) => {
  return await client.incr(`views:${slug}`)
}

export const incrementLikes = async (slug: string) => {
  return await client.incr(`likes:${slug}`)
}

export const decrementLikes = async (slug: string) => {
  return await client.decr(`likes:${slug}`)
}

export const getViews = async (slug: string): Promise<number> => {
  const views = await client.get(`views:${slug}`)
  return views ? Number(views) : 0
}

export const getLikes = async (slug: string): Promise<number> => {
  const likes = await client.get(`likes:${slug}`)
  return likes ? Number(likes) : 0
}

export const toggleLike = async (slug: string) => {
  const likedBlogs = getLikedBlogs() ?? []

  const isLiked = likedBlogs.includes(slug)

  if (isLiked) {
    return await unlikeBlog(slug)
  } else {
    return await likeBlog(slug)
  }
}
