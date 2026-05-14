import { motion } from 'framer-motion';
import { MapPin, Phone } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cream-50 via-cream-100 to-teal-50 pt-36">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNkNGMwYTEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="text-center lg:text-left"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
                className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-chocolate-900 leading-tight mb-6"
              >
                Satisfy Your
                <span className="block text-teal-600">Sweet Tooth</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeInOut' }}
                className="text-lg sm:text-xl text-chocolate-700 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                Experience our homemade fudge, candies &amp; handcrafted gifts — made fresh in small batches right here in Avon, Indiana.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: 'easeInOut' }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <a
                  href="#visit"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal-600 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-teal-700 hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <MapPin className="w-5 h-5" />
                  Visit Us in Avon
                </a>
                <a
                  href="#custom"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-chocolate-800 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-chocolate-200"
                >
                  <Phone className="w-5 h-5" />
                  Order Custom Fudge
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/5]">
                  <img
                    src="/fudge2.jpg"
                    alt="Handmade fudge at The Fudge Kettle"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate-900/20 to-transparent pointer-events-none"></div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs hidden lg:block"
              >
                <p className="font-serif text-chocolate-900 text-lg font-semibold mb-1">Made Fresh Daily</p>
                <p className="text-chocolate-600 text-sm">Small batches, premium ingredients, since 2020</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-chocolate-400"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
