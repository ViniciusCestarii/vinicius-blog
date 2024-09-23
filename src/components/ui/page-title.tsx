import Link from 'next/link'
import AdminOnly from '../auth/admin-only'
import LogoutButton from '../auth/logout-button'

export default function PageTitle({
  children,
  component = 'h1',
}: Readonly<{
  children: React.ReactNode
  component?: 'h1' | 'a'
}>) {
  if (component === 'a') {
    return (
      <div className="text-2xl font-medium flex items-center gap-1">
        <Link href="/">{children}</Link>
        <AdminOnly>
          <LogoutButton />
        </AdminOnly>
      </div>
    )
  }

  return (
    <h1 className="text-2xl font-medium flex items-center gap-1">
      {children}{' '}
      <AdminOnly>
        <LogoutButton />
      </AdminOnly>
    </h1>
  )
}
