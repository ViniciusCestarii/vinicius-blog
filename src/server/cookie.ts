'use server'

import { cookieLikeBlogs } from '@/lib/cookie'
import { cookies } from 'next/headers'

export const setLikedBlogs = async (likedBlogs: string[]) => {
  cookies().set(cookieLikeBlogs, JSON.stringify([...likedBlogs]))
}
