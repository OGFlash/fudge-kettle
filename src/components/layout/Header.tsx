import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CartDrawer from '../shop/CartDrawer';

export default function Header() {
  const { getItemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const itemCount = getItemCount();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="font-serif text-2xl font-bold text-chocolate-900 hover:text-teal-600 transition-colors">
              The Fudge Kettle
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className="text-chocolate-700 hover:text-teal-600 font-semibold transition-colors"
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="text-chocolate-700 hover:text-teal-600 font-semibold transition-colors"
              >
                Shop
              </Link>
              <a
                href="/#visit"
                className="text-chocolate-700 hover:text-teal-600 font-semibold transition-colors"
              >
                Visit Us
              </a>
              <a
                href="/#custom"
                className="text-chocolate-700 hover:text-teal-600 font-semibold transition-colors"
              >
                Custom Orders
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-chocolate-100 rounded-full transition-colors"
                aria-label="Open cart"
              >
                <ShoppingCart className="w-6 h-6 text-chocolate-700" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-teal-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-chocolate-100 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-chocolate-700" />
                ) : (
                  <Menu className="w-6 h-6 text-chocolate-700" />
                )}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-chocolate-200">
              <div className="flex flex-col space-y-4">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-chocolate-700 hover:text-teal-600 font-semibold transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-chocolate-700 hover:text-teal-600 font-semibold transition-colors"
                >
                  Shop
                </Link>
                <a
                  href="/#visit"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-chocolate-700 hover:text-teal-600 font-semibold transition-colors"
                >
                  Visit Us
                </a>
                <a
                  href="/#custom"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-chocolate-700 hover:text-teal-600 font-semibold transition-colors"
                >
                  Custom Orders
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
