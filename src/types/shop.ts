export interface ProductOption {
  name: string;
  type: 'single' | 'dropdown';
  required: boolean;
  values: string[];
  prices?: Record<string, number>; // value → absolute price override
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  tags: string[];
  category: string;
  options: ProductOption[];
  limitedEdition?: boolean;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedOptions: Record<string, string>;
}

export interface Cart {
  items: CartItem[];
}
