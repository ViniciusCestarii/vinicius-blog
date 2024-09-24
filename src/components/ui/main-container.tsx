interface MainContainerProps {
  children: React.ReactNode
}

const MainContainer = ({ children }: MainContainerProps) => {
  return <main className="h-main">{children}</main>
}

export default MainContainer
