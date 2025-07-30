// cypress/support/pageObjects/BasePage.js
export class BasePage {
  constructor() {
    this.url = 'https://uk.burberry.com';
  }

  // Common selectors across all pages
  get header() { return '[data-testid="header"]' || 'header' || '.header'; }
  get navigation() { return '[data-testid="navigation"]' || 'nav' || '.navigation'; }
  get footer() { return '[data-testid="footer"]' || 'footer' || '.footer'; }
  get cookieBanner() { return '[data-testid="cookie-banner"]' || '.cookie-banner' || '#cookie-consent'; }
  get searchIcon() { return '[data-testid="search-icon"]' || '.search-icon' || '[aria-label="Search"]'; }
  get cartIcon() { return '[data-testid="cart-icon"]' || '.cart-icon' || '[aria-label*="Cart"]' || '[aria-label*="Bag"]'; }
  get accountIcon() { return '[data-testid="account-icon"]' || '.account-icon' || '[aria-label*="Account"]'; }
  get logo() { return '[data-testid="logo"]' || '.logo' || 'a[href="/"]'; }

  // Common actions
  visit(path = '') {
    cy.visit(`${this.url}${path}`);
    this.waitForPageLoad();
    return this;
  }

  waitForPageLoad() {
    cy.get('body').should('be.visible');
    // Wait for any loading spinners to disappear
    cy.get('[data-testid="loading"]', { timeout: 10000 }).should('not.exist');
    cy.get('.loading', { timeout: 10000 }).should('not.exist');
    return this;
  }

  acceptCookies() {
    cy.get('body').then($body => {
      if ($body.find(this.cookieBanner).length > 0) {
        cy.get(this.cookieBanner).within(() => {
          cy.contains('Accept').click();
        });
      }
    });
    return this;
  }

  clickLogo() {
    cy.get(this.logo).click();
    return this;
  }

  openCart() {
    cy.get(this.cartIcon).click();
    return this;
  }

  openAccount() {
    cy.get(this.accountIcon).click();
    return this;
  }

  openSearch() {
    cy.get(this.searchIcon).click();
    return this;
  }
}

// cypress/support/pageObjects/HomePage.js
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor() {
    super();
    this.path = '/';
  }

  // Home page specific selectors
  get heroSection() { return '[data-testid="hero-section"]' || '.hero' || '.hero-banner'; }
  get featuredProducts() { return '[data-testid="featured-products"]' || '.featured-products' || '.product-grid'; }
  get categoryLinks() { return '[data-testid="category-link"]' || '.category-link' || '.category-tile'; }
  get newsletterSignup() { return '[data-testid="newsletter-signup"]' || '.newsletter' || '.email-signup'; }
  get mainNavigation() { return '[data-testid="main-nav"]' || '.main-navigation' || '.primary-nav'; }

  // Navigation categories - adjust based on actual Burberry categories
  get womenCategory() { return 'a[href*="/women"]' || ':contains("Women")'; }
  get menCategory() { return 'a[href*="/men"]' || ':contains("Men")'; }
  get childrenCategory() { return 'a[href*="/children"]' || ':contains("Children")'; }
  get bagsCategory() { return 'a[href*="/bags"]' || ':contains("Bags")'; }
  get shoesCategory() { return 'a[href*="/shoes"]' || ':contains("Shoes")'; }

  visit() {
    return super.visit(this.path);
  }

  navigateToCategory(category) {
    cy.get(this.mainNavigation).within(() => {
      cy.get(category).click();
    });
    return this;
  }

  navigateToWomen() {
    return this.navigateToCategory(this.womenCategory);
  }

  navigateToMen() {
    return this.navigateToCategory(this.menCategory);
  }

  navigateToChildren() {
    return this.navigateToCategory(this.childrenCategory);
  }

  navigateToBags() {
    return this.navigateToCategory(this.bagsCategory);
  }

  navigateToShoes() {
    return this.navigateToCategory(this.shoesCategory);
  }

  verifyHeroSectionVisible() {
    cy.get(this.heroSection).should('be.visible');
    return this;
  }

  verifyFeaturedProductsVisible() {
    cy.get(this.featuredProducts).should('be.visible');
    return this;
  }
}

// cypress/support/pageObjects/ProductListingPage.js
import { BasePage } from './BasePage';

export class ProductListingPage extends BasePage {
  constructor() {
    super();
  }

