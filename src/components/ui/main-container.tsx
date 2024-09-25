interface MainContainerProps {
  children: React.ReactNode
}

const MainContainer = ({ children }: MainContainerProps) => {
  return <main className="min-h-main">{children}</main>
}

export default MainContainer
