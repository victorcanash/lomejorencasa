export const scrollToSection = (id?: string, smooth = true, addedY = 121) => {
  setTimeout(() => {
    if (id == null) {
      id = window.location.hash.replace('#', '')
    }
    const element = window.document.getElementById(id)
    if (element != null) {
      const r = element.getBoundingClientRect()
      window.top?.scroll({
        top: scrollY + (r.top - addedY),
        behavior: smooth ? 'smooth' : undefined
      })
    }
  }, smooth ? 600 : 0)
}
