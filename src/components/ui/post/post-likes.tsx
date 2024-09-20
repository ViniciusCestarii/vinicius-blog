'use client'

import { toggleLike } from '@/server/storage'
import React from 'react'

import { cn } from '@/lib/style/utils'

import { Heart } from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchLikes } from '@/lib/blog/fetch'

interface PostLikesDisplayProps {
  likes?: number
  isLiked?: boolean
}

const PostLikesDisplay = ({ isLiked, likes }: PostLikesDisplayProps) => {
  return (
    <div className="flex items-center gap-2" title="Likes">
      <span className="sr-only">Likes</span>
      <Heart className={cn('size-icon', isLiked && 'text-red-500')} />
      {likes}
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
      const previousLikes = likes ?? 0
      const previousIsLiked = postLikesDisplayProps.isLiked

      queryClient.setQueryData(['likes', slug], () =>
        postLikesDisplayProps.isLiked ? previousLikes - 1 : previousLikes + 1,
      )

      queryClient.setQueryData(
        ['isLiked', slug],
        () => !postLikesDisplayProps.isLiked,
      )

      return { previousLikes, previousIsLiked }
    },
    onError: (_err, _newViews, context) => {
      queryClient.setQueryData(['likes', slug], context?.previousLikes)
      queryClient.setQueryData(['isLiked', slug], context?.previousIsLiked)
    },
  })

  return (
    <button
      disabled={mutation.isPending}
      className="flex items-center gap-2"
      onClick={() => mutation.mutate()}
      aria-label="Like this post"
    >
      {mutation.isPending}
      <PostLikesDisplay {...postLikesDisplayProps} />
    </button>
  )
}

interface PostLikesProps {
  slug: string
  likeable?: boolean
  isLiked?: boolean
  initialLikes: number
}

const PostLikes = ({
  slug,
  initialLikes,
  likeable,
  isLiked,
}: PostLikesProps) => {
  const likesQuery = useQuery({
    queryKey: ['likes', slug],
    queryFn: () => fetchLikes(slug),
    staleTime: 1000 * 60 * 60,
    initialData: initialLikes,
  })

  const isLikedQuery = useQuery({
    queryKey: ['isLiked', slug],
    staleTime: Infinity,
    initialData: isLiked,
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
