import { getAllPostsBasedOnUser } from '@/lib/blog/action'
import BlogList from './blog-list'
import { searchParamsCache } from './search-params'

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const parsedSearchParams = searchParamsCache.parse(searchParams)

  const posts = await getAllPostsBasedOnUser(parsedSearchParams.search)

  return (
    <main>
      <BlogList posts={posts} />
    </main>
  )
}
