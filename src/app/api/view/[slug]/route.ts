import { getViews } from '@/server/storage'

interface Params {
  params: {
    slug: string
  }
}

export async function GET(request: Request, { params }: Params) {
  const views = await getViews(params.slug)

  return Response.json(views)
}
