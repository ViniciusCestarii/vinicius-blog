import PostViews from './post-views'
import PostLikes from './post-likes'
import { Post } from '@/lib/blog/types'

interface PostViewsLikesProps {
  post: Post
  likeable?: boolean
  incrementViews?: boolean
}

const PostViewsLikes = ({
  post,
  likeable,
  incrementViews,
}: PostViewsLikesProps) => {
  const { metadata } = post

  return (
    <span className="flex gap-4">
      <PostViews slug={metadata.slug} increment={incrementViews} />
      <PostLikes slug={metadata.slug} likeable={likeable} />
    </span>
  )
}

export default PostViewsLikes
