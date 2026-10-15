import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { X, Gift, Plus, Minus, Check, Sparkles, ShoppingBag, Zap } from 'lucide-react';
import { motion } from 'motion/react';

const DESSERT_CHOICES = [
  { id: 'choc-brownie', name: 'Belgian Fudge Brownie', category: 'Brownies', icon: '🍫', cal: '240 kcal' },
  { id: 'rose-macaron', name: 'Raspberry Rose Macaron', category: 'Macarons', icon: '🌸', cal: '110 kcal' },
  { id: 'pistachio-macaron', name: 'Sicilian Pistachio Macaron', category: 'Macarons', icon: '🌿', cal: '115 kcal' },
  { id: 'vanilla-cupcake', name: 'Pastel Vanilla Cupcake', category: 'Cupcakes', icon: '🧁', cal: '190 kcal' },
  { id: 'sea-salt-cookie', name: 'Sea Salt Dark Choc Cookie', category: 'Cookies', icon: '🍪', cal: '210 kcal' },
  { id: 'butter-croissant', name: 'Mini Butter Croissant', category: 'Pastries', icon: '🥐', cal: '160 kcal' },
  { id: 'gold-truffle', name: '24k Gold Hazelnut Truffle', category: 'Chocolates', icon: '✨', cal: '95 kcal' },
  { id: 'caramel-eclair', name: 'Salted Caramel Tartlet', category: 'Pastries', icon: '🍮', cal: '180 kcal' },
];

const BOX_TIERS = [
  { size: 6, label: 'Petite Box (6 Treats)', price: 799, serves: '2-3 people' },
  { size: 12, label: 'Royale Box (12 Treats)', price: 1499, serves: '4-6 people' },
  { size: 18, label: 'Imperial Hamper (18 Treats)', price: 2199, serves: '8-10 people' },
];

const RIBBON_COLORS = [
  { id: 'blush', name: 'Blush Rose', hex: '#F4D6D9' },
  { id: 'gold', name: 'Champagne Gold', hex: '#E5B895' },
  { id: 'mocha', name: 'Mocha Satin', hex: '#8C6558' },
  { id: 'ivory', name: 'Silk Ivory', hex: '#FAF7F2' },
];

