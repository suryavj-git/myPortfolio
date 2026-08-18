document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle'); 
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scroll reveal for sections ---------- */
  const sections = document.querySelectorAll('.section');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => revealObserver.observe(section));

  /* ---------- Contact modal open/close ---------- */
  const modal = document.getElementById('contactModal');
  const openBtn = document.getElementById('openContactModal');
  const closeBtn = document.getElementById('closeContactModal');

  if (modal && openBtn && closeBtn) {
    openBtn.addEventListener('click', () => {
      modal.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  /* ---------- Contact form submit (Netlify Forms, no page reload) ---------- */
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccessMsg');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: data
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          form.style.display = 'none';
          if (successMsg) successMsg.style.display = 'block';
        } else {
          console.error('Web3Forms error:', json);
        }
      })
      .catch((err) => {
        console.error('Form submission error:', err);
      });
  });
}

});
