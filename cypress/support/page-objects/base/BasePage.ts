//import { PageObject, NavigationOptions, WaitOptions } from '../../types/common';
import { NavigationOptions, WaitOptions } from '../../types/common';
import { PageObject } from '../../types/pages';
import { COMMON_SELECTORS, TIMEOUTS, URLS } from '../../constants/index';

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
