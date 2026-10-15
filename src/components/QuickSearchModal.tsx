import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { BAKERY_PRODUCTS } from '../data/products';
import { Product } from '../types';
import { Search, X, Star, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const QuickSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setActiveProductDetail } = useCart();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const results = useMemo(() => {
    if (!query.trim()) return BAKERY_PRODUCTS.slice(0, 4); // Default suggestions
    const q = query.toLowerCase();
    return BAKERY_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.ingredients.some((ing) => ing.toLowerCase().includes(q))
    );
  }, [query]);

  const handleSelectProduct = (product: Product) => {
    setIsSearchOpen(false);
    setActiveProductDetail(product);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24"
      onClick={() => setIsSearchOpen(false)}
    >
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FFFDFB] rounded-3xl max-w-2xl w-full shadow-2xl border border-[#EADBCE] overflow-hidden text-[#2C221E] relative"
      >
        {/* Search Header Input */}
        <div className="p-4 sm:p-5 border-b border-[#EADBCE] flex items-center gap-3 bg-[#FAF7F2]">
          <Search className="w-5 h-5 text-[#8C6558] shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cakes, brownies, croissants, flavors, or ingredients..."
            className="flex-1 text-sm bg-transparent border-none focus:outline-none text-[#2C221E] placeholder:text-[#9E877C]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#8C6558] hover:text-[#2C221E] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#EADBCE] hover:bg-[#D4C0B3] text-[#412B24] transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Popular Category Keywords */}
        <div className="px-5 py-3 bg-[#F7EFE9] border-b border-[#EADBCE] flex items-center gap-2 overflow-x-auto text-[11px] text-[#5C483F]">
          <span className="font-bold shrink-0 text-[#8C6558]">Popular:</span>
          {['Truffle Cake', 'Croissants', 'Macarons', 'Brownies', 'Red Velvet', 'Eggless'].map(
            (tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-2.5 py-0.5 rounded-full bg-white border border-[#E0CFBF] hover:bg-[#FAF7F2] shrink-0 transition-colors"
              >
                {tag}
              </button>
            )
          )}
        </div>

        {/* Results List */}
        <div className="p-4 sm:p-5 max-h-96 overflow-y-auto space-y-3 scrollbar-thin">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A6459] mb-2">
            {query.trim() ? `Search Results (${results.length})` : 'Signature Suggestions'}
          </div>

          {results.length > 0 ? (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => handleSelectProduct(product)}
                className="p-3 rounded-2xl border border-[#EADBCE] bg-[#FAF7F2] hover:bg-[#F3E7DE] flex items-center justify-between gap-4 cursor-pointer transition-all duration-200 group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-14 h-14 rounded-xl object-cover bg-white shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-bold text-[#8C6558]">
                      {product.category}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-[#2C221E] group-hover:text-[#8C6558] transition-colors truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#6B554B] line-clamp-1">
                      {product.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-serif font-bold text-sm text-[#412B24] block">
                    ₹{product.basePrice}
                  </span>
                  <span className="text-[10px] text-[#8C6558] font-semibold flex items-center justify-end gap-1">
                    <span>View</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-xs text-[#7A6459]">
              No confectionery matched "{query}". Try a different flavor or category!
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
