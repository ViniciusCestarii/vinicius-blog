'use client'

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
import { createPostCommit } from '@/lib/github/create-blog'
import { useState } from 'react'

export const CreatePostDialog = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [title, setTitle] = useState('')

  const createBlogPost = async () => {
    const trimmedTitle = title.trim()

    if (!trimmedTitle) return

    try {
      await createPostCommit({
        title: trimmedTitle,
      })
      setOpenDialog(false)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Dialog open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
      <DialogTrigger asChild>
        <Button>Create new post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new post</DialogTitle>
          <DialogDescription>
            Fill in the form below to create a new post
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={createBlogPost}>
            Create post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
