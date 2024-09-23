'use client'

import { useAuth } from '@/context/auth-context'
import { Button } from '../ui/button'
import { DoorOpen } from 'lucide-react'
import AdminOnly from './admin-only'

const LogoutButtonBase = () => {
  const { logout } = useAuth()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={logout}
      title="Log out"
      className="group"
    >
      <DoorOpen className="size-icon group-hover:animate-ping" />
    </Button>
  )
}

const LogoutButton = () => {
  return (
    <AdminOnly>
      <LogoutButtonBase />
    </AdminOnly>
  )
}

export default LogoutButton
