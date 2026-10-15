import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Search, Menu, X, Heart, Sparkles, Clock, Compass, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onSelectCategory?: (category: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const { cart, setIsCartOpen, setIsSearchOpen, setIsOrderTrackingOpen, setIsCustomBoxOpen, setIsThemeCustomizerOpen, currentTheme } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <>
      {/* Announcement ribbon */}
      <div className="bg-[#412B24] text-[#F9EDE6] text-xs py-2 px-4 text-center tracking-wider font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#E5B895] animate-pulse" />
        <span>Fresh Morning Batches Now Ready • Complimentary Hand Delivery on Orders Above ₹1,000</span>
        <button
          onClick={() => setIsCustomBoxOpen(true)}
          className="underline decoration-[#E5B895] decoration-1 underline-offset-2 ml-2 hover:text-[#E5B895] transition-colors hidden sm:inline"
        >
          Build a Dessert Box →
        </button>
      </div>

      <header
        id="site-header"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[var(--theme-nav-bg)] backdrop-blur-md shadow-sm border-b border-[var(--theme-card-border)]'
            : 'bg-[var(--theme-nav-bg)] border-b border-[var(--theme-card-border)]/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu button */}
            <div className="flex items-center lg:hidden">
              <button
                id="btn-mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-[var(--theme-text-body)] hover:text-[var(--theme-text-title)] transition-colors rounded-lg"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo & Name */}
            <div className="flex items-center gap-3">
              <button
                id="brand-logo-btn"
                onClick={() => handleNavClick('hero')}
                className="text-left group flex items-center gap-2.5"
              >
                <div className="w-10 h-10 rounded-full bg-[#E5B895] text-[#2B1810] flex items-center justify-center font-serif text-xl font-bold shadow-sm transition-transform duration-300 group-hover:scale-105 border border-[#F0CAA8]">
                  M
                </div>
                <div>
                  <span className="font-serif text-2xl tracking-tight text-[var(--theme-text-title)] font-semibold block leading-none">
                    Mithaas & Co.
                  </span>
                  <span className="text-[10px] tracking-[0.25em] text-[var(--theme-accent)] uppercase font-medium">
                    Artisan Bakehouse & Cafe
                  </span>
                </div>
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              <button
                id="nav-link-home"
                onClick={() => handleNavClick('hero')}
                className="text-sm font-semibold text-[var(--theme-accent)] hover:text-[var(--theme-text-title)] transition-colors py-1 relative"
              >
                Home
              </button>
              <button
                id="nav-link-shop"
                onClick={() => handleNavClick('shop')}
                className="text-sm font-medium text-[var(--theme-text-body)] hover:text-[var(--theme-accent)] transition-colors py-1"
              >
                Shop
              </button>
              <button
                id="nav-link-categories"
                onClick={() => handleNavClick('categories')}
                className="text-sm font-medium text-[var(--theme-text-body)] hover:text-[var(--theme-accent)] transition-colors py-1"
              >
                Categories
              </button>
              <button
                id="nav-link-how-it-works"
                onClick={() => handleNavClick('how-it-works')}
                className="text-sm font-medium text-[var(--theme-text-body)] hover:text-[var(--theme-accent)] transition-colors py-1"
              >
                How It Works
              </button>
              <button
                id="nav-link-about"
                onClick={() => handleNavClick('about')}
                className="text-sm font-medium text-[var(--theme-text-body)] hover:text-[var(--theme-accent)] transition-colors py-1"
              >
                About
              </button>
              <button
                id="nav-link-contact"
                onClick={() => handleNavClick('contact')}
                className="text-sm font-medium text-[var(--theme-text-body)] hover:text-[var(--theme-accent)] transition-colors py-1"
              >
                Contact
              </button>
            </nav>

            {/* Right Action Icons & CTA */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Theme Customizer button */}
              <button
                id="btn-nav-theme"
                onClick={() => setIsThemeCustomizerOpen(true)}
                className="p-2 text-[var(--theme-text-body)] hover:text-[var(--theme-text-title)] transition-colors rounded-full hover:bg-[var(--theme-card)] flex items-center gap-1.5 text-xs font-medium border border-[var(--theme-card-border)]/60"
                title="Change Theme & Background Ambience"
                aria-label="Theme Customizer"
              >
                <Palette className="w-4 h-4 text-[var(--theme-accent)]" />
                <span className="hidden xl:inline text-[var(--theme-text-body)]">Theme</span>
              </button>

              {/* Search button */}
              <button
                id="btn-nav-search"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[var(--theme-text-body)] hover:text-[var(--theme-text-title)] transition-colors rounded-full hover:bg-[var(--theme-card)] border border-[var(--theme-card-border)]/60"
                aria-label="Search treats"
                title="Search treats"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Order Tracking lookup button */}
              <button
                id="btn-nav-track-order"
                onClick={() => setIsOrderTrackingOpen(true)}
                className="p-2 text-[var(--theme-text-body)] hover:text-[var(--theme-text-title)] transition-colors rounded-full hover:bg-[var(--theme-card)] hidden sm:flex items-center gap-1.5 text-xs font-medium border border-[var(--theme-card-border)]/60"
                title="Track your order status"
              >
                <Clock className="w-4 h-4 text-[var(--theme-accent)]" />
                <span className="hidden md:inline">Track</span>
              </button>

              {/* Shopping Cart Button */}
              <button
                id="btn-nav-cart"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 text-[#2B1810] bg-[#E5B895] hover:bg-[#F0CAA8] transition-all rounded-full shadow-md"
                aria-label="View Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5 text-[#2B1810]" />
                {totalCartCount > 0 && (
                  <span
                    id="cart-badge-count"
                    className="absolute -top-1 -right-1 bg-[#24140D] text-[#E5B895] text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm border border-[#E5B895]"
                  >
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* Prominent "Order Now" / "Buy Now" CTA Button */}
              <button
                id="btn-nav-order-now"
                onClick={() => handleNavClick('shop')}
                className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#E5B895] hover:bg-[#F0CAA8] text-[#2B1810] text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[var(--theme-card)] border-b border-[var(--theme-card-border)] overflow-hidden z-30 relative"
          >
            <div className="px-6 py-6 space-y-4">
              <button
                onClick={() => handleNavClick('hero')}
                className="block w-full text-left text-lg font-serif text-[var(--theme-text-title)] py-2 border-b border-[var(--theme-card-border)]/60"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('shop')}
                className="block w-full text-left text-lg font-serif text-[var(--theme-text-title)] py-2 border-b border-[var(--theme-card-border)]/60"
              >
                Shop All Confections
              </button>
              <button
                onClick={() => handleNavClick('categories')}
                className="block w-full text-left text-lg font-serif text-[var(--theme-text-title)] py-2 border-b border-[var(--theme-card-border)]/60"
              >
                Categories
              </button>
              <button
                onClick={() => handleNavClick('checklist')}
                className="block w-full text-left text-lg font-serif text-[var(--theme-text-title)] py-2 border-b border-[var(--theme-card-border)]/60"
              >
                Order Checklist
              </button>
              <button
                onClick={() => handleNavClick('how-it-works')}
                className="block w-full text-left text-lg font-serif text-[var(--theme-text-title)] py-2 border-b border-[var(--theme-card-border)]/60"
              >
                How It Works
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className="block w-full text-left text-lg font-serif text-[var(--theme-text-title)] py-2 border-b border-[var(--theme-card-border)]/60"
              >
                Our Story & Philosophy
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="block w-full text-left text-lg font-serif text-[var(--theme-text-title)] py-2 border-b border-[var(--theme-card-border)]/60"
              >
                Contact & Custom Orders
              </button>

              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsThemeCustomizerOpen(true);
                  }}
                  className="w-full py-3 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-card-border)] text-[var(--theme-accent)] font-medium text-sm flex items-center justify-center gap-2"
                >
                  <Palette className="w-4 h-4 text-[var(--theme-accent)]" />
                  Change Theme & Ambience
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsCustomBoxOpen(true);
                  }}
                  className="w-full py-3 rounded-xl bg-[#E5B895] text-[#2B1810] font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#2B1810]" />
                  Custom Dessert Box Builder
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsOrderTrackingOpen(true);
                  }}
                  className="w-full py-3 rounded-xl border border-[var(--theme-card-border)] text-[var(--theme-text-body)] font-medium text-sm flex items-center justify-center gap-2"
                >
                  <Clock className="w-4 h-4 text-[var(--theme-accent)]" />
                  Track Existing Order
                </button>
                <button
                  onClick={() => handleNavClick('shop')}
                  className="w-full py-3.5 rounded-xl bg-[#E5B895] hover:bg-[#F0CAA8] text-[#2B1810] font-bold text-sm uppercase tracking-wider text-center"
                >
                  BUY NOW / ORDER ONLINE
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
