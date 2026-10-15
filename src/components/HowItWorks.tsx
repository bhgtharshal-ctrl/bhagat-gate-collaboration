import React from 'react';
import { Sparkles, UtensilsCrossed, Sliders, CreditCard, Smile, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onShopClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onShopClick }) => {
  const steps = [
    {
      number: '01',
      title: 'Choose',
      description: 'Browse our freshly baked collection and choose your favorite treats.',
      icon: UtensilsCrossed,
      color: 'bg-[#FCEEEF] text-[#8C6558]',
    },
    {
      number: '02',
      title: 'Customize',
      description: 'Select your size, quantity, delivery date, and personalization options.',
      icon: Sliders,
      color: 'bg-[#FDF1EB] text-[#A27B5C]',
    },
    {
      number: '03',
      title: 'Checkout',
      description: 'Review your order, enter your delivery details, and complete payment.',
      icon: CreditCard,
      color: 'bg-[#F4E9E0] text-[#533B34]',
    },
    {
      number: '04',
      title: 'Enjoy',
      description: 'We freshly prepare your order and deliver it to your doorstep.',
      icon: Smile,
      color: 'bg-[#EBF3EC] text-emerald-800',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--theme-accent-soft)] text-[var(--theme-accent)] text-xs font-semibold uppercase tracking-widest mb-3 border border-[var(--theme-card-border)]">
            <Sparkles className="w-3 h-3 text-[var(--theme-accent)]" />
            <span>Seamless Experience</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--theme-text-title)] font-medium tracking-tight">
            How It Works
          </h2>
          <p className="text-[var(--theme-text-body)] text-sm sm:text-base mt-3">
            Crafting and receiving your dream confectionery is seamless, transparent, and joyful.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-[var(--theme-card-border)] -translate-y-8 z-0" />

          {steps.map((step, idx) => {
            const IconComponent = step.icon;

            return (
              <div
                key={step.number}
                className="relative z-10 bg-[var(--theme-card)] p-6 rounded-2xl border border-[var(--theme-card-border)] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 group luxury-card"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#E5B895] text-[#2B1810] flex items-center justify-center shadow-xs transition-transform group-hover:scale-110">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="font-serif text-3xl font-bold text-[var(--theme-text-muted)] group-hover:text-[var(--theme-accent)] transition-colors">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-[var(--theme-text-title)] group-hover:text-[var(--theme-accent)] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--theme-text-body)] mt-2 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="pt-2 text-[11px] font-bold text-[#8C6558] uppercase tracking-wider flex items-center gap-1">
                  <span>Step {idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onShopClick}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#412B24] text-[#FAF7F2] hover:bg-[#2C221E] text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
          >
            <span>Start Your Order</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
