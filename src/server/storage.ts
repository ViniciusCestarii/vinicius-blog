'use server'

import env from '@/env'
import * as redis from 'redis'

const client = redis.createClient({
  url: env.REDIS_URL,
  password: env.REDIS_PASSWORD,
})

client.connect().catch(console.error)

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
