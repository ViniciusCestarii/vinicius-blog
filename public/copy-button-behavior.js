const copyButtons = document.querySelectorAll('.rehype-pretty-copy')

copyButtons.forEach((button) => {
  console.log(button)
  button.onclick = function () {
    navigator.clipboard.writeText(this.getAttribute('data'))

    this.classList.add('rehype-pretty-copied')

    window.setTimeout(() => {
      this.classList.remove('rehype-pretty-copied')
    }, 3000)
  }
})
