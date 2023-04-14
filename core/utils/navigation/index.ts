export const scrollToSection = (id?: string, addedY = 121) => {
  setTimeout(() => {
    if (!id) {
      id = window.location.hash.replace('#', '');
    }
    const element = window.document.getElementById(id);
    if (element) {
      const r = element.getBoundingClientRect();
      window.top?.scroll({
        top: scrollY + (r.top - addedY),
        behavior: 'smooth',
      });
    }
  }, 600);
};
