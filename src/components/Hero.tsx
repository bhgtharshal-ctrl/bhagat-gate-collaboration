import React from 'react';
import { Sparkles, ArrowRight, Heart, Award, ShieldCheck, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BAKERY_PRODUCTS } from '../data/products';

interface HeroProps {
  onShopClick?: () => void;
  onExploreClick?: () => void;
  onOrderNow?: () => void;
  onExploreMenu?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onShopClick,
  onExploreClick,
  onOrderNow,
  onExploreMenu,
}) => {
  const { setActiveProductDetail } = useCart();
  const signatureCake = BAKERY_PRODUCTS[0]; // Mithaas & Co. Chocolate Truffle

  const handleShop = onShopClick || onOrderNow || (() => {});
  const handleExplore = onExploreClick || onExploreMenu || (() => {});

  return (
    <section id="hero" className="relative overflow-hidden pt-6 pb-16 md:py-20 lg:py-24 bg-transparent">
      {/* Decorative ambient blurred blobs */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-[var(--theme-aura-1)] rounded-full filter blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[var(--theme-aura-2)] rounded-full filter blur-3xl opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Soft luxury badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--theme-accent-soft)] border border-[var(--theme-card-border)] text-[var(--theme-accent)] text-xs font-medium tracking-wider uppercase backdrop-blur-sm shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
              <span>Artisanal Patisserie & Confectionery</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[var(--theme-text-title)] font-medium leading-[1.15] tracking-tight">
              Baked With Love, <br />
              <span className="italic font-normal text-[var(--theme-accent)] font-serif">Made to Delight.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[var(--theme-text-body)] max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Handcrafted cakes, delicate pastries, and little moments of sweetness, freshly made for you with single-origin chocolates, pure European butter, and organic berries.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="btn-hero-shop-now"
                onClick={handleShop}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[var(--theme-primary)] hover:opacity-90 text-[var(--theme-primary-text)] font-semibold text-sm uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="btn-hero-explore"
                onClick={handleExplore}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[var(--theme-surface-glass)] hover:bg-[var(--theme-surface)] text-[var(--theme-text-title)] border border-[var(--theme-card-border)] font-semibold text-sm tracking-wide transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-md cursor-pointer"
              >
                Explore Our Collection
              </button>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[var(--theme-card-border)] max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <p className="text-xl sm:text-2xl font-serif font-bold text-[var(--theme-text-title)]">100%</p>
                <p className="text-xs text-[var(--theme-text-muted)] mt-0.5">Fresh Daily Batches</p>
              </div>
              <div className="text-center lg:text-left border-x border-[var(--theme-card-border)] px-2">
                <p className="text-xl sm:text-2xl font-serif font-bold text-[var(--theme-text-title)]">4.95 ★</p>
                <p className="text-xs text-[var(--theme-text-muted)] mt-0.5">1,200+ Sweet Reviews</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-xl sm:text-2xl font-serif font-bold text-[var(--theme-text-title)]">Same Day</p>
                <p className="text-xs text-[var(--theme-text-muted)] mt-0.5">Chilled Hand Delivery</p>
              </div>
            </div>

          </div>

          {/* Right Visual Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Editorial Image Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[var(--theme-card-border)] bg-[var(--theme-surface)] aspect-[4/5] group">
                <img
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=90"
                  alt="Mithaas & Co. Signature Chocolate Truffle Cake"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-primary)]/80 via-transparent to-transparent opacity-80" />

                {/* Floating Bottom Card */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl luxury-glass border border-white/30 text-[var(--theme-text-title)] shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--theme-accent)]">
                        Chef's Masterpiece
                      </span>
                      <h4 className="font-serif font-bold text-lg text-[var(--theme-text-title)]">
                        Chocolate Truffle Cake
                      </h4>
                      <p className="text-xs text-[var(--theme-text-muted)]">70% Single-Origin Belgian Cocoa</p>
                    </div>
                    <div className="text-right">
                      <span className="font-serif font-bold text-lg text-[var(--theme-accent)]">₹899</span>
                      <button
                        onClick={() => setActiveProductDetail(signatureCake)}
                        className="block mt-1 text-xs font-semibold text-[var(--theme-accent)] hover:opacity-80 underline cursor-pointer"
                      >
                        Quick View
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Top-Right Mini Badge */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-[var(--theme-surface)]/95 px-4 py-2.5 rounded-2xl shadow-xl border border-[var(--theme-card-border)] flex items-center gap-2.5 animate-bounce-subtle backdrop-blur-md">
                <div className="w-8 h-8 rounded-full bg-[var(--theme-accent-soft)] flex items-center justify-center text-[var(--theme-accent)]">
                  <Heart className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--theme-text-title)]">Pure Butter & Real Fruit</p>
                  <p className="text-[10px] text-[var(--theme-text-muted)]">No Artificial Preservatives</p>
                </div>
              </div>

              {/* Floating Left Bottom Mini Badge */}
              <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-[var(--theme-surface)]/95 px-4 py-2.5 rounded-2xl shadow-xl border border-[var(--theme-card-border)] flex items-center gap-2.5 backdrop-blur-md">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--theme-text-title)]">100% Eggless Range</p>
                  <p className="text-[10px] text-[var(--theme-text-muted)]">Dedicated pure bakery station</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
