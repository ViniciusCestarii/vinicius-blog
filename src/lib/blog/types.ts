export type PostMetadata = {
  title: string
  description: string
  publishedAt: string
  updatedAt: string
  status: 'published' | 'draft'
  slug: string
  tags: string[]
  image?: string
}

export type Post = {
  metadata: PostMetadata
  content: string
}
