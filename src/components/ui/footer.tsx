import GithubLink from './links/github-link'

const Footer = () => {
  return (
    <footer className="flex justify-center z-10 border-t sticky top-0 backdrop-blur-sm bg-background/45">
      <div className="flex max-w-screen-xl flex-1 items-center text-center flex-col text-sm gap-2 p-2 ">
        <span>© 2024 Vinicius Cestari. All rights reserved</span>
        <span>
          Published under{' '}
          <a
            className="underline"
            target="_blank"
            href="https://github.com/ViniciusCestarii/vinicius-blog/blob/main/LICENSE"
            rel="noopener noreferrer"
          >
            MIT license
          </a>
        </span>
        <address className="not-italic">
          <GithubLink />
        </address>
      </div>
    </footer>
  )
}

export default Footer
