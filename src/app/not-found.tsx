import { Button } from '@/components/ui/button'
import Footer from '@/components/ui/footer'
import HeaderContainer from '@/components/ui/header-container'
import MainContainer from '@/components/ui/main-container'
import PageHeaderButtons from '@/components/ui/page-header-buttons'
import PageTitle from '@/components/ui/page-title'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <HeaderContainer>
        <PageTitle>Vinicius Cestari</PageTitle>
        <PageHeaderButtons />
      </HeaderContainer>
      <MainContainer>
        <div className="flex flex-col items-center justify-center gap-4 text-center py-20">
          <h2 className="text-4xl font-bold text-foreground">
            404 - Not Found
          </h2>
          <p className="text-lg text-muted-foreground">
            Oops! The page you’re looking for doesn’t exist 😭.
          </p>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </MainContainer>
      <Footer />
    </>
  )
}
