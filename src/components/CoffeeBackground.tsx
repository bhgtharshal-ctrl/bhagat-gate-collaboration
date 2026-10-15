import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { THEMES } from '../data/themes';
import { ThemeMode, BackgroundAnimationSpeed } from '../types';
import {
  Palette,
  Sparkles,
  Droplets,
  Wind,
  Check,
  Flame,
  Coffee,
  Heart,
  Leaf,
  Moon,
  Sun,
  ChevronUp,
  ChevronDown,
  SlidersHorizontal,
} from 'lucide-react';

export const CoffeeBackground: React.FC = () => {
  const {
    currentTheme,
    setTheme,
    bgAnimationSpeed,
    setBgAnimationSpeed,
    steamActive,
    setSteamActive,
    floatingParticlesActive,
    setFloatingParticlesActive,
    setIsThemeCustomizerOpen,
  } = useCart();

  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const [isDockExpanded, setIsDockExpanded] = useState(false);
  const [cursorGlowActive, setCursorGlowActive] = useState(true);

  const activeThemeObj = THEMES[currentTheme] || THEMES['warm-espresso'];

  // Handle pointer tracking for ambient flashlight effect
  useEffect(() => {
    if (!cursorGlowActive || bgAnimationSpeed === 'off') return;

    let ticking = false;
    const handlePointerMove = (e: PointerEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setMousePos({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [cursorGlowActive, bgAnimationSpeed]);

  const durationMultiplier =
    bgAnimationSpeed === 'calm' ? 1.6 : bgAnimationSpeed === 'lively' ? 0.65 : 1;

  const isDark = activeThemeObj.isDark;

  return (
    <>
      {/* =========================================================================
          1. FULL VIEWPORT ANIMATED BACKGROUND CANVAS (Fixed behind content)
          ========================================================================= */}
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-colors duration-700"
        aria-hidden="true"
      >
        {/* Dynamic Base Gradient Layer */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentTheme === 'warm-espresso'
              ? 'bg-gradient-to-b from-[#2B1810] via-[#24150E] to-[#1D100A]'
              : currentTheme === 'midnight-patisserie'
              ? 'bg-gradient-to-b from-[#140E0C] via-[#201612] to-[#120B0A]'
              : currentTheme === 'velvet-rose'
              ? 'bg-gradient-to-b from-[#FCF6F7] via-[#F9EAEE] to-[#FDF4F6]'
              : currentTheme === 'caramel-gold'
              ? 'bg-gradient-to-b from-[#FDF8F0] via-[#F9EED9] to-[#FCF6EC]'
              : currentTheme === 'matcha-pistachio'
              ? 'bg-gradient-to-b from-[#F7FAF5] via-[#EBF3E8] to-[#F6FAF4]'
              : 'bg-gradient-to-b from-[#F8F5FC] via-[#F0E8F8] to-[#F8F5FC]'
          }`}
        />

        {/* Ambient Aurora Orbs (morphing and floating in background) */}
        {bgAnimationSpeed !== 'off' && (
          <>
            {/* Top-Left Orb */}
            <div
              className={`absolute -top-32 -left-32 w-[34rem] h-[34rem] rounded-full blur-[100px] transition-all duration-1000 animate-cafe-pulse ${
                currentTheme === 'warm-espresso'
                  ? 'bg-[#E5B895]/35'
                  : currentTheme === 'midnight-patisserie'
                  ? 'bg-[#D4AF37]/22'
                  : currentTheme === 'velvet-rose'
                  ? 'bg-[#F2B5C4]/35'
                  : currentTheme === 'caramel-gold'
                  ? 'bg-[#F59E0B]/30'
                  : currentTheme === 'matcha-pistachio'
                  ? 'bg-[#84CC16]/25'
                  : 'bg-[#C084FC]/30'
              }`}
              style={{ animationDuration: `${11 * durationMultiplier}s` }}
            />

            {/* Middle-Right Orb */}
            <div
              className={`absolute top-1/4 -right-24 w-[38rem] h-[38rem] rounded-full blur-[110px] transition-all duration-1000 animate-cafe-pulse ${
                currentTheme === 'warm-espresso'
                  ? 'bg-[#8C593B]/20'
                  : currentTheme === 'midnight-patisserie'
                  ? 'bg-[#B45309]/30'
                  : currentTheme === 'velvet-rose'
                  ? 'bg-[#E07A8B]/25'
                  : currentTheme === 'caramel-gold'
                  ? 'bg-[#D97706]/25'
                  : currentTheme === 'matcha-pistachio'
                  ? 'bg-[#4D7C0F]/20'
                  : 'bg-[#9333EA]/22'
              }`}
              style={{
                animationDuration: `${14 * durationMultiplier}s`,
                animationDelay: '2.5s',
              }}
            />

            {/* Bottom-Left Orb */}
            <div
              className={`absolute bottom-12 left-1/5 w-[32rem] h-[32rem] rounded-full blur-[90px] transition-all duration-1000 animate-cafe-pulse ${
                currentTheme === 'warm-espresso'
                  ? 'bg-[#D4A373]/25'
                  : currentTheme === 'midnight-patisserie'
                  ? 'bg-[#F59E0B]/20'
                  : currentTheme === 'velvet-rose'
                  ? 'bg-[#FBCFE8]/30'
                  : currentTheme === 'caramel-gold'
                  ? 'bg-[#FBBF24]/30'
                  : currentTheme === 'matcha-pistachio'
                  ? 'bg-[#A3E635]/25'
                  : 'bg-[#DDD6FE]/35'
              }`}
              style={{
                animationDuration: `${13 * durationMultiplier}s`,
                animationDelay: '4.5s',
              }}
            />

            {/* Center Breathing Aura */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[42rem] rounded-full blur-[130px] opacity-40 transition-all duration-1000 animate-aurora ${
                currentTheme === 'warm-espresso'
                  ? 'bg-[#3D251A]'
                  : currentTheme === 'midnight-patisserie'
                  ? 'bg-[#2A1C16]'
                  : currentTheme === 'velvet-rose'
                  ? 'bg-[#FCE7F3]'
                  : currentTheme === 'caramel-gold'
                  ? 'bg-[#FEF3C7]'
                  : currentTheme === 'matcha-pistachio'
                  ? 'bg-[#ECFCCB]'
                  : 'bg-[#F3E8FF]'
              }`}
              style={{ animationDuration: `${28 * durationMultiplier}s` }}
            />
          </>
        )}

        {/* Interactive Pointer Light Flashlight (soft radial follow) */}
        {cursorGlowActive && bgAnimationSpeed !== 'off' && mousePos.x >= 0 && (
          <div
            className="absolute w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-transform duration-75 ease-out blur-3xl opacity-40"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
              background: `radial-gradient(circle, ${activeThemeObj.accentColor} 0%, transparent 70%)`,
            }}
          />
        )}

        {/* Subtle Patisserie Texture Grid */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            isDark ? 'opacity-[0.07]' : 'opacity-[0.035]'
          }`}
          style={{
            backgroundImage: `radial-gradient(${
              isDark ? '#D4AF37' : '#412B24'
            } 1.2px, transparent 1.2px)`,
            backgroundSize: '28px 28px',
          }}
        />

        {/* Animated Rising Steam / Aroma Vapor Columns */}
        {steamActive && bgAnimationSpeed !== 'off' && (
          <div className="absolute inset-0 transition-opacity duration-500 overflow-hidden pointer-events-none">
            {/* Steam Column 1 (Left flank) */}
            <div className="absolute bottom-[-20px] left-[12%] flex flex-col items-center">
              <div
                className={`w-14 h-48 rounded-full blur-xl animate-steam-1 ${
                  isDark ? 'bg-[#D4AF37]/15' : 'bg-[#D4A373]/25'
                }`}
              />
            </div>

            {/* Steam Column 2 (Center Left) */}
            <div className="absolute bottom-[-10px] left-[32%] flex flex-col items-center">
              <div
                className={`w-16 h-56 rounded-full blur-2xl animate-steam-2 ${
                  isDark ? 'bg-[#F59E0B]/18' : 'bg-[#E5B895]/30'
                }`}
              />
            </div>

            {/* Steam Column 3 (Right flank) */}
            <div className="absolute bottom-[-20px] right-[18%] flex flex-col items-center">
              <div
                className={`w-18 h-64 rounded-full blur-2xl animate-steam-3 ${
                  isDark ? 'bg-[#D4AF37]/12' : 'bg-[#D4A373]/20'
                }`}
              />
            </div>

            {/* Steam Column 4 (Far Right) */}
            <div className="absolute bottom-[-10px] right-[8%] flex flex-col items-center">
              <div
                className={`w-12 h-44 rounded-full blur-xl animate-steam-1 ${
                  isDark ? 'bg-[#F59E0B]/15' : 'bg-[#F4D6D9]/25'
                }`}
                style={{ animationDelay: '2.2s' }}
              />
            </div>
          </div>
        )}

        {/* Theme-Specific Floating Animated Particles */}
        {floatingParticlesActive && bgAnimationSpeed !== 'off' && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* ======================= WARM ESPRESSO PARTICLES ======================= */}
            {currentTheme === 'warm-espresso' && (
              <>
                {/* Coffee Bean 1 */}
                <div
                  className="absolute top-[16%] left-[8%] animate-float-slow opacity-65"
                  style={{ animationDuration: `${20 * durationMultiplier}s` }}
                >
                  <svg width="34" height="26" viewBox="0 0 34 26" fill="none">
                    <ellipse cx="17" cy="13" rx="15" ry="11" fill="#4A2F25" />
                    <path
                      d="M7 13C12 7 22 19 27 13"
                      stroke="#E5B895"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Coffee Bean 2 */}
                <div
                  className="absolute top-[48%] right-[10%] animate-float-mid opacity-55"
                  style={{ animationDuration: `${16 * durationMultiplier}s` }}
                >
                  <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
                    <ellipse cx="14" cy="11" rx="12" ry="9" fill="#5C3A2E" />
                    <path
                      d="M5 11C9 6 19 16 23 11"
                      stroke="#D4A373"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Coffee Bean 3 */}
                <div
                  className="absolute bottom-[24%] left-[22%] animate-float-fast opacity-60"
                  style={{ animationDuration: `${13 * durationMultiplier}s` }}
                >
                  <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
                    <ellipse cx="12" cy="9" rx="10" ry="7.5" fill="#3D2319" />
                    <path
                      d="M5 9C8 5 16 13 19 9"
                      stroke="#EADBCE"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Coffee Bean 4 */}
                <div
                  className="absolute top-[75%] right-[26%] animate-float-slow opacity-50"
                  style={{ animationDuration: `${22 * durationMultiplier}s` }}
                >
                  <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
                    <ellipse cx="13" cy="10" rx="11" ry="8" fill="#4B2C21" />
                    <path
                      d="M6 10C9 6 17 14 20 10"
                      stroke="#E5B895"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Aroma Ripple Ring */}
                <div
                  className="absolute top-[35%] left-[45%] w-48 h-48 rounded-full border border-[#8C593B]/25 animate-ping pointer-events-none opacity-20"
                  style={{ animationDuration: `${9 * durationMultiplier}s` }}
                />
              </>
            )}

            {/* ======================= MIDNIGHT PATISSERIE PARTICLES ======================= */}
            {currentTheme === 'midnight-patisserie' && (
              <>
                {/* 4-Point Golden Star 1 */}
                <div
                  className="absolute top-[18%] left-[15%] animate-twinkle text-[#F59E0B]"
                  style={{ animationDuration: `${3.5 * durationMultiplier}s` }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                  </svg>
                </div>

                {/* 4-Point Golden Star 2 */}
                <div
                  className="absolute top-[42%] right-[14%] animate-twinkle text-[#D4AF37]"
                  style={{
                    animationDuration: `${4.5 * durationMultiplier}s`,
                    animationDelay: '1.2s',
                  }}
                >
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                  </svg>
                </div>

                {/* 4-Point Golden Star 3 */}
                <div
                  className="absolute bottom-[28%] left-[28%] animate-twinkle text-[#FBBF24]"
                  style={{
                    animationDuration: `${3.8 * durationMultiplier}s`,
                    animationDelay: '2.1s',
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                  </svg>
                </div>

                {/* Drifting Gold Dust Flakes */}
                <div
                  className="absolute top-[65%] right-[22%] animate-float-mid text-[#F59E0B]/70"
                  style={{ animationDuration: `${15 * durationMultiplier}s` }}
                >
                  <div className="w-3.5 h-3.5 bg-gradient-to-tr from-[#D4AF37] to-[#FDE68A] rotate-45 rounded-xs shadow-[0_0_12px_rgba(212,175,55,0.8)]" />
                </div>

                <div
                  className="absolute top-[28%] left-[45%] animate-float-slow text-[#D4AF37]/60"
                  style={{ animationDuration: `${18 * durationMultiplier}s` }}
                >
                  <div className="w-2.5 h-2.5 bg-gradient-to-tr from-[#F59E0B] to-[#FEF3C7] rotate-12 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
                </div>

                {/* Gold Starlight Wave */}
                <div
                  className="absolute bottom-[20%] right-[35%] w-56 h-56 rounded-full border border-[#D4AF37]/25 animate-ping pointer-events-none opacity-25"
                  style={{ animationDuration: `${8 * durationMultiplier}s` }}
                />
              </>
            )}

            {/* ======================= VELVET ROSE PARTICLES ======================= */}
            {currentTheme === 'velvet-rose' && (
              <>
                {/* Damask Rose Petal 1 */}
                <div
                  className="absolute top-[16%] left-[12%] animate-float-slow opacity-75"
                  style={{ animationDuration: `${18 * durationMultiplier}s` }}
                >
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path
                      d="M16 2C22 6 28 14 26 22C24 28 18 30 14 28C10 26 6 20 8 12C9 6 12 2 16 2Z"
                      fill="#E07A8B"
                      fillOpacity="0.85"
                    />
                    <path
                      d="M16 8C18 12 18 20 15 24"
                      stroke="#FFF0F3"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Rose Petal 2 */}
                <div
                  className="absolute top-[52%] right-[12%] animate-float-mid opacity-70"
                  style={{ animationDuration: `${14 * durationMultiplier}s` }}
                >
                  <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
                    <path
                      d="M16 2C22 6 28 14 26 22C24 28 18 30 14 28C10 26 6 20 8 12C9 6 12 2 16 2Z"
                      fill="#C06072"
                      fillOpacity="0.8"
                    />
                    <path
                      d="M16 8C18 12 18 20 15 24"
                      stroke="#FFF0F3"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Rose Petal 3 */}
                <div
                  className="absolute bottom-[22%] left-[24%] animate-float-fast opacity-65"
                  style={{ animationDuration: `${12 * durationMultiplier}s` }}
                >
                  <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                    <path
                      d="M16 2C22 6 28 14 26 22C24 28 18 30 14 28C10 26 6 20 8 12C9 6 12 2 16 2Z"
                      fill="#F472B6"
                      fillOpacity="0.8"
                    />
                  </svg>
                </div>

                {/* Strawberry Blossom */}
                <div
                  className="absolute top-[32%] right-[32%] animate-float-slow opacity-60 text-[#FDA4AF]"
                  style={{ animationDuration: `${22 * durationMultiplier}s` }}
                >
                  <Sparkles className="w-6 h-6" />
                </div>
              </>
            )}

            {/* ======================= CARAMEL GOLD PARTICLES ======================= */}
            {currentTheme === 'caramel-gold' && (
              <>
                {/* Honey Drop 1 */}
                <div
                  className="absolute top-[18%] left-[14%] animate-float-slow opacity-75"
                  style={{ animationDuration: `${17 * durationMultiplier}s` }}
                >
                  <svg width="26" height="34" viewBox="0 0 26 34" fill="none">
                    <path
                      d="M13 2C13 2 24 16 24 23C24 29 19 33 13 33C7 33 2 29 2 23C2 16 13 2 13 2Z"
                      fill="#D97706"
                      fillOpacity="0.85"
                    />
                    <circle cx="9" cy="22" r="3" fill="#FDE68A" fillOpacity="0.8" />
                  </svg>
                </div>

                {/* Toffee Crystal 2 */}
                <div
                  className="absolute top-[55%] right-[15%] animate-float-mid opacity-70"
                  style={{ animationDuration: `${14 * durationMultiplier}s` }}
                >
                  <div className="w-5 h-5 bg-gradient-to-br from-[#F59E0B] to-[#78350F] rotate-45 rounded-sm shadow-md" />
                </div>

                {/* Honeycomb Hexagon 3 */}
                <div
                  className="absolute bottom-[24%] left-[30%] animate-float-fast opacity-60 text-[#F59E0B]"
                  style={{ animationDuration: `${12 * durationMultiplier}s` }}
                >
                  <svg width="24" height="28" viewBox="0 0 24 28" fill="currentColor">
                    <polygon points="12,1 23,7 23,21 12,27 1,21 1,7" opacity="0.8" />
                  </svg>
                </div>
              </>
            )}

            {/* ======================= MATCHA PISTACHIO PARTICLES ======================= */}
            {currentTheme === 'matcha-pistachio' && (
              <>
                {/* Matcha Tea Leaf 1 */}
                <div
                  className="absolute top-[18%] left-[12%] animate-float-slow opacity-80"
                  style={{ animationDuration: `${19 * durationMultiplier}s` }}
                >
                  <svg width="34" height="22" viewBox="0 0 34 22" fill="none">
                    <path
                      d="M2 11C9 3 25 2 32 11C25 20 9 19 2 11Z"
                      fill="#557A46"
                      fillOpacity="0.85"
                    />
                    <path
                      d="M2 11C12 11 22 11 32 11"
                      stroke="#D7E7D4"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Tea Leaf 2 */}
                <div
                  className="absolute top-[48%] right-[14%] animate-float-mid opacity-70"
                  style={{ animationDuration: `${15 * durationMultiplier}s` }}
                >
                  <svg width="28" height="18" viewBox="0 0 34 22" fill="none">
                    <path
                      d="M2 11C9 3 25 2 32 11C25 20 9 19 2 11Z"
                      fill="#65A30D"
                      fillOpacity="0.8"
                    />
                  </svg>
                </div>

                {/* Dew Drop 3 */}
                <div
                  className="absolute bottom-[26%] left-[20%] animate-float-fast opacity-75"
                  style={{ animationDuration: `${13 * durationMultiplier}s` }}
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-[#A3E635]/80 shadow-sm" />
                </div>
              </>
            )}

            {/* ======================= LAVENDER TWILIGHT PARTICLES ======================= */}
            {currentTheme === 'lavender-twilight' && (
              <>
                {/* Lavender Floret 1 */}
                <div
                  className="absolute top-[20%] left-[14%] animate-float-slow opacity-80"
                  style={{ animationDuration: `${18 * durationMultiplier}s` }}
                >
                  <svg width="28" height="36" viewBox="0 0 28 36" fill="none">
                    <path d="M14 34V10" stroke="#5B3E75" strokeWidth="2" strokeLinecap="round" />
                    <ellipse cx="10" cy="18" rx="5" ry="3" fill="#8E5BAA" />
                    <ellipse cx="18" cy="16" rx="5" ry="3" fill="#A855F7" />
                    <ellipse cx="10" cy="12" rx="4" ry="2.5" fill="#C084FC" />
                    <ellipse cx="18" cy="10" rx="4" ry="2.5" fill="#8E5BAA" />
                    <circle cx="14" cy="6" r="3" fill="#DDD6FE" />
                  </svg>
                </div>

                {/* Violet Shimmer 2 */}
                <div
                  className="absolute top-[52%] right-[16%] animate-twinkle text-[#A855F7]"
                  style={{ animationDuration: `${4 * durationMultiplier}s` }}
                >
                  <Sparkles className="w-7 h-7" />
                </div>

                {/* Vanilla Starburst 3 */}
                <div
                  className="absolute bottom-[24%] left-[32%] animate-float-fast text-[#C084FC]/70"
                  style={{ animationDuration: `${12 * durationMultiplier}s` }}
                >
                  <div className="w-3.5 h-3.5 bg-gradient-to-tr from-[#9333EA] to-[#E9D5FF] rotate-45 rounded-xs" />
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* =========================================================================
          2. FLOATING ANIMATED INTERFACE THEME DOCK (Interactive Controller)
          ========================================================================= */}
      <aside
        aria-label="Theme Ambience Controller"
        className="fixed bottom-5 right-5 z-40 select-none"
      >
        <div className="flex flex-col items-end gap-2">
          {/* Expanded Theme Switcher Drawer */}
          <AnimatePresence>
            {isDockExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                className={`w-80 sm:w-96 rounded-3xl p-5 shadow-2xl border backdrop-blur-xl space-y-4 ${
                  isDark
                    ? 'bg-[#2B1810]/95 border-[#55392C] text-[#FAF6F0]'
                    : 'bg-[#FFFDFB]/95 border-[#EADBCE] text-[#2C221E]'
                }`}
                style={{
                  boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.4)',
                }}
              >
                {/* Header */}
                <div className={`flex items-center justify-between pb-2 border-b ${isDark ? 'border-[#55392C]' : 'border-[#EADBCE]'}`}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#E5B895] text-[#2B1810] flex items-center justify-center text-xs font-bold">
                      <Palette className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className={`font-serif font-semibold text-sm leading-tight ${isDark ? 'text-[#FAF6F0]' : 'text-[#2C221E]'}`}>
                        Atmospheric Theme
                      </h4>
                      <p className={`text-[10px] font-medium ${isDark ? 'text-[#E5B895]' : 'text-[#8C593B]'}`}>
                        Live Animated Interface Styles
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsDockExpanded(false)}
                    className={`p-1 rounded-full transition-colors ${
                      isDark ? 'text-[#E5B895] hover:bg-[#3D251A]' : 'text-[#8C593B] hover:text-[#412B24] hover:bg-[#F3EBE4]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                {/* 1-Click Theme Selection Grid */}
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(THEMES) as ThemeMode[]).map((themeKey) => {
                    const theme = THEMES[themeKey];
                    const isSelected = currentTheme === themeKey;
                    return (
                      <button
                        key={themeKey}
                        onClick={() => setTheme(themeKey)}
                        className={`p-2.5 rounded-xl border text-left transition-all relative overflow-hidden flex items-center gap-2.5 ${
                          isSelected
                            ? isDark
                              ? 'border-[#E5B895] bg-[#3E271E] shadow-sm ring-1 ring-[#E5B895]/50'
                              : 'border-[#412B24] bg-[#FAF4EE] shadow-sm ring-1 ring-[#412B24]/30'
                            : isDark
                            ? 'border-[#55392C] bg-[#342017] hover:bg-[#3E271E]'
                            : 'border-[#EADBCE] bg-white hover:bg-[#FAF7F2]'
                        }`}
                      >
                        <div
                          className="w-5 h-5 rounded-full shrink-0 border border-white/20 shadow-xs"
                          style={{
                            background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.accentColor})`,
                          }}
                        />
                        <div className="min-w-0 flex-1">
                          <p className={`font-serif text-xs font-semibold truncate ${isDark ? 'text-[#FAF6F0]' : 'text-[#2C221E]'}`}>
                            {theme.name.split(' & ')[0]}
                          </p>
                          <p className={`text-[9px] truncate ${isDark ? 'text-[#E5B895]' : 'text-[#8C593B]'}`}>
                            {theme.name.split(' & ')[1] || theme.tagline}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-[#E5B895] text-[#2B1810] flex items-center justify-center text-[9px] font-bold shrink-0">
                            ✓
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Active Theme Fragrance & Flavor Notes */}
                <div className={`p-2.5 rounded-xl border space-y-1 ${
                  isDark ? 'bg-[#342017] border-[#55392C]' : 'bg-[#FAF7F2] border-[#EADBCE]'
                }`}>
                  <div className={`flex items-center justify-between text-[11px] font-semibold ${isDark ? 'text-[#FAF6F0]' : 'text-[#2C221E]'}`}>
                    <span className="flex items-center gap-1.5">
                      <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-[#E5B895]' : 'text-[#8C593B]'}`} />
                      Ambiance Notes
                    </span>
                    <span className={`text-[10px] ${isDark ? 'text-[#E5B895]' : 'text-[#8C593B]'}`}>
                      {activeThemeObj.particleName}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {activeThemeObj.flavorNotes.map((note) => (
                      <span
                        key={note}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                          isDark
                            ? 'bg-[#2B1810] text-[#E8DDD3] border-[#55392C]'
                            : 'bg-white text-[#5C483F] border-[#EADBCE]'
                        }`}
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Live Animation Toggles */}
                <div className={`space-y-2 pt-1 border-t ${isDark ? 'border-[#55392C]' : 'border-[#EADBCE]'}`}>
                  <p className={`text-[11px] font-semibold flex items-center justify-between ${isDark ? 'text-[#FAF6F0]' : 'text-[#2C221E]'}`}>
                    <span>Animation Dynamics</span>
                    <span className={`text-[10px] capitalize ${isDark ? 'text-[#E5B895]' : 'text-[#8C593B]'}`}>
                      Speed: {bgAnimationSpeed}
                    </span>
                  </p>

                  <div className="grid grid-cols-4 gap-1.5">
                    {(['calm', 'gentle', 'lively', 'off'] as BackgroundAnimationSpeed[]).map(
                      (spd) => (
                        <button
                          key={spd}
                          onClick={() => setBgAnimationSpeed(spd)}
                          className={`py-1.5 px-2 rounded-lg text-[10px] font-semibold capitalize transition-colors ${
                            bgAnimationSpeed === spd
                              ? 'bg-[#E5B895] text-[#2B1810]'
                              : isDark
                              ? 'bg-[#342017] text-[#E8DDD3] hover:bg-[#442A1E]'
                              : 'bg-[#FAF7F2] text-[#5C483F] hover:bg-[#F3EBE4]'
                          }`}
                        >
                          {spd}
                        </button>
                      )
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => setSteamActive(!steamActive)}
                      className={`py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-colors ${
                        steamActive
                          ? isDark
                            ? 'bg-[#3E271E] border-[#E5B895] text-[#E5B895]'
                            : 'bg-[#FAF4EE] border-[#8C593B] text-[#412B24]'
                          : isDark
                          ? 'bg-[#342017] border-[#55392C] text-[#8C7569]'
                          : 'bg-[#FAF7F2] border-[#EADBCE] text-[#9E877C]'
                      }`}
                    >
                      <Droplets className="w-3.5 h-3.5" />
                      <span>Steam {steamActive ? 'ON' : 'OFF'}</span>
                    </button>

                    <button
                      onClick={() => setFloatingParticlesActive(!floatingParticlesActive)}
                      className={`py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-colors ${
                        floatingParticlesActive
                          ? isDark
                            ? 'bg-[#3E271E] border-[#E5B895] text-[#E5B895]'
                            : 'bg-[#FAF4EE] border-[#8C593B] text-[#412B24]'
                          : isDark
                          ? 'bg-[#342017] border-[#55392C] text-[#8C7569]'
                          : 'bg-[#FAF7F2] border-[#EADBCE] text-[#9E877C]'
                      }`}
                    >
                      <Wind className="w-3.5 h-3.5" />
                      <span>Particles {floatingParticlesActive ? 'ON' : 'OFF'}</span>
                    </button>
                  </div>
                </div>

                {/* Footer Modal Trigger */}
                <div className={`pt-2 border-t flex items-center justify-between text-xs ${isDark ? 'border-[#55392C]' : 'border-[#EADBCE]'}`}>
                  <button
                    onClick={() => {
                      setIsDockExpanded(false);
                      setIsThemeCustomizerOpen(true);
                    }}
                    className={`font-medium underline underline-offset-2 flex items-center gap-1 text-[11px] ${
                      isDark ? 'text-[#E5B895] hover:text-[#FAF6F0]' : 'text-[#8C593B] hover:text-[#412B24]'
                    }`}
                  >
                    <SlidersHorizontal className="w-3 h-3" />
                    Open Atmosphere Studio
                  </button>
                  <button
                    onClick={() => setIsDockExpanded(false)}
                    className="px-3 py-1 rounded-full bg-[#E5B895] text-[#2B1810] text-[11px] font-semibold hover:bg-[#F0CAA8] transition-colors"
                  >
                    Apply & Close
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Dock Toggle Button (Always visible floating pill) */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-2xl backdrop-blur-md border transition-all duration-300 cursor-pointer"
            style={{
              backgroundColor: isDark ? 'rgba(32, 22, 19, 0.95)' : 'rgba(255, 253, 251, 0.92)',
              borderColor: isDark ? '#4A352D' : '#EADBCE',
              color: isDark ? '#FAF6F0' : '#2C221E',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.18)',
            }}
            onClick={() => setIsDockExpanded(!isDockExpanded)}
          >
            {/* Color Swatch Dot */}
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs shadow-sm ring-2 ring-white/50"
              style={{
                background: `linear-gradient(135deg, ${activeThemeObj.primaryColor}, ${activeThemeObj.accentColor})`,
              }}
            >
              <Palette className="w-3.5 h-3.5" />
            </div>

            <div className="flex flex-col text-left pr-1">
              <span className="font-serif font-semibold text-xs leading-none">
                {activeThemeObj.name.split(' & ')[0]}
              </span>
              <span className="text-[9px] opacity-70 tracking-wider uppercase font-semibold">
                Theme & Motion
              </span>
            </div>

            {isDockExpanded ? (
              <ChevronDown className="w-4 h-4 opacity-70" />
            ) : (
              <ChevronUp className="w-4 h-4 opacity-70" />
            )}
          </motion.div>
        </div>
      </aside>
    </>
  );
};
