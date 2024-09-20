'use client'

import { getViews, incrementViews } from '@/server/storage'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Eye } from 'lucide-react'
import React, { useEffect } from 'react'

interface PostViewsProps {
  slug: string
  increment?: boolean
}

export const PostViewTemplate = ({ views }: { views?: number }) => (
  <div className="flex items-center gap-2" title="Views">
    <dt className="m-0">
      <span className="sr-only">Views</span> <Eye className="size-icon" />
    </dt>
    <dd className="p-0 m-0 text-sm leading-4 min-w-8 text-start">{views}</dd>
  </div>
)

const PostViews = ({ slug, increment }: PostViewsProps) => {
  const query = useQuery({
    queryKey: ['views', slug],
    queryFn: () => getViews(slug),
    staleTime: 1000 * 60 * 60,
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => incrementViews(slug),
    onMutate: () => {
      if (!query.data) {
        return
      }
      const previousViews = query.data
      queryClient.setQueryData(['views', slug], (data: number) =>
        data ? data + 1 : undefined,
      )
      return { previousViews }
    },
    onError: (_err, _newViews, context) => {
      queryClient.setQueryData(['views', slug], context?.previousViews)
    },
  })

  useEffect(() => {
    if (increment) {
      mutation.mutate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <PostViewTemplate views={query.data} />
}

export default PostViews