export const CustomBoxBuilderModal: React.FC = () => {
  const { isCustomBoxOpen, setIsCustomBoxOpen, addToCart, buyNow } = useCart();

  const [selectedTier, setSelectedTier] = useState(BOX_TIERS[0]);
  const [selectedRibbon, setSelectedRibbon] = useState(RIBBON_COLORS[0]);
  const [selections, setSelections] = useState<Record<string, number>>({
    'choc-brownie': 2,
    'rose-macaron': 2,
    'vanilla-cupcake': 2,
  });
  const [giftNote, setGiftNote] = useState('');

  if (!isCustomBoxOpen) return null;

  const currentCount = (Object.values(selections) as number[]).reduce((a, b) => a + b, 0);
  const remainingSlots = selectedTier.size - currentCount;

  const handleAdd = (id: string) => {
    if (currentCount >= selectedTier.size) return;
    setSelections((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleRemove = (id: string) => {
    if (!selections[id] || selections[id] <= 0) return;
    setSelections((prev) => {
      const updated = { ...prev };
      if (updated[id] === 1) {
        delete updated[id];
      } else {
        updated[id] -= 1;
      }
      return updated;
    });
  };

  const createCustomBoxProduct = (): Product => {
    const treatSummary = Object.entries(selections)
      .map(([id, qty]) => {
        const item = DESSERT_CHOICES.find((d) => d.id === id);
        return `${qty}x ${item?.name}`;
      })
      .join(', ');

    return {
      id: `custom-box-${Date.now()}`,
      name: `Custom Curated ${selectedTier.label}`,
      shortDescription: `Bespoke assortment with ${selectedRibbon.name} ribbon: ${treatSummary}`,
      fullDescription: `Custom assembled luxury dessert box. Contains: ${treatSummary}. Tied with ${selectedRibbon.name} satin ribbon.`,
      category: 'Gift Boxes',
      basePrice: selectedTier.price,
      rating: 5.0,
      reviewCount: 1,
      imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1000&q=85',
      galleryImages: ['https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1000&q=85'],
      dietaryTags: ['Signature'],
      ingredients: ['Assorted Belgian Chocolate', 'Almond Macarons', 'Pure Butter Pastries'],
      allergens: ['Dairy', 'Gluten', 'Tree Nuts'],
      shelfLife: '5 days refrigerated',
      storageInstructions: 'Keep in the luxury gift box in a cool air-conditioned space.',
      sizes: [{ weight: `${selectedTier.size} Pieces Custom Box`, price: selectedTier.price, serves: selectedTier.serves }],
    };
  };

  const handleAddToCart = () => {
    const prod = createCustomBoxProduct();
    addToCart(prod, prod.sizes[0], 1, giftNote || `Ribbon: ${selectedRibbon.name}`);
    setIsCustomBoxOpen(false);
  };

  const handleBuyNow = () => {
    const prod = createCustomBoxProduct();
    buyNow(prod, prod.sizes[0], 1, giftNote || `Ribbon: ${selectedRibbon.name}`);
    setIsCustomBoxOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={() => setIsCustomBoxOpen(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FFFDFB] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#EADBCE] relative text-[#2C221E] scrollbar-thin"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsCustomBoxOpen(false)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white text-[#412B24] hover:bg-[#F5EBE1] flex items-center justify-center shadow-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Header */}
          <div className="text-center max-w-lg mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCEEEF] text-[#8C6558] text-xs font-semibold uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Box Builder</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2C221E]">
              Assemble Your Custom Dessert Box
            </h2>
            <p className="text-xs text-[#6B554B] mt-1">
              Select your size, mix and match gourmet confections, and add a personalized note.
            </p>
          </div>

          {/* Step 1: Choose Box Size */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7A6459] block">
              1. Choose Box Size
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {BOX_TIERS.map((tier) => (
                <button
                  key={tier.size}
                  onClick={() => setSelectedTier(tier)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    selectedTier.size === tier.size
                      ? 'border-[#412B24] bg-[#412B24] text-[#FAF7F2] shadow-md'
                      : 'border-[#E0CFBF] bg-[#FAF7F2] text-[#2C221E] hover:bg-[#F3E7DE]'
                  }`}
                >
                  <span className="text-xs font-bold block">{tier.label}</span>
                  <span className="font-serif text-lg font-bold block mt-1">₹{tier.price}</span>
                  <span className="text-[10px] opacity-80 block mt-0.5">{tier.serves}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Choose Treats */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7A6459]">
                2. Pick Your Confections ({currentCount}/{selectedTier.size})
              </span>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  remainingSlots === 0
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-900'
                }`}
              >
                {remainingSlots === 0 ? 'Box Full & Ready ✨' : `Select ${remainingSlots} more`}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {DESSERT_CHOICES.map((item) => {
                const count = selections[item.id] || 0;
                return (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl border border-[#EADBCE] bg-[#FAF7F2] flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <p className="text-xs font-bold text-[#2C221E]">{item.name}</p>
                        <p className="text-[10px] text-[#7A6459]">{item.category}</p>
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-1.5 border border-[#D4C0B3] bg-white rounded-lg px-1 py-0.5">
                      <button
                        onClick={() => handleRemove(item.id)}
                        disabled={count <= 0}
                        className="p-1 text-[#412B24] hover:bg-[#F5EBE1] disabled:opacity-30 rounded"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-[#2C221E]">{count}</span>
                      <button
                        onClick={() => handleAdd(item.id)}
                        disabled={currentCount >= selectedTier.size}
                        className="p-1 text-[#412B24] hover:bg-[#F5EBE1] disabled:opacity-30 rounded"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Satin Ribbon & Gift Message */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#EADBCE]">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#7A6459] block mb-2">
                3. Satin Ribbon Color
              </label>
              <div className="flex gap-2">
                {RIBBON_COLORS.map((ribbon) => (
                  <button
                    key={ribbon.id}
                    onClick={() => setSelectedRibbon(ribbon)}
                    className={`flex-1 p-2 rounded-xl border text-center text-[11px] font-semibold transition-all ${
                      selectedRibbon.id === ribbon.id
                        ? 'border-[#412B24] bg-[#412B24] text-[#FAF7F2] shadow-sm'
                        : 'border-[#E0CFBF] bg-[#FAF7F2] text-[#4A3B32]'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full inline-block mr-1 border border-black/20"
                      style={{ backgroundColor: ribbon.hex }}
                    />
                    {ribbon.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#7A6459] block mb-2">
                4. Gift Message Card (Optional)
              </label>
              <input
                type="text"
                maxLength={45}
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                placeholder="e.g. Best wishes on your promotion!"
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E0CFBF] text-[#2C221E] focus:outline-none focus:ring-1 focus:ring-[#8C6558]"
              />
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="pt-4 border-t border-[#EADBCE] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-[#7A6459] uppercase tracking-wider block">Total Box Value</span>
              <span className="font-serif text-2xl font-bold text-[#412B24]">₹{selectedTier.price}</span>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={handleAddToCart}
                disabled={currentCount < selectedTier.size}
                className="flex-1 sm:flex-initial px-5 py-3 rounded-xl border-2 border-[#412B24] text-[#412B24] font-semibold text-xs uppercase tracking-wider hover:bg-[#F5EBE1] disabled:opacity-40 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#8C6558]" />
                <span>Add Box to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={currentCount < selectedTier.size}
                className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-[#412B24] hover:bg-[#2C221E] text-[#FAF7F2] font-bold text-xs uppercase tracking-wider disabled:opacity-40 flex items-center justify-center gap-1.5 shadow-md"
              >
                <Zap className="w-4 h-4 text-[#E5B895] fill-[#E5B895]" />
                <span>BUY NOW</span>
              </button>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
