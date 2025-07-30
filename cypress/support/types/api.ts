export interface ApiResponse<T = any> {
  status: number;
  data: T;
  message?: string;
}

export interface ProductApiResponse {
  id: string;
  name: string;
  price: number;
  currency: string;
  availability: boolean;
  images: string[];
  sizes: string[];
  colors: string[];
}

export interface UserApiResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
}