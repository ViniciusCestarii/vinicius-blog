'use server'

import env from '@/env'
import { createPostTemplate, PostMetadata, slugify } from '../blog/utils'
import { isAuthenticated } from '@/server/auth'

const UPDATE_POST_GITHUB_URL = `${env.GITHUB_API_URL}/contents/src/content/posts`

interface CreateBlogParams {
  title: PostMetadata['title']
}

export const createPostCommit = async ({ title }: CreateBlogParams) => {
  const isAdmin = await isAuthenticated()
  if (!isAdmin) {
    throw new Error('Unauthorized')
  }

  const slug = slugify(title)

  const content = createPostTemplate(
    {
      slug,
      title,
      description: '',
      publishedAt: new Date().toISOString(),
      status: 'draft',
      tags: [],
    },
    'Basic paragraph',
  )

  const filename = `${slug}.mdx`

  const response = await fetch(`${UPDATE_POST_GITHUB_URL}/${filename}`, {
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
