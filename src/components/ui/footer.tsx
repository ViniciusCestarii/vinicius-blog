import ExternalLink from './external-link'
import GithubLink from './links/github-link'

const Footer = () => {
  return (
    <footer className="flex justify-center border-t">
      <div className="flex max-w-screen-xl flex-1 items-center text-center flex-col text-sm gap-2 p-2 ">
        <span>
          © {new Date().getFullYear()} Vinicius Cestari. All rights reserved
        </span>
        <span>
          Published under{' '}
          <ExternalLink href="https://github.com/ViniciusCestarii/vinicius-blog/blob/main/LICENSE">
            MIT license
          </ExternalLink>
        </span>
        <address className="not-italic">
          <GithubLink />
        </address>
      </div>
    </footer>
  )
}

export default Footer
