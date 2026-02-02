import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Instagram } from 'lucide-react';

const mentions = [
  { name: 'Indiana Local', logo: '📰' },
  { name: 'Sweet Living Magazine', logo: '📖' },
  { name: 'Avon Community', logo: '🏘️' },
  { name: 'Midwest Eats', logo: '🍴' },
];

const instagramPosts = [
  { id: 1, emoji: '🍫' },
  { id: 2, emoji: '🎁' },
  { id: 3, emoji: '🍬' },
  { id: 4, emoji: '💝' },
];

export default function SocialProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 sm:py-24 lg:py-32 bg-cream-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-chocolate-900 mb-4">
            As Featured In
          </h2>
          <p className="text-lg text-chocolate-600">
            Trusted by the community and loved by visitors from near and far.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 max-w-5xl mx-auto"
        >
          {mentions.map((mention, index) => (
            <motion.div
              key={mention.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: 'easeInOut' }}
              className="bg-white rounded-2xl p-8 flex flex-col items-center justify-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-chocolate-100"
            >
              <div className="text-5xl mb-3">{mention.logo}</div>
              <p className="text-sm font-semibold text-chocolate-700 text-center">
                {mention.name}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeInOut' }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Instagram className="w-8 h-8 text-chocolate-700" />
            <h3 className="font-serif text-3xl font-bold text-chocolate-900">
              Follow Our Story
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {instagramPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1, ease: 'easeInOut' }}
                className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-teal-100 to-chocolate-100 flex items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg"
              >
                <div className="text-6xl">{post.emoji}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.1, ease: 'easeInOut' }}
            className="text-center"
          >
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span>@thefudgekettle</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
