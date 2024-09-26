import 'server-only'
import { cookies } from 'next/headers'

const cookieLikeBlogs = 'likedBlogs'

const MAX_COOKIE_SESSION_TIME = 2147483647

export const setLikedBlogs = (likedBlogs: string[]) => {
  cookies().set(cookieLikeBlogs, JSON.stringify([...likedBlogs]), {
    maxAge: MAX_COOKIE_SESSION_TIME,
  })
}

export const getLikedBlogs = () => {
  const likedBlogsCookie = cookies().get(cookieLikeBlogs)

  if (!likedBlogsCookie) {
    return []
  }

  const parsedValue = JSON.parse(likedBlogsCookie.value)

  return parsedValue as string[]
}
