import { ThemeToggle } from '@/components/theme/toggle'
import HeaderContainer from '@/components/ui/header-container'
import PageTitle from '@/components/ui/page-title'

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <HeaderContainer>
        <PageTitle>Vinicius Cestari</PageTitle>
        <ThemeToggle />
      </HeaderContainer>
      {children}
    </>
  )
}
