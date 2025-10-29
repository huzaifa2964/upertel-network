(function () {
  const nav = document.getElementById('mainNav');
  const backToTop = document.getElementById('backToTop');
  const yearEl = document.getElementById('year');

  // Current year
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Navbar shrink & back-to-top visibility
  const onScroll = () => {
    const scrolled = window.scrollY > 10;
    if (nav) nav.classList.toggle('navbar-scrolled', scrolled);
    if (backToTop) backToTop.classList.toggle('show', window.scrollY > 400);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Smooth scroll for internal links (Bootstrap already enables CSS smooth, but ensure offset awareness)
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - (nav?.offsetHeight || 0);
      window.scrollTo({ top, behavior: 'smooth' });
      history.pushState(null, '', hash);
    });
  });

  // Back to top
  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Initialize AOS (Animate On Scroll)
  if (window.AOS) {
    window.AOS.init({
      once: true,
      offset: 80,
      duration: 700,
      easing: 'ease-out-cubic',
    });
  }
})();


