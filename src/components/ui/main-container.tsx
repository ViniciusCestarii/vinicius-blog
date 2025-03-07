import React, { unstable_ViewTransition as ViewTransition } from 'react'

interface MainContainerProps {
  children: React.ReactNode
}
// using the default behavior of ViewTransition
// which is to fade in and out the children
const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <ViewTransition>
      <main className="min-h-main page-layout">{children}</main>
    </ViewTransition>
  )
}

export default MainContainer
