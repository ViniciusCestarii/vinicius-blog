import { getLikes } from '@/server/storage'

interface Params {
  params: {
    slug: string
  }
}

export async function GET(request: Request, { params }: Params) {
  const likes = await getLikes(params.slug)

  return Response.json(likes)
}
