import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Mail, Sparkles, Check, ArrowRight } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const { addToast, applyCoupon } = useCart();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }

    setIsSubscribed(true);
    addToast('Welcome to the Mithaas & Co. family! Use code MITHAAS15 for 15% off 🧁', 'success');
  };

  return (
    <section className="py-16 sm:py-20 bg-transparent border-b border-[var(--theme-card-border)] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="w-12 h-12 rounded-full bg-[var(--theme-card)] text-[var(--theme-accent)] flex items-center justify-center mx-auto mb-4 shadow-sm border border-[var(--theme-card-border)]">
          <Mail className="w-5 h-5" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-[var(--theme-text-title)] font-medium tracking-tight">
          A Little Sweetness in Your Inbox.
        </h2>

        <p className="text-sm sm:text-base text-[var(--theme-text-body)] mt-2.5 max-w-md mx-auto leading-relaxed">
          Get new artisanal flavor announcements, seasonal coffee specials, and gourmet gift offers delivered straight to your mailbox.
        </p>

        {!isSubscribed ? (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <input
              id="newsletter-email-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="w-full px-5 py-3.5 rounded-full bg-[var(--theme-card)] border border-[var(--theme-card-border)] text-xs sm:text-sm text-[var(--theme-text-title)] placeholder:text-[var(--theme-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)] shadow-xs"
            />
            <button
              id="newsletter-subscribe-btn"
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#E5B895] hover:bg-[#F0CAA8] text-[#2B1810] font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg shrink-0 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          <div className="mt-8 p-5 bg-[var(--theme-card)] rounded-2xl border border-[var(--theme-card-border)] max-w-md mx-auto shadow-sm text-center animate-fade-in">
            <div className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold text-xs mb-2">
              <Check className="w-4 h-4" />
              <span>You're Subscribed!</span>
            </div>
            <p className="text-xs text-[var(--theme-text-body)]">
              Here is your special welcome voucher code:
            </p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="font-mono font-bold text-sm bg-[var(--theme-bg)] px-3 py-1.5 rounded-lg border border-[var(--theme-card-border)] text-[var(--theme-accent)]">
                MITHAAS15
              </span>
              <button
                onClick={() => applyCoupon('MITHAAS15')}
                className="px-3 py-1.5 rounded-lg bg-[#E5B895] text-[#2B1810] text-xs font-bold hover:bg-[#F0CAA8] transition-colors cursor-pointer"
              >
                Apply 15% to Cart
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
