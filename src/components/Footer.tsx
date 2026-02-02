import { Heart, Instagram, Facebook, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-chocolate-900 text-cream-100 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="font-serif text-2xl font-bold mb-4 text-white">
                The Fudge Kettle
              </h3>
              <p className="text-chocolate-200 leading-relaxed">
                Handcrafted sweets and artisan gifts made with love in Avon, Indiana.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4 text-white">Visit Us</h4>
              <div className="space-y-2 text-chocolate-200">
                <p>7900 E US Highway 36</p>
                <p>Avon, IN 46123</p>
                <p className="mt-3">
                  <a href="tel:+13172721906" className="hover:text-teal-400 transition-colors">
                    (317) 272-1906
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4 text-white">Hours</h4>
              <div className="space-y-2 text-chocolate-200">
                <p>Monday - Saturday</p>
                <p>10:00 AM - 6:00 PM</p>
                <p className="mt-3">Sunday</p>
                <p>12:00 PM - 5:00 PM</p>
              </div>
            </div>
          </div>

          <div className="border-t border-chocolate-700 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-chocolate-200 hover:text-teal-400 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-chocolate-200 hover:text-teal-400 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="mailto:info@thefudgekettle.com"
                  className="text-chocolate-200 hover:text-teal-400 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-6 h-6" />
                </a>
                <a
                  href="tel:+13172721906"
                  className="text-chocolate-200 hover:text-teal-400 transition-colors"
                  aria-label="Phone"
                >
                  <Phone className="w-6 h-6" />
                </a>
              </div>

              <div className="flex items-center gap-2 text-chocolate-300 text-sm">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-teal-400 fill-teal-400" />
                <span>in Avon, Indiana</span>
              </div>
            </div>

            <div className="text-center text-chocolate-400 text-sm mt-8">
              © {new Date().getFullYear()} The Fudge Kettle. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
