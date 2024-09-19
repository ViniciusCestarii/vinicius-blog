import React from 'react'
import { ThemeToggle } from '../theme/toggle'
import GithubLink from './links/github-link'

const PageHeaderButtons = () => {
  return (
    <div className="flex gap-3">
      <ThemeToggle />
      <GithubLink />
    </div>
  )
}

export default PageHeaderButtons
