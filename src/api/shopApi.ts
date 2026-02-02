import { Product } from '../types/shop';
import { products } from '../data/products';

/**
 * Shop API interface for product operations.
 * Implement this interface to integrate with real backends (Shopify, Square, WooCommerce, etc.)
 */
export interface ShopApi {
  /**
   * List all products
   */
  listProducts(): Promise<Product[]>;

  /**
   * Get a single product by slug
   */
  getProductBySlug(slug: string): Promise<Product | null>;
}

/**
 * Mock implementation of ShopApi using local product data.
 * Replace this with a real API implementation when ready to integrate with a backend.
 */
export class MockShopApi implements ShopApi {
  async listProducts(): Promise<Product[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return products;
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    const product = products.find(p => p.slug === slug);
    return product || null;
  }
}

// Export a singleton instance for use throughout the app
export const shopApi: ShopApi = new MockShopApi();
