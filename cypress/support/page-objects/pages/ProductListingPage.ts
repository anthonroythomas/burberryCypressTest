import { BasePage } from '../base/BasePage';
import { FilterableList } from '../../types/pages';
import { ProductFilter } from '../../types/common';
import { TIMEOUTS } from '../../constants/timeouts';

export class ProductListingPage extends BasePage implements FilterableList {
  protected readonly path = ''; // Dynamic path based on category

  // Product listing selectors
  private get productGrid(): string { 
    return '[data-testid="product-grid"], .product-grid, .products-container'; 
  }
  
  private get productTiles(): string { 
    return '[data-testid="product-tile"], .product-tile, .product-item'; 
  }
  
  private get filterButton(): string { 
    return '[data-testid="filter-button"], .filter-button, button:contains("Filter")'; 
  }
  
  private get sortDropdown(): string { 
    return '[data-testid="sort-dropdown"], .sort-dropdown, select[name*="sort"]'; 
  }
  
  private get loadMoreButton(): string { 
    return '[data-testid="load-more"], .load-more, button:contains("Load More")'; 
  }
  
  private get resultsCount(): string { 
    return '[data-testid="results-count"], .results-count, .product-count'; 
  }
  
  private get breadcrumbs(): string { 
    return '[data-testid="breadcrumbs"], .breadcrumbs, .breadcrumb'; 
  }

  // Filter panel selectors
  private get filterPanel(): string { 
    return '[data-testid="filter-panel"], .filter-panel, .filters'; 
  }
  
  private get priceFilter(): string { 
    return '[data-testid="price-filter"], .price-filter'; 
  }
  
  private get sizeFilter(): string { 
    return '[data-testid="size-filter"], .size-filter'; 
  }
  
  private get colorFilter(): string { 
    return '[data-testid="color-filter"], .color-filter'; 
  }
  
  private get categoryFilter(): string { 
    return '[data-testid="category-filter"], .category-filter'; 
  }
  
  private get clearFiltersButton(): string { 
    return '[data-testid="clear-filters"], .clear-filters, button:contains("Clear")'; 
  }

  /**
   * Verify products are loaded
   */
  public verifyProductsLoaded(): this {
    cy.get(this.productGrid).should('be.visible');
    cy.get(this.productTiles).should('have.length.greaterThan', 0);
    return this;
  }

  /**
   * Get total number of products displayed
   */
  public getProductCount(): Cypress.Chainable<number> {
    return cy.get(this.productTiles).its('length');
  }

  /**
   * Click on a specific product by index
   */
  public clickProduct(index: number = 0): this {
    cy.get(this.productTiles).eq(index).click();
    this.waitForPageLoad();
    return this;
  }

  /**
   * Click on product by title
   */
  public clickProductByTitle(title: string): this {
    cy.get(this.productTiles).contains(title).click();
    this.waitForPageLoad();
    return this;
  }

  /**
   * Open filter panel
   */
  public openFilters(): this {
    cy.get(this.filterButton).click();
    cy.get(this.filterPanel).should('be.visible');
    return this;
  }

  /**
   * Apply comprehensive filters
   */
  public applyFilters(filters: ProductFilter): this {
    this.openFilters();

    if (filters.minPrice || filters.maxPrice) {
      this.filterByPriceRange(filters.minPrice, filters.maxPrice);
    }

    if (filters.sizes?.length) {
      filters.sizes.forEach(size => this.filterBySize(size));
    }

    if (filters.colors?.length) {
      filters.colors.forEach(color => this.filterByColor(color));
    }

    return this;
  }

  /**
   * Filter by price range
   */
  public filterByPriceRange(minPrice?: number, maxPrice?: number): this {
    if (!minPrice && !maxPrice) return this;

    cy.get(this.priceFilter).within(() => {
      if (minPrice) {
        cy.get('input[name*="min"], input[placeholder*="min"]').clear().type(minPrice.toString());
      }
      if (maxPrice) {
        cy.get('input[name*="max"], input[placeholder*="max"]').clear().type(maxPrice.toString());
      }
    });
    
    this.waitForPageLoad();
    return this;
  }

  /**
   * Filter by size
   */
  public filterBySize(size: string): this {
    cy.get(this.sizeFilter).within(() => {
      cy.contains(size).click();
    });
    this.waitForPageLoad();
    return this;
  }

  /**
   * Filter by color
   */
  public filterByColor(color: string): this {
    cy.get(this.colorFilter).within(() => {
      cy.contains(color).click();
    });
    this.waitForPageLoad();
    return this;
  }

  /**
   * Sort products by specified option
   */
  public sortBy(sortOption: string): this {
    cy.get(this.sortDropdown).select(sortOption);
    this.waitForPageLoad();
    return this;
  }

  /**
   * Clear all applied filters
   */
  public clearFilters(): this {
    cy.get(this.clearFiltersButton).click();
    this.waitForPageLoad();
    return this;
  }

  /**
   * Load more products (if pagination exists)
   */
  public loadMoreProducts(): this {
    cy.get(this.loadMoreButton).scrollIntoView().click();
    this.waitForPageLoad();
    return this;
  }

  /**
   * Get current results count
   */
  public getResultsCount(): Cypress.Chainable<string> {
    return cy.get(this.resultsCount).invoke('text');
  }

  /**
   * Verify breadcrumbs contain expected path
   */
  public verifyBreadcrumbs(expectedPath: string): this {
    cy.get(this.breadcrumbs).should('contain.text', expectedPath);
    return this;
  }
}
