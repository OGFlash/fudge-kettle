import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, updateQuantity, removeItem, getSubtotal } = useCart();

  const subtotal = getSubtotal();
  const tax = subtotal * 0.07; // 7% tax placeholder
  const total = subtotal + tax;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-chocolate-900/50 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed right-0 top-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-chocolate-200">
              <h2 className="font-serif text-2xl font-bold text-chocolate-900">Your Cart</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-chocolate-100 rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="w-6 h-6 text-chocolate-700" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart className="w-16 h-16 text-chocolate-300 mb-4" />
                  <p className="text-chocolate-600 text-lg font-medium mb-2">Your cart is empty</p>
                  <p className="text-chocolate-500 text-sm mb-6">Add some delicious treats to get started!</p>
                  <Link
                    to="/shop"
                    onClick={onClose}
                    className="px-6 py-3 bg-teal-600 text-white rounded-full font-semibold hover:bg-teal-700 transition-colors"
                  >
                    Browse Shop
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.items.map((item, index) => (
                    <motion.div
                      key={`${item.productId}-${JSON.stringify(item.selectedOptions)}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-cream-50 rounded-2xl p-4"
                    >
                      <div className="flex gap-4">
<div className="w-20 h-20 rounded-xl bg-gradient-to-br from-teal-100 to-chocolate-100 flex-shrink-0 overflow-hidden">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-chocolate-900 mb-1">{item.name}</h3>
                          
                          {Object.keys(item.selectedOptions).length > 0 && (
                            <div className="text-xs text-chocolate-600 mb-2 space-y-1">
                              {Object.entries(item.selectedOptions).map(([key, value]) => (
                                <div key={key}>
                                  <span className="font-medium">{key}:</span> {value}
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.productId, item.selectedOptions, item.quantity - 1)}
                                className="w-8 h-8 rounded-full bg-white border border-chocolate-200 flex items-center justify-center hover:border-teal-500 transition-colors"
                              >
                                <Minus className="w-4 h-4 text-chocolate-700" />
                              </button>
                              <span className="font-semibold text-chocolate-900 w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.productId, item.selectedOptions, item.quantity + 1)}
                                className="w-8 h-8 rounded-full bg-white border border-chocolate-200 flex items-center justify-center hover:border-teal-500 transition-colors"
                              >
                                <Plus className="w-4 h-4 text-chocolate-700" />
                              </button>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="font-bold text-chocolate-900">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                              <button
                                onClick={() => removeItem(item.productId, item.selectedOptions)}
                                className="p-1 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {cart.items.length > 0 && (
              <div className="border-t border-chocolate-200 p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-chocolate-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-chocolate-700">
                    <span>Tax (estimated)</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-chocolate-900 pt-2 border-t border-chocolate-200">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link
                    to="/checkout"
                    onClick={onClose}
                    className="block w-full px-6 py-4 bg-teal-600 text-white text-center rounded-full font-bold hover:bg-teal-700 transition-colors shadow-lg"
                  >
                    Checkout
                  </Link>
                  <Link
                    to="/cart"
                    onClick={onClose}
                    className="block w-full px-6 py-3 text-center text-chocolate-700 hover:text-teal-600 font-semibold transition-colors"
                  >
                    View Full Cart
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
