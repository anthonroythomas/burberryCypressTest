export const COMMON_SELECTORS = {
  HEADER: '[data-testid="header"], header, .header',
  NAVIGATION: '[data-testid="navigation"], nav, .navigation',
  FOOTER: '[data-testid="footer"], footer, .footer',
  COOKIE_BANNER: '[data-testid="cookie-banner"], .cookie-banner, #cookie-consent',
  SEARCH_ICON: '[data-testid="search-icon"], .search-icon, [aria-label="Search"]',
  CART_ICON: '[data-testid="cart-icon"], .cart-icon, [aria-label*="Cart"], [aria-label*="Bag"]',
  ACCOUNT_ICON: '[data-testid="account-icon"], .account-icon, [aria-label*="Account"]',
  LOGO: '[data-testid="logo"], .logo, a[href="/"]',
  LOADING: '[data-testid="loading"], .loading, .spinner'
} as const;