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