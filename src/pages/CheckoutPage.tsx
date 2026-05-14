import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { submitCheckout } from '../api/formApi';

export default function CheckoutPage() {
  const { cart, getSubtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const subtotal = getSubtotal();
  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submitCheckout(formData as Record<string, string>);
      setShowSuccess(true);
      setTimeout(() => {
        clearCart();
        navigate('/shop');
      }, 4000);
    } catch {
      setSubmitError('Something went wrong submitting your order. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-cream-50 pt-28 pb-24 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="bg-white rounded-3xl p-12 text-center shadow-2xl max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
          >
            <CheckCircle className="w-24 h-24 text-teal-600 mx-auto mb-6" />
          </motion.div>
          <h2 className="font-serif text-4xl font-bold text-chocolate-900 mb-4">Order Received!</h2>
          <p className="text-chocolate-600 text-lg mb-4">
            Thanks, {formData.name.split(' ')[0]}! We've received your order and will be in touch at {formData.email} to confirm details.
          </p>
          <p className="text-chocolate-500 text-sm mb-8">
            Remember, this is an in-store pickup order. We'll reach out within 1 business day.
          </p>
          <p className="text-chocolate-400 text-sm">Redirecting you back to the shop...</p>
        </motion.div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    navigate('/shop');
    return null;
  }

  return (
    <div className="min-h-screen bg-cream-50 pt-28 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="font-serif text-5xl font-bold text-chocolate-900 mb-12">Checkout</h1>

          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-lg">
                <div className="mb-6 p-4 bg-teal-50 rounded-xl border border-teal-200 flex gap-3">
                  <span className="text-teal-600 text-lg mt-0.5">🏪</span>
                  <div>
                    <p className="font-semibold text-teal-900 text-sm">In-store pickup only</p>
                    <p className="text-teal-700 text-sm">Shipping is not available at this time. Orders are picked up in store at our Greenfield location.</p>
                  </div>
                </div>
                <h2 className="font-serif text-2xl font-bold text-chocolate-900 mb-6">Contact Information</h2>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block font-semibold text-chocolate-900 mb-2">
                      Full Name <span className="text-teal-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-chocolate-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-semibold text-chocolate-900 mb-2">
                      Email Address <span className="text-teal-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-chocolate-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block font-semibold text-chocolate-900 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-chocolate-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all"
                      placeholder="(317) 555-0123"
                    />
                  </div>

                  <div>
                    <label htmlFor="notes" className="block font-semibold text-chocolate-900 mb-2">
                      Pickup Notes or Special Requests
                    </label>
                    <textarea
                      id="notes"
                      rows={4}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-chocolate-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all resize-none"
                      placeholder="Any special instructions for your order..."
                    />
                  </div>
                </div>

                <div className="mt-8 p-4 bg-teal-50 rounded-xl border border-teal-200 flex gap-3">
                  <span className="text-teal-600 text-lg mt-0.5">🏪</span>
                  <div>
                    <p className="font-semibold text-teal-900 text-sm">In-store pickup only</p>
                    <p className="text-teal-700 text-sm">Shipping is not available at this time. Orders are picked up in store at our Greenfield location.</p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-8 px-8 py-4 bg-teal-600 text-white rounded-full font-bold text-lg hover:bg-teal-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-xl hover:scale-105 shadow-lg"
                >
                  {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </button>
                {submitError && (
                  <p className="text-red-600 text-sm text-center mt-3">{submitError}</p>
                )}
              </form>
            </div>

            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-3xl p-8 shadow-lg sticky top-24"
              >
                <h2 className="font-serif text-2xl font-bold text-chocolate-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {cart.items.map((item) => (
                    <div
                      key={`${item.productId}-${JSON.stringify(item.selectedOptions)}`}
                      className="flex gap-3 pb-4 border-b border-chocolate-100"
                    >
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-teal-100 to-chocolate-100 flex-shrink-0 overflow-hidden">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-chocolate-900 text-sm mb-1">{item.name}</h3>
                        <p className="text-xs text-chocolate-600">Qty: {item.quantity}</p>
                        {Object.keys(item.selectedOptions).length > 0 && (
                          <div className="text-xs text-chocolate-500 mt-1">
                            {Object.entries(item.selectedOptions).slice(0, 2).map(([key, value]) => (
                              <div key={key}>{value}</div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="font-semibold text-chocolate-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-chocolate-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-chocolate-700">
                    <span>Tax (estimated)</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-chocolate-700">
                    <span className="text-sm">Fulfillment</span>
                    <span className="text-sm font-semibold text-teal-600">In-store pickup</span>
                  </div>
                  <div className="pt-3 border-t-2 border-chocolate-200">
                    <div className="flex justify-between text-2xl font-bold text-chocolate-900">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
