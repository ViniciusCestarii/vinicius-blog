import Link from 'next/link'

export default function PageTitle({
  children,
  component = 'h1',
}: Readonly<{
  children: React.ReactNode
  component?: 'h1' | 'a'
}>) {
  if (component === 'a') {
    return (
      <Link href="/" className="text-2xl font-medium">
        {children}
      </Link>
    )
  }

  return <h1 className="text-2xl font-medium">{children}</h1>
}
