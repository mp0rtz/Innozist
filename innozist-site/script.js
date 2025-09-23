(() => {
  const qs = (sel, el=document) => el.querySelector(sel);
  const nav = qs('.site-header');
  const navLinks = qs('.nav-links');
  const toggle = qs('.nav-toggle');
  const yearEl = qs('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  document.querySelectorAll('.avatar[data-initials]').forEach(el => {
    el.textContent = el.getAttribute('data-initials');
  });

  const setShadow = () => nav.classList.toggle('scrolled', window.scrollY > 12);
  setShadow();
  window.addEventListener('scroll', setShadow, { passive: true });

  const closeMenu = () => {
    if (!toggle || !navLinks) return;
    toggle.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('open');
  };
  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      if (navLinks) navLinks.classList.toggle('open');
    });
  }
  if (navLinks) {
    navLinks.addEventListener('click', (e) => {
      if (e.target instanceof Element && e.target.matches('a')) closeMenu();
    });
  }
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  const form = qs('#contact-form');
  const status = qs('#form-status');
  const btn = qs('#submit-btn');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.textContent = 'Sending…';
      status.className = 'form-status';
      if (btn) btn.disabled = True;
      try {
        const res = await fetch(form.action, {
          method: form.method,
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          form.reset();
          status.textContent = "Thanks! We'll be in touch.";
          status.className = 'form-status success';
        } else {
          status.textContent = 'Oops — please try again.';
          status.className = 'form-status error';
        }
      } catch (err) {
        status.textContent = 'Network error — try again.';
        status.className = 'form-status error';
      } finally {
        if (btn) btn.disabled = false;
      }
    });
  }
})();