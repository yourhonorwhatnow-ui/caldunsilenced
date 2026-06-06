document.addEventListener('DOMContentLoaded', () => {

  // ── MOBILE NAV ──
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    document.addEventListener('click', e => {
      if (!toggle.contains(e.target) && !links.contains(e.target))
        links.classList.remove('open');
    });
  }

  // ── LIBRARY: ACTIVE SIDEBAR ON SCROLL ──
  const articles = document.querySelectorAll('.lib-article');
  const navItems = document.querySelectorAll('.lib-nav-item');
  if (articles.length && navItems.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id;
          navItems.forEach(n => n.classList.toggle('active', n.getAttribute('href') === `#${id}`));
        }
      });
    }, { rootMargin: '-15% 0px -60% 0px' });
    articles.forEach(a => obs.observe(a));
  }

  // ── SMOOTH SCROLL ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // ── FADE IN ON SCROLL ──
  const els = document.querySelectorAll('.card, .lib-article, .hcard, .offer-card');
  if (els.length) {
    const fo = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          fo.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    els.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
      fo.observe(el);
    });
  }

});
