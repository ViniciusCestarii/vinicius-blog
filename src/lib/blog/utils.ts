export type PostMetadata = {
  title: string
  description: string
  publishedAt: string
  status: 'published' | 'draft'
  slug: string
  tags: string[]
  image?: string
  likes: number
  views: number
  isLiked?: boolean
}

export type Post = {
  metadata: PostMetadata
  content: string
}

export const isPostPublished = (post: Post) => {
  return post.metadata.status === 'published'
}

export const createPostTemplate = (
  metadata: Partial<PostMetadata>,
  content: string,
) => {
  const tags = metadata.tags
    ? metadata.tags.map((tag) => `- "${tag}"`).join('\n')
    : ''

  return `---
title: "${metadata.title}"
slug: "${metadata.slug}"
description: "${metadata.description}"
publishedAt: "${metadata.publishedAt}"
status: "${metadata.status}"
tags: ${tags ? '\n' + tags : ''}
---

${content}
`
}

export const slugify = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '')
}
