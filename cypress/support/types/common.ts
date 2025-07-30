export interface WaitOptions {
  timeout?: number;
  interval?: number;
}

export interface NavigationOptions {
  waitForLoad?: boolean;
  acceptCookies?: boolean;
}

export interface ProductFilter {
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  categories?: string[];
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
}

export interface TestUser {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface ProductDetails {
  title: string;
  price: string;
  description?: string;
  availableSizes?: string[];
  availableColors?: string[];
}