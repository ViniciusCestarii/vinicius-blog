import { removeAuthToken } from '@/server/auth'
import { Button } from '../ui/button'
import { DoorOpen } from 'lucide-react'

const LogoutButton = () => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={removeAuthToken}
      title="Log out"
      className="group"
    >
      <DoorOpen className="size-icon group-hover:animate-ping" />
    </Button>
  )
}

export default LogoutButton
