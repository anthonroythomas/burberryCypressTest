import { BasePage } from '../base/BasePage';
import { ShippingAddress } from '../../types/common';
import { URLS } from '../../constants/urls';

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