import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';

const details = [
  {
    icon: MapPin,
    title: 'Location',
    content: '8100 E US Hwy 36, Suite J, Avon, IN 46123',
    link: 'https://maps.google.com/?q=8100+E+US+Hwy+36+Suite+J+Avon+IN+46123',
  },
  {
    icon: Clock,
    title: 'Hours',
    content: (
      <>
        Mon–Thu: 11am – 6pm<br />
        Fri: 11am – 7pm<br />
        Sat: 11am – 6pm<br />
        Sun: 12pm – 5pm
      </>
    ),
  },
  {
    icon: Phone,
    title: 'Phone',
    content: '(317) 268-6216',
    link: 'tel:+13172686216',
  },
];

export default function VisitUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="visit" ref={ref} className="py-20 sm:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-chocolate-900 mb-4">
            Come Visit Us
          </h2>
          <p className="text-lg text-chocolate-600">
            Stop by our shop in Avon and experience the magic in person. We can't wait to see you!
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
              className="space-y-6"
            >
              {details.map((detail, index) => {
                const Icon = detail.icon;
                const content = detail.link ? (
                  <a
                    href={detail.link}
                    className="text-teal-600 hover:text-teal-700 transition-colors"
                    target={detail.link.startsWith('http') ? '_blank' : undefined}
                    rel={detail.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {detail.content}
                  </a>
                ) : (
                  <div className="text-chocolate-700">{detail.content}</div>
                );

                return (
                  <motion.div
                    key={detail.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: 'easeInOut' }}
                    className="flex items-start gap-4 bg-cream-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex-shrink-0 bg-teal-100 rounded-xl p-3">
                      <Icon className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-chocolate-900 text-lg mb-2">
                        {detail.title}
                      </h3>
                      <div className="text-base">{content}</div>
                    </div>
                  </motion.div>
                );
              })}

              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7, ease: 'easeInOut' }}
                href="https://maps.google.com/?q=8100+E+US+Hwy+36+Suite+J+Avon+IN+46123"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-8 py-4 bg-teal-600 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-teal-700 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Navigation className="w-5 h-5" />
                Get Directions
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeInOut' }}
              className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px] lg:h-full min-h-[400px]"
            >
              <img
                src="/store-front.jpg"
                alt="The Fudge Kettle storefront in Avon, Indiana"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
