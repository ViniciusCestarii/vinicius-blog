import React from 'react'
import { Button } from '../button'
import Link from 'next/link'
import { Github } from '../icons'

const GithubLink = () => {
  return (
    <Button asChild size="icon" variant="ghost" className="group">
      <Link
        href="https://github.com/ViniciusCestarii"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github className="size-icon group-hover:animate-spin p-[0.05px]" />
      </Link>
    </Button>
  )
}

export default GithubLink
