'use server'

import { likeBlog, unlikeBlog } from '@/lib/blog/utils'
import client from './redis-client'
import { getLikedBlogs } from '@/lib/cookie'

export const incrementViews = async (slug: string) => {
  try {
    client.incr(`views:${slug}`)
  } catch (error) {
    console.error('Error incrementing views:', error)
  }
}

export const incrementLikes = async (slug: string) => {
  try {
    client.incr(`likes:${slug}`)
  } catch (error) {
    console.error('Error incrementing likes:', error)
  }
}

export const decrementLikes = async (slug: string) => {
  try {
    client.decr(`likes:${slug}`)
  } catch (error) {
    console.error('Error decrementing likes:', error)
  }
}

export const getViews = async (slug: string): Promise<number> => {
  try {
    const views = await client.get(`views:${slug}`)
    return views ? Number(views) : 0
  } catch (error) {
    console.error('Error getting views:', error)
    return 0
  }
}

export const getLikes = async (slug: string): Promise<number> => {
  try {
    const likes = await client.get(`likes:${slug}`)
    return likes ? Number(likes) : 0
  } catch (error) {
    console.error('Error getting likes:', error)
    return 0
  }
}

export const toggleLike = (slug: string) => {
  const likedBlogs = getLikedBlogs() ?? []

  const isLiked = likedBlogs.includes(slug)

  if (isLiked) {
    unlikeBlog(slug)
  } else {
    likeBlog(slug)
  }
}
