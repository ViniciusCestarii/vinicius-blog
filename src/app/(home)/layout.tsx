import HeaderContainer from '@/components/ui/header-container'
import PageHeaderButtons from '@/components/ui/page-header-buttons'
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
        <PageHeaderButtons />
      </HeaderContainer>
      {children}
    </>
  )
}
