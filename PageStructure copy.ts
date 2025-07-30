// cypress/support/types/common.ts
export interface WaitOptions {
  timeout?: number;
  interval?: number;
}

export interface NavigationOptions {
  waitForLoad?: boolean;
  acceptCookies?: boolean;
}

export interface ProductFilter {
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  categories?: string[];
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
}

export interface TestUser {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface ProductDetails {
  title: string;
  price: string;
  description?: string;
  availableSizes?: string[];
  availableColors?: string[];
  inStock?: boolean;
  sku?: string;
}

// cypress/support/types/pages.ts
import { NavigationOptions, WaitOptions, ProductFilter } from './common';

export interface PageObject {
  visit(options?: NavigationOptions): this;
  waitForPageLoad(options?: WaitOptions): this;
  isLoaded(): Cypress.Chainable<boolean>;
}

export interface ProductInteractions {
  selectSize(size: string): this;
  selectColor(color: string): this;
  selectQuantity(quantity: number): this;
  addToBag(): this;
}

export interface FilterableList {
  applyFilters(filters: ProductFilter): this;
  clearFilters(): this;
  sortBy(sortOption: string): this;
}

export interface ProductDetails {
  title: string;
  price: string;
  description?: string;
  availableSizes?: string[];
  availableColors?: string[];
  inStock?: boolean;
  sku?: string;
}

// cypress/support/types/components.ts
export interface ComponentBase {
  verifyVisible(): this;
}

export interface NavigationComponent extends ComponentBase {
  navigateToCategory(categoryName: string): this;
}

export interface SearchComponent extends ComponentBase {
  search(searchTerm: string): this;
  getSearchResults(): Cypress.Chainable<JQuery<HTMLElement>>;
}

export interface CartComponent extends ComponentBase {
  getItemCount(): Cypress.Chainable<number>;
  openCart(): this;
}

// cypress/support/types/api.ts
export interface ApiResponse<T = any> {
  status: number;
  data: T;
  message?: string;
}

export interface ProductApiResponse {
  id: string;
  name: string;
  price: number;
  currency: string;
  availability: boolean;
  images: string[];
  sizes: string[];
  colors: string[];
}

export interface UserApiResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
}

// cypress/support/types/test-data.ts
export interface TestProduct {
  name: string;
  price: string;
  size?: string;
  color?: string;
  quantity?: number;
}

export interface TestOrder {
  products: TestProduct[];
  shippingAddress: ShippingAddress;
  paymentMethod: 'card' | 'paypal' | 'klarna';
  totalAmount: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// cypress/support/types/index.ts - Barrel export for all types
export type { WaitOptions, NavigationOptions, ProductFilter, ShippingAddress, TestUser, ProductDetails } from './common';
export type { PageObject, ProductInteractions, FilterableList } from './pages';
export type { ComponentBase, NavigationComponent, SearchComponent, CartComponent } from './components';
export type { ApiResponse, ProductApiResponse, UserApiResponse } from './api';
export type { TestProduct, TestOrder, LoginCredentials } from './test-data';

// cypress/support/constants/selectors.ts
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

// cypress/support/constants/timeouts.ts
export const TIMEOUTS = {
  DEFAULT: 10000,
  LONG: 30000,
  SHORT: 5000,
  PAGE_LOAD: 15000,
  API_CALL: 20000,
  ANIMATION: 3000,
  DEBOUNCE: 500
} as const;

// cypress/support/constants/urls.ts  
export const URLS = {
  BASE: 'https://uk.burberry.com',
  HOME: '/',
  CART: '/cart',
  CHECKOUT: '/checkout',
  LOGIN: '/login',
  REGISTER: '/register',
  SEARCH: '/search',
  WOMEN: '/women',
  MEN: '/men',
  CHILDREN: '/children',
  BAGS: '/bags',
  SHOES: '/shoes',
  ACCOUNT: '/account',
  WISHLIST: '/wishlist'
} as const;

// cypress/support/constants/test-data-constants.ts
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

// cypress/support/constants/index.ts - Barrel export for constants
export { COMMON_SELECTORS } from './selectors';
export { TIMEOUTS } from './timeouts';
export { URLS } from './urls';
export { TEST_DATA } from './test-data-constants';

// cypress/support/constants/urls.ts
export const URLS = {
  BASE: 'https://uk.burberry.com',
  HOME: '/',
  CART: '/cart',
  CHECKOUT: '/checkout',
  LOGIN: '/login',
  REGISTER: '/register',
  SEARCH: '/search',
  WOMEN: '/women',
  MEN: '/men',
  CHILDREN: '/children',
  BAGS: '/bags',
  SHOES: '/shoes'
} as const;

// cypress/support/page-objects/base/BasePage.ts
import { PageObject, NavigationOptions, WaitOptions } from '@types/common';
import { COMMON_SELECTORS, TIMEOUTS, URLS } from '@constants/index';

export abstract class BasePage implements PageObject {
  protected readonly baseUrl: string = URLS.BASE;
  protected abstract readonly path: string;

  // Common selectors with fallbacks
  protected get header(): string { return COMMON_SELECTORS.HEADER; }
  protected get navigation(): string { return COMMON_SELECTORS.NAVIGATION; }
  protected get footer(): string { return COMMON_SELECTORS.FOOTER; }
  protected get cookieBanner(): string { return COMMON_SELECTORS.COOKIE_BANNER; }
  protected get searchIcon(): string { return COMMON_SELECTORS.SEARCH_ICON; }
  protected get cartIcon(): string { return COMMON_SELECTORS.CART_ICON; }
  protected get accountIcon(): string { return COMMON_SELECTORS.ACCOUNT_ICON; }
  protected get logo(): string { return COMMON_SELECTORS.LOGO; }
  protected get loadingSpinner(): string { return COMMON_SELECTORS.LOADING; }

