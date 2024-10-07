import React from 'react'
import { Button } from '../button'
import { Github } from '../icons'
import ExternalLink from '../external-link'

const GithubLink = () => {
  return (
    <Button asChild size="icon" variant="ghost" className="group">
      <ExternalLink
        href="https://github.com/ViniciusCestarii"
        aria-label="Visit Vinicius Cestarii Github"
        title="Visit Vinicius Cestarii Github"
      >
        <Github className="size-icon group-hover:animate-spin p-[0.05px]" />
      </ExternalLink>
    </Button>
  )
}

export default GithubLink
