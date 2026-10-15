import React, { useState, useMemo } from 'react';
import { BAKERY_PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { ProductCategory, DietaryTag } from '../types';
import { Search, SlidersHorizontal, Sparkles, X, RotateCcw } from 'lucide-react';

interface FeaturedProductsProps {
  initialCategory?: ProductCategory;
}

const CATEGORY_TABS: ProductCategory[] = [
  'All',
  'Cakes',
  'Cupcakes',
  'Cookies',
  'Brownies',
  'Pastries',
  'Gift Boxes',
];

const DIETARY_FILTERS: (DietaryTag | 'All')[] = [
  'All',
  'Eggless',
  'Bestseller',
  'Signature',
  'Gluten-Free',
];

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ initialCategory = 'All' }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietary, setSelectedDietary] = useState<DietaryTag | 'All'>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(3500);

  // Sync if initial category changes from outside click
  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const filteredProducts = useMemo(() => {
    return BAKERY_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      // Dietary filter
      if (selectedDietary !== 'All' && !product.dietaryTags.includes(selectedDietary)) {
        return false;
      }
      // Max price filter
      if (product.basePrice > maxPrice) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.shortDescription.toLowerCase().includes(q) || product.fullDescription.toLowerCase().includes(q);
        const matchesIngredients = product.ingredients.some((ing) => ing.toLowerCase().includes(q));
        const matchesCategory = product.category.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesIngredients && !matchesCategory) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        return a.basePrice - b.basePrice;
      }
      if (sortBy === 'price-high') {
        return b.basePrice - a.basePrice;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'newest') {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }
      // Default featured
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, selectedDietary, maxPrice, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedDietary('All');
    setSearchQuery('');
    setMaxPrice(3500);
    setSortBy('featured');
  };

  return (
    <section id="shop" className="py-16 sm:py-24 bg-transparent border-y border-[var(--theme-card-border)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[var(--theme-card-border)] gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--theme-accent-soft)] text-[var(--theme-accent)] text-xs font-semibold uppercase tracking-widest mb-3 border border-[var(--theme-card-border)]">
              <Sparkles className="w-3 h-3 text-[var(--theme-accent)]" />
              <span>Small Batches Daily</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--theme-text-title)] font-medium tracking-tight">
              Baked Fresh, Loved Always.
            </h2>
            <p className="text-[var(--theme-text-body)] text-sm sm:text-base mt-2 max-w-xl">
              Explore our artisanal confectionery menu, made with premium chocolates, farm butter, and hand-decorated by master pastry chefs.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-[var(--theme-accent)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="shop-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cakes, pastries, flavors..."
              className="w-full pl-9 pr-8 py-2.5 rounded-full bg-[var(--theme-card)] border border-[var(--theme-card-border)] text-xs text-[var(--theme-text-title)] placeholder:text-[var(--theme-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--theme-accent)] hover:text-[var(--theme-text-title)]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {CATEGORY_TABS.map((cat) => (
            <button
              key={cat}
              id={`filter-cat-${cat.toLowerCase().replace(' ', '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#E5B895] text-[#2B1810] shadow-md font-bold'
                  : 'bg-[var(--theme-card)] hover:bg-[var(--theme-card-border)]/40 text-[var(--theme-text-body)] border border-[var(--theme-card-border)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary Filter Bar (Dietary, Price, Sorting) */}
        <div className="bg-[var(--theme-card)] p-4 sm:p-5 rounded-2xl border border-[var(--theme-card-border)] mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Dietary Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-[var(--theme-text-muted)] mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filter:
            </span>
            {DIETARY_FILTERS.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDietary(d)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                  selectedDietary === d
                    ? 'bg-[#E5B895] text-[#2B1810] font-semibold'
                    : 'bg-[var(--theme-bg)] text-[var(--theme-text-body)] border border-[var(--theme-card-border)] hover:bg-[var(--theme-card-border)]/40'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Sorting & Reset Controls */}
          <div className="flex items-center gap-3 flex-wrap justify-between lg:justify-end">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--theme-text-muted)] font-medium">Sort by:</span>
              <select
                id="shop-sort-select"
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-[var(--theme-bg)] border border-[var(--theme-card-border)] text-xs font-medium text-[var(--theme-text-title)] rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]"
              >
                <option value="featured" className="bg-[#2B1810] text-[#FAF6F0]">Featured Curations</option>
                <option value="price-low" className="bg-[#2B1810] text-[#FAF6F0]">Price: Low to High</option>
                <option value="price-high" className="bg-[#2B1810] text-[#FAF6F0]">Price: High to Low</option>
                <option value="rating" className="bg-[#2B1810] text-[#FAF6F0]">Best Rated ★</option>
                <option value="newest" className="bg-[#2B1810] text-[#FAF6F0]">New Arrivals</option>
              </select>
            </div>

            {(selectedCategory !== 'All' || selectedDietary !== 'All' || searchQuery !== '' || sortBy !== 'featured') && (
              <button
                onClick={resetFilters}
                className="text-xs text-[var(--theme-accent)] hover:underline font-medium flex items-center gap-1 underline-offset-2"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 bg-[var(--theme-card)] rounded-3xl border border-dashed border-[var(--theme-card-border)] max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[var(--theme-bg)] text-[var(--theme-accent)] flex items-center justify-center mx-auto mb-4 font-serif text-2xl font-bold">
              🍰
            </div>
            <h3 className="font-serif text-xl font-semibold text-[var(--theme-text-title)]">
              No Sweet Treats Found
            </h3>
            <p className="text-xs text-[var(--theme-text-body)] mt-2 max-w-sm mx-auto leading-relaxed">
              We couldn't find any confections matching your current search or filters. Try adjusting your selections.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 px-6 py-2.5 rounded-full bg-[#E5B895] hover:bg-[#F0CAA8] text-[#2B1810] text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              Show All Treats
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
