import AdminOnly from '@/components/auth/admin-only'
import { Pencil } from 'lucide-react'
import React from 'react'

interface PostTitleProps {
  children: React.ReactNode
}

const PostTitle = ({ children }: PostTitleProps) => {
  return (
    <h2 className="text-3xl z-10 relative font-semibold flex justify-between gap-2 capitalize font-geist-mono max-w-2xl not-prose">
      {children}
      <AdminOnly>
        <Pencil className="flex-shrink-0" />
      </AdminOnly>
    </h2>
  )
}

export default PostTitle
