'use server'

import { cookieLikeBlogs } from '@/lib/cookie'
import { cookies } from 'next/headers'

export const setLikedBlogs = async (likedBlogs: string[]) => {
  const expires = new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000) // 10 years from now

  cookies().set(cookieLikeBlogs, JSON.stringify([...likedBlogs]), {
    maxAge: Number(expires.toUTCString()),
  })
}
