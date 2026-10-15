import React, { useState } from 'react';
import { BAKERY_FAQS } from '../data/faq';
import { ChevronDown, Sparkles, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-24 bg-transparent border-b border-[var(--theme-card-border)] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--theme-accent-soft)] text-[var(--theme-accent)] text-xs font-semibold uppercase tracking-widest mb-3 border border-[var(--theme-card-border)]">
            <HelpCircle className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
            <span>Common Inquiries</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[var(--theme-text-title)] font-medium tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-[var(--theme-text-body)] text-xs sm:text-sm mt-2">
            Everything you need to know about placing orders, customized messages, and delivery care.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3.5">
          {BAKERY_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-[var(--theme-card)] rounded-2xl border border-[var(--theme-card-border)] overflow-hidden transition-all duration-200"
              >
                <button
                  id={`faq-btn-${index}`}
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[var(--theme-card-border)]/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2B1810] bg-[#E5B895] px-2 py-0.5 rounded-md">
                      {faq.category}
                    </span>
                    <span className="font-serif font-semibold text-sm sm:text-base text-[var(--theme-text-title)]">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--theme-accent)] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[var(--theme-text-body)] leading-relaxed border-t border-[var(--theme-card-border)]">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
