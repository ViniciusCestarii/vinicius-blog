import { getViews } from '@/server/storage'

interface Params {
  params: Promise<{
    slug: string
  }>
}

export async function GET(request: Request, props: Params) {
  const params = await props.params
  const views = await getViews(params.slug)

  return Response.json(views)
}