  // Product listing page selectors
  get productGrid() { return '[data-testid="product-grid"]' || '.product-grid' || '.products-container'; }
  get productTiles() { return '[data-testid="product-tile"]' || '.product-tile' || '.product-item'; }
  get filterButton() { return '[data-testid="filter-button"]' || '.filter-button' || ':contains("Filter")'; }
  get sortDropdown() { return '[data-testid="sort-dropdown"]' || '.sort-dropdown' || 'select[name*="sort"]'; }
  get loadMoreButton() { return '[data-testid="load-more"]' || '.load-more' || ':contains("Load More")'; }
  get resultsCount() { return '[data-testid="results-count"]' || '.results-count' || '.product-count'; }
  get breadcrumbs() { return '[data-testid="breadcrumbs"]' || '.breadcrumbs' || '.breadcrumb'; }

  // Filter panel selectors
  get filterPanel() { return '[data-testid="filter-panel"]' || '.filter-panel' || '.filters'; }
  get priceFilter() { return '[data-testid="price-filter"]' || '.price-filter' || 'input[name*="price"]'; }
  get sizeFilter() { return '[data-testid="size-filter"]' || '.size-filter' || 'input[name*="size"]'; }
  get colorFilter() { return '[data-testid="color-filter"]' || '.color-filter' || 'input[name*="color"]'; }
  get categoryFilter() { return '[data-testid="category-filter"]' || '.category-filter' || 'input[name*="category"]'; }
  get clearFiltersButton() { return '[data-testid="clear-filters"]' || '.clear-filters' || ':contains("Clear")'; }

  verifyProductsLoaded() {
    cy.get(this.productGrid).should('be.visible');
    cy.get(this.productTiles).should('have.length.greaterThan', 0);
    return this;
  }

  getProductCount() {
    return cy.get(this.productTiles).its('length');
  }

  clickProduct(index = 0) {
    cy.get(this.productTiles).eq(index).click();
    return this;
  }

  openFilters() {
    cy.get(this.filterButton).click();
    cy.get(this.filterPanel).should('be.visible');
    return this;
  }

  filterByPrice(minPrice, maxPrice) {
    this.openFilters();
    cy.get(this.priceFilter).within(() => {
      cy.get('input[name*="min"]').clear().type(minPrice);
      cy.get('input[name*="max"]').clear().type(maxPrice);
    });
    return this;
  }

  filterBySize(size) {
    this.openFilters();
    cy.get(this.sizeFilter).within(() => {
      cy.contains(size).click();
    });
    return this;
  }

  filterByColor(color) {
    this.openFilters();
    cy.get(this.colorFilter).within(() => {
      cy.contains(color).click();
    });
    return this;
  }

  sortBy(sortOption) {
    cy.get(this.sortDropdown).select(sortOption);
    this.waitForPageLoad();
    return this;
  }

  clearAllFilters() {
    cy.get(this.clearFiltersButton).click();
    this.waitForPageLoad();
    return this;
  }

  loadMoreProducts() {
    cy.get(this.loadMoreButton).scrollIntoView().click();
    this.waitForPageLoad();
    return this;
  }
}

// cypress/support/pageObjects/ProductDetailPage.js
import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
  constructor() {
    super();
  }

  // Product detail page selectors
  get productImages() { return '[data-testid="product-images"]' || '.product-images' || '.product-gallery'; }
  get mainProductImage() { return '[data-testid="main-product-image"]' || '.main-image' || '.product-image-main'; }
  get thumbnailImages() { return '[data-testid="thumbnail-images"]' || '.thumbnail-images' || '.product-thumbnails'; }
  get productTitle() { return '[data-testid="product-title"]' || '.product-title' || 'h1'; }
  get productPrice() { return '[data-testid="product-price"]' || '.product-price' || '.price'; }
  get productDescription() { return '[data-testid="product-description"]' || '.product-description' || '.description'; }
  get sizeSelector() { return '[data-testid="size-selector"]' || '.size-selector' || 'select[name*="size"]'; }
  get colorSelector() { return '[data-testid="color-selector"]' || '.color-selector' || '.color-options'; }
  get quantitySelector() { return '[data-testid="quantity-selector"]' || '.quantity-selector' || 'select[name*="quantity"]'; }
  get addToBagButton() { return '[data-testid="add-to-bag"]' || '.add-to-bag' || ':contains("Add to Bag")'; }
  get addToWishlistButton() { return '[data-testid="add-to-wishlist"]' || '.add-to-wishlist' || ':contains("Wishlist")'; }
  get productDetails() { return '[data-testid="product-details"]' || '.product-details' || '.product-info'; }
  get sizeGuideLink() { return '[data-testid="size-guide"]' || '.size-guide' || ':contains("Size Guide")'; }
  get deliveryInfo() { return '[data-testid="delivery-info"]' || '.delivery-info' || '.shipping-info'; }
  get returnInfo() { return '[data-testid="return-info"]' || '.return-info' || '.returns-info'; }

  verifyProductLoaded() {
    cy.get(this.productTitle).should('be.visible');
    cy.get(this.productPrice).should('be.visible');
    cy.get(this.mainProductImage).should('be.visible');
    return this;
  }

  getProductTitle() {
    return cy.get(this.productTitle).invoke('text');
  }

  getProductPrice() {
    return cy.get(this.productPrice).invoke('text');
  }

  selectSize(size) {
    cy.get(this.sizeSelector).select(size);
    return this;
  }

  selectColor(color) {
    cy.get(this.colorSelector).within(() => {
      cy.contains(color).click();
    });
    return this;
  }

  selectQuantity(quantity) {
    cy.get(this.quantitySelector).select(quantity.toString());
    return this;
  }

  addToBag() {
    cy.get(this.addToBagButton).click();
    return this;
  }

  addToWishlist() {
    cy.get(this.addToWishlistButton).click();
    return this;
  }

  clickThumbnail(index) {
    cy.get(this.thumbnailImages).eq(index).click();
    return this;
  }

  openSizeGuide() {
    cy.get(this.sizeGuideLink).click();
    return this;
  }

  verifyAddToBagSuccess() {
    // Look for success message or cart update
    cy.contains('Added to bag', { timeout: 10000 }).should('be.visible');
    return this;
  }
}

