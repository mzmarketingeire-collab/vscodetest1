/* ============================================================
   SETTLE IN — Main JavaScript
   ============================================================ */

/* ---------- Navigation ---------- */
(function () {
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile');

  // Scroll effect
  function onScroll() {
    if (window.scrollY > 20) {
      nav && nav.classList.add('scrolled');
    } else {
      nav && nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileMenu.style.display === 'flex';
      mobileMenu.style.display = isOpen ? 'none' : 'flex';
      hamburger.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  // Active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ---------- Scroll Reveal ---------- */
(function () {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(function (el) { observer.observe(el); });
})();

/* ---------- FAQ Accordion ---------- */
(function () {
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-answer').style.maxHeight = '0';
      });

      // Open clicked (if it was closed)
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
})();

/* ---------- Pricing Toggle ---------- */
(function () {
  const toggle = document.querySelector('.toggle-switch');
  const labelMonthly = document.querySelector('[data-label="monthly"]');
  const labelAnnual  = document.querySelector('[data-label="annual"]');
  const monthlyPrices = document.querySelectorAll('[data-monthly]');
  const annualPrices  = document.querySelectorAll('[data-annual]');
  const periodLabels  = document.querySelectorAll('[data-period]');

  if (!toggle) return;

  let isAnnual = false;

  function updatePricing() {
    if (isAnnual) {
      toggle.classList.add('on');
      if (labelMonthly) labelMonthly.classList.remove('active');
      if (labelAnnual)  labelAnnual.classList.add('active');
      monthlyPrices.forEach(function (el) { el.style.display = 'none'; });
      annualPrices.forEach(function (el)  { el.style.display = ''; });
      periodLabels.forEach(function (el)  { el.textContent = el.dataset.period === 'annual' ? '/year' : el.dataset.period; });
    } else {
      toggle.classList.remove('on');
      if (labelMonthly) labelMonthly.classList.add('active');
      if (labelAnnual)  labelAnnual.classList.remove('active');
      monthlyPrices.forEach(function (el) { el.style.display = ''; });
      annualPrices.forEach(function (el)  { el.style.display = 'none'; });
      periodLabels.forEach(function (el)  { el.textContent = el.dataset.period === 'monthly' ? '/month' : el.dataset.period; });
    }
  }

  toggle.addEventListener('click', function () {
    isAnnual = !isAnnual;
    updatePricing();
  });

  updatePricing();
})();

/* ---------- Smooth Scroll for Anchor Links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});

/* ---------- Waitlist Form ---------- */
(function () {
  const forms = document.querySelectorAll('.waitlist-form');
  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]');
      const btn   = form.querySelector('button[type="submit"]');
      if (!email || !email.value) return;

      // Simulate submission
      btn.textContent = 'You\'re on the list! ✓';
      btn.disabled = true;
      btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      email.disabled = true;
    });
  });
})();

/* ---------- Contact Form ---------- */
(function () {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Message Sent ✓';
    btn.disabled = true;
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
  });
})();
