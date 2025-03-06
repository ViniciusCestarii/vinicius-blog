'use server'

import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { decrementLikes, incrementLikes } from '@/server/storage'
import { setLikedPosts, getLikedPosts } from '@/server/cookie'
import { isAuthenticated } from '@/server/auth'
import { isPostPublished } from './utils'
import { Post, PostMetadata } from './types'

const postsDirectory = path.resolve('src/content/posts')

export const getAllPosts = async (search?: string): Promise<Post[]> => {
  const filenames = await fs.readdir(postsDirectory)

  const allPosts = await Promise.all(
    filenames.map(async (filename) => getPost(filename.replace('.mdx', ''))),
  )

  const allValidPosts: Post[] = allPosts.filter(
    (post): post is Post => post !== null,
  )

  const filteredPosts = search
    ? allValidPosts.filter((post) => {
        const { metadata } = post
        const searchLower = search.toLowerCase()
        return (
          metadata.title.toLowerCase().includes(searchLower) ||
          metadata.description.toLowerCase().includes(searchLower) ||
          metadata.tags.some((tag) => tag.toLowerCase().includes(searchLower))
        )
      })
    : allValidPosts

  return filteredPosts.sort((a, b) => {
    return a.metadata.publishedAt > b.metadata.publishedAt ? -1 : 1
  })
}

export const getAllPublishedPosts = async (): Promise<Post[]> => {
  const allPosts = await getAllPosts()

  return allPosts.filter(isPostPublished)
}

export const getPost = async (slug: string): Promise<Post | null> => {
  try {
    const filePath = path.join(postsDirectory, `${slug}.mdx`)

    const fileContent = await fs.readFile(filePath, 'utf8')

    const { data, content } = matter(fileContent)

    const post: Post = {
      metadata: { ...data, slug } as PostMetadata,
      content,
    }

    return post
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getAllPostsBasedOnUser = async (
  search?: string,
): Promise<Post[]> => {
  const allPosts = await getAllPosts(search)

  if (await isAuthenticated()) {
    return allPosts.sort((a, b) => {
      const isAPublished = isPostPublished(a)
      const isBPublished = isPostPublished(b)

      return isAPublished === isBPublished ? 0 : isAPublished ? 1 : -1
    })
  }

  return allPosts.filter(isPostPublished)
}

export const getPostBasedOnUser = async (
  slug: string,
): Promise<Post | null> => {
  const post = await getPost(slug)

  if (!post) {
    return null
  }

  if (post.metadata.status !== 'published') {
    const authenticated = await isAuthenticated()

    if (!authenticated) {
      return null
    }
  }

  return post
}

export const toggleLike = async (slug: string) => {
  const likedPosts = await getLikedPosts() ?? []
  const isLiked = likedPosts.includes(slug)

  if (isLiked) {
    const decrement = decrementLikes(slug)
    const updateCookie = setLikedPosts(likedPosts.filter((likedSlug) => likedSlug !== slug))
    await Promise.all([decrement, updateCookie])
  } else {
    const increment = incrementLikes(slug)
    const updateCookie = setLikedPosts([...likedPosts, slug])
    await Promise.all([increment, updateCookie])
  }
}
