import { getAllPublishedPosts } from '@/lib/blog/utils'
import BlogList from './blog-list'
import { Suspense } from 'react'

export default async function Home() {
  const allPosts = await getAllPublishedPosts()

  return (
    <div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Suspense fallback={null}>
          <BlogList allPosts={allPosts} />
        </Suspense>
      </main>
    </div>
  )
}
