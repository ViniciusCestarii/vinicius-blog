import { ThemeToggle } from '@/components/theme/toggle'
import HeaderContainer from '@/components/ui/header-container'
import PageTitle from '@/components/ui/page-title'

export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <HeaderContainer>
        <PageTitle component="a">Vinicius Cestari</PageTitle>
        <ThemeToggle />
      </HeaderContainer>
      {children}
    </>
  )
}
