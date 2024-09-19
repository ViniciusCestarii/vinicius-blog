'use client'

import { cn } from '@/lib/style/utils'
import { toggleLike } from '@/server/storage'
import { Heart } from 'lucide-react'

const PostLikeTemplate = ({
  likes,
  likeable,
  isLiked,
}: {
  likes?: number
  isLiked?: boolean
  likeable?: {
    slug: string
  }
}) => {
  if (likeable) {
    return (
      <button
        className="flex items-center gap-2"
        onClick={() => toggleLike(likeable.slug)}
        title="Likes"
      >
        <dt className="m-0">
          <span className="sr-only">Likes</span>{' '}
          <Heart className={cn('size-icon', isLiked && 'text-red-500')} />
        </dt>
        <dd className="p-0 m-0 text-sm min-w-7">{likes}</dd>
      </button>
    )
  }

  return (
    <div className="flex items-center gap-2" title="Likes">
      <dt className="m-0">
        <span className="sr-only">Likes</span>{' '}
        <Heart className={cn('size-icon', isLiked && 'text-red-500')} />
      </dt>
      <dd className="p-0 m-0 text-sm min-w-7">{likes}</dd>
    </div>
  )
}

export default PostLikeTemplate
