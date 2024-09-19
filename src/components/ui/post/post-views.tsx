import { getViews } from '@/server/storage'
import { Eye } from 'lucide-react'
import React from 'react'

interface PostViewsProps {
  slug: string
}

export const PostViewTemplate = ({ views }: { views?: number }) => (
  <div className="flex items-center gap-2" title="Views">
    <dt className="m-0">
      <span className="sr-only">Views</span> <Eye className="size-icon" />
    </dt>
    <dd className="p-0 m-0 text-sm min-w-7">{views}</dd>
  </div>
)

const PostViews = async ({ slug }: PostViewsProps) => {
  const views = await getViews(slug)
  return <PostViewTemplate views={views} />
}

export default PostViews
