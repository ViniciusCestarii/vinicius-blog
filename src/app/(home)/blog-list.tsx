import PostItem from '@/components/ui/post/post-item'
import { Post } from '@/lib/blog/utils'
import BlogSearch from './blog-search'
import { Suspense } from 'react'
interface BlogListProps {
  posts: Post[]
}

const BlogList = ({ posts }: BlogListProps) => {
  return (
    <div className="flex flex-col gap-8 items-center sm:items-start">
      <Suspense
        fallback={
          <div className="bg-card rounded-md border border-input w-full h-9" />
        }
      >
        <BlogSearch />
      </Suspense>
      {posts.length > 0 ? (
        <ul className="flex flex-col gap-10 w-full px-4">
          {posts.map((post) => (
            <PostItem key={post.metadata.title} post={post} />
          ))}
        </ul>
      ) : (
        <p className="mx-auto text-lg">No posts found</p>
      )}
    </div>
  )
}

export default BlogList
