import Link from 'next/link'
import LogoutButton from '../auth/logout-button'
import { fetchAuth } from '@/server/auth'

interface PageTitleProps {
  children: React.ReactNode
  component?: 'h1' | 'a'
}

const PageTitle = async ({ children, component = 'h1' }: PageTitleProps) => {
  const isAuthenticated = await fetchAuth()
  if (component === 'a') {
    return (
      <div className="text-2xl font-medium flex items-center gap-1">
        <Link href="/">{children}</Link>
        {isAuthenticated && <LogoutButton />}
      </div>
    )
  }

  return (
    <h1 className="text-2xl font-medium flex items-center gap-1">
      {children} {isAuthenticated && <LogoutButton />}
    </h1>
  )
}

export default PageTitle
