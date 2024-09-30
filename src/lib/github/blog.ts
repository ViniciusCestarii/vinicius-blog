'use server'

import env from '@/env'
import { createPostTemplate, slugify } from '../blog/utils'
import { isAuthenticated } from '@/server/auth'
import { Post, PostMetadata } from '../blog/types'

const POST_GITHUB_URL = `${env.GITHUB_API_URL}/contents/src/content/posts`

interface CreateBlogParams {
  title: PostMetadata['title']
}

export const createPostCommit = async ({ title }: CreateBlogParams) => {
  await checkAdmin()

  const slug = slugify(title)

  const content = createPostTemplate(
    {
      title,
      description: '',
      publishedAt: new Date().toISOString(),
      status: 'draft',
      tags: [],
    },
    `## First topic

Basic paragraph`,
  )

  const filename = `${slug}.mdx`

  const response = await fetch(`${POST_GITHUB_URL}/${filename}`, {
    method: 'PUT',
    headers: {
      Authorization: `token ${env.GITHUB_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `Create new post ${slug}`,
      content: Buffer.from(content).toString('base64'),
      committer: {
        name: env.COMMITER_NAME,
        email: env.COMMITER_EMAIL,
      },
    }),
  })

  if (!response.ok) {
    throw new Error(
      `Failed to create post commit with status ${response.status}`,
    )
  }
}

export const updatePostCommit = async (post: Post) => {
  await checkAdmin()

  const fileData = await getFileJson(post.metadata.slug)

  const content = createPostTemplate(post.metadata, post.content)

  const filename = `${post.metadata.slug}.mdx`

  const response = await fetch(`${POST_GITHUB_URL}/${filename}`, {
    method: 'PUT',
    headers: {
      Authorization: `token ${env.GITHUB_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `Update post ${post.metadata.slug}`,
      content: Buffer.from(content).toString('base64'),
      sha: fileData.sha,
      committer: {
        name: env.COMMITER_NAME,
        email: env.COMMITER_EMAIL,
      },
    }),
  })

  if (!response.ok) {
    throw new Error(
      `Failed to create post commit with status ${response.status}`,
    )
  }
}
export const deletePostCommit = async (slug: string) => {
  const fileData = await getFileJson(slug)

  const filename = `${slug}.mdx`

  const deleteResponse = await fetch(`${POST_GITHUB_URL}/${filename}`, {
    method: 'DELETE',
    headers: {
      Authorization: `token ${env.GITHUB_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `Delete post ${slug}`,
      sha: fileData.sha,
      committer: {
        name: env.COMMITER_NAME,
        email: env.COMMITER_EMAIL,
      },
    }),
  })

  if (!deleteResponse.ok) {
    throw new Error(
      `Failed to delete post commit with status ${deleteResponse.status}`,
    )
  }
}

const getFileJson = async (slug: string) => {
  await checkAdmin()

  const filename = `${slug}.mdx`

  const getFileResponse = await fetch(`${POST_GITHUB_URL}/${filename}`, {
    method: 'GET',
    headers: {
      Authorization: `token ${env.GITHUB_ACCESS_TOKEN}`,
    },
  })

  if (!getFileResponse.ok) {
    throw new Error(
      `Failed to retrieve file with status ${getFileResponse.status}`,
    )
  }

  const fileData = await getFileResponse.json()

  return fileData
}

const checkAdmin = async () => {
  const isAdmin = await isAuthenticated()

  if (!isAdmin) {
    throw new Error('Unauthorized')
  }
}
