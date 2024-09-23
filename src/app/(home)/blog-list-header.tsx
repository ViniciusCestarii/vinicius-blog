'use client'
import { Suspense } from 'react'
import BlogSearch from './blog-search'
import { useAuth } from '@/context/auth-context'
import { CreatePostDialog } from './create-post-dialog'

const BlogListHeader = () => {
  const { isAdmin } = useAuth()
  return (
    <div className="flex w-full items-center">
      <Suspense
        fallback={
          <div className="bg-card rounded-md border border-input w-full h-9" />
        }
      >
        <BlogSearch />
      </Suspense>
      {isAdmin && <CreatePostDialog />}
    </div>
  )
}

export default BlogListHeader
