describe('Burberry UK Homepage', () => {
  beforeEach(() => {
    // Visit the Burberry UK homepage before each test
    cy.visit('https://uk.burberry.com/')
    
    // Handle potential cookie consent banner
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="cookie-banner"]').length > 0) {
        cy.get('[data-testid="cookie-banner"]').find('button').contains('Accept').click()
      }
    })
  })

  it('should load the homepage successfully', () => {
    // Verify the page loads and has the correct title
    cy.title().should('contain', 'Burberry')
    
    // Check that the URL is correct
    cy.url().should('include', 'uk.burberry.com')
    
    // Verify the page is fully loaded by checking for key elements
    cy.get('body').should('be.visible')
  })

  it('should display the main navigation menu', () => {
    // Check that the main navigation exists
    cy.get('nav, [role="navigation"]').should('exist')
    
    // Verify common navigation items exist (adjust selectors based on actual site)
    cy.get('nav').within(() => {
      cy.contains('Women').should('be.visible')
      cy.contains('Men').should('be.visible')
      cy.contains('Children').should('be.visible')
    })
  })

  it('should display the Burberry logo', () => {
    // Check for the Burberry logo (adjust selector based on actual implementation)
    cy.get('img[alt*="Burberry"], [aria-label*="Burberry"], .logo')
      .should('exist')
      .and('be.visible')
  })

  it('should have a search functionality', () => {
    // Look for search input or search button
    cy.get('input[type="search"], [placeholder*="Search"], [aria-label*="Search"]')
      .should('exist')
      //.or(cy.get('button[aria-label*="Search"], .search-button').should('exist'))
  })

  it('should display shopping bag/cart icon', () => {
    // Check for shopping bag icon
    cy.get('[aria-label*="bag"], [aria-label*="cart"], .shopping-bag, .cart-icon')
      .should('exist')
      .and('be.visible')
  })

  it('should have responsive design elements', () => {
    // Test mobile viewport
    cy.viewport('iphone-x')
    cy.get('body').should('be.visible')
    
    // Test tablet viewport
    cy.viewport('ipad-2')
    cy.get('body').should('be.visible')
    
    // Test desktop viewport
    cy.viewport(1200, 800)
    cy.get('body').should('be.visible')
  })

  it('should navigate to a category page when clicking navigation items', () => {
    // Click on Women's section (adjust selector based on actual site)
    cy.contains('Women').click()
    
    // Verify we navigated to the women's section
    cy.url().should('include', 'women')
    
    // Go back to homepage
    cy.go('back')
    cy.url().should('include', 'uk.burberry.com')
  })

  it('should display main content sections', () => {
    // Check for main content areas (adjust based on actual site structure)
    cy.get('main, .main-content, .homepage-content').should('exist')
    
    // Look for hero sections or featured content
    cy.get('.hero, .banner, .featured, .carousel').should('exist')
  })

  it('should have proper meta tags for SEO', () => {
    // Check for essential meta tags
    cy.get('head meta[name="description"]').should('exist')
    cy.get('head meta[property="og:title"]').should('exist')
    cy.get('head meta[property="og:description"]').should('exist')
  })

  it('should handle page load performance', () => {
    // Test that the page loads within a reasonable time
    cy.visit('https://uk.burberry.com/', { timeout: 10000 })
    
    // Check that critical resources are loaded
    cy.get('img').should('be.visible')
    cy.get('nav').should('be.visible')
  })

  // Test for accessibility
  it('should have basic accessibility features', () => {
    // Check for skip links
    cy.get('a[href="#main"], .skip-link').should('exist')
    
    // Verify main landmark exists
    cy.get('main, [role="main"]').should('exist')
    
    // Check that images have alt text (at least some of them)
    cy.get('img').then(($imgs) => {
      const imgsWithAlt = $imgs.filter((i, img) => img.alt && img.alt.trim() !== '')
      expect(imgsWithAlt.length).to.be.greaterThan(0)
    })
  })

  // Test search functionality if available
  it('should allow product search', () => {
    // Find and interact with search
    cy.get('input[type="search"], [placeholder*="Search"]').then(($search) => {
      if ($search.length > 0) {
        cy.wrap($search).first().type('handbag{enter}')
        cy.url().should('include', 'search')
        cy.contains('handbag', { matchCase: false }).should('exist')
      }
    })
  })
})