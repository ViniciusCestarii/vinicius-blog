'use client'

import { useAuth } from '@/context/auth-context'
import { Pencil } from 'lucide-react'
import React from 'react'

interface PostTitleProps {
  children: React.ReactNode
}

const PostTitle = ({ children }: PostTitleProps) => {
  const { isAdmin } = useAuth()
  return (
    <h2 className="text-3xl font-semibold flex justify-between gap-2">
      {children} {isAdmin && <Pencil className="flex-shrink-0" />}
    </h2>
  )
}

export default PostTitle
