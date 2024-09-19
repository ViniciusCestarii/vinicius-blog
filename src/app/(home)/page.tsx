import { getAllPublishedPosts } from '@/lib/blog/utils'
import BlogList from './blog-list'
import { searchParamsCache } from './search-params'

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const parsedSearchParams = searchParamsCache.parse(searchParams)

  const posts = await getAllPublishedPosts(parsedSearchParams.search)

  return (
    <main>
      <BlogList posts={posts} />
    </main>
  )
}
