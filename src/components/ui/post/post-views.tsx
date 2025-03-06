'use client'

import { fetchViews } from '@/lib/blog/fetch'
import { incrementViews } from '@/server/storage'
import {
  useIsRestoring,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { Eye } from 'lucide-react'
import React, { useEffect } from 'react'
import NumberSlider from './number-slider'

interface PostViewsProps {
  slug: string
  increment?: boolean
}

const PostViews = ({ slug, increment }: PostViewsProps) => {
  const query = useQuery({
    queryKey: ['views', slug],
    queryFn: () => fetchViews(slug),
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => incrementViews(slug),
    onMutate: () => {
      const previousViews = query.data ?? 0
      queryClient.setQueryData(['views', slug], () => previousViews + 1)
      return { previousViews }
    },
    onError: (_err, _newViews, context) => {
      queryClient.setQueryData(['views', slug], context?.previousViews)
    },
  })

  // isRestoring is true when it's restoring from cache (in this case it's localStorage)
  const isRestoring = useIsRestoring()

  const isGettingData = query.isLoading || isRestoring

  useEffect(() => {
    if (increment && !isGettingData) {
      mutation.mutate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGettingData])

  return (
    <div
      className="flex items-center gap-2 min-w-[3.75rem] min-h-6"
      title="Views"
    >
      <span className="sr-only">Views</span> <Eye className="size-icon" />
      <NumberSlider value={query.data} />
    </div>
  )
}

export default PostViews
