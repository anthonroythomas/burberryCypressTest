import { NavigationOptions, WaitOptions, ProductFilter } from './common';

export interface PageObject {
  visit(options?: NavigationOptions): this;
  waitForPageLoad(options?: WaitOptions): this;
  isLoaded(): Cypress.Chainable<boolean>;
}

export interface ProductInteractions {
  selectSize(size: string): this;
  selectColor(color: string): this;
  selectQuantity(quantity: number): this;
  addToBag(): this;
}

export interface FilterableList {
  applyFilters(filters: ProductFilter): this;
  clearFilters(): this;
  sortBy(sortOption: string): this;
}

export interface ProductDetails {
  title: string;
  price: string;
  description?: string;
  availableSizes?: string[];
  availableColors?: string[];
  inStock?: boolean;
  sku?: string;
}