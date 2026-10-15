import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Tag,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    deliveryFee,
    discount,
    total,
    couponCode,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    if (res.success) {
      setInputCoupon('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const freeDeliveryThreshold = 1000;
  const amountForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  return (
    <div
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end"
      onClick={() => setIsCartOpen(false)}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[var(--theme-card)] h-full shadow-2xl flex flex-col justify-between border-l border-[var(--theme-card-border)] text-[var(--theme-text-title)] relative"
      >
        {/* Header */}
        <div className="p-5 border-b border-[var(--theme-card-border)] flex items-center justify-between bg-[var(--theme-bg)]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[var(--theme-accent)]" />
            <h2 className="font-serif text-lg font-semibold text-[var(--theme-text-title)]">
              Your Sweet Cart
            </h2>
            <span className="text-xs text-[var(--theme-accent)] font-medium bg-[var(--theme-card)] border border-[var(--theme-card-border)] px-2 py-0.5 rounded-full">
              {cart.reduce((a, b) => a + b.quantity, 0)} items
            </span>
          </div>

          <button
            id="btn-close-cart"
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full text-[var(--theme-text-muted)] hover:text-[var(--theme-text-title)] hover:bg-[var(--theme-card-border)]/50 transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        {cart.length > 0 && (
          <div className="bg-[var(--theme-accent-soft)] px-5 py-2.5 border-b border-[var(--theme-card-border)] text-xs text-[var(--theme-accent)]">
            <div className="flex items-center justify-between font-semibold mb-1">
              <span>
                {amountForFreeDelivery === 0
                  ? '🎉 You unlocked FREE Hand Delivery!'
                  : `Add ₹${amountForFreeDelivery} more for FREE Delivery`}
              </span>
              <span>{Math.round(freeDeliveryProgress)}%</span>
            </div>
            <div className="w-full bg-[var(--theme-card-border)] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#E5B895] h-full transition-all duration-300 rounded-full"
                style={{ width: `${freeDeliveryProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Item List Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.cartId}
                className="p-3.5 rounded-2xl bg-[var(--theme-bg)] border border-[var(--theme-card-border)] flex gap-3.5 relative group"
              >
                {/* Thumbnail */}
                <div className="w-18 h-18 rounded-xl overflow-hidden bg-[var(--theme-card-border)]/40 shrink-0 aspect-square">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-serif font-semibold text-xs text-[var(--theme-text-title)] leading-snug line-clamp-1">
                      {item.product.name}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.cartId)}
                      className="text-[var(--theme-text-muted)] hover:text-red-400 transition-colors p-0.5"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[11px] font-medium text-[var(--theme-accent)]">
                    Weight: {item.selectedSize.weight}
                  </p>

                  {/* Custom Message Plaque (if any) */}
                  {item.customMessage && (
                    <div className="bg-[var(--theme-card)] px-2 py-1 rounded-md border border-[var(--theme-card-border)] text-[10px] text-[var(--theme-text-body)] font-medium italic truncate">
                      “{item.customMessage}”
                    </div>
                  )}

                  {/* Price & Quantity Controls */}
                  <div className="flex items-center justify-between pt-1.5">
                    <span className="font-serif font-bold text-sm text-[var(--theme-text-title)]">
                      ₹{(item.selectedSize.price * item.quantity).toLocaleString('en-IN')}
                    </span>

                    <div className="flex items-center border border-[var(--theme-card-border)] bg-[var(--theme-card)] rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                        className="p-1 hover:bg-[var(--theme-card-border)] text-[var(--theme-text-title)]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-[var(--theme-text-title)]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                        className="p-1 hover:bg-[var(--theme-card-border)] text-[var(--theme-text-title)]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Empty Cart View */
            <div className="text-center py-16 px-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[var(--theme-bg)] text-[var(--theme-accent)] flex items-center justify-center mx-auto border border-[var(--theme-card-border)]">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[var(--theme-text-title)]">
                Your Cart is Empty
              </h3>
              <p className="text-xs text-[var(--theme-text-muted)] max-w-xs mx-auto">
                Your sweet box is waiting for delicious artisanal cakes and freshly baked French pastries!
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-6 py-2.5 rounded-full bg-[#E5B895] hover:bg-[#F0CAA8] text-[#2B1810] text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                Explore Bakes
              </button>
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[var(--theme-card-border)] bg-[var(--theme-bg)] space-y-3.5">
            
            {/* Promo Code Input */}
            <div>
              {couponCode ? (
                <div className="flex items-center justify-between bg-emerald-950/70 border border-emerald-700/60 px-3 py-1.5 rounded-xl text-xs text-emerald-300 font-semibold">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Coupon "{couponCode}" Active</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-400 hover:underline font-normal"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="Promo code (e.g. SWEET10)"
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-[var(--theme-card)] border border-[var(--theme-card-border)] text-[var(--theme-text-title)] placeholder:text-[var(--theme-text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-xl bg-[#E5B895] text-[#2B1810] text-xs font-bold hover:bg-[#F0CAA8] transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Bill Breakdown */}
            <div className="space-y-1.5 text-xs text-[var(--theme-text-body)] pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[var(--theme-text-title)]">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Sweet Discount</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-semibold text-[var(--theme-text-title)]">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-400 font-bold uppercase text-[11px]">
                      FREE
                    </span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold text-[var(--theme-text-title)] pt-2 border-t border-[var(--theme-card-border)]">
                <span>Estimated Total</span>
                <span className="font-serif text-lg text-[var(--theme-accent)]">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Proceed to Checkout / BUY NOW Button */}
            <button
              id="btn-proceed-checkout"
              onClick={handleProceedCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-[#E5B895] hover:bg-[#F0CAA8] text-[#2B1810] font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-[#2B1810] fill-[#2B1810]" />
              <span>PROCEED TO CHECKOUT / BUY NOW</span>
            </button>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-full text-center text-xs text-[var(--theme-accent)] hover:underline font-semibold py-1 cursor-pointer"
            >
              ← Continue Browsing Delicacies
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
