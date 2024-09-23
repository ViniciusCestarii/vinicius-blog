'use client'

import { useAuth } from '@/context/auth-context'
import { PostMetadata } from '@/lib/blog/utils'
import React from 'react'
import { Badge } from '../badge'

interface PostStatusProps {
  status: PostMetadata['status']
}

const PostStatus = ({ status }: PostStatusProps) => {
  const { isAdmin } = useAuth()

  if (!isAdmin) return null

  return (
    <Badge
      variant={status === 'published' ? 'default' : 'destructive'}
      className="w-fit ml-auto"
    >
      {status}
    </Badge>
  )
}

export default PostStatus
