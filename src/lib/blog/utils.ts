'use server'

import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

type Metadata = {
  title: string
  description: string
  publishedAt: string
  status: string
  slug: string
  tags: string[]
  image?: string
}

type Post = {
  metadata: Metadata
  content: string
}

const postsDirectory = path.resolve('src/content/posts')

export const getAllPosts = async (): Promise<Post[]> => {
  const filenames = await fs.readdir(postsDirectory)

  const allPosts = await Promise.all(
    filenames.map(async (filename) => getPost(filename.replace('.mdx', ''))),
  )

  return allPosts.filter((post) => post !== null)
}

export const getPost = async (slug: string): Promise<Post | null> => {
  try {
    const filePath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContent = await fs.readFile(filePath, 'utf8')

    const { data, content } = matter(fileContent)

    const post: Post = {
      metadata: data as Metadata,
      content,
    }

    return post
  } catch (error) {
    console.error(error)
    return null
  }
}
