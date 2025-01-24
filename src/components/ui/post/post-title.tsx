import { fetchAuth } from '@/server/auth'
import { Pencil } from 'lucide-react'
import React from 'react'

interface PostTitleProps {
  children: React.ReactNode
}

const PostTitle = async ({ children }: PostTitleProps) => {
  const isAuthenticated = await fetchAuth()
  return (
    <h2 className="text-3xl font-semibold flex justify-between gap-2 capitalize">
      {children}
      {isAuthenticated && <Pencil className="flex-shrink-0" />}
    </h2>
  )
}

export default PostTitle
