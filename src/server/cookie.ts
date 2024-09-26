import 'server-only'
import { cookies } from 'next/headers'

const cookieLikeBlogs = 'likedPosts'

const MAX_COOKIE_SESSION_TIME = 2147483647

export const setLikedPosts = (likedPosts: string[]) => {
  cookies().set(cookieLikeBlogs, JSON.stringify([...likedPosts]), {
    maxAge: MAX_COOKIE_SESSION_TIME,
  })
}

export const getLikedPosts = () => {
  const likedPostsCookie = cookies().get(cookieLikeBlogs)

  if (!likedPostsCookie) {
    return []
  }

  const parsedValue = JSON.parse(likedPostsCookie.value)

  return parsedValue as string[]
}