  /**
   * Visit the page with optional configuration
   */
  public visit(options: NavigationOptions = {}): this {
    const { waitForLoad = true, acceptCookies = false } = options;
    
    cy.visit(`${this.baseUrl}${this.path}`);
    
    if (waitForLoad) {
      this.waitForPageLoad();
    }
    
    if (acceptCookies) {
      this.acceptCookies();
    }
    
    return this;
  }

  /**
   * Wait for page to fully load
   */
  public waitForPageLoad(options: WaitOptions = {}): this {
    const { timeout = TIMEOUTS.PAGE_LOAD } = options;
    
    cy.get('body', { timeout }).should('be.visible');
    cy.get(this.loadingSpinner, { timeout }).should('not.exist');
    
    return this;
  }

  /**
   * Check if page is loaded
   */
  public isLoaded(): Cypress.Chainable<boolean> {
    return cy.get('body').then($body => $body.is(':visible'));
  }

  /**
   * Accept cookies if banner is present
   */
  public acceptCookies(): this {
    cy.get('body').then($body => {
      if ($body.find(this.cookieBanner).length > 0) {
        cy.get(this.cookieBanner).within(() => {
          cy.contains(/accept|agree/i).click();
        });
      }
    });
    return this;
  }

  /**
   * Click on the site logo
   */
  public clickLogo(): this {
    cy.get(this.logo).click();
    return this;
  }

  /**
   * Open shopping cart
   */
  public openCart(): this {
    cy.get(this.cartIcon).click();
    return this;
  }

  /**
   * Open account menu/page
   */
  public openAccount(): this {
    cy.get(this.accountIcon).click();
    return this;
  }

  /**
   * Open search functionality
   */
  public openSearch(): this {
    cy.get(this.searchIcon).click();
    return this;
  }

  /**
   * Get current URL
   */
  public getCurrentUrl(): Cypress.Chainable<string> {
    return cy.url();
  }

  /**
   * Verify current URL contains expected path
   */
  public verifyUrl(expectedPath: string): this {
    cy.url().should('include', expectedPath);
    return this;
  }

  /**
   * Scroll to element
   */
  public scrollToElement(selector: string): this {
    cy.get(selector).scrollIntoView();
    return this;
  }

  /**
   * Wait for element to be visible
   */
  protected waitForElement(selector: string, timeout: number = TIMEOUTS.DEFAULT): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(selector, { timeout }).should('be.visible');
  }
}

// cypress/support/page-objects/pages/HomePage.ts
import { BasePage } from '../base/BasePage';
import { NavigationOptions } from '@types/common';
import { URLS } from '@constants/index';

export class HomePage extends BasePage {
  protected readonly path = URLS.HOME;

  // Home page specific selectors
  private get heroSection(): string { 
    return '[data-testid="hero-section"], .hero, .hero-banner'; 
  }
  
  private get featuredProducts(): string { 
    return '[data-testid="featured-products"], .featured-products, .product-grid'; 
  }
  
  private get categoryLinks(): string { 
    return '[data-testid="category-link"], .category-link, .category-tile'; 
  }
  
  private get newsletterSignup(): string { 
    return '[data-testid="newsletter-signup"], .newsletter, .email-signup'; 
  }
  
  private get mainNavigation(): string { 
    return '[data-testid="main-nav"], .main-navigation, .primary-nav'; 
  }

  // Navigation category selectors
  private get womenCategory(): string { return 'a[href*="/women"], :contains("Women")'; }
  private get menCategory(): string { return 'a[href*="/men"], :contains("Men")'; }
  private get childrenCategory(): string { return 'a[href*="/children"], :contains("Children")'; }
  private get bagsCategory(): string { return 'a[href*="/bags"], :contains("Bags")'; }
  private get shoesCategory(): string { return 'a[href*="/shoes"], :contains("Shoes")'; }

  /**
   * Visit homepage with default options
   */
  public visit(options: NavigationOptions = { waitForLoad: true, acceptCookies: true }): this {
    return super.visit(options);
  }

  /**
   * Navigate to specific category
   */
  private navigateToCategory(categorySelector: string): this {
    cy.get(this.mainNavigation).within(() => {
      cy.get(categorySelector).first().click();
    });
    this.waitForPageLoad();
    return this;
  }

  /**
   * Navigate to Women's section
   */
  public navigateToWomen(): this {
    return this.navigateToCategory(this.womenCategory);
  }

  /**
   * Navigate to Men's section
   */
  public navigateToMen(): this {
    return this.navigateToCategory(this.menCategory);
  }

  /**
   * Navigate to Children's section
   */
  public navigateToChildren(): this {
    return this.navigateToCategory(this.childrenCategory);
  }

  /**
   * Navigate to Bags section
   */
  public navigateToBags(): this {
    return this.navigateToCategory(this.bagsCategory);
  }

  /**
   * Navigate to Shoes section
   */
  public navigateToShoes(): this {
    return this.navigateToCategory(this.shoesCategory);
  }

  /**
   * Verify hero section is visible
   */
  public verifyHeroSectionVisible(): this {
    cy.get(this.heroSection).should('be.visible');
    return this;
  }

