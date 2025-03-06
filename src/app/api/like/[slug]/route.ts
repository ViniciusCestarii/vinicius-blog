import { getLikes } from '@/server/storage'

interface Params {
  params: Promise<{
    slug: string
  }>
}

export async function GET(request: Request, props: Params) {
  const params = await props.params
  const likes = await getLikes(params.slug)

  return Response.json(likes)
}
