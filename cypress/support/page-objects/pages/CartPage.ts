import { BasePage } from '../base/BasePage';
import { URLS } from '../../constants/urls';

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