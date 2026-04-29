/**
 * Country Configuration - Single Source of Truth
 * All pricing and currency information for the SettleIn platform
 */

export const countryConfig = {
  global: {
    name: 'Global',
    currency: 'USD',
    symbol: '$',
    currencyLabel: 'USD',
    explorer: { monthly: 9, annual: 79 },
    guides: { min: 19, max: 39 }
  },
  'new-zealand': {
    name: 'New Zealand',
    flag: '🇳🇿',
    currency: 'NZD',
    symbol: '$',
    currencyLabel: 'NZD',
    explorer: { monthly: 15, annual: 129 },
    settler: { monthly: 50, annual: 480 },
    pioneer: { cohort: 1000, spots: 100 }
  },
  ireland: {
    name: 'Ireland',
    flag: '🇮🇪',
    currency: 'EUR',
    symbol: '€',
    currencyLabel: 'EUR',
    explorer: { monthly: 9, annual: 79 },
    settler: { monthly: 25, annual: 240 },
    pioneer: { cohort: 600, spots: 100 }
  },
  canada: {
    name: 'Canada',
    flag: '🇨🇦',
    currency: 'CAD',
    symbol: '$',
    currencyLabel: 'CAD',
    explorer: { monthly: 12, annual: 99 },
    settler: { monthly: 45, annual: 430 },
    pioneer: { cohort: 1200, spots: 100 }
  },
  'united-kingdom': {
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    symbol: '£',
    currencyLabel: 'GBP',
    explorer: { monthly: 7, annual: 59 },
    settler: { monthly: 20, annual: 190 },
    pioneer: { cohort: 500, spots: 100 }
  },
  australia: {
    name: 'Australia',
    flag: '🇦🇺',
    currency: 'AUD',
    symbol: '$',
    currencyLabel: 'AUD',
    explorer: { monthly: 12, annual: 99 },
    settler: { monthly: 45, annual: 430 },
    pioneer: { cohort: 1200, spots: 100 }
  }
};

/**
 * Get country configuration by key
 * @param {string} countryKey - The country key (e.g., 'new-zealand', 'ireland')
 * @returns {object} Country configuration object
 */
export function getCountryConfig(countryKey) {
  return countryConfig[countryKey] || countryConfig.global;
}

/**
 * Format price with currency symbol
 * @param {number} amount - The price amount
 * @param {string} countryKey - The country key
 * @returns {string} Formatted price string
 */
export function formatPrice(amount, countryKey) {
  const config = getCountryConfig(countryKey);
  return `${config.symbol}${amount} ${config.currencyLabel}`;
}

/**
 * Get all active countries (currently New Zealand and Ireland)
 * @returns {array} Array of active country configurations
 */
export function getActiveCountries() {
  return [
    { key: 'new-zealand', ...countryConfig['new-zealand'] },
    { key: 'ireland', ...countryConfig.ireland }
  ];
}

/**
 * Get coming soon countries
 * @returns {array} Array of coming soon country configurations
 */
export function getComingSoonCountries() {
  return [
    { key: 'canada', ...countryConfig.canada },
    { key: 'united-kingdom', ...countryConfig['united-kingdom'] },
    { key: 'australia', ...countryConfig.australia }
  ];
}