// cypress/support/pageObjects/SearchPage.js
import { BasePage } from './BasePage';

export class SearchPage extends BasePage {
  constructor() {
    super();
  }

  // Search page selectors
  get searchInput() { return '[data-testid="search-input"]' || '.search-input' || 'input[name*="search"]'; }
  get searchButton() { return '[data-testid="search-button"]' || '.search-button' || 'button[type="submit"]'; }
  get searchResults() { return '[data-testid="search-results"]' || '.search-results' || '.results'; }
  get searchSuggestions() { return '[data-testid="search-suggestions"]' || '.search-suggestions' || '.suggestions'; }
  get noResultsMessage() { return '[data-testid="no-results"]' || '.no-results' || ':contains("No results")'; }
  get searchResultsCount() { return '[data-testid="search-count"]' || '.search-count' || '.results-count'; }

  search(searchTerm) {
    cy.get(this.searchInput).clear().type(searchTerm);
    cy.get(this.searchButton).click();
    this.waitForPageLoad();
    return this;
  }

  searchWithEnter(searchTerm) {
    cy.get(this.searchInput).clear().type(`${searchTerm}{enter}`);
    this.waitForPageLoad();
    return this;
  }

  selectSuggestion(suggestionText) {
    cy.get(this.searchSuggestions).within(() => {
      cy.contains(suggestionText).click();
    });
    return this;
  }

  verifySearchResults(expectedTerm) {
    cy.get(this.searchResults).should('be.visible');
    cy.get(this.searchResultsCount).should('contain.text', 'results');
    return this;
  }

  verifyNoResults() {
    cy.get(this.noResultsMessage).should('be.visible');
    return this;
  }
}

// cypress/support/pageObjects/CartPage.js
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  constructor() {
    super();
    this.path = '/cart';
  }

  // Cart page selectors
  get cartItems() { return '[data-testid="cart-item"]' || '.cart-item' || '.bag-item'; }
  get cartTotal() { return '[data-testid="cart-total"]' || '.cart-total' || '.total-price'; }
  get checkoutButton() { return '[data-testid="checkout-button"]' || '.checkout-button' || ':contains("Checkout")'; }
  get continueShoppingButton() { return '[data-testid="continue-shopping"]' || '.continue-shopping' || ':contains("Continue Shopping")'; }
  get emptyCartMessage() { return '[data-testid="empty-cart"]' || '.empty-cart' || ':contains("Your bag is empty")'; }
  get quantitySelector() { return '[data-testid="quantity-select"]' || '.quantity-select' || 'select[name*="quantity"]'; }
  get removeItemButton() { return '[data-testid="remove-item"]' || '.remove-item' || ':contains("Remove")'; }
  get subtotal() { return '[data-testid="subtotal"]' || '.subtotal' || '.sub-total'; }
  get shippingCost() { return '[data-testid="shipping-cost"]' || '.shipping-cost' || '.delivery-cost'; }

  visit() {
    return super.visit(this.path);
  }

  verifyCartLoaded() {
    cy.get('body').should('contain.text', 'Cart').or('contain.text', 'Bag');
    return this;
  }

  verifyCartEmpty() {
    cy.get(this.emptyCartMessage).should('be.visible');
    return this;
  }

  verifyCartHasItems() {
    cy.get(this.cartItems).should('have.length.greaterThan', 0);
    return this;
  }

  getCartItemCount() {
    return cy.get(this.cartItems).its('length');
  }

  updateQuantity(itemIndex, quantity) {
    cy.get(this.cartItems).eq(itemIndex).within(() => {
      cy.get(this.quantitySelector).select(quantity.toString());
    });
    return this;
  }

  removeItem(itemIndex) {
    cy.get(this.cartItems).eq(itemIndex).within(() => {
      cy.get(this.removeItemButton).click();
    });
    return this;
  }

  proceedToCheckout() {
    cy.get(this.checkoutButton).click();
    return this;
  }

  continueShopping() {
    cy.get(this.continueShoppingButton).click();
    return this;
  }

  getCartTotal() {
    return cy.get(this.cartTotal).invoke('text');
  }
}

