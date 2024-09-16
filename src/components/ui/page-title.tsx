export default function PageTitle({
  children,
  component = 'h1',
}: Readonly<{
  children: React.ReactNode
  component?: 'h1' | 'span'
}>) {
  if (component === 'span') {
    return <span className="text-2xl font-medium">{children}</span>
  }

  return <h1 className="text-2xl font-medium">{children}</h1>
}
