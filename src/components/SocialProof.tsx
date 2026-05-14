import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Instagram } from 'lucide-react';

const eventPhotos = [
  { src: '/Avon-community-school-event.jpg', alt: 'Avon community school event' },
  { src: '/center-grove-high-school-event.jpg', alt: 'Center Grove High School event' },
  { src: '/Avon-community-school-event2.jpg', alt: 'Avon school event' },
  { src: '/center-grove-high-school-event2.jpg', alt: 'Center Grove event' },
];

const instagramPosts = [
  { id: 1, src: '/coco-covered-oreos.jpg', alt: 'Chocolate covered Oreos' },
  { id: 2, src: '/strawberry-coco.jpg', alt: 'Strawberry chocolate treats' },
  { id: 3, src: '/freeze-dried-red-hots.jpg', alt: 'Freeze dried Red Hots' },
  { id: 4, src: '/fudge4.jpg', alt: 'Handmade fudge selection' },
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
            Out in the Community
          </h2>
          <p className="text-lg text-chocolate-600">
            We love getting out to local events! Come find us at schools, fairs, and community gatherings across Avon and beyond.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 max-w-5xl mx-auto"
        >
          {eventPhotos.map((photo, index) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: 'easeInOut' }}
              className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
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
                className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <img src={post.src} alt={post.alt} className="w-full h-full object-cover" />
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
