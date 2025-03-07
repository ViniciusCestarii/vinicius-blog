import PostItem from '@/components/ui/post/post-item'
import { getAllPostsBasedOnUser } from '@/lib/blog/action'
// import PostListHeader from './post-list-header' enables search but depends on ssr
// to enable search, you will need to remove export const dynamic = 'force-static' from page.tsx

interface PostContainerProps {
  search?: string
}

const PostListContainer = ({ search }: PostContainerProps) => {
  return (
    <div className="flex flex-col gap-8 items-center sm:items-start pb-8">
      {/* <PostListHeader /> */}
      <PostsList search={search} />
    </div>
  )
}

const PostsList = async ({ search }: PostContainerProps) => {
  const posts = await getAllPostsBasedOnUser(search)

  return posts.length > 0 ? (
    <ul className="flex flex-col gap-10 w-full">
      {posts.map((post) => (
        <PostItem key={post.metadata.title} post={post} />
      ))}
    </ul>
  ) : (
    <p className="mx-auto text-lg">🤔 No posts found</p>
  )
}

export default PostListContainer
