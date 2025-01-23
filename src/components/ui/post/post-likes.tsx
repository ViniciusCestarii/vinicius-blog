'use client'

import React from 'react'

import { cn } from '@/lib/style/utils'

import { Heart } from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchIsLiked, fetchLikes } from '@/lib/blog/fetch'
import { toggleLike } from '@/lib/blog/action'
import NumberSlider from './number-slider'

interface PostLikesDisplayProps {
  likes?: number
  isLiked?: boolean
}

const PostLikesDisplay = ({ isLiked, likes }: PostLikesDisplayProps) => {
  return (
    <div
      className="flex items-center gap-2 min-w-[3.75rem] min-h-6"
      title="Likes"
    >
      <span className="sr-only">Likes</span>
      <Heart className={cn('size-icon', isLiked && 'text-red-500')} />
      <NumberSlider value={likes} />
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

  const { likes, isLiked } = postLikesDisplayProps

  const mutation = useMutation({
    mutationFn: () => toggleLike(slug),
    onMutate: () => {
      if (likes === 0 && isLiked) return
      const previousLikes = likes ?? 0
      const previousIsLiked = isLiked

      queryClient.setQueryData(['likes', slug], () =>
        isLiked ? previousLikes - 1 : previousLikes + 1,
      )

      queryClient.setQueryData(['isLiked', slug], () => !isLiked)

      return { previousLikes, previousIsLiked }
    },
    onError: (_err, _newViews, context) => {
      queryClient.setQueryData(['likes', slug], context?.previousLikes)
      queryClient.setQueryData(['isLiked', slug], context?.previousIsLiked)
    },
  })

  return (
    <button
      disabled={mutation.isPending || isLiked === undefined}
      className="flex items-center gap-2 min-w-[3.75rem] min-h-6"
      onClick={() => mutation.mutate()}
      aria-label={isLiked ? 'Remove like from this post' : 'Like this post'}
    >
      {mutation.isPending}
      <PostLikesDisplay {...postLikesDisplayProps} />
    </button>
  )
}

interface PostLikesProps {
  slug: string
  likeable?: boolean
}

const PostLikes = ({ slug, likeable }: PostLikesProps) => {
  const likesQuery = useQuery({
    queryKey: ['likes', slug],
    queryFn: () => fetchLikes(slug),
    staleTime: 1000 * 60 * 60,
  })

  const isLikedQuery = useQuery({
    queryKey: ['isLiked', slug],
    queryFn: () => fetchIsLiked(slug),
    staleTime: 1000 * 60 * 60,
  })

  if (likeable) {
    return (
      <PostLikeable
        slug={slug}
        likes={likesQuery.data}
        isLiked={isLikedQuery.data}
      />
    )
  }

  return (
    <PostLikesDisplay likes={likesQuery.data} isLiked={isLikedQuery.data} />
  )
}

export default PostLikes
