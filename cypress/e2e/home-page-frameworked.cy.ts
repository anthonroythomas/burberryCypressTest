import { BasePage } from '../support/page-objects/index';
import { HomePage } from '../support/page-objects/pages/HomePage';

describe('Burberry UK Homepage', () => {
  let homePage: HomePage;

  beforeEach(() => {
    // Initialize page object
    homePage = new HomePage();
    
    // Visit homepage with cookie acceptance
    homePage.visit({ 
      waitForLoad: true, 
      acceptCookies: true 
    });

        cy.get('body', { timeout: 15000 }).then(($body) => {
      // Wait up to 10 seconds for the cookie container to appear
      cy.get('body', { timeout: 15000 }).then(() => {
        if ($body.find('[id="onetrust-group-container"]').length > 0) {
           cy.log('Cookie consent failed, continuing with test')
          cy.get('[id="onetrust-accept-btn-handler"]',  { timeout: 10000 }).click()
          cy.wait(3000)
          cy.log(`Completed beforeEach for: ${Cypress.currentTest.title}`)
        }
      })
    })
  });

  it('should load the homepage successfully', () => {
    // Verify the page loads with correct title and URL
    cy.title().should('contain', 'Burberry');
    homePage.verifyUrl('uk.burberry.com');
    
    // Verify page is fully loaded using framework method
    homePage.isLoaded().should('be.true');
  });

  it('should display the main navigation menu', () => {
    // Verify main navigation exists and is visible using inherited BasePage methods
    cy.get(homePage['navigation']).should('exist').and('be.visible');
    
    // Test navigation to different categories using HomePage methods
    cy.get(homePage['navigation']).within(() => {
      cy.contains('Women').should('be.visible');
      cy.contains('Men').should('be.visible');
      cy.contains('Children').should('be.visible');
    });
  });

  it('should display the Burberry logo', () => {
    // Use inherited BasePage logo selector
    cy.get(homePage['logo'])
      .should('exist')
      .and('be.visible');
  });

  it.only('should have search functionality', () => {
    // Use inherited BasePage search functionality
    cy.get(homePage['searchIcon']).should('exist').and('be.visible');
  });

  it('should display shopping bag/cart icon', () => {
    // Use inherited BasePage cart functionality
    cy.get(homePage['cartIcon'])
      .should('exist')
      .and('be.visible');
  });

  it('should have responsive design elements', () => {
    // Test mobile viewport
    cy.viewport('iphone-x');
    homePage.waitForPageLoad();
    homePage.isLoaded().should('be.true');
    
    // Test tablet viewport
    cy.viewport('ipad-2');
    homePage.waitForPageLoad();
    homePage.isLoaded().should('be.true');
    
    // Test desktop viewport
    cy.viewport(1200, 800);
    homePage.waitForPageLoad();
    homePage.isLoaded().should('be.true');
  });

  it.only('should navigate to category pages using framework methods', () => {
    // Test navigation to Women's section using HomePage method
    homePage.navigateToWomen();
    homePage.verifyUrl('women');
    
    // Navigate back to homepage
    cy.go('back');
    homePage.verifyUrl('uk.burberry.com');
    
    // Test navigation to Men's section
    homePage.navigateToMen();
    homePage.verifyUrl('men');
    
    // Navigate back to homepage
    cy.go('back');
    homePage.verifyUrl('uk.burberry.com');
  });

  it.only('should display main content sections', () => {
    // Verify hero section using HomePage method
    homePage.verifyHeroSectionVisible();
    
    // Verify featured products using HomePage method
    homePage.verifyFeaturedProductsVisible();
    
    // Check main content exists
    cy.get('main, .main-content, .homepage-content').should('exist');
  });

  it('should handle page load performance', () => {
    // Re-visit with timeout using framework method
    homePage.visit({ waitForLoad: true });
    
    // Verify critical elements are loaded using framework selectors
    cy.get(homePage['logo']).should('be.visible');
    cy.get(homePage['navigation']).should('be.visible');
  });

  it('should have basic accessibility features', () => {
    // Check for skip links
    cy.get('a[href="#main"], .skip-link').should('exist');
    
    // Verify main landmark exists
    cy.get('main, [role="main"]').should('exist');
    
    // Check that images have alt text
    cy.get('img').then(($imgs) => {
      const imgsWithAlt = $imgs.filter((i, img) => img.alt && img.alt.trim() !== '');
      expect(imgsWithAlt.length).to.be.greaterThan(0);
    });
  });

  it.only('should test category navigation functionality', () => {
    // Test all category navigation methods
    homePage.navigateToBags();
    homePage.verifyUrl('bags');
    cy.go('back');
    
    homePage.navigateToShoes();
    homePage.verifyUrl('shoes');
    cy.go('back');
    
    homePage.navigateToChildren();
    homePage.verifyUrl('children');
    cy.go('back');
  });

  it.only('should interact with cart functionality', () => {
    // Test cart opening using framework method
    homePage.openCart();
    // Add specific cart verification here based on your cart implementation
  });

  it.only('should interact with account functionality', () => {
    // Test account access using framework method
    homePage.openAccount();
    // Add specific account verification here based on your account implementation
  });

  it.only('should interact with search functionality', () => {
    // Test search opening using framework method
    homePage.openSearch();
    // Add specific search verification here based on your search implementation
  });

  it.only('should test newsletter signup functionality', () => {
    const testEmail = 'test@example.com';
    
    // Use HomePage newsletter signup method
    homePage.subscribeToNewsletter(testEmail);
    
    // Add verification for successful signup based on your implementation
    // This could be a success message, redirect, etc.
  });

  it.only('should verify all category links are present and functional', () => {
    // Use HomePage method to get category links
    homePage.getCategoryLinks().should('have.length.greaterThan', 0);
    
    // Verify each link is visible and clickable
    homePage.getCategoryLinks().each(($link) => {
      cy.wrap($link).should('be.visible').and('not.be.disabled');
    });
  });

  it('should test logo click navigation', () => {
    // Navigate away from homepage first
    homePage.navigateToWomen();
    homePage.verifyUrl('women');
    
    // Click logo to return to homepage using framework method
    homePage.clickLogo();
    homePage.verifyUrl('uk.burberry.com');
  });

  // Skip this test as it was skipped in original - can be enabled when search is fully implemented
  it.skip('should allow product search', () => {
    homePage.openSearch();
    
    // This would need to be implemented based on your SearchPage object
    // or additional methods in HomePage for search functionality
    cy.get('input[type="search"]').then(($search) => {
      if ($search.length > 0) {
        cy.wrap($search).first().type('handbag{enter}');
        homePage.verifyUrl('search');
        cy.contains('handbag', { matchCase: false }).should('exist');
      }
    });
  });
});