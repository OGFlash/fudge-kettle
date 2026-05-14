import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { PartyPopper, Phone, CheckCircle, Send } from 'lucide-react';
import { submitCustomOrder } from '../api/formApi';

export default function CustomOrders() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    flavors: '',
    quantity: '',
    fulfillment: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submitCustomOrder(formData as Record<string, string>);
      setSubmitted(true);
    } catch {
      setSubmitError('Something went wrong. Please try again or give us a call.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', flavors: '', quantity: '', fulfillment: '', message: '' });
    setSubmitted(false);
  };

  return (
    <section id="custom" ref={ref} className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-chocolate-800 to-chocolate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzR2Mi1oMnYtMmgtMnptMC00djJoMnYtMmgtMnptMC00djJoMnYtMmgtMnptMC00djJoMnYtMmgtMnptMC00djJoMnYtMmgtMnptMC00djJoMnYtMmgtMnptMC00djJoMnYtMmgtMnptMC00djJoMnYtMmgtMnptMC00djJoMnYtMmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="inline-flex items-center justify-center w-20 h-20 bg-teal-500 rounded-full mb-8"
          >
            <PartyPopper className="w-10 h-10" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            Make Your Event Unforgettable
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeInOut' }}
            className="text-xl text-chocolate-100 mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            From weddings and corporate events to birthdays and holidays, we create custom fudge 
            and gift boxes that turn special moments into sweet memories.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeInOut' }}
            className="grid sm:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto"
          >
            {[
              { title: 'Weddings', emoji: '💍' },
              { title: 'Corporate Gifts', emoji: '💼' },
              { title: 'Celebrations', emoji: '🎉' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1, ease: 'easeInOut' }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="text-4xl mb-3">{item.emoji}</div>
                <p className="font-semibold text-lg">{item.title}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.a
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeInOut' }}
            href="tel:+13172686216"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-teal-500 text-white rounded-full font-bold text-lg shadow-2xl hover:bg-teal-400 transition-all duration-300 hover:scale-105"
          >
            <Phone className="w-6 h-6" />
            <span>Call to Order: (317) 268-6216</span>
          </motion.a>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1, ease: 'easeInOut' }}
            className="mt-6 text-chocolate-200 text-sm"
          >
            Custom orders require 48-hour advance notice
          </motion.p>

          {/* Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.1, ease: 'easeInOut' }}
            className="mt-16 max-w-2xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-8 sm:p-10 text-left">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.1, type: 'spring' }}
                  >
                    <CheckCircle className="w-16 h-16 text-teal-400 mx-auto mb-6" />
                  </motion.div>
                  <h3 className="font-serif text-3xl font-bold text-white mb-3">Message Sent!</h3>
                  <p className="text-chocolate-200 text-lg mb-2">Thanks, {formData.name.split(' ')[0]}! We'll be in touch at {formData.email}.</p>
                  <p className="text-chocolate-300 text-sm mb-8">Expect to hear from us within 1–2 business days to discuss your custom order.</p>
                  <button
                    onClick={handleReset}
                    className="px-8 py-3 bg-white/20 hover:bg-white/30 text-white rounded-full font-semibold transition-all duration-300 border border-white/30"
                  >
                    Send Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">Send Us a Message</h3>
                  <p className="text-chocolate-200 text-sm mb-8">Prefer to write it out? Fill in the details below and we'll get back to you.</p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-chocolate-100 mb-1.5">
                          Name <span className="text-teal-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Jane Smith"
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/25 text-white placeholder-chocolate-300 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-chocolate-100 mb-1.5">
                          Email <span className="text-teal-400">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="jane@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/25 text-white placeholder-chocolate-300 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-chocolate-100 mb-1.5">Flavor(s)</label>
                        <input
                          type="text"
                          name="flavors"
                          value={formData.flavors}
                          onChange={handleChange}
                          placeholder="e.g. Chocolate, Maple Walnut"
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/25 text-white placeholder-chocolate-300 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-chocolate-100 mb-1.5">Quantity / Size</label>
                        <input
                          type="text"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          placeholder="e.g. 5 lbs, 20 gift boxes"
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/25 text-white placeholder-chocolate-300 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-chocolate-100 mb-1.5">Pickup or Delivery?</label>
                      <select
                        name="fulfillment"
                        value={formData.fulfillment}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/25 text-white focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition-all appearance-none"
                      >
                        <option value="" className="text-chocolate-900 bg-white">Select one...</option>
                        <option value="pickup" className="text-chocolate-900 bg-white">In-store pickup (Greenfield location)</option>
                        <option value="delivery" className="text-chocolate-900 bg-white">Local delivery — we'll discuss details</option>
                        <option value="unsure" className="text-chocolate-900 bg-white">Not sure yet</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-chocolate-100 mb-1.5">Message</label>
                      <textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your event, any special requests, packaging ideas, or questions..."
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/25 text-white placeholder-chocolate-300 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition-all resize-none"
                      />
                    </div>

                    <div className="flex gap-4 pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal-500 hover:bg-teal-400 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
                      >
                        <Send className="w-5 h-5" />
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all duration-300 border border-white/25"
                      >
                        Clear
                      </button>
                    </div>
                    {submitError && (
                      <p className="text-red-300 text-sm text-center pt-2">{submitError}</p>
                    )}
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
