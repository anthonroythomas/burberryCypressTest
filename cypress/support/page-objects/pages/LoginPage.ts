import { BasePage } from '../base/BasePage';
import { TestUser } from '../../types/common';
import { URLS } from '../../constants/urls';

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