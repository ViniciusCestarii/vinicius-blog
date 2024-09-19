'use server'

import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

type Metadata = {
  title: string
  description: string
  publishedAt: string
  status: 'published' | 'draft'
  slug: string
  tags: string[]
  image?: string
}

export type Post = {
  metadata: Metadata
  content: string
}

const postsDirectory = path.resolve('src/content/posts')

export const getAllPublishedPosts = async (
  search?: string,
): Promise<Post[]> => {
  const filenames = await fs.readdir(postsDirectory)

  const allPosts = await Promise.all(
    filenames.map(async (filename) => getPost(filename.replace('.mdx', ''))),
  )

  const allPublishedPosts: Post[] = allPosts.filter(
    (post): post is Post =>
      post !== null && post.metadata.status === 'published',
  )

  const filteredPosts = search
    ? allPublishedPosts.filter((post) => {
        const { metadata } = post
        const searchLower = search.toLowerCase()
        return (
          metadata.title.toLowerCase().includes(searchLower) ||
          metadata.description.toLowerCase().includes(searchLower) ||
          metadata.tags.some((tag) => tag.toLowerCase().includes(searchLower))
        )
      })
    : allPublishedPosts

  return filteredPosts.sort((a, b) => {
    return a.metadata.publishedAt > b.metadata.publishedAt ? -1 : 1
  })
}

export const getPost = async (slug: string): Promise<Post | null> => {
  try {
    const filePath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContent = await fs.readFile(filePath, 'utf8')

    const { data, content } = matter(fileContent)

    const post: Post = {
      metadata: { ...data, slug } as Metadata,
      content,
    }

    return post
  } catch (error) {
    console.error(error)
    return null
  }
}
