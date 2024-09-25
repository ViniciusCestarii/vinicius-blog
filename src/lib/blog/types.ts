export type PostMetadata = {
  title: string
  description: string
  publishedAt: string
  status: 'published' | 'draft'
  slug: string
  tags: string[]
  image?: string
}

export type PostDTOsMetadata = PostMetadata & {
  isLiked?: boolean
}

export type Post = {
  metadata: PostMetadata
  content: string
}

export type PostDTOs = {
  metadata: PostDTOsMetadata
  content: string
}
