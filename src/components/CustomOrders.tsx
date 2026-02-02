import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { PartyPopper, Phone } from 'lucide-react';

export default function CustomOrders() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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
            href="tel:+13172721906"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-teal-500 text-white rounded-full font-bold text-lg shadow-2xl hover:bg-teal-400 transition-all duration-300 hover:scale-105"
          >
            <Phone className="w-6 h-6" />
            <span>Call to Order: (317) 272-1906</span>
          </motion.a>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1, ease: 'easeInOut' }}
            className="mt-6 text-chocolate-200 text-sm"
          >
            Custom orders require 48-hour advance notice
          </motion.p>
        </div>
      </div>
    </section>
  );
}