  /**
   * Verify featured products are visible
   */
  public verifyFeaturedProductsVisible(): this {
    cy.get(this.featuredProducts).should('be.visible');
    return this;
  }

  /**
   * Get all category links
   */
  public getCategoryLinks(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.categoryLinks);
  }

  /**
   * Subscribe to newsletter
   */
  public subscribeToNewsletter(email: string): this {
    cy.get(this.newsletterSignup).within(() => {
      cy.get('input[type="email"]').type(email);
      cy.get('button[type="submit"], input[type="submit"]').click();
    });
    return this;
  }
}

// cypress/support/page-objects/pages/ProductListingPage.ts
import { BasePage } from '../base/BasePage';
import { FilterableList } from '@types/pages';
import { ProductFilter } from '@types/common';
import { TIMEOUTS } from '@constants/index';

export class ProductListingPage extends BasePage implements FilterableList {
  protected readonly path = ''; // Dynamic path based on category

  // Product listing selectors
  private get productGrid(): string { 
    return '[data-testid="product-grid"], .product-grid, .products-container'; 
  }
  
  private get productTiles(): string { 
    return '[data-testid="product-tile"], .product-tile, .product-item'; 
  }
  
  private get filterButton(): string { 
    return '[data-testid="filter-button"], .filter-button, button:contains("Filter")'; 
  }
  
  private get sortDropdown(): string { 
    return '[data-testid="sort-dropdown"], .sort-dropdown, select[name*="sort"]'; 
  }
  
  private get loadMoreButton(): string { 
    return '[data-testid="load-more"], .load-more, button:contains("Load More")'; 
  }
  
  private get resultsCount(): string { 
    return '[data-testid="results-count"], .results-count, .product-count'; 
  }
  
  private get breadcrumbs(): string { 
    return '[data-testid="breadcrumbs"], .breadcrumbs, .breadcrumb'; 
  }

  // Filter panel selectors
  private get filterPanel(): string { 
    return '[data-testid="filter-panel"], .filter-panel, .filters'; 
  }
  
  private get priceFilter(): string { 
    return '[data-testid="price-filter"], .price-filter'; 
  }
  
  private get sizeFilter(): string { 
    return '[data-testid="size-filter"], .size-filter'; 
  }
  
  private get colorFilter(): string { 
    return '[data-testid="color-filter"], .color-filter'; 
  }
  
  private get categoryFilter(): string { 
    return '[data-testid="category-filter"], .category-filter'; 
  }
  
  private get clearFiltersButton(): string { 
    return '[data-testid="clear-filters"], .clear-filters, button:contains("Clear")'; 
  }

  /**
   * Verify products are loaded
   */
  public verifyProductsLoaded(): this {
    cy.get(this.productGrid).should('be.visible');
    cy.get(this.productTiles).should('have.length.greaterThan', 0);
    return this;
  }

  /**
   * Get total number of products displayed
   */
  public getProductCount(): Cypress.Chainable<number> {
    return cy.get(this.productTiles).its('length');
  }

  /**
   * Click on a specific product by index
   */
  public clickProduct(index: number = 0): this {
    cy.get(this.productTiles).eq(index).click();
    this.waitForPageLoad();
    return this;
  }

  /**
   * Click on product by title
   */
  public clickProductByTitle(title: string): this {
    cy.get(this.productTiles).contains(title).click();
    this.waitForPageLoad();
    return this;
  }

  /**
   * Open filter panel
   */
  public openFilters(): this {
    cy.get(this.filterButton).click();
    cy.get(this.filterPanel).should('be.visible');
    return this;
  }

  /**
   * Apply comprehensive filters
   */
  public applyFilters(filters: ProductFilter): this {
    this.openFilters();

    if (filters.minPrice || filters.maxPrice) {
      this.filterByPriceRange(filters.minPrice, filters.maxPrice);
    }

    if (filters.sizes?.length) {
      filters.sizes.forEach(size => this.filterBySize(size));
    }

    if (filters.colors?.length) {
      filters.colors.forEach(color => this.filterByColor(color));
    }

    return this;
  }

  /**
   * Filter by price range
   */
  public filterByPriceRange(minPrice?: number, maxPrice?: number): this {
    if (!minPrice && !maxPrice) return this;

    cy.get(this.priceFilter).within(() => {
      if (minPrice) {
        cy.get('input[name*="min"], input[placeholder*="min"]').clear().type(minPrice.toString());
      }
      if (maxPrice) {
        cy.get('input[name*="max"], input[placeholder*="max"]').clear().type(maxPrice.toString());
      }
    });
    
    this.waitForPageLoad();
    return this;
  }

  /**
   * Filter by size
   */
  public filterBySize(size: string): this {
    cy.get(this.sizeFilter).within(() => {
      cy.contains(size).click();
    });
    this.waitForPageLoad();
    return this;
  }

  /**
   * Filter by color
   */
  public filterByColor(color: string): this {
    cy.get(this.colorFilter).within(() => {
      cy.contains(color).click();
    });
    this.waitForPageLoad();
    return this;
  }

  /**
   * Sort products by specified option
   */
  public sortBy(sortOption: string): this {
    cy.get(this.sortDropdown).select(sortOption);
    this.waitForPageLoad();
    return this;
  }

  /**
   * Clear all applied filters
   */
  public clearFilters(): this {
    cy.get(this.clearFiltersButton).click();
    this.waitForPageLoad();
    return this;
  }

  /**
   * Load more products (if pagination exists)
   */
  public loadMoreProducts(): this {
    cy.get(this.loadMoreButton).scrollIntoView().click();
    this.waitForPageLoad();
    return this;
  }

