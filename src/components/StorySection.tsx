import React from 'react';
import { Sparkles, Heart, Award, Leaf } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-transparent overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-[var(--theme-card-border)] aspect-[4/5] bg-[var(--theme-card)]">
                <img
                  src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=85"
                  alt="Mithaas & Co. pastry chefs at work"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Inset Secondary Image */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-2xl overflow-hidden border-4 border-[var(--theme-card-border)] shadow-2xl hidden sm:block">
                <img
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=85"
                  alt="Freshly baked artisanal croissants"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--theme-accent-soft)] text-[var(--theme-accent)] text-xs font-semibold uppercase tracking-widest border border-[var(--theme-card-border)]">
              <Sparkles className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
              <span>Our Philosophy & Heritage</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--theme-text-title)] font-medium tracking-tight leading-tight">
              Small batches. <br />
              <span className="italic text-[var(--theme-accent)] font-serif">Big smiles.</span>
            </h2>

            <p className="text-sm sm:text-base text-[var(--theme-text-body)] leading-relaxed font-normal">
              At <strong className="text-[var(--theme-text-title)]">Mithaas & Co.</strong>, baking is not merely a recipe; it is an art of patience and heartfelt devotion. Founded with a vision to bring European patisserie standards and artisanal confectionery to everyday celebrations, we reject artificial essences, hydrogenated oils, and mass factory batches.
            </p>

            <p className="text-sm sm:text-base text-[var(--theme-text-body)] leading-relaxed font-normal">
              Every sponge is slow-baked with cultured French butter, single-origin Belgian chocolate, and vine-ripened organic berries. Whether it's an intimate birthday cake or a grand festive hamper, we bake each order fresh on the morning it travels to your home.
            </p>

            {/* Core Values Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-[var(--theme-card)] border border-[var(--theme-card-border)]">
                <div className="flex items-center gap-2 font-serif font-semibold text-sm text-[var(--theme-text-title)]">
                  <Award className="w-4 h-4 text-[var(--theme-accent)]" />
                  Single-Origin Cocoa
                </div>
                <p className="text-xs text-[var(--theme-text-muted)] mt-1">
                  Pure 70% Callebaut Belgian chocolate with nuanced floral undertones.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--theme-card)] border border-[var(--theme-card-border)]">
                <div className="flex items-center gap-2 font-serif font-semibold text-sm text-[var(--theme-text-title)]">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  100% Eggless Standards
                </div>
                <p className="text-xs text-[var(--theme-text-muted)] mt-1">
                  Masterfully formulated recipes yielding unmatched velvet moisture.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
