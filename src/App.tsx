import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { FeaturedProducts } from './components/FeaturedProducts';
import { OrderChecklist } from './components/OrderChecklist';
import { HowItWorks } from './components/HowItWorks';
import { SpecialOccasions } from './components/SpecialOccasions';
import { StorySection } from './components/StorySection';
import { Testimonials } from './components/Testimonials';
import { FAQSection } from './components/FAQSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { CustomBoxBuilderModal } from './components/CustomBoxBuilderModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { ThemeCustomizerModal } from './components/ThemeCustomizerModal';
import { ToastContainer } from './components/ToastContainer';
import { CoffeeBackground } from './components/CoffeeBackground';
import { ProductCategory } from './types';

export function AppContent() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (category: ProductCategory) => {
    setSelectedCategory(category);
    scrollToSection('shop');
  };

  return (
    <div className="relative min-h-screen text-[var(--theme-text-title)] font-sans antialiased selection:bg-[#E5B895] selection:text-[#2C1D18] transition-colors duration-700">
      {/* Animated Coffee Ambience & Floating Theme Elements */}
      <CoffeeBackground />

      {/* Sticky Luxury Navbar */}
      <Navbar
        onNavigate={scrollToSection}
        onSelectCategory={handleSelectCategory}
      />

      <main className="relative z-10">
        {/* Hero Section */}
        <Hero
          onShopClick={() => scrollToSection('shop')}
          onOrderNow={() => scrollToSection('shop')}
          onExploreClick={() => scrollToSection('categories')}
          onExploreMenu={() => scrollToSection('categories')}
        />

        {/* Category Showcase */}
        <CategorySection onSelectCategory={handleSelectCategory} />

        {/* Featured Products Section with Filters & Buy Now */}
        <FeaturedProducts initialCategory={selectedCategory} />

        {/* Interactive Order Checklist */}
        <OrderChecklist onNavigate={scrollToSection} />

        {/* How It Works (4 Steps) */}
        <HowItWorks onShopClick={() => scrollToSection('shop')} />

        {/* Special Occasion Banner & Dessert Box Builder */}
        <SpecialOccasions />

        {/* Brand Story & Craftsmanship */}
        <StorySection />

        {/* Customer Testimonials & Reviews */}
        <Testimonials />

        {/* FAQs */}
        <FAQSection />

        {/* Newsletter Subscription */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onSelectCategory={handleSelectCategory}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Product Detail Modal */}
      <ProductDetailModal />

      {/* Checkout Modal */}
      <CheckoutModal />

      {/* Order Confirmation Screen */}
      <OrderConfirmationModal />

      {/* Custom Dessert Box Customizer */}
      <CustomBoxBuilderModal />

      {/* Quick Search Overlay */}
      <QuickSearchModal />

      {/* Order Tracking Modal */}
      <OrderTrackingModal />

      {/* Theme & Background Atmosphere Customizer */}
      <ThemeCustomizerModal />

      {/* Floating Notifications */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
