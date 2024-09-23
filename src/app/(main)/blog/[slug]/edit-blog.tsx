'use client'

import AdminOnly from '@/components/auth/admin-only'
import { Textarea } from '@/components/ui/textarea'
import { Post } from '@/lib/blog/utils'
import dynamic from 'next/dynamic'
import { useState } from 'react'

interface EditBlogProps {
  post: Post
}

const ClientMdxViewer = dynamic(() => import('@/app/client-mdx-viewer'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})

const EditBlogBase = ({ post }: EditBlogProps) => {
  const [content, setContent] = useState(post.content)

  return (
    <div className="grid grid-cols-3 gap-4">
      <section className="border-r">
        <h2>Edit Blog</h2>
        <form>
          <label htmlFor="edit-content">Content</label>
          <Textarea
            id="edit-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-96"
          />
        </form>
      </section>
      <article className="col-span-2">
        <ClientMdxViewer source={content} />
      </article>
    </div>
  )
}

const EditBlog = (props: EditBlogProps) => {
  return (
    <AdminOnly>
      <EditBlogBase {...props} />
    </AdminOnly>
  )
}

export default EditBlog
