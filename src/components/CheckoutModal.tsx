import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CustomerDetails, PaymentMethodType, TransactionDetails } from '../types';
import {
  X,
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  CreditCard,
  QrCode,
  Truck,
  Zap,
  Lock,
  ArrowRight,
  Coffee,
  CheckCircle2,
  Building2,
  Wallet,
  Copy,
  Check,
  Sparkles,
  Smartphone,
  Info,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    subtotal,
    deliveryFee,
    discount,
    total,
    placeOrder,
    setIsCartOpen,
    addToast,
  } = useCart();

  // Tomorrow as default date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split('T')[0];

  const [form, setForm] = useState<CustomerDetails>({
    fullName: 'Ananya Sharma',
    phone: '+91 98200 45678',
    email: 'ananya.sharma@example.com',
    address: 'Flat 402, Blossom Heights, Perry Cross Road, Bandra West',
    city: 'Mumbai',
    postalCode: '400050',
    deliveryDate: defaultDate,
    deliveryTimeSlot: 'Evening (5:00 PM - 8:30 PM)',
    orderNotes: 'Please ring doorbell twice. The dessert is for a celebratory party.',
    paymentMethod: 'upi',
  });

  // Card sub-form
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '4532 •••• •••• 8829',
    cardHolder: 'ANANYA SHARMA',
    expiry: '08/29',
    cvv: '•••',
  });

  // UPI sub-form
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'qr'>('qr');
  const [upiIdInput, setUpiIdInput] = useState('ananya@okhdfcbank');
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Netbanking sub-form
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Wallet sub-form
  const [selectedWallet, setSelectedWallet] = useState('Amazon Pay');

  // Multi-step Payment Processing Animation
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

  if (!isCheckoutOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('mithaas.cafe@okhdfcbank');
    setCopiedUpi(true);
    addToast('UPI ID copied to clipboard: mithaas.cafe@okhdfcbank', 'info');
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsProcessing(true);
    setProcessingStep(1);

    // Step 1: Gateway Handshake
    setTimeout(() => {
      setProcessingStep(2);
    }, 800);

    // Step 2: 3D Secure / UPI Authorization
    setTimeout(() => {
      setProcessingStep(3);
    }, 1700);

    // Step 3: Finalize Order & Ledger Entry
    setTimeout(() => {
      // Build custom transaction metadata based on user's active payment selection
      const customMeta: Partial<TransactionDetails> = {
        paymentMethod: form.paymentMethod,
        ...(form.paymentMethod === 'upi' && {
          upiId: selectedUpiApp === 'qr' ? 'scan.qr@mithaas' : upiIdInput,
        }),
        ...(form.paymentMethod === 'card' && {
          cardLast4: '8829',
          cardBrand: 'Visa Signature Platinum',
        }),
        ...(form.paymentMethod === 'netbanking' && {
          bankName: selectedBank,
        }),
        ...(form.paymentMethod === 'wallet' && {
          walletName: selectedWallet,
        }),
      };

      placeOrder(form, customMeta);
      setIsProcessing(false);
      setProcessingStep(0);
      setIsCheckoutOpen(false);
    }, 2500);
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div
      id="checkout-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={() => !isProcessing && setIsCheckoutOpen(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FFFDFB] rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#EADBCE] relative text-[#2C221E] scrollbar-thin"
      >
        {/* Processing Screen Overlay with Rich Coffee Brewing Animations */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-[#2C1D18]/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center text-[#FAF6F0]"
            >
              {/* Coffee Cup / Steam Animation */}
              <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-[#8C593B]/30 border-t-[#E5B895] animate-spin" />
                <div className="w-16 h-16 rounded-full bg-[#412B24] border border-[#8C593B] flex items-center justify-center shadow-lg relative">
                  <Coffee className="w-8 h-8 text-[#E5B895] animate-pulse" />
                  {/* Rising steam inside processing spinner */}
                  <div className="absolute -top-3 left-6 w-2 h-4 bg-[#FAF6F0]/60 rounded-full blur-[1px] animate-steam-1" />
                  <div className="absolute -top-4 left-8 w-2 h-5 bg-[#FAF6F0]/40 rounded-full blur-[1px] animate-steam-2" />
                </div>
              </div>

              <h3 className="font-serif text-2xl font-semibold text-[#FAF6F0] mb-2">
                Brewing Your Transaction...
              </h3>
              <p className="text-xs text-[#D4A373] tracking-widest uppercase mb-6 font-semibold">
                Mithaas & Co. High-Speed 256-Bit Gateway
              </p>

              {/* Step indicator */}
              <div className="w-full max-w-md space-y-3 text-left bg-[#412B24]/80 p-4 rounded-2xl border border-[#8C593B]/40">
                <div className="flex items-center gap-3 text-xs">
                  {processingStep >= 1 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-[#D4A373]/50 animate-spin shrink-0" />
                  )}
                  <span className={processingStep >= 1 ? 'text-[#FAF6F0]' : 'text-[#9E877C]'}>
                    Securing encrypted connection with banking network
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  {processingStep >= 2 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-[#D4A373]/50 animate-spin shrink-0" />
                  )}
                  <span className={processingStep >= 2 ? 'text-[#FAF6F0]' : 'text-[#9E877C]'}>
                    Authorizing payment of ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  {processingStep >= 3 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-[#D4A373]/50 animate-spin shrink-0" />
                  )}
                  <span className={processingStep >= 3 ? 'text-[#FAF6F0]' : 'text-[#9E877C]'}>
                    Generating tax invoice & transmitting to kitchen
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-[#E5B895]/80">
                <Lock className="w-3.5 h-3.5" />
                <span>Do not refresh or close this window</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal Top Header */}
        <div className="sticky top-0 z-20 bg-[#FAF7F2] p-5 sm:p-6 border-b border-[#EADBCE] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C593B] block">
              Mithaas & Co. Express Gateway
            </span>
            <h2 className="font-serif text-2xl font-semibold text-[#2C221E]">
              Complete Your Sweet Order
            </h2>
          </div>

          <button
            id="btn-close-checkout"
            onClick={() => setIsCheckoutOpen(false)}
            className="w-9 h-9 rounded-full bg-white text-[#412B24] hover:bg-[#F5EBE1] flex items-center justify-center shadow-sm transition-all"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 7 cols: Customer & Delivery Details */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Personal Information */}
              <div className="space-y-3.5">
                <h3 className="font-serif text-base font-semibold text-[#2C221E] flex items-center gap-2 border-b border-[#EADBCE] pb-2">
                  <User className="w-4 h-4 text-[#8C593B]" />
                  <span>1. Contact Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#4A3B32] block mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Priya Sharma"
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E0CFBF] text-[#2C221E] focus:outline-none focus:ring-1 focus:ring-[#8C593B]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#4A3B32] block mb-1">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98200 00000"
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E0CFBF] text-[#2C221E] focus:outline-none focus:ring-1 focus:ring-[#8C593B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#4A3B32] block mb-1">
                    Email Address (for instant transaction receipt & updates) *
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E0CFBF] text-[#2C221E] focus:outline-none focus:ring-1 focus:ring-[#8C593B]"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-3.5">
                <h3 className="font-serif text-base font-semibold text-[#2C221E] flex items-center gap-2 border-b border-[#EADBCE] pb-2">
                  <MapPin className="w-4 h-4 text-[#8C593B]" />
                  <span>2. Delivery Destination</span>
                </h3>

                <div>
                  <label className="text-xs font-semibold text-[#4A3B32] block mb-1">
                    Street Address, Flat / Building Name *
                  </label>
                  <input
                    required
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="e.g. 402, Lotus Bay, Linking Road"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E0CFBF] text-[#2C221E] focus:outline-none focus:ring-1 focus:ring-[#8C593B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#4A3B32] block mb-1">
                      City *
                    </label>
                    <input
                      required
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E0CFBF] text-[#2C221E] focus:outline-none focus:ring-1 focus:ring-[#8C593B]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#4A3B32] block mb-1">
                      Postal Code / PIN *
                    </label>
                    <input
                      required
                      type="text"
                      name="postalCode"
                      value={form.postalCode}
                      onChange={handleChange}
                      placeholder="e.g. 400050"
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E0CFBF] text-[#2C221E] focus:outline-none focus:ring-1 focus:ring-[#8C593B]"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Timing & Slot */}
              <div className="space-y-3.5">
                <h3 className="font-serif text-base font-semibold text-[#2C221E] flex items-center gap-2 border-b border-[#EADBCE] pb-2">
                  <Clock className="w-4 h-4 text-[#8C593B]" />
                  <span>3. Scheduled Handover Slot</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#4A3B32] block mb-1">
                      Delivery Date *
                    </label>
                    <input
                      required
                      type="date"
                      name="deliveryDate"
                      min={todayStr}
                      value={form.deliveryDate}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E0CFBF] text-[#2C221E] focus:outline-none focus:ring-1 focus:ring-[#8C593B]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#4A3B32] block mb-1">
                      Preferred Time Window *
                    </label>
                    <select
                      name="deliveryTimeSlot"
                      value={form.deliveryTimeSlot}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E0CFBF] text-[#2C221E] focus:outline-none focus:ring-1 focus:ring-[#8C593B]"
                    >
                      <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                      <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
                      <option value="Evening (5:00 PM - 8:30 PM)">Evening (5:00 PM - 8:30 PM)</option>
                      <option value="Midnight Surprise (11:30 PM - 12:15 AM)">
                        Midnight Countdown (11:30 PM - 12:15 AM)
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#4A3B32] block mb-1">
                    Special Kitchen / Delivery Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    name="orderNotes"
                    value={form.orderNotes}
                    onChange={handleChange}
                    placeholder="e.g. Please ring doorbell twice, keep cold bag upright..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E0CFBF] text-[#2C221E] focus:outline-none focus:ring-1 focus:ring-[#8C593B]"
                  />
                </div>
              </div>

              {/* 4. EXPANDED PAYMENT METHODS & TRANSACTION OPTIONS */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between border-b border-[#EADBCE] pb-2">
                  <h3 className="font-serif text-base font-semibold text-[#2C221E] flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#8C593B]" />
                    <span>4. Select Payment Method</span>
                  </h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>256-Bit Encrypted</span>
                  </div>
                </div>

                {/* Primary Payment Selector Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { id: 'upi', label: 'UPI / QR Code', icon: QrCode, badge: 'Instant' },
                    { id: 'card', label: 'Credit / Debit', icon: CreditCard, badge: 'Visa/MC' },
                    { id: 'netbanking', label: 'Net Banking', icon: Building2, badge: 'All Banks' },
                    { id: 'wallet', label: 'Wallets', icon: Wallet, badge: '1-Click' },
                    { id: 'cod', label: 'Pay on Delivery', icon: Truck, badge: 'Cash' },
                  ].map((p) => {
                    const Icon = p.icon;
                    const isSel = form.paymentMethod === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, paymentMethod: p.id as PaymentMethodType }))}
                        className={`p-2.5 rounded-xl border text-center transition-all relative ${
                          isSel
                            ? 'border-[#412B24] bg-[#412B24] text-[#FAF7F2] shadow-md ring-1 ring-[#8C593B]'
                            : 'border-[#EADBCE] bg-[#FAF7F2] text-[#4A3B32] hover:bg-[#F3E7DE]'
                        }`}
                      >
                        <Icon className="w-4 h-4 mx-auto mb-1 opacity-90" />
                        <span className="text-[11px] font-bold block leading-tight">{p.label}</span>
                        <span
                          className={`text-[8px] uppercase tracking-wider block mt-0.5 ${
                            isSel ? 'text-[#E5B895]' : 'text-[#8C593B]'
                          }`}
                        >
                          {p.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Sub-Panel: UPI & QR */}
                {form.paymentMethod === 'upi' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E0CFBF] space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {/* Dynamic Simulated QR */}
                      <div className="bg-white p-3 rounded-xl border border-[#E0CFBF] shadow-sm flex flex-col items-center shrink-0">
                        <div className="w-28 h-28 bg-[#2C1D18] p-1.5 rounded-lg flex items-center justify-center relative overflow-hidden">
                          {/* QR Matrix Graphics */}
                          <div className="w-full h-full bg-[#FFFDFB] p-1 flex flex-col justify-between">
                            <div className="flex justify-between">
                              <div className="w-5 h-5 bg-[#2C1D18] rounded-sm p-1">
                                <div className="w-full h-full bg-white" />
                              </div>
                              <div className="w-5 h-5 bg-[#2C1D18] rounded-sm p-1">
                                <div className="w-full h-full bg-white" />
                              </div>
                            </div>
                            <div className="flex justify-center items-center">
                              <span className="text-[8px] font-mono font-bold text-[#2C1D18]">MITHAAS</span>
                            </div>
                            <div className="flex justify-between">
                              <div className="w-5 h-5 bg-[#2C1D18] rounded-sm p-1">
                                <div className="w-full h-full bg-white" />
                              </div>
                              <div className="w-3 h-3 bg-[#8C593B] rounded-full animate-ping" />
                            </div>
                          </div>
                        </div>
                        <span className="text-[9px] text-[#8C593B] font-semibold mt-1.5 flex items-center gap-1">
                          <Zap className="w-3 h-3 text-amber-600" />
                          Scan with Any UPI App
                        </span>
                      </div>

                      {/* UPI App Quick Toggles & UPI ID */}
                      <div className="flex-1 space-y-2.5 w-full">
                        <span className="text-xs font-semibold text-[#2C221E] block">
                          Or Pay via Virtual Payment Address (VPA):
                        </span>
                        
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={upiIdInput}
                            onChange={(e) => setUpiIdInput(e.target.value)}
                            placeholder="username@upi"
                            className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-white border border-[#E0CFBF] text-[#2C221E] focus:outline-none focus:ring-1 focus:ring-[#8C593B]"
                          />
                          <button
                            type="button"
                            onClick={handleCopyUpi}
                            className="px-2.5 py-1.5 text-xs bg-[#412B24] hover:bg-[#5A382A] text-[#FAF7F2] rounded-lg transition-colors flex items-center gap-1"
                          >
                            {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>

                        {/* Supported apps */}
                        <div className="flex items-center gap-2 pt-1">
                          {['Google Pay', 'PhonePe', 'Paytm', 'BHIM', 'Cred'].map((app) => (
                            <span
                              key={app}
                              className="px-2 py-0.5 bg-white rounded border border-[#E5D9CE] text-[10px] font-medium text-[#5C483F]"
                            >
                              {app}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Sub-Panel: Credit / Debit Card */}
                {form.paymentMethod === 'card' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E0CFBF] space-y-4"
                  >
                    {/* Animated Card Preview */}
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-[#2C1D18] via-[#4A3026] to-[#2C1D18] text-[#FAF6F0] shadow-lg border border-[#8C593B]/40 max-w-sm mx-auto">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] tracking-widest uppercase font-semibold text-[#E5B895]">
                          Mithaas Confectionery Card
                        </span>
                        <span className="font-serif italic font-bold text-sm text-[#E5B895]">VISA</span>
                      </div>
                      <div className="w-8 h-6 bg-gradient-to-r from-amber-300 to-yellow-500 rounded-sm mb-3 opacity-90" />
                      <div className="font-mono text-sm tracking-widest text-[#FAF6F0] mb-3">
                        {cardDetails.cardNumber}
                      </div>
                      <div className="flex justify-between items-end text-[10px]">
                        <div>
                          <span className="text-[#9E877C] block uppercase">Cardholder</span>
                          <span className="font-semibold text-xs text-[#FAF6F0] uppercase">
                            {form.fullName || cardDetails.cardHolder}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#9E877C] block uppercase">Expires</span>
                          <span className="font-semibold text-xs text-[#FAF6F0]">
                            {cardDetails.expiry}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-[#4A3B32] mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={cardDetails.cardNumber}
                          onChange={(e) => setCardDetails((prev) => ({ ...prev, cardNumber: e.target.value }))}
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E0CFBF] text-[#2C221E] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#4A3B32] mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails((prev) => ({ ...prev, expiry: e.target.value }))}
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E0CFBF] text-[#2C221E] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#4A3B32] mb-1">
                          CVV / Security Code
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails((prev) => ({ ...prev, cvv: e.target.value }))}
                          placeholder="•••"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E0CFBF] text-[#2C221E] focus:outline-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Sub-Panel: Net Banking */}
                {form.paymentMethod === 'netbanking' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E0CFBF] space-y-3"
                  >
                    <span className="text-xs font-semibold text-[#2C221E] block">
                      Choose Your Preferred Bank:
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National'].map(
                        (bank) => (
                          <button
                            key={bank}
                            type="button"
                            onClick={() => setSelectedBank(bank)}
                            className={`p-2 rounded-xl text-xs font-semibold border text-center transition-all ${
                              selectedBank === bank
                                ? 'border-[#8C593B] bg-[#412B24] text-[#FAF7F2]'
                                : 'border-[#E5D9CE] bg-white text-[#4A3B32] hover:bg-[#F5EBE1]'
                            }`}
                          >
                            {bank}
                          </button>
                        )
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Sub-Panel: Wallets */}
                {form.paymentMethod === 'wallet' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E0CFBF] space-y-3"
                  >
                    <span className="text-xs font-semibold text-[#2C221E] block">
                      Select Digital Wallet:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['Amazon Pay', 'Paytm Wallet', 'PhonePe Wallet', 'MobiKwik'].map((wallet) => (
                        <button
                          key={wallet}
                          type="button"
                          onClick={() => setSelectedWallet(wallet)}
                          className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition-all ${
                            selectedWallet === wallet
                              ? 'border-[#8C593B] bg-[#412B24] text-[#FAF7F2]'
                              : 'border-[#E5D9CE] bg-white text-[#4A3B32] hover:bg-[#F5EBE1]'
                          }`}
                        >
                          {wallet}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Sub-Panel: Cash on Hand */}
                {form.paymentMethod === 'cod' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E0CFBF] flex items-start gap-3"
                  >
                    <Info className="w-4 h-4 text-[#8C593B] shrink-0 mt-0.5" />
                    <div className="text-xs text-[#5C483F] leading-relaxed">
                      <strong className="text-[#2C221E]">Pay on Handover:</strong> You can pay in cash or via our delivery partner’s live POS QR scanner at the time of cake handover.
                    </div>
                  </motion.div>
                )}
              </div>

            </div>

            {/* Right 5 cols: Order Summary & Transaction Breakdown */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#EADBCE] space-y-4 sticky top-24">
                <div className="flex items-center justify-between border-b border-[#EADBCE] pb-3">
                  <h3 className="font-serif font-semibold text-sm text-[#2C221E]">
                    Cart Breakdown ({cart.reduce((a, b) => a + b.quantity, 0)} Items)
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setIsCartOpen(true);
                    }}
                    className="text-xs text-[#8C593B] hover:underline font-medium"
                  >
                    Edit Cart
                  </button>
                </div>

                {/* Items Mini List */}
                <div className="space-y-3 max-h-48 overflow-y-auto scrollbar-thin pr-1">
                  {cart.map((item) => (
                    <div key={item.cartId} className="flex items-start justify-between gap-3 text-xs">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#2C221E] truncate">
                          {item.quantity}x {item.product.name}
                        </p>
                        <p className="text-[10px] text-[#7A6459]">
                          Size: {item.selectedSize.weight}
                        </p>
                        {item.customMessage && (
                          <p className="text-[10px] text-[#8C593B] italic truncate">
                            &quot;{item.customMessage}&quot;
                          </p>
                        )}
                      </div>
                      <span className="font-mono font-semibold text-[#412B24]">
                        ₹{(item.selectedSize.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Ledger Calculation */}
                <div className="border-t border-[#EADBCE] pt-3 space-y-2 text-xs">
                  <div className="flex justify-between text-[#5C483F]">
                    <span>Bakery Subtotal</span>
                    <span className="font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Sweet Coupon Discount</span>
                      <span className="font-mono">-₹{discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#5C483F]">
                    <span>Temperature-Controlled Delivery</span>
                    <span className="font-mono">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-700 font-semibold">FREE</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-[#7A6459] text-[11px]">
                    <span>GST (5% Confectionery Tax)</span>
                    <span className="font-mono">Included in Total</span>
                  </div>

                  <div className="border-t border-[#EADBCE] pt-3 flex justify-between items-baseline">
                    <div>
                      <span className="font-serif text-sm font-semibold text-[#2C221E] block">
                        Net Payable
                      </span>
                      <span className="text-[10px] text-[#7A6459]">Instant Tokenized Invoice</span>
                    </div>
                    <span className="font-serif text-2xl font-bold text-[#412B24]">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Submit / Pay Button with Animation */}
                <button
                  type="submit"
                  disabled={cart.length === 0 || isProcessing}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#412B24] text-[#FAF7F2] font-semibold text-sm hover:bg-[#5C3D32] shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
                >
                  <Lock className="w-4 h-4 text-[#E5B895]" />
                  <span>
                    Pay ₹{total.toLocaleString('en-IN')} & Confirm
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <div className="text-[10px] text-center text-[#7A6459] flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Instant SMS & Email Transaction Slip will be generated</span>
                </div>
              </div>
            </div>

          </div>
        </form>
      </motion.div>
    </div>
  );
};
