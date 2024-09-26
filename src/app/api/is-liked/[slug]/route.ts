import { getLikedPosts } from '@/server/cookie'

interface Params {
  params: {
    slug: string
  }
}

export async function GET(request: Request, { params }: Params) {
  const likedPosts = getLikedPosts()
  const isLiked = likedPosts.includes(params.slug)

  return Response.json(isLiked)
}
