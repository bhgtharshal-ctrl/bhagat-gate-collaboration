import React, { useState } from 'react';
import { Product, CakeSizeOption } from '../types';
import { useCart } from '../context/CartContext';
import { Star, Heart, Eye, ShoppingBag, Zap } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, buyNow, setActiveProductDetail, toggleWishlist, isWishlisted } = useCart();
  const [selectedSize, setSelectedSize] = useState<CakeSizeOption>(product.sizes[0]);
  const isFavorite = isWishlisted(product.id);

  const handleCardClick = (e: React.MouseEvent) => {
    // Avoid triggering when clicking buttons directly
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;
    setActiveProductDetail(product);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={handleCardClick}
      className="group bg-[var(--theme-card)] rounded-2xl overflow-hidden border border-[var(--theme-card-border)] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer luxury-card"
    >
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] bg-[var(--theme-card-border)]/40 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.dietaryTags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md shadow-xs ${
                tag === 'Bestseller'
                  ? 'bg-[#E5B895] text-[#2B1810]'
                  : tag === 'Eggless'
                  ? 'bg-emerald-900/90 text-emerald-100'
                  : tag === 'Signature'
                  ? 'bg-[#C68D5D] text-[#FAF6F0]'
                  : 'bg-white/90 text-[#412B24]'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action icons (Wishlist & Quick View) */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            id={`btn-wishlist-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="w-8 h-8 rounded-full bg-[var(--theme-card)]/90 backdrop-blur-sm text-[var(--theme-text-title)] hover:text-[var(--theme-accent)] flex items-center justify-center shadow-sm transition-transform active:scale-90 border border-[var(--theme-card-border)]/50"
            aria-label="Add to wishlist"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorite ? 'fill-[var(--theme-accent)] text-[var(--theme-accent)]' : 'text-[var(--theme-text-body)]'
              }`}
            />
          </button>

          <button
            id={`btn-quick-view-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              setActiveProductDetail(product);
            }}
            className="w-8 h-8 rounded-full bg-[var(--theme-card)]/90 backdrop-blur-sm text-[var(--theme-text-title)] hover:text-[var(--theme-accent)] flex items-center justify-center shadow-sm transition-transform active:scale-90 opacity-0 group-hover:opacity-100 border border-[var(--theme-card-border)]/50"
            aria-label="Quick view product details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Category Pill at bottom of image */}
        <div className="absolute bottom-3 left-3 bg-[var(--theme-card)]/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-[var(--theme-accent)] uppercase tracking-wider border border-[var(--theme-card-border)]/50">
          {product.category}
        </div>
      </div>

      {/* Product Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-[var(--theme-text-muted)] mb-1.5">
            <div className="flex items-center text-[#E5B895]">
              <Star className="w-3.5 h-3.5 fill-[#E5B895]" />
            </div>
            <span className="font-semibold text-[var(--theme-text-title)]">{product.rating.toFixed(2)}</span>
            <span className="text-[11px] text-[var(--theme-text-muted)]">({product.reviewCount})</span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-lg font-semibold text-[var(--theme-text-title)] group-hover:text-[var(--theme-accent)] transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-[var(--theme-text-body)] mt-1.5 line-clamp-2 leading-relaxed font-normal">
            {product.shortDescription}
          </p>
        </div>

        {/* Size Selection Pill Buttons (if multiple sizes) */}
        {product.sizes.length > 1 && (
          <div className="pt-1">
            <div className="flex items-center justify-between text-[11px] text-[var(--theme-text-muted)] mb-1 font-medium">
              <span>Size:</span>
              <span className="text-[var(--theme-accent)]">{selectedSize.serves}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((s) => (
                <button
                  key={s.weight}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(s);
                  }}
                  className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                    selectedSize.weight === s.weight
                      ? 'bg-[var(--theme-accent)] text-[#2B1810] font-bold shadow-xs'
                      : 'bg-[var(--theme-bg)] text-[var(--theme-text-body)] border border-[var(--theme-card-border)] hover:bg-[var(--theme-card-border)]/40'
                  }`}
                >
                  {s.weight}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price & Action Buttons */}
        <div className="pt-3 border-t border-[var(--theme-card-border)] mt-auto">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[var(--theme-text-muted)] block">Price</span>
              <span className="font-serif text-xl font-bold text-[var(--theme-text-title)]">
                ₹{selectedSize.price.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[10px] text-emerald-300 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-700/50">
              Fresh Daily
            </span>
          </div>

          {/* Dual CTAs: Add to Cart & Prominent BUY NOW */}
          <div className="grid grid-cols-2 gap-2">
            <button
              id={`btn-add-cart-${product.id}`}
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product, selectedSize, 1);
              }}
              className="px-3 py-2.5 rounded-xl border border-[var(--theme-card-border)] bg-[var(--theme-bg)] hover:bg-[var(--theme-card-border)]/40 text-[var(--theme-text-title)] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              title="Add item to shopping bag"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
              <span>Add to Cart</span>
            </button>

            <button
              id={`btn-buy-now-${product.id}`}
              onClick={(e) => {
                e.stopPropagation();
                buyNow(product, selectedSize, 1);
              }}
              className="px-3 py-2.5 rounded-xl bg-[#E5B895] hover:bg-[#F0CAA8] text-[#2B1810] font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1 shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
              title="Instant express checkout"
            >
              <Zap className="w-3.5 h-3.5 text-[#2B1810] fill-[#2B1810]" />
              <span>BUY NOW</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
