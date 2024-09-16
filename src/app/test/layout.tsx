import { ThemeToggle } from '@/components/theme/toggle'
import PageTitle from '@/components/ui/page-title'

export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <header className="flex justify-between">
        <PageTitle component="span">Vinicius Cestari</PageTitle>
        <ThemeToggle />
      </header>
      {children}
    </>
  )
}
