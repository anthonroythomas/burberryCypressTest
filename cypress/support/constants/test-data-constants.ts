export const TEST_DATA = {
  VALID_EMAIL: 'test@example.com',
  INVALID_EMAIL: 'invalid-email',
  TEST_PASSWORD: 'TestPassword123!',
  SEARCH_TERMS: {
    VALID: ['coat', 'bag', 'shoes', 'scarf'],
    INVALID: ['xyz123nonexistent', 'qwerty999'],
    POPULAR: ['trench coat', 'handbag', 'sneakers']
  },
  PRODUCT_SIZES: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  COUNTRIES: ['United Kingdom', 'United States', 'Canada', 'Australia'],
  CURRENCIES: ['GBP', 'USD', 'EUR', 'CAD']
} as const;