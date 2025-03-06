import { getLikedPosts } from '@/server/cookie'

interface Params {
  params: Promise<{
    slug: string
  }>
}

export async function GET(request: Request, props: Params) {
  const promises = await Promise.all([props.params, getLikedPosts()])
  const [params, likedPosts] = promises
  const isLiked = likedPosts.includes(params.slug)

  return Response.json(isLiked)
}
