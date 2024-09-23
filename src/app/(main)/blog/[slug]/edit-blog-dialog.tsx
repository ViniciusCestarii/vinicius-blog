'use client'

import AdminOnly from '@/components/auth/admin-only'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Post } from '@/lib/blog/utils'
import dynamic from 'next/dynamic'
import { useState } from 'react'

interface EditBlogDialogProps {
  post: Post
}

const ClientMdxViewer = dynamic(() => import('@/app/client-mdx-viewer'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})

const EditBlogDialogBase = ({ post }: EditBlogDialogProps) => {
  const [content, setContent] = useState(post.content)
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <Dialog open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
      <DialogTrigger asChild>
        <Button>Edit post</Button>
      </DialogTrigger>
      <DialogContent className="h-[90vh] p-4 max-w-screen-lg overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit post</DialogTitle>
          <DialogDescription>
            Fill in the form below to edit the post
          </DialogDescription>
        </DialogHeader>
        <div className="grid sm:grid-cols-3 gap-4 w-full">
          <form>
            <label htmlFor="edit-content">Content</label>
            <Textarea
              id="edit-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-96"
            />
          </form>
          <article className="border-b sm:border-none sm:col-span-2 h-[70vh] overflow-auto article-body">
            <ClientMdxViewer source={content} />
          </article>
        </div>
        <DialogFooter>
          <Button
            type="submit" /* disabled={isPending} onClick={createBlogPost} */
          >
            Edit post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const EditBlogDialog = (props: EditBlogDialogProps) => {
  return (
    <AdminOnly>
      <EditBlogDialogBase {...props} />
    </AdminOnly>
  )
}

export default EditBlogDialog
