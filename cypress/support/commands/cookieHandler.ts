  before(() => {
    Cypress.Commands.add('handleCookieConsent', () => {
      // Wait a moment for the cookie modal to appear
      cy.wait(2000)
      
      // Try multiple possible cookie consent selectors
      cy.get('body').then(($body) => {
        // Common cookie modal selectors - try each one
        const cookieSelectors = [
          '[data-testid="cookie-banner"]',
          '[data-testid="cookies-banner"]', 
          '[id*="cookie"]',
          '[class*="cookie"]',
          '[class*="consent"]',
          '[aria-label*="cookie"]',
          '[aria-label*="consent"]',
          '.cookie-banner',
          '.cookies-banner',
          '.consent-banner',
          '#cookie-banner',
          '#cookies-banner',
          '[role="dialog"]', // Many modals use this
          '.modal', // Generic modal class
        ]
        
        let cookieModalFound = false
        
        cookieSelectors.forEach(selector => {
          if ($body.find(selector).length > 0 && !cookieModalFound) {
            cookieModalFound = true
            cy.log(`Found cookie modal with selector: ${selector}`)
            
            // Try different button texts and selectors
            cy.get(selector).within(() => {
              // Try to find accept button with various texts
              cy.get('body').then(() => {
                const buttonTexts = ['Accept', 'Accept All', 'OK', 'Agree', 'Continue', 'Allow All']
                const buttonSelectors = [
                  'button[data-testid*="accept"]',
                  'button[class*="accept"]',
                  'button[id*="accept"]',
                  '[data-testid*="accept-cookies"]',
                  '.accept-button',
                  '.btn-accept'
                ]
                
                // Try button selectors first
                let buttonFound = false
                buttonSelectors.forEach(btnSelector => {
                  if (!buttonFound) {
                    cy.get('body').then(($modal) => {
                      if ($modal.find(btnSelector).length > 0) {
                        buttonFound = true
                        cy.get(btnSelector).first().click({ force: true })
                      }
                    })
                  }
                })
                
                // If no specific selectors work, try by text content
                if (!buttonFound) {
                  buttonTexts.forEach(text => {
                    if (!buttonFound) {
                      cy.get('body').then(($modal) => {
                        if ($modal.find(`button:contains("${text}")`).length > 0) {
                          buttonFound = true
                          cy.contains('button', text).first().click({ force: true })
                        }
                      })
                    }
                  })
                }
              })
            })
          }
        })
        
        // If no cookie modal found, log it
        if (!cookieModalFound) {
          cy.log('No cookie consent modal detected')
        }
      })
      
      // Wait for modal to disappear
      cy.wait(1000)
    })
  })