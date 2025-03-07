import { isAuthenticated } from '@/server/auth'
import PostListContainer from '../post-list-container'
import { searchParamsCache } from '../search-params'
import { notFound } from 'next/navigation'

export default async function Home(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const searchParams = await props.searchParams
  const parsedSearchParams = searchParamsCache.parse(searchParams)

  const isAdmin = isAuthenticated()

  if (!isAdmin) {
    notFound()
  }

  return <PostListContainer search={parsedSearchParams.search} />
}
