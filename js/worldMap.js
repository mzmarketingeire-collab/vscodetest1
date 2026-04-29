/**
 * Interactive World Map - SVG
 * Simplified world map with hover effects for SettleIn countries
 */

export function createWorldMap(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // SVG world map with simplified country paths
  const svgMap = `
    <svg viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg" class="world-map-svg">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- Background -->
      <rect width="1000" height="500" fill="#f5f5f3" />
      
      <!-- Simplified country shapes -->
      
      <!-- New Zealand -->
      <g id="new-zealand" class="map-country active" data-country="new-zealand">
        <path d="M 920 420 L 925 410 L 930 415 L 935 425 L 930 435 L 925 430 Z" fill="#1a3d2b" stroke="#2d6a4f" stroke-width="1"/>
        <path d="M 915 440 L 920 430 L 925 435 L 930 445 L 925 455 L 920 450 Z" fill="#1a3d2b" stroke="#2d6a4f" stroke-width="1"/>
      </g>
      
      <!-- Ireland -->
      <g id="ireland" class="map-country active" data-country="ireland">
        <path d="M 470 180 L 475 175 L 480 180 L 485 190 L 480 200 L 475 195 L 470 190 Z" fill="#1a3d2b" stroke="#2d6a4f" stroke-width="1"/>
      </g>
      
      <!-- United Kingdom -->
      <g id="united-kingdom" class="map-country coming-soon" data-country="united-kingdom">
        <path d="M 480 170 L 490 165 L 495 170 L 500 180 L 495 190 L 485 185 L 480 175 Z" fill="#d4a017" stroke="#e8b923" stroke-width="1" opacity="0.6"/>
      </g>
      
      <!-- Canada -->
      <g id="canada" class="map-country coming-soon" data-country="canada">
        <path d="M 150 120 L 200 110 L 250 115 L 280 130 L 270 150 L 240 160 L 200 155 L 160 145 L 140 135 Z" fill="#d4a017" stroke="#e8b923" stroke-width="1" opacity="0.6"/>
      </g>
      
      <!-- Australia -->
      <g id="australia" class="map-country coming-soon" data-country="australia">
        <path d="M 820 380 L 870 375 L 900 385 L 910 400 L 900 420 L 870 425 L 840 420 L 820 405 Z" fill="#d4a017" stroke="#e8b923" stroke-width="1" opacity="0.6"/>
      </g>
      
      <!-- Other continents (simplified, non-interactive) -->
      <path d="M 100 200 L 200 180 L 280 190 L 320 220 L 300 260 L 250 280 L 180 270 L 120 240 Z" fill="#e5e7eb" stroke="#d1d5db" stroke-width="0.5" opacity="0.4"/>
      <path d="M 350 250 L 450 230 L 520 240 L 560 270 L 540 310 L 480 330 L 400 320 L 350 290 Z" fill="#e5e7eb" stroke="#d1d5db" stroke-width="0.5" opacity="0.4"/>
      <path d="M 550 280 L 650 270 L 720 285 L 750 310 L 730 340 L 670 350 L 600 340 L 560 315 Z" fill="#e5e7eb" stroke="#d1d5db" stroke-width="0.5" opacity="0.4"/>
      <path d="M 200 320 L 280 310 L 340 325 L 360 360 L 330 390 L 270 400 L 210 385 L 190 355 Z" fill="#e5e7eb" stroke="#d1d5db" stroke-width="0.5" opacity="0.4"/>
      <path d="M 150 350 L 220 340 L 260 355 L 270 380 L 250 400 L 200 405 L 160 390 L 145 370 Z" fill="#e5e7eb" stroke="#d1d5db" stroke-width="0.5" opacity="0.4"/>
    </svg>
  `;

  container.innerHTML = svgMap;

  // Add interactivity
  const countries = container.querySelectorAll('.map-country');
  
  countries.forEach(country => {
    const countryId = country.getAttribute('data-country');
    const isActive = country.classList.contains('active');
    const isComingSoon = country.classList.contains('coming-soon');
    
    // Hover effect
    country.addEventListener('mouseenter', () => {
      country.style.filter = 'url(#glow)';
      country.style.transform = 'scale(1.05)';
      country.style.transformOrigin = 'center';
      country.style.transition = 'all 0.3s ease';
      
      // Show tooltip
      showTooltip(country, countryId, isComingSoon);
    });
    
    country.addEventListener('mouseleave', () => {
      country.style.filter = 'none';
      country.style.transform = 'scale(1)';
      hideTooltip();
    });
    
    // Click handler
    if (isActive) {
      country.style.cursor = 'pointer';
      country.addEventListener('click', () => {
        window.location.href = `${countryId}.html`;
      });
    } else if (isComingSoon) {
      country.style.cursor = 'help';
    }
  });
}

function showTooltip(element, countryId, isComingSoon) {
  const countryNames = {
    'new-zealand': 'New Zealand',
    'ireland': 'Ireland',
    'canada': 'Canada',
    'united-kingdom': 'United Kingdom',
    'australia': 'Australia'
  };
  
  let tooltip = document.getElementById('map-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'map-tooltip';
    tooltip.style.cssText = `
      position: absolute;
      background: rgba(0,0,0,0.9);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 600;
      pointer-events: none;
      z-index: 1000;
      white-space: nowrap;
    `;
    document.body.appendChild(tooltip);
  }
  
  const countryName = countryNames[countryId] || countryId;
  const status = isComingSoon ? ' (Coming Soon)' : '';
  tooltip.textContent = countryName + status;
  tooltip.style.display = 'block';
  
  // Position tooltip near cursor
  document.addEventListener('mousemove', positionTooltip);
}

function positionTooltip(e) {
  const tooltip = document.getElementById('map-tooltip');
  if (tooltip) {
    tooltip.style.left = (e.pageX + 15) + 'px';
    tooltip.style.top = (e.pageY + 15) + 'px';
  }
}

function hideTooltip() {
  const tooltip = document.getElementById('map-tooltip');
  if (tooltip) {
    tooltip.style.display = 'none';
  }
  document.removeEventListener('mousemove', positionTooltip);
}

// Initialize map when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    createWorldMap('world-map-container');
  });
} else {
  createWorldMap('world-map-container');
}
