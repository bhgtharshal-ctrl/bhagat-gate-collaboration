import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { THEMES } from '../data/themes';
import { ThemeMode, BackgroundAnimationSpeed } from '../types';
import { X, Palette, Sparkles, Droplets, Wind, Check, Flame, RefreshCw, Sun, Moon } from 'lucide-react';

export const ThemeCustomizerModal: React.FC = () => {
  const {
    isThemeCustomizerOpen,
    setIsThemeCustomizerOpen,
    currentTheme,
    setTheme,
    bgAnimationSpeed,
    setBgAnimationSpeed,
    steamActive,
    setSteamActive,
    floatingParticlesActive,
    setFloatingParticlesActive,
  } = useCart();

  if (!isThemeCustomizerOpen) return null;

  const themesList = Object.values(THEMES);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsThemeCustomizerOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#FFFDFB] rounded-3xl shadow-2xl border border-[#EADBCE] overflow-hidden z-10 my-8"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#412B24] via-[#5C3D32] to-[#412B24] p-6 text-[#FAF7F2] relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E5B895] text-[#2C221E] flex items-center justify-center font-serif text-xl font-bold shadow-md">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-[#FAF7F2]">
                    Bakehouse Theme & Ambience
                  </h2>
                  <p className="text-xs text-[#E5B895] tracking-wide">
                    Personalize color palette, sensory atmosphere, and background motion
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsThemeCustomizerOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF7F2] transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto">
            {/* Section 1: Color Themes */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-semibold text-[#2C221E] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#8C593B]" />
                  Select Color Theme
                </h3>
                <span className="text-xs text-[#8C593B] font-medium">{themesList.length} Curated Ambiances</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {themesList.map((theme) => {
                  const isSelected = currentTheme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => setTheme(theme.id)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all relative overflow-hidden group ${
                        isSelected
                          ? 'border-[#8C593B] bg-[#FAF4EE] shadow-md ring-2 ring-[#8C593B]/20'
                          : 'border-[#EADBCE] bg-[#FAF7F2]/60 hover:bg-[#FAF7F2] hover:border-[#D4C3B3]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          {/* Color Palette Preview Swatches */}
                          <div className="flex -space-x-1.5 overflow-hidden">
                            <span
                              className="inline-block w-4 h-4 rounded-full ring-2 ring-white"
                              style={{ backgroundColor: theme.primaryColor }}
                            />
                            <span
                              className="inline-block w-4 h-4 rounded-full ring-2 ring-white"
                              style={{ backgroundColor: theme.accentColor }}
                            />
                          </div>
                          <span className="font-serif font-semibold text-sm text-[#2C221E]">
                            {theme.name}
                          </span>
                        </div>

                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-[#8C593B] text-[#FAF7F2] flex items-center justify-center text-xs shrink-0 shadow-sm">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] font-medium text-[#8C593B] mb-1">
                        {theme.tagline}
                      </p>
                      <p className="text-xs text-[#6B554B] leading-relaxed mb-2 line-clamp-2">
                        {theme.description}
                      </p>

                      {/* Theme Particle & Flavor Badges */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        <span className="px-2 py-0.5 rounded-md bg-[#8C593B]/10 text-[#5C3D2E] text-[10px] font-medium">
                          ✨ {theme.particleName}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Background Motion & Dynamics */}
            <div className="space-y-4 pt-4 border-t border-[#EADBCE]">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-semibold text-[#2C221E] flex items-center gap-2">
                  <Wind className="w-4 h-4 text-[#8C593B]" />
                  Background Animation Speed
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(['calm', 'gentle', 'lively', 'off'] as BackgroundAnimationSpeed[]).map((speed) => {
                  const isSelected = bgAnimationSpeed === speed;
                  return (
                    <button
                      key={speed}
                      onClick={() => setBgAnimationSpeed(speed)}
                      className={`py-3 px-4 rounded-xl border text-center transition-all capitalize text-xs font-semibold ${
                        isSelected
                          ? 'border-[#8C593B] bg-[#8C593B] text-[#FAF7F2] shadow-sm'
                          : 'border-[#EADBCE] bg-[#FAF7F2] text-[#5C483F] hover:bg-[#F3EBE4]'
                      }`}
                    >
                      {speed === 'off' ? 'Static (Off)' : `${speed} Pace`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Visual Atmospheric Layers */}
            <div className="space-y-4 pt-4 border-t border-[#EADBCE]">
              <h3 className="font-serif text-lg font-semibold text-[#2C221E] flex items-center gap-2">
                <Droplets className="w-4 h-4 text-[#8C593B]" />
                Atmospheric Layers
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Steam Vapor Toggle */}
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EADBCE] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-semibold text-[#2C221E] block">
                      Espresso & Oven Steam
                    </span>
                    <span className="text-[11px] text-[#6B554B]">
                      Rising soft mist columns
                    </span>
                  </div>
                  <button
                    onClick={() => setSteamActive(!steamActive)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                      steamActive ? 'bg-[#8C593B]' : 'bg-[#D4C3B3]'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        steamActive ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Floating Particles Toggle */}
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EADBCE] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-semibold text-[#2C221E] block">
                      Floating Motif Particles
                    </span>
                    <span className="text-[11px] text-[#6B554B]">
                      Coffee beans, sparkles & petals
                    </span>
                  </div>
                  <button
                    onClick={() => setFloatingParticlesActive(!floatingParticlesActive)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                      floatingParticlesActive ? 'bg-[#8C593B]' : 'bg-[#D4C3B3]'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        floatingParticlesActive ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-5 bg-[#FAF7F2] border-t border-[#EADBCE] flex items-center justify-between">
            <button
              onClick={() => {
                setTheme('warm-espresso');
                setBgAnimationSpeed('gentle');
                setSteamActive(true);
                setFloatingParticlesActive(true);
              }}
              className="text-xs text-[#8C593B] hover:underline flex items-center gap-1 font-medium"
            >
              <RefreshCw className="w-3 h-3" />
              Reset to Default Atmosphere
            </button>
            <button
              onClick={() => setIsThemeCustomizerOpen(false)}
              className="px-6 py-2.5 rounded-full bg-[#8C593B] text-[#FAF7F2] text-xs font-semibold hover:bg-[#6F4E43] transition-colors shadow-sm"
            >
              Done & Enjoy Experience
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
