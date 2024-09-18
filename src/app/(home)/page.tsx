import { getAllPublishedPosts } from '@/lib/blog/utils'
import PostItem from '../../components/ui/post/post-item'

export default async function Home() {
  const allPosts = await getAllPublishedPosts()

  return (
    <div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ul className="flex flex-col gap-10 w-full px-4">
          {allPosts.map((post) => (
            <PostItem key={post.metadata.title} post={post} />
          ))}
        </ul>
      </main>
    </div>
  )
}
