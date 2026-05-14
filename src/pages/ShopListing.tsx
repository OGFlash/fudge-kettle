import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { shopApi } from '../api/shopApi';
import { Product } from '../types/shop';

const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'fudge', label: 'Fudge' },
  { id: 'candy', label: 'Candy' },
  { id: 'gifts', label: 'Gifts' },
];

export default function ShopListing() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      const data = await shopApi.listProducts();
      setProducts(data);
      setIsLoading(false);
    };
    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-cream-50 pt-28 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-chocolate-900 mb-4">
            Our Shop
          </h1>
          <p className="text-lg text-chocolate-600">
            Browse our handcrafted fudge, specialty candies, and artisan gifts
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeInOut' }}
          className="max-w-md mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-chocolate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-chocolate-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeInOut' }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-teal-600 text-white shadow-lg'
                  : 'bg-white text-chocolate-700 hover:bg-chocolate-50 border-2 border-chocolate-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-600 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeInOut' }}
            >
              <Link
                to={`/shop/${product.slug}`}
                className="group block bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-teal-100 to-chocolate-100">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.limitedEdition && (
                    <div className="absolute top-4 right-4 bg-chocolate-800 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Limited
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold text-chocolate-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-chocolate-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-chocolate-900">
                      {(() => {
                        const allPrices = product.options
                          .filter(o => o.prices)
                          .flatMap(o => Object.values(o.prices!));
                        if (allPrices.length > 0) {
                          return `From $${Math.min(...allPrices).toFixed(2)}`;
                        }
                        return `$${product.price.toFixed(2)}`;
                      })()}
                    </span>
                    <span className="text-teal-600 font-semibold group-hover:gap-2 flex items-center gap-1 transition-all">
                      View
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          </div>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <p className="text-chocolate-600 text-lg">No products found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
