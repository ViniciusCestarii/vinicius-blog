'use client'

import { getLikes, toggleLike } from '@/server/storage'
import React from 'react'

import { cn } from '@/lib/style/utils'

import { Heart } from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

interface PostLikesDisplayProps {
  likes?: number
  isLiked?: boolean
}

const PostLikesDisplay = ({ isLiked, likes }: PostLikesDisplayProps) => {
  return (
    <div className="flex items-center gap-2" title="Likes">
      <dt className="m-0">
        <span className="sr-only">Likes</span>
        <Heart className={cn('size-icon', isLiked && 'text-red-500')} />
      </dt>
      <dd className="p-0 m-0 text-sm leading-4 min-w-8 text-start">{likes}</dd>
    </div>
  )
}

interface PostLikeableProps extends PostLikesDisplayProps {
  slug: string
}

const PostLikeable = ({
  slug,
  ...postLikesDisplayProps
}: PostLikeableProps) => {
  const queryClient = useQueryClient()

  const { likes } = postLikesDisplayProps

  const mutation = useMutation({
    mutationFn: () => toggleLike(slug),
    onMutate: () => {
      if (!likes) {
        return
      }
      const previousViews = likes
      queryClient.setQueryData(['likes', slug], (data: number) =>
        data
          ? postLikesDisplayProps.isLiked
            ? data - 1
            : data + 1
          : undefined,
      )
      return { previousViews }
    },
    onError: (_err, _newViews, context) => {
      queryClient.setQueryData(['likes', slug], context?.previousViews)
    },
  })

  return (
    <button
      className="flex items-center gap-2"
      onClick={() => mutation.mutate()}
      aria-label="Like this post"
    >
      <PostLikesDisplay {...postLikesDisplayProps} />
    </button>
  )
}

interface PostLikesProps {
  slug: string
  likeable?: boolean
  isLiked?: boolean
}

const PostLikes = ({ slug, likeable, isLiked }: PostLikesProps) => {
  const query = useQuery({
    queryKey: ['likes', slug],
    queryFn: () => getLikes(slug),
    staleTime: 1000 * 60 * 60,
  })

  if (likeable) {
    return <PostLikeable slug={slug} likes={query.data} isLiked={isLiked} />
  }

  return <PostLikesDisplay likes={query.data} isLiked={isLiked} />
}

export default PostLikes
