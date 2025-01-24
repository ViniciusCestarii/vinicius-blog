import { Suspense } from 'react'
import PostSearch from './post-search'
import CreatePostDialog from './create-post-dialog'
import { fetchAuth } from '@/server/auth'

const PostListHeader = async () => {
  const isAuthenticated = await fetchAuth()
  return (
    <div className="flex w-full items-center">
      <Suspense
        fallback={
          <div className="bg-card rounded-md border border-input w-full h-9" />
        }
      >
        <PostSearch />
      </Suspense>
      {isAuthenticated && <CreatePostDialog />}
    </div>
  )
}

export default PostListHeader
