export interface TestProduct {
  name: string;
  price: string;
  size?: string;
  color?: string;
  quantity?: number;
}

export interface TestOrder {
  products: TestProduct[];
  shippingAddress: ShippingAddress;
  paymentMethod: 'card' | 'paypal' | 'klarna';
  totalAmount: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}