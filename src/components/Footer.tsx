import React from 'react';
import { Instagram, Facebook, Phone, Mail, MapPin, Sparkles, Heart } from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onSelectCategory?: (category: ProductCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectCategory }) => {
  return (
    <footer id="contact" className="bg-[#2C221E] text-[#FAF7F2] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Slogan */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#E5B895] text-[#2C221E] flex items-center justify-center font-serif text-lg font-bold">
                M
              </div>
              <div>
                <span className="font-serif text-2xl tracking-tight text-[#FAF7F2] font-semibold block leading-none">
                  Mithaas & Co.
                </span>
                <span className="text-[9px] tracking-[0.25em] text-[#E5B895] uppercase font-medium">
                  Artisan Bakehouse & Cafe
                </span>
              </div>
            </div>

            <p className="font-serif italic text-lg text-[#E5B895] pt-1">
              “Small batches. Big smiles.”
            </p>

            <p className="text-xs text-[#CDBBB0] leading-relaxed max-w-sm font-normal">
              A boutique confectionery and coffee house dedicated to old-world French viennoiserie, Belgian chocolate craftsmanship, and bespoke celebration cakes baked fresh every sunrise.
            </p>

            {/* Social Links (Instagram, Facebook, Pinterest) */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E5B895] hover:text-[#2C221E] text-[#FAF7F2] flex items-center justify-center transition-all duration-200"
                aria-label="Follow on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E5B895] hover:text-[#2C221E] text-[#FAF7F2] flex items-center justify-center transition-all duration-200"
                aria-label="Follow on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E5B895] hover:text-[#2C221E] text-[#FAF7F2] flex items-center justify-center transition-all duration-200 font-serif font-bold text-sm"
                aria-label="Follow on Pinterest"
              >
                P
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#E5B895]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#CDBBB0]">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-[#FAF7F2] transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#FAF7F2] transition-colors">
                  Shop Confections
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories')} className="hover:text-[#FAF7F2] transition-colors">
                  All Categories
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('checklist')} className="hover:text-[#FAF7F2] transition-colors">
                  Order Checklist
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('how-it-works')} className="hover:text-[#FAF7F2] transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#FAF7F2] transition-colors">
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#E5B895]">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#CDBBB0]">
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#FAF7F2] transition-colors">
                  Artisanal Cakes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#FAF7F2] transition-colors">
                  Pastel Cupcakes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#FAF7F2] transition-colors">
                  Belgian Brownies
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#FAF7F2] transition-colors">
                  Butter Croissants
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#FAF7F2] transition-colors">
                  Parisian Macarons
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#FAF7F2] transition-colors">
                  Luxury Gift Boxes
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Kitchen Info */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#E5B895]">
              Kitchen & Contact
            </h4>
            <ul className="space-y-2.5 text-xs text-[#CDBBB0]">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E5B895] shrink-0 mt-0.5" />
                <span>Bakehouse Kitchen 4B, Artisan Lane, Bandra West, Mumbai 400050</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E5B895] shrink-0" />
                <span>+91 98200 12345 (9 AM - 9 PM)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#E5B895] shrink-0" />
                <span>concierge@mithaasandco.com</span>
              </li>
            </ul>
            <div className="pt-2">
              <span className="inline-block text-[11px] font-medium bg-white/10 px-2.5 py-1 rounded-md text-[#E5B895]">
                FSSAI Lic: 11524021000892
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9E877C] gap-4">
          <p>© {new Date().getFullYear()} Mithaas & Co. Confectionery Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('contact')} className="hover:text-[#FAF7F2] transition-colors">
              Delivery Policy
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-[#FAF7F2] transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-[#FAF7F2] transition-colors">
              Terms & Conditions
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
