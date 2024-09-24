'use client'

import { useEffect } from 'react'

const CopyBehavior = () => {
  useEffect(() => {
    const copyButtons = document.querySelectorAll('.rehype-pretty-copy')

    copyButtons.forEach((button) => {
      // @ts-expect-error: Ignoring type error for onclick property on button element
      button.onclick = function () {
        navigator.clipboard.writeText(this.getAttribute('data')!)

        this.classList.add('rehype-pretty-copied')

        window.setTimeout(() => {
          this.classList.remove('rehype-pretty-copied')
        }, 3000)
      }
    })
  }, [])

  return null
}

export default CopyBehavior
