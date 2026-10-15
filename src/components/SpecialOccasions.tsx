import React from 'react';
import { useCart } from '../context/CartContext';
import { Gift, Cake, Sparkles, Heart, Award, Building, Stars } from 'lucide-react';

export const SpecialOccasions: React.FC = () => {
  const { setIsCustomBoxOpen } = useCart();

  const occasions = [
    { title: 'Birthdays', desc: 'Custom lettering & celebration candles', icon: Cake },
    { title: 'Anniversaries', desc: 'Romantic floral accents & luxury chocolate', icon: Heart },
    { title: 'Weddings', desc: 'Tiered dessert tables & bespoke favors', icon: Sparkles },
    { title: 'Baby Showers', desc: 'Soft pastel cupcakes & gender reveals', icon: Stars },
    { title: 'Corporate Gifting', desc: 'Custom branded ribbon & bulk hampers', icon: Building },
    { title: 'Festive Celebrations', desc: 'Diwali, Christmas & New Year boxes', icon: Gift },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-[#412B24] via-[#35221C] to-[#251713] text-[#FAF7F2] relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#8C6558]/20 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4A373]/15 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#E5B895] text-xs font-semibold uppercase tracking-widest backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke Confectionery</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#FAF7F2] leading-tight">
              Made For Your <br />
              <span className="italic text-[#E5B895] font-serif">Sweetest Moments.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#E5D9CE] leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              Whether celebrating milestones, weddings, or gifting someone special, our artisan dessert boxes combine luxury packaging with unforgettable flavours.
            </p>

            {/* Custom Box Builder CTA */}
            <div className="pt-2">
              <button
                id="btn-create-dessert-box"
                onClick={() => setIsCustomBoxOpen(true)}
                className="px-8 py-4 rounded-full bg-[#E5B895] hover:bg-[#DDA87F] text-[#2C221E] font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-98 flex items-center justify-center gap-2.5 mx-auto lg:mx-0"
              >
                <Gift className="w-4 h-4 text-[#2C221E]" />
                <span>Create Your Dessert Box</span>
              </button>
            </div>
          </div>

          {/* Right Occasions Grid */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4">
              {occasions.map((occ) => {
                const Icon = occ.icon;
                return (
                  <div
                    key={occ.title}
                    onClick={() => setIsCustomBoxOpen(true)}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-2xl transition-all duration-300 cursor-pointer text-center group hover:-translate-y-1"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/10 text-[#E5B895] flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-sm font-semibold text-[#FAF7F2] group-hover:text-[#E5B895] transition-colors">
                      {occ.title}
                    </h3>
                    <p className="text-[10px] text-[#CDBBB0] mt-1 line-clamp-2 leading-tight">
                      {occ.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
