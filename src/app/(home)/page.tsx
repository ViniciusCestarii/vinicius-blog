import PostListContainer from './post-list-container'
import { searchParamsCache } from './search-params'

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const parsedSearchParams = searchParamsCache.parse(searchParams)

  return (
    <main>
      <PostListContainer search={parsedSearchParams.search} />
    </main>
  )
}
