'use client'

import { useAuth } from '@/context/auth-context'
import Link from 'next/link'
import { Button } from './button'
import { DoorOpen } from 'lucide-react'

export default function PageTitle({
  children,
  component = 'h1',
}: Readonly<{
  children: React.ReactNode
  component?: 'h1' | 'a'
}>) {
  const { isAdmin } = useAuth()

  if (component === 'a') {
    return (
      <div className="text-2xl font-medium flex items-center gap-1">
        <Link href="/">{children}</Link>
        {isAdmin && <LogoutButton />}
      </div>
    )
  }

  return (
    <h1 className="text-2xl font-medium flex items-center gap-1">
      {children} {isAdmin && <LogoutButton />}
    </h1>
  )
}

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
