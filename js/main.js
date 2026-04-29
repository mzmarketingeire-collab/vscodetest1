/**
 * SettleIn - Main JavaScript
 * Handles navigation, forms, animations, and interactive elements
 */

// Import country configuration
import { countryConfig, formatPrice } from './countryConfig.js';

// ============================================================
// Navigation
// ============================================================

// Sticky navigation on scroll
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Mobile menu toggle
const hamburger = document.querySelector('.nav-hamburger');
const mobileMenu = document.querySelector('.nav-mobile');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.style.display === 'flex';
    mobileMenu.style.display = isOpen ? 'none' : 'flex';
    hamburger.setAttribute('aria-expanded', !isOpen);
    
    // Animate hamburger icon
    hamburger.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a link
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.style.display = 'none';
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.classList.remove('active');
    });
  });
}

// ============================================================
// FAQ Accordion
// ============================================================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  
  if (question && answer) {
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('open');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });
      
      // Toggle current item
      item.classList.toggle('open');
      
      if (!isOpen) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = null;
      }
    });
  }
});

// ============================================================
// Lead Magnet Forms
// ============================================================

// Scam Checklist Form
const scamForm = document.getElementById('scam-checklist-form');
const scamSuccess = document.getElementById('scam-success');

if (scamForm && scamSuccess) {
  scamForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(scamForm);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      type: 'scam-checklist'
    };
    
    // TODO: Send to your email service (Mailchimp, ConvertKit, etc.)
    console.log('Scam checklist signup:', data);
    
    // Show success message
    scamForm.style.display = 'none';
    scamSuccess.style.display = 'block';
    
    // Optional: Track conversion
    if (typeof gtag !== 'undefined') {
      gtag('event', 'lead_magnet_signup', {
        'event_category': 'Lead Generation',
        'event_label': 'Scam Checklist'
      });
    }
  });
}

// Cost of Living Calculator Form
const calculatorForm = document.getElementById('calculator-form');
const calculatorSuccess = document.getElementById('calculator-success');

if (calculatorForm && calculatorSuccess) {
  calculatorForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(calculatorForm);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      destination: formData.get('destination'),
      type: 'cost-calculator'
    };
    
    // TODO: Send to your email service
    console.log('Calculator signup:', data);
    
    // Show success message
    calculatorForm.style.display = 'none';
    calculatorSuccess.style.display = 'block';
    
    // Optional: Track conversion
    if (typeof gtag !== 'undefined') {
      gtag('event', 'lead_magnet_signup', {
        'event_category': 'Lead Generation',
        'event_label': 'Cost Calculator'
      });
    }
  });
}

// ============================================================
// Scroll Reveal Animations
// ============================================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optionally unobserve after revealing
      // observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with .reveal class
const revealElements = document.querySelectorAll('.reveal');
revealElements.forEach(el => observer.observe(el));

// ============================================================
// Pioneer Spots Counter Animation
// ============================================================

const spotsCounter = document.getElementById('spots-remaining');

if (spotsCounter) {
  const targetNumber = parseInt(spotsCounter.textContent);
  let currentNumber = Math.max(0, targetNumber - 20);
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && currentNumber < targetNumber) {
        const duration = 1500;
        const increment = (targetNumber - currentNumber) / (duration / 16);
        
        const animate = () => {
          currentNumber += increment;
          if (currentNumber < targetNumber) {
            spotsCounter.textContent = Math.floor(currentNumber);
            requestAnimationFrame(animate);
          } else {
            spotsCounter.textContent = targetNumber;
          }
        };
        
        animate();
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counterObserver.observe(spotsCounter);
}

// ============================================================
// Smooth Scroll for Anchor Links
// ============================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Skip if it's just "#"
    if (href === '#') {
      e.preventDefault();
      return;
    }
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navHeight = nav.offsetHeight;
      const targetPosition = target.offsetTop - navHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================================
