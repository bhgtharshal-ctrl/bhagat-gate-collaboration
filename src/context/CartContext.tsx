import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { CartItem, Product, CakeSizeOption, Order, CustomerDetails, TransactionDetails, ThemeMode, BackgroundAnimationSpeed } from '../types';
import confetti from 'canvas-confetti';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    product: Product,
    selectedSize?: CakeSizeOption,
    quantity?: number,
    customMessage?: string,
    deliveryDate?: string,
    specialInstructions?: string,
    openCartDrawer?: boolean
  ) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Totals & Discounts
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  couponCode: string;
  appliedCouponDiscountPercent: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  // UI Drawers & Modals
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  activeProductDetail: Product | null;
  setActiveProductDetail: (product: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCustomBoxOpen: boolean;
  setIsCustomBoxOpen: (open: boolean) => void;
  isOrderTrackingOpen: boolean;
  setIsOrderTrackingOpen: (open: boolean) => void;
  isThemeCustomizerOpen: boolean;
  setIsThemeCustomizerOpen: (open: boolean) => void;
  
  // Theme & Animation Atmosphere Controls
  currentTheme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  bgAnimationSpeed: BackgroundAnimationSpeed;
  setBgAnimationSpeed: (speed: BackgroundAnimationSpeed) => void;
  steamActive: boolean;
  setSteamActive: (active: boolean) => void;
  floatingParticlesActive: boolean;
  setFloatingParticlesActive: (active: boolean) => void;

  // Direct Buy Now Action
  buyNow: (product: Product, selectedSize?: CakeSizeOption, quantity?: number, customMessage?: string) => void;
  
  // Orders
  lastPlacedOrder: Order | null;
  setLastPlacedOrder: (order: Order | null) => void;
  orderHistory: Order[];
  placeOrder: (customer: CustomerDetails, customTransactionMeta?: Partial<TransactionDetails>) => Order;
  lookupOrder: (orderNumber: string) => Order | undefined;
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  
  // Toasts
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  
  // Order Checklist
  completedChecklistSteps: number[];
  toggleChecklistStep: (stepIndex: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'mithaas_cart_v1';
const ORDERS_STORAGE_KEY = 'mithaas_orders_v1';
const WISHLIST_STORAGE_KEY = 'mithaas_wishlist_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY) || localStorage.getItem('bloom_brew_cart_v1') || localStorage.getItem('veloura_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 2. Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY) || localStorage.getItem('veloura_wishlist_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 3. Orders State
  const [orderHistory, setOrderHistory] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY) || localStorage.getItem('veloura_orders_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 4. Modals and Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeProductDetail, setActiveProductDetail] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCustomBoxOpen, setIsCustomBoxOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [isThemeCustomizerOpen, setIsThemeCustomizerOpen] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // 4b. Theme and Atmosphere state
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('mithaas_theme_mode');
      return (saved as ThemeMode) || 'warm-espresso';
    } catch {
      return 'warm-espresso';
    }
  });

  const [bgAnimationSpeed, setBgAnimationSpeed] = useState<BackgroundAnimationSpeed>(() => {
    try {
      const saved = localStorage.getItem('mithaas_anim_speed');
      return (saved as BackgroundAnimationSpeed) || 'gentle';
    } catch {
      return 'gentle';
    }
  });

  const [steamActive, setSteamActive] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('mithaas_steam_active');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [floatingParticlesActive, setFloatingParticlesActive] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('mithaas_floating_active');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // Save theme preferences
  useEffect(() => {
    try {
      localStorage.setItem('mithaas_theme_mode', currentTheme);
      document.documentElement.setAttribute('data-theme', currentTheme);
    } catch (e) {
      console.error(e);
    }
  }, [currentTheme]);

  useEffect(() => {
    try {
      localStorage.setItem('mithaas_anim_speed', bgAnimationSpeed);
    } catch (e) {
      console.error(e);
    }
  }, [bgAnimationSpeed]);

  useEffect(() => {
    try {
      localStorage.setItem('mithaas_steam_active', JSON.stringify(steamActive));
    } catch (e) {
      console.error(e);
    }
  }, [steamActive]);

  useEffect(() => {
    try {
      localStorage.setItem('mithaas_floating_active', JSON.stringify(floatingParticlesActive));
    } catch (e) {
      console.error(e);
    }
  }, [floatingParticlesActive]);

  const setTheme = (theme: ThemeMode) => {
    setCurrentTheme(theme);
    addToast(`Atmosphere switched to ${theme.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')} ✨`, 'info');
  };

  // 5. Coupons
  const [couponCode, setCouponCode] = useState('');
  const [appliedCouponDiscountPercent, setAppliedCouponDiscountPercent] = useState(0);

  // 6. Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // 7. Interactive Checklist state
  const [completedChecklistSteps, setCompletedChecklistSteps] = useState<number[]>([0]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  // Persist orders
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orderHistory));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orderHistory]);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed treat from your favorites', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast('Saved to your sweet wishlist ❤️', 'success');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const toggleChecklistStep = (stepIndex: number) => {
    setCompletedChecklistSteps((prev) =>
      prev.includes(stepIndex) ? prev.filter((i) => i !== stepIndex) : [...prev, stepIndex]
    );
  };

  const addToCart = (
    product: Product,
    selectedSize?: CakeSizeOption,
    quantity: number = 1,
    customMessage?: string,
    deliveryDate?: string,
    specialInstructions?: string,
    openCartDrawer: boolean = true
  ) => {
    const size = selectedSize || product.sizes[0];
    const cleanMsg = (customMessage || '').trim();
    const cartId = `${product.id}_${size.weight}_${cleanMsg}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartId === cartId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          cartId,
          product,
          selectedSize: size,
          quantity,
          customMessage: cleanMsg || undefined,
          deliveryDate,
          specialInstructions,
        };
        return [...prev, newItem];
      }
    });

    // Auto update checklist progress
    setCompletedChecklistSteps((prev) => {
      const set = new Set(prev);
      set.add(0); // Choose favorite treat
      set.add(1); // Select quantity and size
      if (cleanMsg) set.add(2); // Add personalized message
      if (deliveryDate) set.add(3); // Choose delivery date
      return Array.from(set);
    });

    addToast(`Added ${quantity}x "${product.name}" (${size.weight}) to cart!`, 'success');

    if (openCartDrawer) {
      setIsCartOpen(true);
    }
  };

  const buyNow = (
    product: Product,
    selectedSize?: CakeSizeOption,
    quantity: number = 1,
    customMessage?: string
  ) => {
    addToCart(product, selectedSize, quantity, customMessage, undefined, undefined, false);
    setIsCartOpen(false);
    setActiveProductDetail(null);
    setIsCheckoutOpen(true);
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
    addToast('Item removed from cart', 'info');
  };

  const updateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setAppliedCouponDiscountPercent(0);
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'SWEET10' || clean === 'MITHAAS10' || clean === 'BLOOM10' || clean === 'VELOURA10') {
      setCouponCode(clean);
      setAppliedCouponDiscountPercent(10);
      addToast('10% Sweet Discount Applied! 🎉', 'success');
      return { success: true, message: '10% discount applied successfully!' };
    } else if (clean === 'MITHAAS15' || clean === 'BLOOM15' || clean === 'VELOURA15' || clean === 'FIRSTBITE') {
      setCouponCode(clean);
      setAppliedCouponDiscountPercent(15);
      addToast('15% First-Order Delight Applied! ✨', 'success');
      return { success: true, message: '15% welcome discount applied!' };
    } else if (clean === 'CELEBRATE') {
      setCouponCode(clean);
      setAppliedCouponDiscountPercent(20);
      addToast('20% Celebration Voucher Applied! 🎂', 'success');
      return { success: true, message: '20% celebration discount applied!' };
    } else {
      addToast('Invalid coupon code. Try MITHAAS15 or SWEET10', 'error');
      return { success: false, message: 'Invalid or expired promo code.' };
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setAppliedCouponDiscountPercent(0);
    addToast('Coupon code removed', 'info');
  };

  // Calculations
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.selectedSize.price * item.quantity, 0);
  }, [cart]);

  const deliveryFee = useMemo(() => {
    if (cart.length === 0) return 0;
    // Free delivery on orders over ₹1000, otherwise ₹99
    return subtotal >= 1000 ? 0 : 99;
  }, [cart, subtotal]);

  const discount = useMemo(() => {
    if (appliedCouponDiscountPercent <= 0) return 0;
    return Math.round((subtotal * appliedCouponDiscountPercent) / 100);
  }, [subtotal, appliedCouponDiscountPercent]);

  const total = useMemo(() => {
    return Math.max(0, subtotal - discount + deliveryFee);
  }, [subtotal, discount, deliveryFee]);

  const placeOrder = (customer: CustomerDetails, customTransactionMeta?: Partial<TransactionDetails>): Order => {
    const orderNumber = `MC-${Math.floor(100000 + Math.random() * 900000)}`;
    const txId = `TXN_${Math.random().toString(36).substring(2, 8).toUpperCase()}${Date.now().toString().slice(-4)}`;
    const utr = `MITH${Math.floor(1000000000 + Math.random() * 9000000000)}`;

    const isCod = customer.paymentMethod === 'cod';
    const gatewayMap: Record<string, string> = {
      upi: 'NPCI Instant UPI 2.0 (Razorpay)',
      card: 'Stripe & Visa 3D Secure (256-bit AES)',
      netbanking: 'Reserve Bank Direct IMPS Gateway',
      wallet: 'Unified Prepaid Wallet PG',
      cod: 'Cash on Hand Settlement',
    };

    const transaction: TransactionDetails = {
      transactionId: customTransactionMeta?.transactionId || txId,
      utrNumber: customTransactionMeta?.utrNumber || utr,
      paymentGateway: gatewayMap[customer.paymentMethod] || 'Secure Cafe Gateway',
      paymentStatus: isCod ? 'CASH_ON_DELIVERY' : 'SUCCESS',
      paymentMethod: customer.paymentMethod,
      paidAt: new Date().toISOString(),
      currency: 'INR (₹)',
      amount: total,
      taxAmount: Math.round(total * 0.05),
      authCode: `AUTH_${Math.floor(100000 + Math.random() * 900000)}`,
      ...customTransactionMeta,
    };

    const newOrder: Order = {
      id: 'ord_' + Date.now(),
      orderNumber,
      createdAt: new Date().toISOString(),
      items: [...cart],
      customer,
      subtotal,
      discount,
      deliveryFee,
      total,
      couponCode: couponCode || undefined,
      status: 'placed',
      transaction,
    };

    setOrderHistory((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();

    // Mark all checklist steps
    setCompletedChecklistSteps([0, 1, 2, 3, 4, 5]);

    // Confetti burst
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#D4A373', '#8C593B', '#F4D6D9', '#C08081', '#2C1D18'],
      });
    } catch {
      // ignore
    }

    addToast(`Order ${orderNumber} placed successfully with Mithaas & Co.! 🧁☕`, 'success');
    return newOrder;
  };

  const lookupOrder = (orderNum: string): Order | undefined => {
    const clean = orderNum.trim().toUpperCase();
    return orderHistory.find((o) => o.orderNumber.toUpperCase() === clean);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        deliveryFee,
        discount,
        total,
        couponCode,
        appliedCouponDiscountPercent,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        setIsCartOpen,
        activeProductDetail,
        setActiveProductDetail,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isSearchOpen,
        setIsSearchOpen,
        isCustomBoxOpen,
        setIsCustomBoxOpen,
        isOrderTrackingOpen,
        setIsOrderTrackingOpen,
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
        buyNow,
        lastPlacedOrder,
        setLastPlacedOrder,
        orderHistory,
        placeOrder,
        lookupOrder,
        wishlist,
        toggleWishlist,
        isWishlisted,
        toasts,
        addToast,
        removeToast,
        completedChecklistSteps,
        toggleChecklistStep,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
