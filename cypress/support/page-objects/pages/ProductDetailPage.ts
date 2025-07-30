import { BasePage } from '../base/BasePage';
import { ProductInteractions } from '../../types/pages';
import { ProductDetails } from '../../types/common';

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

