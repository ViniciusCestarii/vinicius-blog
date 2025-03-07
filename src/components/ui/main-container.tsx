import React, { unstable_ViewTransition as ViewTransition } from 'react'

interface MainContainerProps {
  children: React.ReactNode
}

const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <ViewTransition name="main-container">
      <main className="min-h-main page-layout">{children}</main>
    </ViewTransition>
  )
}

export default MainContainer
