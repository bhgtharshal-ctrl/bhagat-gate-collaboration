export type ThemeMode = 'warm-espresso' | 'velvet-rose' | 'midnight-patisserie' | 'caramel-gold' | 'matcha-pistachio' | 'lavender-twilight';

export type BackgroundAnimationSpeed = 'calm' | 'gentle' | 'lively' | 'off';

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  tagline: string;
  primaryColor: string;
  accentColor: string;
  bgGradient: string;
  description: string;
  isDark?: boolean;
  flavorNotes: string[];
  particleName: string;
}

export type ProductCategory =
  | 'All'
  | 'Cakes'
  | 'Cupcakes'
  | 'Cookies'
  | 'Brownies'
  | 'Pastries'
  | 'Gift Boxes';

export type DietaryTag = 'Eggless' | 'Vegan' | 'Gluten-Free' | 'Nut-Free' | 'Signature' | 'Bestseller';

export interface CakeSizeOption {
  weight: string; // '0.5 kg', '1 kg', '1.5 kg', '2 kg' or '6 pcs', '12 pcs'
  price: number;
  serves: string; // '3-4 people', '6-8 people'
}

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: ProductCategory;
  basePrice: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  galleryImages: string[];
  dietaryTags: DietaryTag[];
  isFeatured?: boolean;
  isNew?: boolean;
  ingredients: string[];
  allergens: string[];
  shelfLife: string;
  storageInstructions: string;
  sizes: CakeSizeOption[];
}

export interface CartItem {
  cartId: string; // Unique cart line item ID (productId + selectedSize + customMessage)
  product: Product;
  selectedSize: CakeSizeOption;
  quantity: number;
  customMessage?: string;
  deliveryDate?: string;
  specialInstructions?: string;
}

export type PaymentMethodType = 'upi' | 'card' | 'netbanking' | 'wallet' | 'cod';

export interface TransactionDetails {
  transactionId: string;
  utrNumber: string;
  paymentGateway: string;
  paymentStatus: 'SUCCESS' | 'PENDING' | 'AUTHORIZED' | 'CASH_ON_DELIVERY';
  paymentMethod: PaymentMethodType;
  paidAt: string;
  currency: string;
  amount: number;
  taxAmount: number;
  upiId?: string;
  cardLast4?: string;
  cardBrand?: string;
  bankName?: string;
  walletName?: string;
  authCode?: string;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  orderNotes?: string;
  paymentMethod: PaymentMethodType;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  customer: CustomerDetails;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  couponCode?: string;
  status: 'placed' | 'baking' | 'decorating' | 'out_for_delivery' | 'delivered';
  transaction: TransactionDetails;
}

export interface Testimonial {
  id: string;
  author: string;
  city: string;
  rating: number;
  quote: string;
  productMentioned: string;
  date: string;
  avatarUrl: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Orders' | 'Delivery' | 'Ingredients' | 'Custom';
}

export interface FilterState {
  category: ProductCategory;
  searchQuery: string;
  dietary: DietaryTag | 'All';
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
  maxPrice: number;
}
