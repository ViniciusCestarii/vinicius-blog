'use client'

import { useAuth } from '@/context/auth-context'

interface AdminOnlyProps {
  children: React.ReactNode
}

const AdminOnly = ({ children }: AdminOnlyProps) => {
  const { isAdmin } = useAuth()

  if (!isAdmin) return null

  return children
}

export default AdminOnly
