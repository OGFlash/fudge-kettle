import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, MapPinned, Leaf } from 'lucide-react';

const reasons = [
  {
    icon: Sparkles,
    title: 'Handmade',
    description: 'Every piece is crafted by hand in small batches',
  },
  {
    icon: MapPinned,
    title: 'Local',
    description: 'Proudly serving Avon and surrounding communities since day one',
  },
  {
    icon: Leaf,
    title: 'Fresh',
    description: 'Made fresh daily with premium ingredients',
  },
];

export default function WhyUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-teal-50 via-cream-100 to-chocolate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-chocolate-900 mb-6">
                Our Story
              </h2>
              
              <p className="text-lg text-chocolate-700 leading-relaxed mb-8">
                The Fudge Kettle was born in April 2020, opening our first brick &amp; mortar location right here in Avon, Indiana. New owners took over in May 2023 and have been dedicated to growing the community and getting out to local events ever since.
              </p>

              <p className="text-lg text-chocolate-700 leading-relaxed mb-10">
                We love seeing you all at events — and in the store, where you'll find fresh fudge, new &amp; nostalgic candies, freeze-dried treats made right in our shop, and unique gifts from local artisan vendors.
              </p>

              <div className="space-y-6">
                {reasons.map((reason, index) => {
                  const Icon = reason.icon;
                  return (
                    <motion.div
                      key={reason.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: 'easeInOut' }}
                      className="flex items-start gap-4"
                    >
                      <div className="flex-shrink-0 bg-white rounded-xl p-3 shadow-md">
                        <Icon className="w-6 h-6 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-chocolate-900 text-lg mb-1">
                          {reason.title}
                        </h3>
                        <p className="text-chocolate-600">
                          {reason.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-square">
                  <img
                    src="/team.jpg"
                    alt="The Fudge Kettle team"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6, ease: 'easeInOut' }}
                className="absolute -bottom-8 -right-8 bg-teal-600 text-white rounded-2xl shadow-2xl p-8 max-w-xs"
              >
                <p className="font-serif text-3xl font-bold mb-2">Open Since</p>
                <p className="text-teal-100 font-medium">August 2020 in Avon, IN</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
