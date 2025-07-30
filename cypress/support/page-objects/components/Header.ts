import { COMMON_SELECTORS } from '../../constants/selectors';

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