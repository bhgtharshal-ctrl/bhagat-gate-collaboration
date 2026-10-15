import React from 'react';
import { CATEGORIES_DATA } from '../data/products';
import { ProductCategory } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CategorySectionProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ onSelectCategory }) => {
  return (
    <section id="categories" className="py-16 sm:py-20 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--theme-accent-soft)] text-[var(--theme-accent)] text-xs font-semibold uppercase tracking-widest mb-3 border border-[var(--theme-card-border)]">
            <Sparkles className="w-3 h-3 text-[var(--theme-accent)]" />
            <span>Curated Collections</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[var(--theme-text-title)] font-medium tracking-tight">
            Explore by Confection
          </h2>
          <p className="text-[var(--theme-text-body)] text-sm sm:text-base mt-3">
            From layered celebration cakes to melt-in-the-mouth French viennoiseries, explore handcrafted confections made in small artisanal batches.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES_DATA.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id as ProductCategory)}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 border border-[var(--theme-card-border)] bg-[var(--theme-card)]"
            >
              {/* Category Image */}
              <img
                src={cat.imageUrl}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C221E]/85 via-[#2C221E]/30 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-[#FAF7F2]">
                <div className="transform transition-transform duration-300 group-hover:-translate-y-1">
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#E5B895]">
                    {cat.itemCount} Creations Available
                  </span>
                  <h3 className="font-serif text-2xl font-semibold text-[#FAF7F2] mt-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#EADBCE] mt-1 line-clamp-1">
                    {cat.tagline}
                  </p>
                </div>

                {/* Shop Now Button */}
                <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] group-hover:text-[#E5B895] transition-colors flex items-center gap-1.5">
                    Shop Collection
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-[#412B24] group-hover:text-[#E5B895] transition-colors">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
