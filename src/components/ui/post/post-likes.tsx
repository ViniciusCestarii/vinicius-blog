import { getLikes } from '@/server/storage'
import { Heart } from 'lucide-react'
import React from 'react'

interface PostLikesProps {
  slug: string
}

export const PostLikeTemplate = ({ likes }: { likes: number }) => (
  <div className="flex items-center gap-2" title="Likes">
    <dt className="m-0">
      <span className="sr-only">Likes</span> <Heart className="size-icon" />
    </dt>
    <dd className="p-0 m-0">{likes}</dd>
  </div>
)

const PostLikes = async ({ slug }: PostLikesProps) => {
  const likes = await getLikes(slug)
  return <PostLikeTemplate likes={likes} />
}

export default PostLikes
