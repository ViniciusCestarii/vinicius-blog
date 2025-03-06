import 'server-only'
import { cookies } from 'next/headers'

const cookieLikeBlogs = 'likedPosts'

const MAX_COOKIE_SESSION_TIME = 2147483647

export const setLikedPosts = async (likedPosts: string[]) => {
  const cookieStore = await cookies()

  cookieStore.set(cookieLikeBlogs, JSON.stringify([...likedPosts]), {
    maxAge: MAX_COOKIE_SESSION_TIME,
  })
}

export const getLikedPosts = async () => {
  const cookieStore = await cookies()

  const likedPostsCookie = cookieStore.get(cookieLikeBlogs)

  if (!likedPostsCookie) {
    return []
  }

  const parsedValue = JSON.parse(likedPostsCookie.value)

  return parsedValue as string[]
}
