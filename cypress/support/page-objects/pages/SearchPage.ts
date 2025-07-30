import { BasePage } from '../base/BasePage';
import { TIMEOUTS } from '../../constants/index';

export class SearchPage extends BasePage {
  protected readonly path = '/search';

  // Search page selectors
  private get searchInput(): string { 
    return '[data-testid="search-input"], .search-input, input[name*="search"]'; 
  }
  
  private get searchButton(): string { 
    return '[data-testid="search-button"], .search-button, button[type="submit"]'; 
  }
  
  private get searchResults(): string { 
    return '[data-testid="search-results"], .search-results, .results'; 
  }
  
  private get searchSuggestions(): string { 
    return '[data-testid="search-suggestions"], .search-suggestions, .suggestions'; 
  }
  
  private get noResultsMessage(): string { 
    return '[data-testid="no-results"], .no-results, .no-results-message'; 
  }
  
  private get searchResultsCount(): string { 
    return '[data-testid="search-count"], .search-count, .results-count'; 
  }

  /**
   * Perform search using search button
   */
  public search(searchTerm: string): this {
    cy.get(this.searchInput).clear().type(searchTerm);
    cy.get(this.searchButton).click();
    this.waitForPageLoad();
    return this;
  }

  /**
   * Perform search using Enter key
   */
  public searchWithEnter(searchTerm: string): this {
    cy.get(this.searchInput).clear().type(`${searchTerm}{enter}`);
    this.waitForPageLoad();
    return this;
  }

  /**
   * Select from search suggestions
   */
  public selectSuggestion(suggestionText: string): this {
    cy.get(this.searchSuggestions).within(() => {
      cy.contains(suggestionText).click();
    });
    this.waitForPageLoad();
    return this;
  }

  /**
   * Verify search results are displayed
   */
  public verifySearchResults(expectedTerm?: string): this {
    cy.get(this.searchResults).should('be.visible');
    cy.get(this.searchResultsCount).should('contain.text', 'results');
    
    if (expectedTerm) {
      cy.get(this.searchResults).should('contain.text', expectedTerm);
    }
    
    return this;
  }

  /**
   * Verify no results message is displayed
   */
  public verifyNoResults(): this {
    cy.get(this.noResultsMessage).should('be.visible');
    return this;
  }

  /**
   * Get search results count
   */
  public getSearchResultsCount(): Cypress.Chainable<number> {
    return cy.get(this.searchResultsCount).invoke('text').then(text => {
      const match = text.match(/(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    });
  }

  /**
   * Wait for search suggestions to appear
   */
  public waitForSuggestions(): this {
    cy.get(this.searchSuggestions, { timeout: TIMEOUTS.DEFAULT }).should('be.visible');
    return this;
  }
}
