import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, updateQuantity, removeItem, getSubtotal } = useCart();

  const subtotal = getSubtotal();
  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-cream-50 pt-20 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="font-serif text-5xl font-bold text-chocolate-900 mb-12">Shopping Cart</h1>

          {cart.items.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-lg">
              <ShoppingBag className="w-20 h-20 text-chocolate-300 mx-auto mb-6" />
              <h2 className="font-serif text-3xl font-bold text-chocolate-900 mb-4">Your cart is empty</h2>
              <p className="text-chocolate-600 text-lg mb-8">
                Looks like you haven't added any items yet. Let's fix that!
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white rounded-full font-semibold text-lg hover:bg-teal-700 transition-colors shadow-lg"
              >
                Browse Shop
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cart.items.map((item, index) => (
                  <motion.div
                    key={`${item.productId}-${JSON.stringify(item.selectedOptions)}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <div className="flex gap-6">
                      <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-teal-100 to-chocolate-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-5xl">{item.image}</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/shop/${item.slug}`}
                          className="font-serif text-2xl font-semibold text-chocolate-900 hover:text-teal-600 transition-colors mb-2 block"
                        >
                          {item.name}
                        </Link>

                        {Object.keys(item.selectedOptions).length > 0 && (
                          <div className="text-sm text-chocolate-600 mb-4 space-y-1">
                            {Object.entries(item.selectedOptions).map(([key, value]) => (
                              <div key={key}>
                                <span className="font-medium">{key}:</span> {value}
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.productId, item.selectedOptions, item.quantity - 1)}
                              className="w-10 h-10 rounded-full bg-cream-100 border border-chocolate-200 flex items-center justify-center hover:border-teal-500 transition-colors"
                            >
                              <Minus className="w-5 h-5 text-chocolate-700" />
                            </button>
                            <span className="font-bold text-xl text-chocolate-900 w-12 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.selectedOptions, item.quantity + 1)}
                              className="w-10 h-10 rounded-full bg-cream-100 border border-chocolate-200 flex items-center justify-center hover:border-teal-500 transition-colors"
                            >
                              <Plus className="w-5 h-5 text-chocolate-700" />
                            </button>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="font-bold text-2xl text-chocolate-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeItem(item.productId, item.selectedOptions)}
                              className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white rounded-2xl p-8 shadow-lg sticky top-24"
                >
                  <h2 className="font-serif text-2xl font-bold text-chocolate-900 mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-chocolate-700">
                      <span>Subtotal</span>
                      <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-chocolate-700">
                      <span>Tax (estimated)</span>
                      <span className="font-semibold">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-chocolate-700">
                      <span className="text-sm">Shipping</span>
                      <span className="text-sm font-semibold">Calculated at checkout</span>
                    </div>
                    <div className="pt-4 border-t-2 border-chocolate-200">
                      <div className="flex justify-between text-2xl font-bold text-chocolate-900">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/checkout"
                    className="block w-full px-6 py-4 bg-teal-600 text-white text-center rounded-full font-bold text-lg hover:bg-teal-700 transition-all duration-300 hover:shadow-xl hover:scale-105 shadow-lg mb-4"
                  >
                    Proceed to Checkout
                  </Link>

                  <Link
                    to="/shop"
                    className="block w-full px-6 py-3 text-center text-chocolate-700 hover:text-teal-600 font-semibold transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </motion.div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
