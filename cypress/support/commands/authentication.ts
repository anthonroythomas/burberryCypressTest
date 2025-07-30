import { TestUser } from '../types/common';

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