// Pricing Toggle (for pages with monthly/annual toggle)
// ============================================================

const pricingToggle = document.querySelector('.toggle-switch');
const monthlyLabel = document.querySelector('.pricing-toggle span:first-child');
const annualLabel = document.querySelector('.pricing-toggle span:last-child');

if (pricingToggle && monthlyLabel && annualLabel) {
  pricingToggle.addEventListener('click', () => {
    const isAnnual = pricingToggle.classList.toggle('on');
    
    monthlyLabel.classList.toggle('active', !isAnnual);
    annualLabel.classList.toggle('active', isAnnual);
    
    // Update pricing display
    updatePricingDisplay(isAnnual);
  });
}

function updatePricingDisplay(isAnnual) {
  // This function would update pricing cards based on toggle
  // Implementation depends on your pricing card structure
  const pricingCards = document.querySelectorAll('[data-monthly-price]');
  
  pricingCards.forEach(card => {
    const monthlyPrice = card.getAttribute('data-monthly-price');
    const annualPrice = card.getAttribute('data-annual-price');
    const priceElement = card.querySelector('.plan-price');
    const periodElement = card.querySelector('.plan-period');
    
    if (priceElement && periodElement) {
      if (isAnnual) {
        priceElement.textContent = annualPrice;
        periodElement.textContent = '/year';
      } else {
        priceElement.textContent = monthlyPrice;
        periodElement.textContent = '/month';
      }
    }
  });
}

// ============================================================
// Form Validation Helpers
// ============================================================

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showFormError(form, message) {
  let errorDiv = form.querySelector('.form-error');
  
  if (!errorDiv) {
    errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.5rem;';
    form.appendChild(errorDiv);
  }
  
  errorDiv.textContent = message;
  setTimeout(() => {
    errorDiv.textContent = '';
  }, 5000);
}

// ============================================================
// Country-specific Pricing Display
// ============================================================

// Detect user's country and show relevant pricing
// This is a simple implementation - you might want to use a geolocation API
function detectUserCountry() {
  // Check URL parameters first
  const urlParams = new URLSearchParams(window.location.search);
  const countryParam = urlParams.get('country');
  
  if (countryParam && countryConfig[countryParam]) {
    return countryParam;
  }
  
  // Check localStorage
  const savedCountry = localStorage.getItem('settlein_country');
  if (savedCountry && countryConfig[savedCountry]) {
    return savedCountry;
  }
  
  // Default to global
  return 'global';
}

// Save country preference
function saveCountryPreference(countryKey) {
  localStorage.setItem('settlein_country', countryKey);
}

// ============================================================
// Dropdown Menu (Desktop)
// ============================================================

const dropdowns = document.querySelectorAll('.nav-dropdown');

dropdowns.forEach(dropdown => {
  const toggle = dropdown.querySelector('.nav-dropdown-toggle');
  const menu = dropdown.querySelector('.nav-dropdown-menu');
  
  if (toggle && menu) {
    // Desktop hover
    dropdown.addEventListener('mouseenter', () => {
      menu.classList.add('open');
    });
    
    dropdown.addEventListener('mouseleave', () => {
      menu.classList.remove('open');
    });
    
    // Mobile click
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        menu.classList.toggle('open');
      }
    });
  }
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-dropdown')) {
    document.querySelectorAll('.nav-dropdown-menu').forEach(menu => {
      menu.classList.remove('open');
    });
  }
});

// ============================================================
// Page-specific Initialization
// ============================================================

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
  console.log('SettleIn platform initialized');
  
  // Detect and save country preference
  const userCountry = detectUserCountry();
  console.log('User country:', userCountry);
  
  // Add any page-specific initialization here
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  console.log('Current page:', currentPage);
});

// ============================================================
// Export for use in other modules
// ============================================================

export {
  validateEmail,
  showFormError,
  detectUserCountry,
  saveCountryPreference,
  countryConfig,
  formatPrice
};
