export { BasePage } from './base/BasePage';

// Pages
export { HomePage } from './pages/HomePage';
export { ProductListingPage } from './pages/ProductListingPage';
export { ProductDetailPage } from './pages/ProductDetailPage';
export { SearchPage } from './pages/SearchPage';
export { CartPage } from './pages/CartPage';
export { CheckoutPage } from './pages/CheckoutPage';
export { LoginPage } from './pages/LoginPage';

// Components
export { Header } from './components/Header';
export { ProductCard } from './components/ProductCard';

// Re-export types for convenience
export type { 
  PageObject, 
  ProductInteractions, 
  FilterableList 
} from '../types/pages';

export type { 
  ShippingAddress, 
  TestUser, 
  ProductDetails, 
  ProductFilter,
  NavigationOptions,
  WaitOptions 
} from '../types/common';

export type { 
  ComponentBase,
  NavigationComponent,
  SearchComponent,
  CartComponent 
} from '../types/components';

export type {
  TestProduct,
  TestOrder,
  LoginCredentials
} from '../types/test-data';
