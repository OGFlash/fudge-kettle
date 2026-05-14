import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingCart, Zap } from 'lucide-react';
import { shopApi } from '../api/shopApi';
import { useCart } from '../context/CartContext';
import { Product } from '../types/shop';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      if (!slug) return;
      setIsLoading(true);
      const data = await shopApi.getProductBySlug(slug);
      setProduct(data);
      setIsLoading(false);
      
      // Initialize required options
      if (data) {
        const initialOptions: Record<string, string> = {};
        data.options.forEach((option) => {
          if (option.required && option.values.length > 0) {
            initialOptions[option.name] = option.values[0];
          }
        });
        setSelectedOptions(initialOptions);
      }
    };
    loadProduct();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream-50 pt-28 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-cream-50 pt-28 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-chocolate-900 mb-4">Product not found</h1>
          <Link to="/shop" className="text-teal-600 hover:text-teal-700 font-semibold">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const allRequiredOptionsSelected = product.options
    .filter((opt) => opt.required)
    .every((opt) => selectedOptions[opt.name]);

  // Compute active price: if any selected option has a prices map, use it
  const computedPrice = product.options.reduce((price, option) => {
    if (option.prices && selectedOptions[option.name] && option.prices[selectedOptions[option.name]] !== undefined) {
      return option.prices[selectedOptions[option.name]];
    }
    return price;
  }, product.price);

  const handleAddToCart = () => {
    if (!allRequiredOptionsSelected) return;

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: computedPrice,
      image: product.images[0],
      selectedOptions,
      quantity,
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleBuyNow = () => {
    if (!allRequiredOptionsSelected) return;

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: computedPrice,
      image: product.images[0],
      selectedOptions,
      quantity,
    });

    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-cream-50 pt-28 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="mb-8"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-chocolate-700 hover:text-teal-600 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Shop
          </Link>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              <div className="sticky top-24">
                <div className="rounded-3xl aspect-square overflow-hidden shadow-2xl bg-gradient-to-br from-teal-100 to-chocolate-100">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
            >
              {product.limitedEdition && (
                <div className="inline-flex items-center gap-2 bg-chocolate-800 text-white text-sm font-bold px-4 py-2 rounded-full mb-4">
                  <Zap className="w-4 h-4" />
                  Limited Edition
                </div>
              )}

              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-chocolate-900 mb-4">
                {product.name}
              </h1>

              <p className="text-3xl font-bold text-chocolate-900 mb-6">
                ${computedPrice.toFixed(2)}
              </p>

              <p className="text-lg text-chocolate-700 leading-relaxed mb-8">
                {product.description}
              </p>

              {product.options.length > 0 && (
                <div className="space-y-6 mb-8">
                  {product.options.map((option) => (
                    <div key={option.name}>
                      <label className="block font-semibold text-chocolate-900 mb-3">
                        {option.name}
                        {option.required && <span className="text-teal-600 ml-1">*</span>}
                      </label>

                      {option.type === 'single' ? (
                        <div className="flex flex-wrap gap-2">
                          {option.values.map((value) => (
                            <button
                              key={value}
                              onClick={() => setSelectedOptions({ ...selectedOptions, [option.name]: value })}
                              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                                selectedOptions[option.name] === value
                                  ? 'bg-teal-600 text-white shadow-lg'
                                  : 'bg-white text-chocolate-700 border-2 border-chocolate-200 hover:border-teal-300'
                              }`}
                            >
                              {value}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <select
                          value={selectedOptions[option.name] || ''}
                          onChange={(e) => setSelectedOptions({ ...selectedOptions, [option.name]: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border-2 border-chocolate-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all"
                        >
                          {!option.required && <option value="">Select an option</option>}
                          {option.values.map((value) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="mb-8">
                <label className="block font-semibold text-chocolate-900 mb-3">Quantity</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-full bg-white border-2 border-chocolate-200 flex items-center justify-center hover:border-teal-500 transition-colors"
                  >
                    <Minus className="w-5 h-5 text-chocolate-700" />
                  </button>
                  <span className="text-2xl font-bold text-chocolate-900 w-16 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 rounded-full bg-white border-2 border-chocolate-200 flex items-center justify-center hover:border-teal-500 transition-colors"
                  >
                    <Plus className="w-5 h-5 text-chocolate-700" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!allRequiredOptionsSelected}
                  className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all duration-300 ${
                    allRequiredOptionsSelected
                      ? 'bg-teal-600 text-white hover:bg-teal-700 hover:shadow-xl hover:scale-105'
                      : 'bg-chocolate-200 text-chocolate-400 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-6 h-6" />
                  Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={!allRequiredOptionsSelected}
                  className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg border-2 transition-all duration-300 ${
                    allRequiredOptionsSelected
                      ? 'bg-chocolate-800 text-white border-chocolate-800 hover:bg-chocolate-900 hover:shadow-xl hover:scale-105'
                      : 'bg-chocolate-100 text-chocolate-400 border-chocolate-200 cursor-not-allowed'
                  }`}
                >
                  <Zap className="w-6 h-6" />
                  Buy Now
                </button>
              </div>

              {product.tags.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-cream-100 text-chocolate-600 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 right-8 bg-teal-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="font-semibold">Added to cart!</span>
        </motion.div>
      )}
    </div>
  );
}