  /**
   * Get current results count
   */
  public getResultsCount(): Cypress.Chainable<string> {
    return cy.get(this.resultsCount).invoke('text');
  }

  /**
   * Verify breadcrumbs contain expected path
   */
  public verifyBreadcrumbs(expectedPath: string): this {
    cy.get(this.breadcrumbs).should('contain.text', expectedPath);
    return this;
  }
}

// cypress/support/page-objects/pages/ProductDetailPage.ts
import { BasePage } from '../base/BasePage';
import { ProductInteractions } from '@types/pages';
import { ProductDetails } from '@types/common';

export class ProductDetailPage extends BasePage implements ProductInteractions {
  protected readonly path = ''; // Dynamic path based on product

  // Product detail selectors
  private get productImages(): string { 
    return '[data-testid="product-images"], .product-images, .product-gallery'; 
  }
  
  private get mainProductImage(): string { 
    return '[data-testid="main-product-image"], .main-image, .product-image-main'; 
  }
  
  private get thumbnailImages(): string { 
    return '[data-testid="thumbnail-images"], .thumbnail-images, .product-thumbnails img'; 
  }
  
  private get productTitle(): string { 
    return '[data-testid="product-title"], .product-title, h1'; 
  }
  
  private get productPrice(): string { 
    return '[data-testid="product-price"], .product-price, .price'; 
  }
  
  private get productDescription(): string { 
    return '[data-testid="product-description"], .product-description, .description'; 
  }
  
  private get sizeSelector(): string { 
    return '[data-testid="size-selector"], .size-selector, select[name*="size"]'; 
  }
  
  private get colorSelector(): string { 
    return '[data-testid="color-selector"], .color-selector, .color-options'; 
  }
  
  private get quantitySelector(): string { 
    return '[data-testid="quantity-selector"], .quantity-selector, select[name*="quantity"]'; 
  }
  
  private get addToBagButton(): string { 
    return '[data-testid="add-to-bag"], .add-to-bag, button:contains("Add to Bag")'; 
  }
  
  private get addToWishlistButton(): string { 
    return '[data-testid="add-to-wishlist"], .add-to-wishlist, button:contains("Wishlist")'; 
  }
  
  private get sizeGuideLink(): string { 
    return '[data-testid="size-guide"], .size-guide, a:contains("Size Guide")'; 
  }
  
  private get deliveryInfo(): string { 
    return '[data-testid="delivery-info"], .delivery-info, .shipping-info'; 
  }

  /**
   * Verify product page is loaded
   */
  public verifyProductLoaded(): this {
    cy.get(this.productTitle).should('be.visible');
    cy.get(this.productPrice).should('be.visible');
    cy.get(this.mainProductImage).should('be.visible');
    return this;
  }

  /**
   * Get product details
   */
  public getProductDetails(): Cypress.Chainable<ProductDetails> {
    return cy.get(this.productTitle).invoke('text').then(title => {
      return cy.get(this.productPrice).invoke('text').then(price => {
        return { title: title.trim(), price: price.trim() };
      });
    });
  }

  /**
   * Get product title
   */
  public getProductTitle(): Cypress.Chainable<string> {
    return cy.get(this.productTitle).invoke('text');
  }

  /**
   * Get product price
   */
  public getProductPrice(): Cypress.Chainable<string> {
    return cy.get(this.productPrice).invoke('text');
  }

  /**
   * Select product size
   */
  public selectSize(size: string): this {
    cy.get(this.sizeSelector).select(size);
    return this;
  }

  /**
   * Select product color
   */
  public selectColor(color: string): this {
    cy.get(this.colorSelector).within(() => {
      cy.contains(color).click();
    });
    return this;
  }

  /**
   * Select quantity
   */
  public selectQuantity(quantity: number): this {
    cy.get(this.quantitySelector).select(quantity.toString());
    return this;
  }

  /**
   * Add product to shopping bag
   */
  public addToBag(): this {
    cy.get(this.addToBagButton).click();
    return this;
  }

  /**
   * Add product to wishlist
   */
  public addToWishlist(): this {
    cy.get(this.addToWishlistButton).click();
    return this;
  }

  /**
   * Click thumbnail image
   */
  public clickThumbnail(index: number): this {
    cy.get(this.thumbnailImages).eq(index).click();
    return this;
  }

  /**
   * Open size guide
   */
  public openSizeGuide(): this {
    cy.get(this.sizeGuideLink).click();
    return this;
  }

  /**
   * Verify add to bag success
   */
  public verifyAddToBagSuccess(): this {
    cy.contains(/added to bag|added to cart/i, { timeout: 10000 }).should('be.visible');
    return this;
  }

  /**
   * Verify product is available in specified size
   */
  public verifySizeAvailable(size: string): this {
    cy.get(this.sizeSelector).within(() => {
      cy.contains(size).should('exist').and('not.be.disabled');
    });
    return this;
  }

  /**
   * Get available sizes
   */
  public getAvailableSizes(): Cypress.Chainable<string[]> {
    return cy.get(this.sizeSelector).find('option').then($options => {
      return Array.from($options).map(option => option.textContent?.trim()).filter(Boolean) as string[];
    });
  }
}

// cypress/support/page-objects/pages/SearchPage.ts
import { BasePage } from '../base/BasePage';
import { TIMEOUTS } from '@constants/index';

export class SearchPage extends BasePage {
  protected readonly path = '/search';

