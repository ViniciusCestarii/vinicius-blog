/* eslint-disable no-var */
'use server'

import { likeBlog, unlikeBlog } from '@/lib/blog/action'
import { getLikedBlogs } from '@/lib/cookie'
import env from '@/env'
import * as redis from 'redis'

// see https://dev.to/rainforss/using-redis-cloud-in-your-nextjs-application-39f2
declare global {
  var redis: redis.RedisClientType | undefined
}

let client: redis.RedisClientType = global.redis as redis.RedisClientType

// If no Redis client is found, create the client using Redis connection string
if (!client) {
  client = global.redis = redis.createClient({
    url: env.REDIS_URL,
    password: env.REDIS_PASSWORD,
  })
}

// Open connection only when there is no existing connection
export const connect = async () => {
  if (client.isOpen) {
    console.log('Already connected to Redis')
    return
  }

  await client.connect()
  console.log('Connected successfully.')
}

// Close connection only when there is an existing connection
export const disconnect = async () => {
  if (!client.isOpen) {
    return
  }
  await client.quit()
  console.log('Disconnected.')
}

export const incrementViews = async (slug: string) => {
  try {
    await connect()
    const result = await client.incr(`views:${slug}`)
    return result
  } finally {
    await disconnect()
  }
}

export const incrementLikes = async (slug: string) => {
  try {
    const result = await client.incr(`likes:${slug}`)
    return result
  } finally {
    await disconnect()
  }
}

export const decrementLikes = async (slug: string) => {
  try {
    await connect()
    const result = await client.decr(`likes:${slug}`)
    return result
  } finally {
    await disconnect()
  }
}

export const getViews = async (slug: string): Promise<number> => {
  try {
    await connect()
    const views = await client.get(`views:${slug}`)
    return views ? Number(views) : 0
  } finally {
    await disconnect()
  }
}

export const getLikes = async (slug: string): Promise<number> => {
  try {
    await connect()
    const likes = await client.get(`likes:${slug}`)
    return likes ? Number(likes) : 0
  } finally {
    await disconnect()
  }
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
