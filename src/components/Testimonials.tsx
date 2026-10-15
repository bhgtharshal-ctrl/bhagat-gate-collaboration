import React from 'react';
import { TESTIMONIALS } from '../data/reviews';
import { Star, Sparkles, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-transparent border-b border-[var(--theme-card-border)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--theme-accent-soft)] text-[var(--theme-accent)] text-xs font-semibold uppercase tracking-widest mb-3 border border-[var(--theme-card-border)]">
            <Sparkles className="w-3 h-3 text-[var(--theme-accent)]" />
            <span>Words of Affection</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--theme-text-title)] font-medium tracking-tight">
            Celebrated by Sweet Lovers
          </h2>
          <p className="text-[var(--theme-text-body)] text-sm sm:text-base mt-3">
            Read authentic experiences from over 1,200 celebrations, birthdays, and heartwarming moments across the country.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-[var(--theme-card)] p-6 sm:p-8 rounded-3xl border border-[var(--theme-card-border)] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-6 luxury-card relative"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-[var(--theme-accent)] opacity-40" />
                
                {/* Rating */}
                <div className="flex items-center gap-1 text-[#E5B895]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E5B895]" />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-serif italic text-base sm:text-lg text-[var(--theme-text-title)] leading-relaxed">
                  "{item.quote}"
                </p>

                {/* Tagged product */}
                <div className="inline-block bg-[var(--theme-bg)] px-2.5 py-1 rounded-lg text-[11px] font-semibold text-[var(--theme-accent)] border border-[var(--theme-card-border)]">
                  Ordered: {item.productMentioned}
                </div>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-[var(--theme-card-border)]">
                <img
                  src={item.avatarUrl}
                  alt={item.author}
                  className="w-11 h-11 rounded-full object-cover border border-[var(--theme-card-border)]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-serif font-bold text-sm text-[var(--theme-text-title)]">{item.author}</h4>
                  <p className="text-xs text-[var(--theme-text-muted)]">{item.city} • Verified Order</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
