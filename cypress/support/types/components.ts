export interface ComponentBase {
  verifyVisible(): this;
}

export interface NavigationComponent extends ComponentBase {
  navigateToCategory(categoryName: string): this;
}

export interface SearchComponent extends ComponentBase {
  search(searchTerm: string): this;
  getSearchResults(): Cypress.Chainable<JQuery<HTMLElement>>;
}

export interface CartComponent extends ComponentBase {
  getItemCount(): Cypress.Chainable<number>;
  openCart(): this;
}