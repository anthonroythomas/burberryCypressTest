declare global {
  namespace Cypress {
    interface Chainable {
      navigateToCategory(category: string): Chainable<void>;
      acceptCookies(): Chainable<void>;
      waitForPageLoad(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('navigateToCategory', (category: string) => {
  cy.get('[data-testid="main-nav"], .main-navigation').within(() => {
    cy.contains(category).click();
  });
  cy.waitForPageLoad();
});

Cypress.Commands.add('acceptCookies', () => {
  cy.get('body').then($body => {
    if ($body.find('[data-testid="cookie-banner"], .cookie-banner').length > 0) {
      cy.get('[data-testid="cookie-banner"], .cookie-banner').within(() => {
        cy.contains(/accept|agree/i).click();
      });
    }
  });
});

Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('[data-testid="loading"], .loading').should('not.exist');
  cy.get('body').should('be.visible');
});