  // Search page selectors
  private get searchInput(): string { 
    return '[data-testid="search-input"], .search-input, input[name*="search"]'; 
  }
  
  private get searchButton(): string { 
    return '[data-testid="search-button"], .search-button, button[type="submit"]'; 
  }
  
  private get searchResults(): string { 
    return '[data-testid="search-results"], .search-results, .results'; 
  }
  
  private get searchSuggestions(): string { 
    return '[data-testid="search-suggestions"], .search-suggestions, .suggestions'; 
  }
  
  private get noResultsMessage(): string { 
    return '[data-testid="no-results"], .no-results, .no-results-message'; 
  }
  
  private get searchResultsCount(): string { 
    return '[data-testid="search-count"], .search-count, .results-count'; 
  }

  /**
   * Perform search using search button
   */
  public search(searchTerm: string): this {
    cy.get(this.searchInput).clear().type(searchTerm);
    cy.get(this.searchButton).click();
    this.waitForPageLoad();
    return this;
  }

  /**
   * Perform search using Enter key
   */
  public searchWithEnter(searchTerm: string): this {
    cy.get(this.searchInput).clear().type(`${searchTerm}{enter}`);
    this.waitForPageLoad();
    return this;
  }

  /**
   * Select from search suggestions
   */
  public selectSuggestion(suggestionText: string): this {
    cy.get(this.searchSuggestions).within(() => {
      cy.contains(suggestionText).click();
    });
    this.waitForPageLoad();
    return this;
  }

  /**
   * Verify search results are displayed
   */
  public verifySearchResults(expectedTerm?: string): this {
    cy.get(this.searchResults).should('be.visible');
    cy.get(this.searchResultsCount).should('contain.text', 'results');
    
    if (expectedTerm) {
      cy.get(this.searchResults).should('contain.text', expectedTerm);
    }
    
    return this;
  }

  /**
   * Verify no results message is displayed
   */
  public verifyNoResults(): this {
    cy.get(this.noResultsMessage).should('be.visible');
    return this;
  }

