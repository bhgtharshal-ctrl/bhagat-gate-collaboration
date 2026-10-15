import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { CakeSizeOption } from '../types';
import {
  X,
  Star,
  Plus,
  Minus,
  ShoppingBag,
  Zap,
  Calendar,
  MessageSquare,
  Sparkles,
  Info,
  Clock,
  ShieldCheck,
  Heart,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProductDetailModal: React.FC = () => {
  const {
    activeProductDetail,
    setActiveProductDetail,
    addToCart,
    buyNow,
    toggleWishlist,
    isWishlisted,
  } = useCart();

  if (!activeProductDetail) return null;

  const product = activeProductDetail;
  const isFavorite = isWishlisted(product.id);

  // States
  const [selectedImage, setSelectedImage] = useState(product.imageUrl);
  const [selectedSize, setSelectedSize] = useState<CakeSizeOption>(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [customMessage, setCustomMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'storage'>('description');

  // Reset states when product changes
  useEffect(() => {
    if (activeProductDetail) {
      setSelectedImage(activeProductDetail.imageUrl);
      setSelectedSize(activeProductDetail.sizes[0]);
      setQuantity(1);
      setCustomMessage('');
      setSpecialInstructions('');

      // Default delivery date: tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDeliveryDate(tomorrow.toISOString().split('T')[0]);
    }
  }, [activeProductDetail]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveProductDetail(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActiveProductDetail]);

  const handleAddToCart = () => {
    addToCart(
      product,
      selectedSize,
      quantity,
      customMessage,
      deliveryDate,
      specialInstructions,
      true
    );
    setActiveProductDetail(null);
  };

  const handleBuyNow = () => {
    buyNow(product, selectedSize, quantity, customMessage);
  };

  // Min date is today
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div
      id="product-detail-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 lg:p-8"
      onClick={() => setActiveProductDetail(null)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FFFDFB] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#EADBCE] relative text-[#2C221E] scrollbar-thin"
      >
        {/* Close Button */}
        <button
          id="btn-close-product-modal"
          onClick={() => setActiveProductDetail(null)}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-[#412B24] hover:text-[#8C6558] hover:bg-white flex items-center justify-center shadow-md transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 p-6 sm:p-8">
          
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden aspect-square bg-[#F7EFE9] border border-[#EEDBCE] shadow-sm group">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                {product.dietaryTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#412B24]/90 text-[#FAF7F2] backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm text-[#412B24] flex items-center justify-center shadow-sm hover:scale-105 transition-all"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isFavorite ? 'fill-[#8C6558] text-[#8C6558]' : 'text-[#412B24]'
                  }`}
                />
              </button>
            </div>

            {/* Thumbnail Carousel */}
            {product.galleryImages.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {product.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      selectedImage === img
                        ? 'border-[#8C6558] ring-2 ring-[#8C6558]/30 scale-105'
                        : 'border-[#EADBCE] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumb ${idx}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Quality & Freshness Guarantee Card */}
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#EADBCE] space-y-2 text-xs text-[#6B554B]">
              <div className="flex items-center gap-2 text-[#412B24] font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#8C593B]" />
                <span>The Mithaas & Co. Freshness Promise</span>
              </div>
              <p className="leading-relaxed">
                Baked in small artisanal batches on the morning of delivery using 100% farm-fresh butter, single-origin cacao, and organic fruit purees.
              </p>
            </div>
          </div>

          {/* Right Column: Product Customization & Ordering Form */}
          <div className="md:col-span-6 space-y-5">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-[#7A6459] mb-1.5">
                <span className="uppercase tracking-wider font-semibold text-[#8C6558]">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-[#D4A373]">
                  <Star className="w-3.5 h-3.5 fill-[#D4A373]" />
                  <span className="font-semibold text-[#2C221E]">{product.rating}</span>
                  <span className="text-[#8C766B]">({product.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2C221E] leading-tight">
                {product.name}
              </h2>

              {/* Dynamic Price Calculation */}
              <div className="mt-2 flex items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-[#412B24]">
                  ₹{(selectedSize.price * quantity).toLocaleString('en-IN')}
                </span>
                {quantity > 1 && (
                  <span className="text-xs text-[#7A6459]">
                    (₹{selectedSize.price} × {quantity})
                  </span>
                )}
                <span className="text-xs text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Taxes Included
                </span>
              </div>
            </div>

            {/* Available Sizes (0.5 kg, 1 kg, 1.5 kg, 2 kg or Box options) */}
            <div className="space-y-2 pt-2 border-t border-[#EADBCE]">
              <div className="flex items-center justify-between text-xs font-semibold text-[#2C221E]">
                <span>Select Size & Weight:</span>
                <span className="text-[#8C6558] font-normal">{selectedSize.serves}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.weight}
                    onClick={() => setSelectedSize(s)}
                    className={`p-2.5 rounded-xl text-center border transition-all ${
                      selectedSize.weight === s.weight
                        ? 'border-[#412B24] bg-[#412B24] text-[#FAF7F2] shadow-sm'
                        : 'border-[#E0CFBF] bg-[#FAF7F2] text-[#4A3B32] hover:bg-[#F3E7DE]'
                    }`}
                  >
                    <span className="block text-xs font-bold leading-tight">{s.weight}</span>
                    <span className="block text-[10px] opacity-80 mt-0.5">₹{s.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Message on Cake / Card */}
            <div className="space-y-1.5">
              <label className="flex items-center justify-between text-xs font-semibold text-[#2C221E]">
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#8C6558]" />
                  Personalized Message on Cake / Plaque:
                </span>
                <span className="text-[10px] text-[#8C766B]">{customMessage.length}/35</span>
              </label>
              <input
                id="input-cake-custom-message"
                type="text"
                maxLength={35}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="e.g. Happy Birthday Maya! ✨ (Complimentary)"
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E0CFBF] text-[#2C221E] focus:outline-none focus:ring-2 focus:ring-[#8C6558]"
              />
            </div>

            {/* Delivery Date Picker */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-[#2C221E]">
                <Calendar className="w-3.5 h-3.5 text-[#8C6558]" />
                Desired Delivery Date:
              </label>
              <input
                id="input-cake-delivery-date"
                type="date"
                min={todayStr}
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E0CFBF] text-[#2C221E] focus:outline-none focus:ring-2 focus:ring-[#8C6558]"
              />
            </div>

            {/* Quantity Selector & Dual CTAs */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#2C221E]">Quantity:</span>
                <div className="flex items-center border border-[#D4C0B3] bg-[#FAF7F2] rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 hover:bg-[#EADBCE] text-[#412B24] transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-bold text-[#2C221E]">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 hover:bg-[#EADBCE] text-[#412B24] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons: Add to Cart & Prominent BUY NOW */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  id="btn-modal-add-to-cart"
                  onClick={handleAddToCart}
                  className="w-full py-3 px-4 rounded-xl border-2 border-[#412B24] bg-[#FFFDFB] hover:bg-[#FAF7F2] text-[#412B24] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-[#8C6558]" />
                  <span>Add to Cart</span>
                </button>

                <button
                  id="btn-modal-buy-now"
                  onClick={handleBuyNow}
                  className="w-full py-3 px-4 rounded-xl bg-[#412B24] hover:bg-[#2C221E] text-[#FAF7F2] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                >
                  <Zap className="w-4 h-4 text-[#E5B895] fill-[#E5B895]" />
                  <span>BUY NOW</span>
                </button>
              </div>
            </div>

            {/* Information Tabs (Description, Ingredients, Storage) */}
            <div className="pt-4 border-t border-[#EADBCE]">
              <div className="flex border-b border-[#EADBCE] text-xs">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`pb-2 px-3 font-semibold transition-colors relative ${
                    activeTab === 'description'
                      ? 'text-[#412B24] border-b-2 border-[#412B24]'
                      : 'text-[#7A6459] hover:text-[#2C221E]'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`pb-2 px-3 font-semibold transition-colors relative ${
                    activeTab === 'ingredients'
                      ? 'text-[#412B24] border-b-2 border-[#412B24]'
                      : 'text-[#7A6459] hover:text-[#2C221E]'
                  }`}
                >
                  Ingredients & Allergens
                </button>
                <button
                  onClick={() => setActiveTab('storage')}
                  className={`pb-2 px-3 font-semibold transition-colors relative ${
                    activeTab === 'storage'
                      ? 'text-[#412B24] border-b-2 border-[#412B24]'
                      : 'text-[#7A6459] hover:text-[#2C221E]'
                  }`}
                >
                  Storage & Shelf Life
                </button>
              </div>

              <div className="pt-3 text-xs text-[#5C483F] leading-relaxed">
                {activeTab === 'description' && (
                  <p>{product.fullDescription}</p>
                )}

                {activeTab === 'ingredients' && (
                  <div className="space-y-2">
                    <div>
                      <span className="font-bold text-[#2C221E]">Ingredients: </span>
                      <span>{product.ingredients.join(', ')}</span>
                    </div>
                    <div>
                      <span className="font-bold text-[#8C6558]">Allergen Notice: </span>
                      <span>Contains {product.allergens.join(', ')}. Handled in a facility that also processes tree nuts.</span>
                    </div>
                  </div>
                )}

                {activeTab === 'storage' && (
                  <div className="space-y-1.5">
                    <p><strong className="text-[#2C221E]">Shelf Life:</strong> {product.shelfLife}</p>
                    <p><strong className="text-[#2C221E]">Storage:</strong> {product.storageInstructions}</p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
};
