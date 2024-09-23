import PostItem from '@/components/ui/post/post-item'
import { Post } from '@/lib/blog/utils'
import BlogListHeader from './blog-list-header'
interface BlogListProps {
  posts: Post[]
}

const BlogList = ({ posts }: BlogListProps) => {
  return (
    <div className="flex flex-col gap-8 items-center sm:items-start">
      <BlogListHeader />
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
