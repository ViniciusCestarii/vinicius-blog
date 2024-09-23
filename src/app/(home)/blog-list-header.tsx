import { Suspense } from 'react'
import BlogSearch from './blog-search'
import CreatePostDialog from './create-post-dialog'

const BlogListHeader = () => {
  return (
    <div className="flex w-full items-center">
      <Suspense
        fallback={
          <div className="bg-card rounded-md border border-input w-full h-9" />
        }
      >
        <BlogSearch />
      </Suspense>
      <CreatePostDialog />
    </div>
  )
}

export default BlogListHeader
