import { Suspense } from 'react'
import PostSearch from './post-search'
import CreatePostDialog from './create-post-dialog'

const PostListHeader = () => {
  return (
    <div className="flex w-full items-center">
      <Suspense
        fallback={
          <div className="bg-card rounded-md border border-input w-full h-9" />
        }
      >
        <PostSearch />
      </Suspense>
      <CreatePostDialog />
    </div>
  )
}

export default PostListHeader
