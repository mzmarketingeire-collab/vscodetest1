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

/* ---------- Cursor Trail Effect ---------- */
(function () {
  // Only run on non-touch devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  let lastTime = 0;
  const throttleDelay = 30; // ms between trail particles

  function createTrailParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'cursor-trail';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    document.body.appendChild(particle);

    // Remove particle after animation completes
    setTimeout(function () {
      particle.remove();
    }, 500);
  }

  document.addEventListener('mousemove', function (e) {
    const currentTime = Date.now();
    
    // Throttle particle creation
    if (currentTime - lastTime < throttleDelay) return;
    lastTime = currentTime;

    createTrailParticle(e.clientX, e.clientY);
  });
})();

/* ---------- Interactive World Map (Leaflet.js) ---------- */
(function () {
  const mapElement = document.getElementById('world-map');
  if (!mapElement || typeof L === 'undefined') return;

  // Initialize map - centered to show all key locations (Ireland, NZ, UK, Australia, Canada, USA)
  const map = L.map('world-map', {
    center: [15, 40],
    zoom: 2,
    minZoom: 1,
    maxZoom: 6,
    scrollWheelZoom: false,
    zoomControl: true
  });

  // Add dark tile layer
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(map);

  // Country data with coordinates and status
  const countries = {
    // Green - Live
    ireland: { coords: [53.4, -8.0], color: '#10b981', status: 'live', name: 'Ireland', link: 'ireland.html' },
    newZealand: { coords: [-40.9, 174.0], color: '#10b981', status: 'live', name: 'New Zealand', link: 'new-zealand.html' },
    
    // Amber - Coming Soon
    uk: { coords: [54.0, -2.0], color: '#f59e0b', status: 'soon', name: 'United Kingdom' },
    australia: { coords: [-26.0, 133.0], color: '#f59e0b', status: 'soon', name: 'Australia' },
    canada: { coords: [56.0, -106.0], color: '#f59e0b', status: 'soon', name: 'Canada' },
    usa: { coords: [37.0, -95.0], color: '#f59e0b', status: 'soon', name: 'United States' }
  };

  // Create markers for each country
  Object.keys(countries).forEach(function (key) {
    const country = countries[key];
    
    const marker = L.circleMarker(country.coords, {
      radius: 12,
      fillColor: country.color,
      color: '#fff',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8
    }).addTo(map);

    // Create popup content
    let popupContent = '<div style="text-align:center;padding:0.5rem;background:#fff;border-radius:8px">';
    popupContent += '<strong style="font-size:1.1rem;color:#0a0f1e">' + country.name + '</strong><br/>';
    
    if (country.status === 'live') {
      popupContent += '<span style="color:#059669;font-size:0.85rem;font-weight:600">✓ Full guides available</span><br/>';
      popupContent += '<a href="' + country.link + '" style="display:inline-block;margin-top:0.5rem;padding:0.4rem 1rem;background:#10b981;color:#fff;text-decoration:none;border-radius:6px;font-size:0.85rem;font-weight:600">Explore →</a>';
    } else if (country.status === 'soon') {
      popupContent += '<span style="color:#d97706;font-size:0.85rem;font-weight:600">Coming Soon</span><br/>';
      popupContent += '<button onclick="showWaitlistForm(\'' + country.name + '\')" style="margin-top:0.5rem;padding:0.4rem 1rem;background:#f59e0b;color:#fff;border:none;border-radius:6px;font-size:0.85rem;font-weight:600;cursor:pointer">Join Waitlist</button>';
    }
    
    popupContent += '</div>';

    marker.bindPopup(popupContent);

    // Click handler
    marker.on('click', function () {
      if (country.status === 'live' && country.link) {
        // Popup will show, user can click the link
      }
    });

    // Hover effect
    marker.on('mouseover', function () {
      this.setStyle({ radius: 14, fillOpacity: 1 });
    });
    
    marker.on('mouseout', function () {
      this.setStyle({ radius: 12, fillOpacity: 0.8 });
    });
  });

  // Responsive map height and positioning
  function adjustMapHeight() {
    if (window.innerWidth < 768) {
      mapElement.style.height = '400px';
      map.setView([10, 60], 1.5); // Better mobile view
      map.invalidateSize();
    } else {
      mapElement.style.height = '500px';
      map.setView([15, 40], 2); // Desktop view showing all locations
      map.invalidateSize();
    }
  }

  window.addEventListener('resize', adjustMapHeight);
  adjustMapHeight();
})();

/* ---------- Waitlist Form Modal ---------- */
window.showWaitlistForm = function (countryName) {
  const email = prompt('Join the waitlist for ' + countryName + '\n\nEnter your email address:');
  if (email && email.includes('@')) {
    alert('Thanks! We\'ll notify you when ' + countryName + ' guides are available.');
    // In production, this would send to your backend
  }
};
