import { Button } from '@/components/ui/button'
import Footer from '@/components/ui/footer'
import HeaderContainer from '@/components/ui/header-container'
import MainContainer from '@/components/ui/main-container'
import PageHeaderButtons from '@/components/ui/page-header-buttons'
import PageTitle from '@/components/ui/page-title'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="px-4 page-layout bg-noise before:content-[''] before:pointer-events-none before:fixed dark:before:opacity-60 before:opacity-40 before:bottom-0 before:left-0 before:right-0 before:bg-gradient-to-b before:from-transparent before:to-background before:h-16">
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
    </div>
  )
}
