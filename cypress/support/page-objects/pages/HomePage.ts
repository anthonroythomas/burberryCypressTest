import { BasePage } from '../base/BasePage';
import { NavigationOptions } from '../../types/common';
import { URLS } from '../../constants/urls';

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
