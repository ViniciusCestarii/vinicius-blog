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
const regXHeader = /(?<flag>#{1,6})\s+(?<content>.+)/g

export const getHeadings = (raw: string) => {
  const headings = Array.from(raw.matchAll(regXHeader)).flatMap(
    ({ groups }) => {
      if (!groups?.flag || !groups?.content) return []
      const flag = groups.flag
      const content = groups.content
      return {
        heading: flag.length,
        text: content,
        slug: slugify(content),
      }
    },
  )

  return headings
}
