import PostListContainer from '../post-list-container'
import { searchParamsCache } from '../search-params'

export default async function Home(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const searchParams = await props.searchParams
  const parsedSearchParams = searchParamsCache.parse(searchParams)

  return <PostListContainer search={parsedSearchParams.search} />
}
