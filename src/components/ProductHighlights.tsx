import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Candy, Gift, Heart } from 'lucide-react';

const products = [
  {
    icon: Heart,
    title: 'Handmade Fudge',
    description: 'Rich, creamy fudge in classic and seasonal flavors, made fresh in our Avon shop. Over 25 flavors to discover.',
    image: '/fudge.jpg',
  },
  {
    icon: Candy,
    title: 'Specialty Candy',
    description: "Nostalgic favorites, popular new candies, and freeze-dried treats we make right in the store for maximum freshness.",
    image: '/freeze-dried-red-hots.jpg',
  },
  {
    icon: Gift,
    title: 'Artisan Gifts',
    description: "Locally-crafted tumblers, candles, jewelry, wreaths, and more from our vendor section — unique gifts you won't find anywhere else.",
    image: '/boozy-cakes-and-others.jpg',
  },
];

export default function ProductHighlights() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 sm:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-chocolate-900 mb-4">
            What We Make
          </h2>
          <p className="text-lg text-chocolate-600">
            Every treat is crafted with care, using time-honored recipes and the finest ingredients.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2, ease: 'easeInOut' }}
                className="group"
              >
                <div className="bg-cream-50 rounded-3xl p-8 h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 border-transparent hover:border-teal-200">
                  <div className="rounded-2xl w-20 h-20 mb-6 overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                  </div>
                  
                  <h3 className="font-serif text-2xl font-semibold text-chocolate-900 mb-3">
                    {product.title}
                  </h3>
                  
                  <p className="text-chocolate-600 leading-relaxed mb-6">
                    {product.description}
                  </p>

                  <div className="flex items-center text-teal-600 font-semibold group-hover:gap-3 gap-2 transition-all duration-300">
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">Learn More</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
