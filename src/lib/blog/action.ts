'use server'

import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import {
  decrementLikes,
  getLikes,
  getViews,
  incrementLikes,
} from '@/server/storage'
import { setLikedBlogs } from '@/server/cookie'
import { getLikedBlogs } from '../cookie'
import { isAuthenticated } from '@/server/auth'
import { isPostPublished, PostView, PostViewMetadata } from './utils'

const postsDirectory = path.resolve('src/content/posts')

export const getAllPosts = async (search?: string): Promise<PostView[]> => {
  const filenames = await fs.readdir(postsDirectory)

  const allPosts = await Promise.all(
    filenames.map(async (filename) => getPost(filename.replace('.mdx', ''))),
  )

  const allValidPosts: PostView[] = allPosts.filter(
    (post): post is PostView => post !== null,
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

export const getAllPostsBasedOnUser = async (
  search?: string,
): Promise<PostView[]> => {
  const allPosts = await getAllPosts(search)

  const likedBlogs = getLikedBlogs() ?? []

  const postsWithIsLiked = allPosts.map((post) => ({
    ...post,
    metadata: {
      ...post.metadata,
      isLiked: likedBlogs.includes(post.metadata.slug),
    },
  }))

  if (await isAuthenticated()) {
    return postsWithIsLiked.sort((a, b) => {
      const isAPublished = isPostPublished(a)
      const isBPublished = isPostPublished(b)

      return isAPublished === isBPublished ? 0 : isAPublished ? 1 : -1
    })
  }

  return postsWithIsLiked.filter(isPostPublished)
}

export const getPost = async (slug: string): Promise<PostView | null> => {
  try {
    const filePath = path.join(postsDirectory, `${slug}.mdx`)

    const fileContent = await fs.readFile(filePath, 'utf8')

    const { data, content } = matter(fileContent)

    const post: PostView = {
      metadata: { ...data, slug } as PostViewMetadata,
      content,
    }

    return post
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getPostBasedOnUser = async (
  slug: string,
): Promise<PostView | null> => {
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

  const likedBlogs = getLikedBlogs() ?? []

  return {
    ...post,
    metadata: {
      ...post.metadata,
      isLiked: likedBlogs.includes(post.metadata.slug),
    },
  }
}

export const likeBlog = async (slug: string) => {
  const likedBlogs = getLikedBlogs() ?? []

  likedBlogs.push(slug)

  setLikedBlogs(likedBlogs)
  return await incrementLikes(slug)
}

export const unlikeBlog = async (slug: string) => {
  const likedBlogs = getLikedBlogs() ?? []

  const newLikedBlogs = likedBlogs.filter((blog) => blog !== slug)

  setLikedBlogs(newLikedBlogs)
  return await decrementLikes(slug)
}
