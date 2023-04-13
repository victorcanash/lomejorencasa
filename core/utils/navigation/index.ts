export const scrollToSection = (id?: string) => {
  setTimeout(() => {
    if (!id) {
      id = window.location.hash.replace('#', '');
    }
    const element = window.document.getElementById(id);
    if (element) {
      const r = element.getBoundingClientRect();
      window.top?.scroll({
        top: scrollY + r.top,
        behavior: 'smooth',
      });
    }
  }, 600);
};
