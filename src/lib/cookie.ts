import { cookies } from 'next/headers'

export type LikedBlogs = string[]

export const getLikedBlogs = () => {
  const likedBlogsCookie = cookies().get(cookieLikeBlogs)

  if (!likedBlogsCookie) {
    return undefined
  }

  const parsedValue = JSON.parse(likedBlogsCookie.value)

  return parsedValue as LikedBlogs
}

export const cookieLikeBlogs = 'liked-blogs'
