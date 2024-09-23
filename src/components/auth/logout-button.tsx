'use client'

import { useAuth } from '@/context/auth-context'
import { Button } from '../ui/button'
import { DoorOpen } from 'lucide-react'

const LogoutButton = () => {
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

export default LogoutButton
