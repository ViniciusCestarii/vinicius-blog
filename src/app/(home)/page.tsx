import { getAllPosts } from '@/lib/blog/utils'

export default async function Home() {
  const allPosts = await getAllPosts()

  console.log(allPosts)
  return (
    <div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ul className="flex flex-col gap-4">
          {allPosts.map((post) => (
            <li key={post.metadata.title}>
              <a href={`/blog/${post.metadata.slug}`}>{post.metadata.title}</a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
