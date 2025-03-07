import { Post } from '@/lib/blog/types'
import PostTime from './post-time'
import PostViewsLikes from './post-views-like'
import PostTitle from './post-title'

interface PostItemHeaderProps {
  post: Post
  likeable?: boolean
  incrementViews?: boolean
}

const PostItemHeader = ({
  post,
  likeable,
  incrementViews,
}: PostItemHeaderProps) => {
  return (
    <>
      <PostTitle>{post.metadata.title}</PostTitle>
      <div className="flex justify-between flex-wrap items-center gap-8 not-prose">
        <PostViewsLikes
          post={post}
          likeable={likeable && post.metadata.status === 'published'}
          incrementViews={
            incrementViews && post.metadata.status === 'published'
          }
        />
        <PostTime date={post.metadata.publishedAt} />
      </div>
    </>
  )
}

export default PostItemHeader
