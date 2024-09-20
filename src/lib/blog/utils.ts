export type PostMetadata = {
  title: string
  description: string
  publishedAt: string
  status: 'published' | 'draft'
  slug: string
  tags: string[]
  image?: string
}

export type Post = {
  metadata: PostMetadata
  content: string
}

export const isPostPublished = (post: Post) => {
  return post.metadata.status === 'published'
}