  /**
   * Get search results count
   */
  public getSearchResultsCount(): Cypress.Chainable<number> {
    return cy.get(this.searchResultsCount).invoke('text').then(text => {
      const match = text.match(/(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    });
  }

  /**
   * Wait for search suggestions to appear
   */
  public waitForSuggestions(): this {
    cy.get(this.searchSuggestions, { timeout: TIMEOUTS.DEFAULT }).should('be.visible');
    return this;
  }
}

// cypress/support/page-objects/pages/CartPage.ts
import { BasePage } from '../base/BasePage';
import { URLS } from '@constants/urls';

export class CartPage extends BasePage {
  protected readonly path = URLS.CART;

  // Cart page selectors
  private get cartItems(): string { 
    return '[data-testid="cart-item"], .cart-item, .bag-item'; 
  }
  
  private get cartTotal(): string { 
    return '[data-testid="cart-total"], .cart-total, .total-price'; 
  }
  
  private get checkoutButton(): string { 
    return '[data-testid="checkout-button"], .checkout-button, button:contains("Checkout")'; 
  }
  
  private get continueShoppingButton(): string { 
    return '[data-testid="continue-shopping"], .continue-shopping, button:contains("Continue Shopping")'; 
  }
  
  private get emptyCartMessage(): string { 
    return '[data-testid="empty-cart"], .empty-cart, .empty-bag-message'; 
  }
  
  private get quantitySelector(): string { 
    return '[data-testid="quantity-select"], .quantity-select, select[name*="quantity"]'; 
  }
  
  private get removeItemButton(): string { 
    return '[data-testid="remove-item"], .remove-item, button:contains("Remove")'; 
  }
  
  private get subtotal(): string { 
    return '[data-testid="subtotal"], .subtotal, .sub-total'; 
  }

  /**
   * Verify cart page is loaded
   */
  public verifyCartLoaded(): this {
    cy.get('body').should('contain.text', 'Cart').or('contain.text', 'Bag');
    return this;
  }

  /**
   * Verify cart is empty
   */
  public verifyCartEmpty(): this {
    cy.get(this.emptyCartMessage).should('be.visible');
    return this;
  }

  /**
   * Verify cart has items
   */
  public verifyCartHasItems(): this {
    cy.get(this.cartItems).should('have.length.greaterThan', 0);
    return this;
  }

  /**
   * Get number of items in cart
   */
  public getCartItemCount(): Cypress.Chainable<number> {
    return cy.get(this.cartItems).its('length');
  }

  /**
   * Update quantity for specific item
   */
  public updateQuantity(itemIndex: number, quantity: number): this {
    cy.get(this.cartItems).eq(itemIndex).within(() => {
      cy.get(this.quantitySelector).select(quantity.toString());
    });
    this.waitForPageLoad();
    return this;
  }

  /**
   * Remove item from cart
   */
  public removeItem(itemIndex: number): this {
    cy.get(this.cartItems).eq(itemIndex).within(() => {
      cy.get(this.removeItemButton).click();
    });
    this.waitForPageLoad();
    return this;
  }

  /**
   * Remove item by product name
   */
  public removeItemByName(productName: string): this {
    cy.get(this.cartItems).contains(productName).parents(this.cartItems).within(() => {
      cy.get(this.removeItemButton).click();
    });
    this.waitForPageLoad();
    return this;
  }

  /**
   * Proceed to checkout
   */
  public proceedToCheckout(): this {
    cy.get(this.checkoutButton).click();
    return this;
  }

  /**
   * Continue shopping
   */
  public continueShopping(): this {
    cy.get(this.continueShoppingButton).click();
    return this;
  }

  /**
   * Get cart total amount
   */
  public getCartTotal(): Cypress.Chainable<string> {
    return cy.get(this.cartTotal).invoke('text');
  }

  /**
   * Get subtotal amount
   */
  public getSubtotal(): Cypress.Chainable<string> {
    return cy.get(this.subtotal).invoke('text');
  }

  /**
   * Verify specific product is in cart
   */
  public verifyProductInCart(productName: string): this {
    cy.get(this.cartItems).should('contain.text', productName);
    return this;
  }
}

// cypress/support/page-objects/pages/CheckoutPage.ts
import { BasePage } from '../base/BasePage';
import { ShippingAddress } from '@types/common';
import { URLS } from '@constants/urls';

export class CheckoutPage extends BasePage {
  protected readonly path = URLS.CHECKOUT;

  // Checkout page selectors
  private get shippingForm(): string { 
    return '[data-testid="shipping-form"], .shipping-form, .address-form'; 
  }
  
  private get billingForm(): string { 
    return '[data-testid="billing-form"], .billing-form, .payment-form'; 
  }
  
  private get paymentForm(): string { 
    return '[data-testid="payment-form"], .payment-form, .card-form'; 
  }
  
  private get placeOrderButton(): string { 
    return '[data-testid="place-order"], .place-order, button:contains("Place Order")'; 
  }
  
  private get orderSummary(): string { 
    return '[data-testid="order-summary"], .order-summary, .checkout-summary'; 
  }

  // Form field selectors
  private get firstNameInput(): string { 
    return '[data-testid="first-name"], input[name*="firstName"], #firstName'; 
  }
  
  private get lastNameInput(): string { 
    return '[data-testid="last-name"], input[name*="lastName"], #lastName'; 
  }
  
  private get emailInput(): string { 
    return '[data-testid="email"], input[name*="email"], #email'; 
  }
  
  private get phoneInput(): string { 
    return '[data-testid="phone"], input[name*="phone"], #phone'; 
  }
  
  private get addressInput(): string { 
    return '[data-testid="address"], input[name*="address"], #address'; 
  }
  
  private get cityInput(): string { 
    return '[data-testid="city"], input[name*="city"], #city'; 
  }
  
  private get postcodeInput(): string { 
    return '[data-testid="postcode"], input[name*="postcode"], #postcode'; 
  }
  
  private get countrySelect(): string { 
    return '[data-testid="country"], select[name*="country"], #country'; 
  }

  private get cardNumberInput(): string {
    return '[data-testid="card-number"], input[name*="cardNumber"], #cardNumber';
  }

  private get expiryInput(): string {
    return '[data-testid="expiry"], input[name*="expiry"], #expiry';
  }

  private get cvvInput(): string {
    return '[data-testid="cvv"], input[name*="cvv"], #cvv';
  }

  /**
   * Fill shipping information form
   */
  public fillShippingInfo(shippingData: ShippingAddress): this {
    cy.get(this.shippingForm).within(() => {
      cy.get(this.firstNameInput).clear().type(shippingData.firstName);
      cy.get(this.lastNameInput).clear().type(shippingData.lastName);
      cy.get(this.emailInput).clear().type(shippingData.email);
      cy.get(this.phoneInput).clear().type(shippingData.phone);
      cy.get(this.addressInput).clear().type(shippingData.address);
      cy.get(this.cityInput).clear().type(shippingData.city);
      cy.get(this.postcodeInput).clear().type(shippingData.postcode);
      cy.get(this.countrySelect).select(shippingData.country);
    });
    return this;
  }

  /**
   * Fill payment information
   */
  public fillPaymentInfo(cardNumber: string, expiry: string, cvv: string): this {
    cy.get(this.paymentForm).within(() => {
      cy.get(this.cardNumberInput).clear().type(cardNumber);
      cy.get(this.expiryInput).clear().type(expiry);
      cy.get(this.cvvInput).clear().type(cvv);
    });
    return this;
  }

  /**
   * Verify order summary is visible
   */
  public verifyOrderSummary(): this {
    cy.get(this.orderSummary).should('be.visible');
    return this;
  }

  /**
   * Place the order
   */
  public placeOrder(): this {
    cy.get(this.placeOrderButton).click();
    return this;
  }

  /**
   * Verify checkout page is loaded
   */
  public verifyCheckoutLoaded(): this {
    cy.get(this.shippingForm).should('be.visible');
    cy.get(this.orderSummary).should('be.visible');
    return this;
  }

  /**
   * Get order total from summary
   */
  public getOrderTotal(): Cypress.Chainable<string> {
    return cy.get(this.orderSummary).find('.total, .order-total').invoke('text');
  }
}

// cypress/support/page-objects/pages/LoginPage.ts
import { BasePage } from '../base/BasePage';
import { TestUser } from '@types/common';
import { URLS } from '@constants/urls';

export class LoginPage extends BasePage {
  protected readonly path = URLS.LOGIN;

  // Login page selectors
  private get emailInput(): string { 
    return '[data-testid="login-email"], input[name="email"], #email'; 
  }
  
  private get passwordInput(): string { 
    return '[data-testid="login-password"], input[name="password"], #password'; 
  }
  
  private get loginButton(): string { 
    return '[data-testid="login-button"], .login-button, button[type="submit"]'; 
  }
  
  private get forgotPasswordLink(): string { 
    return '[data-testid="forgot-password"], .forgot-password, a:contains("Forgot")'; 
  }
  
  private get createAccountLink(): string { 
    return '[data-testid="create-account"], .create-account, a:contains("Create")'; 
  }
  
  private get errorMessage(): string { 
    return '[data-testid="login-error"], .error-message, .login-error'; 
  }

  /**
   * Login with user credentials
   */
  public login(user: TestUser): this {
    cy.get(this.emailInput).clear().type(user.email);
    cy.get(this.passwordInput).clear().type(user.password);
    cy.get(this.loginButton).click();
    this.waitForPageLoad();
    return this;
  }

  /**
   * Login with email and password separately
   */
  public loginWith(email: string, password: string): this {
    return this.login({ email, password });
  }

  /**
   * Click forgot password link
   */
  public clickForgotPassword(): this {
    cy.get(this.forgotPasswordLink).click();
    return this;
  }

  /**
   * Click create account link
   */
  public clickCreateAccount(): this {
    cy.get(this.createAccountLink).click();
    return this;
  }

  /**
   * Verify login error message
   */
  public verifyLoginError(expectedMessage?: string): this {
    cy.get(this.errorMessage).should('be.visible');
    if (expectedMessage) {
      cy.get(this.errorMessage).should('contain.text', expectedMessage);
    }
    return this;
  }

  /**
   * Verify successful login (redirect to account or home)
   */
  public verifyLoginSuccess(): this {
    cy.url().should('not.include', '/login');
    return this;
  }
}

// cypress/support/page-objects/components/Header.ts
import { COMMON_SELECTORS } from '@constants/selectors';

export class Header {
  // Header component selectors
  private get container(): string { return COMMON_SELECTORS.HEADER; }
  private get logo(): string { return COMMON_SELECTORS.LOGO; }
  private get searchIcon(): string { return COMMON_SELECTORS.SEARCH_ICON; }
  private get cartIcon(): string { return COMMON_SELECTORS.CART_ICON; }
  private get accountIcon(): string { return COMMON_SELECTORS.ACCOUNT_ICON; }
  private get navigationMenu(): string { return '[data-testid="nav-menu"], .nav-menu, .main-nav'; }
  private get cartBadge(): string { return '[data-testid="cart-badge"], .cart-badge, .cart-count'; }

  /**
   * Verify header is visible
   */
  public verifyHeaderVisible(): this {
    cy.get(this.container).should('be.visible');
    return this;
  }

  /**
   * Click logo to go to homepage
   */
  public clickLogo(): this {
    cy.get(this.logo).click();
    return this;
  }

  /**
   * Open search
   */
  public openSearch(): this {
    cy.get(this.searchIcon).click();
    return this;
  }

  /**
   * Open cart
   */
  public openCart(): this {
    cy.get(this.cartIcon).click();
    return this;
  }

  /**
   * Open account menu
   */
  public openAccount(): this {
    cy.get(this.accountIcon).click();
    return this;
  }

  /**
   * Navigate to category from header menu
   */
  public navigateToCategory(categoryName: string): this {
    cy.get(this.navigationMenu).within(() => {
      cy.contains(categoryName).click();
    });
    return this;
  }

  /**
   * Get cart item count from badge
   */
  public getCartItemCount(): Cypress.Chainable<number> {
    return cy.get(this.cartBadge).invoke('text').then(text => {
      return parseInt(text.trim(), 10) || 0;
    });
  }

  /**
   * Verify cart badge shows specific count
   */
  public verifyCartBadge(expectedCount: number): this {
    if (expectedCount === 0) {
      cy.get(this.cartBadge).should('not.exist').or('not.be.visible');
    } else {
      cy.get(this.cartBadge).should('contain.text', expectedCount.toString());
    }
    return this;
  }
}

// cypress/support/page-objects/components/ProductCard.ts
export class ProductCard {
  private readonly container: string;

  constructor(container: string = '[data-testid="product-card"], .product-card, .product-item') {
    this.container = container;
  }

  // Product card selectors
  private get productImage(): string { return 'img, .product-image'; }
  private get productTitle(): string { return '.product-title, h3, .title'; }
  private get productPrice(): string { return '.product-price, .price'; }
  private get quickViewButton(): string { return '.quick-view, button:contains("Quick View")'; }
  private get addToWishlistButton(): string { return '.wishlist-btn, button:contains("Wishlist")'; }

  /**
   * Click on the product card
   */
  public click(): this {
    cy.get(this.container).click();
    return this;
  }

  /**
   * Get product title
   */
  public getTitle(): Cypress.Chainable<string> {
    return cy.get(this.container).find(this.productTitle).invoke('text');
  }

  /**
   * Get product price
   */
  public getPrice(): Cypress.Chainable<string> {
    return cy.get(this.container).find(this.productPrice).invoke('text');
  }

  /**
   * Click quick view button
   */
  public quickView(): this {
    cy.get(this.container).find(this.quickViewButton).click();
    return this;
  }

  /**
   * Add to wishlist
   */
  public addToWishlist(): this {
    cy.get(this.container).find(this.addToWishlistButton).click();
    return this;
  }

  /**
   * Verify product card is visible
   */
  public verifyVisible(): this {
    cy.get(this.container).should('be.visible');
    return this;
  }

  /**
   * Hover over product card
   */
  public hover(): this {
    cy.get(this.container).trigger('mouseover');
    return this;
  }
}

// cypress/support/page-objects/index.ts - Barrel exports
export { BasePage } from './base/BasePage';

// Pages
export { HomePage } from './pages/HomePage';
export { ProductListingPage } from './pages/ProductListingPage';
export { ProductDetailPage } from './pages/ProductDetailPage';
export { SearchPage } from './pages/SearchPage';
export { CartPage } from './pages/CartPage';
export { CheckoutPage } from './pages/CheckoutPage';
export { LoginPage } from './pages/LoginPage';

// Components
export { Header } from './components/Header';
export { ProductCard } from './components/ProductCard';

// Re-export types for convenience
export type { 
  PageObject, 
  ProductInteractions, 
  FilterableList 
} from '@types/pages';

export type { 
  ShippingAddress, 
  TestUser, 
  ProductDetails, 
  ProductFilter,
  NavigationOptions,
  WaitOptions 
} from '@types/common';

export type { 
  ComponentBase,
  NavigationComponent,
  SearchComponent,
  CartComponent 
} from '@types/components';

export type {
  TestProduct,
  TestOrder,
  LoginCredentials
} from '@types/test-data';

// cypress/support/helpers/data-generators/UserGenerator.ts
import { TestUser, ShippingAddress } from '@types/common';
import { faker } from '@faker-js/faker'; // npm install @faker-js/faker --save-dev

export class UserGenerator {
  /**
   * Generate a random test user
   */
  static generateTestUser(): TestUser {
    return {
      email: faker.internet.email(),
      password: 'TestPass123!',
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName()
    };
  }

  /**
   * Generate a valid UK shipping address
   */
  static generateUKShippingAddress(): ShippingAddress {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number('07### ######'),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      postcode: faker.location.zipCode('## ###'),
      country: 'United Kingdom'
    };
  }

  /**
   * Generate shipping address for specific country
   */
  static generateShippingAddress(country: string): ShippingAddress {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      postcode: faker.location.zipCode(),
      country
    };
  }
}

