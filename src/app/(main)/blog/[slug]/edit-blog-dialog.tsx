'use client'

import AdminOnly from '@/components/auth/admin-only'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
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
import { Input } from '@/components/ui/input'
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
  const [description, setDescription] = useState(post.metadata.description)
  const [status, setStatus] = useState(post.metadata.status)
  const [publishedAt, setPublishedAt] = useState(post.metadata.publishedAt)
  const [tags, setTags] = useState(post.metadata.tags)
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
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Edit metadata</AccordionTrigger>
            <AccordionContent className="space-y-4 px-1">
              <div>
                <label htmlFor="edit-description">Description</label>
                <Textarea
                  id="edit-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <div className="flex-1">
                  <label htmlFor="edit-tags">Tags</label>
                  <Input
                    id="edit-tags"
                    value={tags.join(',')}
                    onChange={(e) =>
                      setTags(
                        e.target.value.split(',').map((tag) => tag.trim()),
                      )
                    }
                  />
                </div>
                <div>
                  <label htmlFor="edit-published-at">Published at</label>
                  <Input
                    id="edit-published-at"
                    type="date"
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                  />
                </div>
                <Button
                  className="mt-auto"
                  variant={status === 'published' ? 'destructive' : 'default'}
                  onClick={() =>
                    status === 'published'
                      ? setStatus('draft')
                      : setStatus('published')
                  }
                >
                  {status === 'published' ? 'Unpublish' : 'Publish'}
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="grid sm:grid-cols-3 gap-4 w-full">
          <div>
            <label htmlFor="edit-content">Content</label>
            <Textarea
              id="edit-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-96"
            />
          </div>
          <article className="border-b sm:border-none sm:col-span-2 h-[70vh] overflow-auto article-body">
            <ClientMdxViewer source={content} />
          </article>
        </div>
        <DialogFooter>
          <Button type="submit" /* disabled={isPending} */>Edit post</Button>
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