// cypress/support/pageObjects/CheckoutPage.js
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  constructor() {
    super();
    this.path = '/checkout';
  }

  // Checkout page selectors
  get shippingForm() { return '[data-testid="shipping-form"]' || '.shipping-form' || '.address-form'; }
  get billingForm() { return '[data-testid="billing-form"]' || '.billing-form' || '.payment-form'; }
  get paymentForm() { return '[data-testid="payment-form"]' || '.payment-form' || '.card-form'; }
  get placeOrderButton() { return '[data-testid="place-order"]' || '.place-order' || ':contains("Place Order")'; }
  get orderSummary() { return '[data-testid="order-summary"]' || '.order-summary' || '.checkout-summary'; }

  // Form fields
  get firstNameInput() { return '[data-testid="first-name"]' || 'input[name*="firstName"]' || '#firstName'; }
  get lastNameInput() { return '[data-testid="last-name"]' || 'input[name*="lastName"]' || '#lastName'; }
  get emailInput() { return '[data-testid="email"]' || 'input[name*="email"]' || '#email'; }
  get phoneInput() { return '[data-testid="phone"]' || 'input[name*="phone"]' || '#phone'; }
  get addressInput() { return '[data-testid="address"]' || 'input[name*="address"]' || '#address'; }
  get cityInput() { return '[data-testid="city"]' || 'input[name*="city"]' || '#city'; }
  get postcodeInput() { return '[data-testid="postcode"]' || 'input[name*="postcode"]' || '#postcode'; }
  get countrySelect() { return '[data-testid="country"]' || 'select[name*="country"]' || '#country'; }

  visit() {
    return super.visit(this.path);
  }

  fillShippingInfo(shippingData) {
    cy.get(this.firstNameInput).type(shippingData.firstName);
    cy.get(this.lastNameInput).type(shippingData.lastName);
    cy.get(this.emailInput).type(shippingData.email);
    cy.get(this.phoneInput).type(shippingData.phone);
    cy.get(this.addressInput).type(shippingData.address);
    cy.get(this.cityInput).type(shippingData.city);
    cy.get(this.postcodeInput).type(shippingData.postcode);
    cy.get(this.countrySelect).select(shippingData.country);
    return this;
  }

  verifyOrderSummary() {
    cy.get(this.orderSummary).should('be.visible');
    return this;
  }

  placeOrder() {
    cy.get(this.placeOrderButton).click();
    return this;
  }
}

// cypress/support/pageObjects/index.js
// Export all page objects for easy importing
export { BasePage } from './BasePage';
export { HomePage } from './HomePage';
export { ProductListingPage } from './ProductListingPage';
export { ProductDetailPage } from './ProductDetailPage';
export { SearchPage } from './SearchPage';
export { CartPage } from './CartPage';
export { CheckoutPage } from './CheckoutPage';

// Example usage in a test file:
/*
import { HomePage, ProductListingPage, ProductDetailPage } from '../support/pageObjects';

describe('Burberry E-commerce Tests', () => {
  const homePage = new HomePage();
  const productListingPage = new ProductListingPage();
  const productDetailPage = new ProductDetailPage();

  beforeEach(() => {
    homePage.visit().acceptCookies();
  });

  it('should navigate to women\'s category and view a product', () => {
    homePage
      .navigateToWomen()
      .verifyProductsLoaded();
    
    productListingPage
      .clickProduct(0);
    
    productDetailPage
      .verifyProductLoaded()
      .selectSize('M')
      .addToBag()
      .verifyAddToBagSuccess();
  });
});
*/