// cypress/support/helpers/utils/StringUtils.ts
export class StringUtils {
  /**
   * Extract numeric value from price string
   */
  static extractPrice(priceString: string): number {
    const match = priceString.match(/[\d,]+\.?\d*/);
    return match ? parseFloat(match[0].replace(/,/g, '')) : 0;
  }

  /**
   * Format price for comparison
   */
  static formatPrice(price: number, currency: string = '£'): string {
    return `${currency}${price.toFixed(2)}`;
  }

  /**
   * Clean and normalize text
   */
  static normalizeText(text: string): string {
    return text.trim().toLowerCase().replace(/\s+/g, ' ');
  }

  /**
   * Generate random string
   */
  static generateRandomString(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}

// cypress/support/helpers/utils/ValidationUtils.ts
export class ValidationUtils {
  /**
   * Validate email format
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate UK postcode
   */
  static isValidUKPostcode(postcode: string): boolean {
    const postcodeRegex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}$/i;
    return postcodeRegex.test(postcode.trim());
  }

  /**
   * Validate phone number (basic)
   */
  static isValidPhoneNumber(phone: string): boolean {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  }

  /**
   * Validate price range
   */
  static isValidPriceRange(min: number, max: number): boolean {
    return min >= 0 && max >= min;
  }
}

