'use server'

import { cookies } from 'next/headers'

const cookieLikeBlogs = 'likedBlogs'

export const setLikedBlogs = async (likedBlogs: string[]) => {
  const expires = new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000) // 10 years from now

  cookies().set(cookieLikeBlogs, JSON.stringify([...likedBlogs]), {
    maxAge: Number(expires.toUTCString()),
  })
}

export const getLikedBlogs = async () => {
  const likedBlogsCookie = cookies().get(cookieLikeBlogs)

  if (!likedBlogsCookie) {
    return []
  }

  const parsedValue = JSON.parse(likedBlogsCookie.value)

  return parsedValue as string[]
}
