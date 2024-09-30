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
import PostContariner from '@/components/ui/post/post-container'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Textarea } from '@/components/ui/textarea'
import { Post } from '@/lib/blog/types'
import { updatePostCommit } from '@/lib/github/blog'
import dynamic from 'next/dynamic'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

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
  const [isPending, startTransition] = useTransition()

  const updateBlogPost = () =>
    startTransition(async () => {
      const { title } = post.metadata
      try {
        await updatePostCommit({
          metadata: {
            ...post.metadata,
            description,
            status,
            publishedAt,
            tags,
          },
          content,
        })
        toast.success(`Post ${title} updated!`, {
          description:
            'It may take a few seconds to see the changes on the site',
        })
        setOpenDialog(false)
      } catch (error) {
        console.error(error)
        toast.error(`Couldn't update post ${title}!`)
      }
    })
  return (
    <Dialog open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
      <DialogTrigger asChild>
        <Button>Edit post</Button>
      </DialogTrigger>
      <DialogContent className="p-4 max-w-screen-2xl">
        <DialogHeader>
          <DialogTitle>Edit post</DialogTitle>
          <DialogDescription>
            Fill in the form below to edit the post
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-auto h-[80vh]">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Edit metadata</AccordionTrigger>
              <AccordionContent className="space-y-4 px-1">
                <div>
                  <label htmlFor="edit-description">Description</label>
                  <Textarea
                    placeholder="A short description of the post"
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

          <ResizablePanelGroup
            direction="horizontal"
            className="max-h-[calc(80vh_-6rem)]"
          >
            <ResizablePanel defaultSize={60}>
              <label htmlFor="edit-content">Content</label>
              <Textarea
                id="edit-content"
                placeholder="Write your post here."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-96"
              />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
              <PostContariner className="border-b sm:border-none h-full overflow-auto">
                <ClientMdxViewer source={content} />
              </PostContariner>
            </ResizablePanel>
          </ResizablePanelGroup>
          <DialogFooter>
            <Button type="submit" disabled={isPending} onClick={updateBlogPost}>
              Edit post
            </Button>
          </DialogFooter>
        </div>
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
