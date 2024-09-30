import { Post, PostMetadata } from './types'

export const isPostPublished = (post: Post) => {
  return post.metadata.status === 'published'
}

export const createPostTemplate = (
  metadata: Partial<PostMetadata>,
  content: string,
) => {
  const mappedTags = metadata.tags
    ? metadata.tags.map((tag) => `- "${tag}"`).join('\n')
    : null

  const tags = mappedTags ? `\n${mappedTags}` : '[]'

  return `---
title: "${metadata.title}"
description: "${metadata.description}"
publishedAt: "${metadata.publishedAt}"
updatedAt: "${metadata.updatedAt ?? metadata.publishedAt}"
status: "${metadata.status}"
tags: ${tags}
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
