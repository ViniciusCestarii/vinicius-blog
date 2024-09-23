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
import { Input } from '@/components/ui/input'
import { deletePostCommit } from '@/lib/github/blog'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

interface DeletePostDialogProps {
  slug: string
  title: string
}

const DeletePostDialogBase = ({ slug, title }: DeletePostDialogProps) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [titleToConfirm, setTitleToConfirm] = useState('')
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const trimmedTitleToConfirm = titleToConfirm.trim()

  const deleteBlogPost = () =>
    startTransition(async () => {
      if (!trimmedTitleToConfirm || trimmedTitleToConfirm !== title) return

      try {
        await deletePostCommit(slug)
        toast.success(`Post ${title} deleted!`, {
          description: 'It may take a few seconds to disappear from the site',
        })
        setTitleToConfirm('')
        setOpenDialog(false)
        router.push('/')
      } catch (error) {
        console.error(error)
        toast.error(`Couldn't delete post ${title}!`)
      }
    })

  return (
    <Dialog open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete post {title}</DialogTitle>
          <DialogDescription>
            Confirm the title of the post to delete
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="title" className="text-right">
              Title
            </label>
            <Input
              id="title"
              className="col-span-3"
              value={titleToConfirm}
              onChange={(e) => setTitleToConfirm(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            variant="destructive"
            disabled={isPending || trimmedTitleToConfirm !== title}
            onClick={deleteBlogPost}
          >
            Delete post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const DeletePostDialog = (props: DeletePostDialogProps) => {
  return (
    <AdminOnly>
      <DeletePostDialogBase {...props} />
    </AdminOnly>
  )
}

export default DeletePostDialog