// cypress/support/commands/authentication.ts
import { TestUser } from '@types/common';

declare global {
  namespace Cypress {
    interface Chainable {
      loginViaUI(user: TestUser): Chainable<void>;
      loginViaAPI(user: TestUser): Chainable<void>;
      logout(): Chainable<void>;
      createAccount(user: TestUser): Chainable<void>;
    }
  }
}

Cypress.Commands.add('loginViaUI', (user: TestUser) => {
  cy.visit('/login');
  cy.get('[data-testid="login-email"], input[name="email"]').type(user.email);
  cy.get('[data-testid="login-password"], input[name="password"]').type(user.password);
  cy.get('[data-testid="login-button"], button[type="submit"]').click();
  cy.url().should('not.include', '/login');
});

Cypress.Commands.add('loginViaAPI', (user: TestUser) => {
  cy.request({
    method: 'POST',
    url: '/api/auth/login',
    body: {
      email: user.email,
      password: user.password
    }
  }).then((response) => {
    window.localStorage.setItem('authToken', response.body.token);
  });
});

Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="account-menu"], .account-menu').click();
  cy.get('[data-testid="logout"], a:contains("Logout")').click();
});

Cypress.Commands.add('createAccount', (user: TestUser) => {
  cy.visit('/register');
  cy.get('[data-testid="first-name"]').type(user.firstName || '');
  cy.get('[data-testid="last-name"]').type(user.lastName || '');
  cy.get('[data-testid="email"]').type(user.email);
  cy.get('[data-testid="password"]').type(user.password);
  cy.get('[data-testid="register-button"]').click();
});

// cypress/support/commands/navigation.ts
declare global {
  namespace Cypress {
    interface Chainable {
      navigateToCategory(category: string): Chainable<void>;
      acceptCookies(): Chainable<void>;
      waitForPageLoad(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('navigateToCategory', (category: string) => {
  cy.get('[data-testid="main-nav"], .main-navigation').within(() => {
    cy.contains(category).click();
  });
  cy.waitForPageLoad();
});

Cypress.Commands.add('acceptCookies', () => {
  cy.get('body').then($body => {
    if ($body.find('[data-testid="cookie-banner"], .cookie-banner').length > 0) {
      cy.get('[data-testid="cookie-banner"], .cookie-banner').within(() => {
        cy.contains(/accept|agree/i).click();
      });
    }
  });
});

Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('[data-testid="loading"], .loading').should('not.exist');
  cy.get('body').should('be.visible');
});