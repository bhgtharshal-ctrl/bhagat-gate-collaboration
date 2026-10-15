import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import {
  CheckCircle2,
  Package,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  Printer,
  Heart,
  ChefHat,
  Truck,
  PartyPopper,
  CreditCard,
  QrCode,
  Building2,
  Wallet,
  Receipt,
  FileCheck,
  Coffee,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'motion/react';

export const OrderConfirmationModal: React.FC = () => {
  const { lastPlacedOrder, setLastPlacedOrder } = useCart();
  const [showFullInvoice, setShowFullInvoice] = useState(false);

  if (!lastPlacedOrder) return null;

  const order = lastPlacedOrder;
  const txn = order.transaction;

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleContinueShopping = () => {
    setLastPlacedOrder(null);
  };

  const getPaymentMethodLabel = () => {
    switch (txn?.paymentMethod) {
      case 'upi':
        return { label: 'Instant UPI 2.0', sub: txn.upiId || 'scan.qr@mithaas', icon: QrCode };
      case 'card':
        return {
          label: txn.cardBrand || 'Visa Platinum 3D Secure',
          sub: `Ending in ${txn.cardLast4 || '8829'}`,
          icon: CreditCard,
        };
      case 'netbanking':
        return { label: 'Net Banking (IMPS)', sub: txn.bankName || 'HDFC Bank Core Direct', icon: Building2 };
      case 'wallet':
        return { label: 'Digital Wallet', sub: txn.walletName || 'Amazon Pay', icon: Wallet };
      case 'cod':
        return { label: 'Pay on Handover', sub: 'Cash / Handheld POS', icon: Truck };
      default:
        return { label: 'Direct Payment', sub: 'Verified', icon: CreditCard };
    }
  };

  const paymentMeta = getPaymentMethodLabel();
  const PaymentIcon = paymentMeta.icon;

  return (
    <div
      id="order-confirmation-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#FFFDFB] rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#EADBCE] p-6 sm:p-8 text-[#2C221E] relative scrollbar-thin"
      >
        {/* Celebration Header */}
        <div className="text-center space-y-3 pb-6 border-b border-[#EADBCE]">
          <div className="relative inline-block">
            <div className="w-16 h-16 rounded-full bg-[#E5B895]/20 text-[#8C593B] flex items-center justify-center mx-auto shadow-inner border border-[#E5B895]/40">
              <CheckCircle2 className="w-8 h-8 text-[#8C593B] animate-pulse" />
            </div>
            <span className="absolute -bottom-1 -right-1 p-1 bg-[#2C1D18] rounded-full text-[#FAF6F0] shadow-sm">
              <Coffee className="w-3.5 h-3.5 text-[#E5B895]" />
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#EADBCE] text-[#8C593B] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Order Reference: {order.orderNumber}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#2C221E] tracking-tight">
            Your Sweet Order Is Confirmed!
          </h2>

          <p className="text-xs sm:text-sm text-[#5C483F] max-w-md mx-auto leading-relaxed">
            Thank you for choosing <strong className="text-[#2C221E]">Mithaas & Co.</strong>, {order.customer.fullName}. Our pastry chefs and baristas have received your order ticket.
          </p>
        </div>

        {/* Live Order Timeline Tracker */}
        <div className="py-6 border-b border-[#EADBCE] space-y-4 bg-[#FAF7F2] -mx-6 sm:-mx-8 px-6 sm:px-8">
          <div className="flex items-center justify-between text-xs font-semibold text-[#7A6459]">
            <span>Live Kitchen Status</span>
            <span className="text-emerald-800 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping inline-block" />
              In Queue for Fresh Morning Bake & Brew
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-semibold text-[#5C483F]">
            <div className="space-y-1.5">
              <div className="w-7 h-7 rounded-full bg-[#412B24] text-white flex items-center justify-center mx-auto shadow-xs">
                ✓
              </div>
              <p className="text-[#2C221E] font-bold">Placed</p>
            </div>
            <div className="space-y-1.5">
              <div className="w-7 h-7 rounded-full bg-[#E5B895] text-[#2C221E] flex items-center justify-center mx-auto font-bold animate-pulse">
                2
              </div>
              <p className="text-[#8C593B]">In the Oven</p>
            </div>
            <div className="space-y-1.5">
              <div className="w-7 h-7 rounded-full bg-[#EADBCE] text-[#7A6459] flex items-center justify-center mx-auto">
                3
              </div>
              <p className="text-[#7A6459]">Decorating</p>
            </div>
            <div className="space-y-1.5">
              <div className="w-7 h-7 rounded-full bg-[#EADBCE] text-[#7A6459] flex items-center justify-center mx-auto">
                4
              </div>
              <p className="text-[#7A6459]">Out for Delivery</p>
            </div>
          </div>
        </div>

        {/* Transaction Details & Payment Verification Box */}
        <div className="py-6 border-b border-[#EADBCE] space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-serif font-semibold text-sm text-[#2C221E] flex items-center gap-1.5">
              <Receipt className="w-4 h-4 text-[#8C593B]" />
              <span>Verified Payment & Transaction Details</span>
            </h4>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              {txn?.paymentStatus || 'SUCCESS'}
            </span>
          </div>

          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EADBCE] text-xs space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-[#EADBCE]/80">
              <div>
                <span className="text-[10px] text-[#7A6459] uppercase block font-semibold">
                  Transaction ID
                </span>
                <span className="font-mono font-bold text-[#2C221E]">
                  {txn?.transactionId || 'TXN_' + order.orderNumber}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-[#7A6459] uppercase block font-semibold">
                  Bank Reference / UTR
                </span>
                <span className="font-mono text-[#5C483F]">
                  {txn?.utrNumber || 'MITH8849204918'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#412B24] text-[#FAF6F0] flex items-center justify-center shrink-0">
                  <PaymentIcon className="w-4 h-4 text-[#E5B895]" />
                </div>
                <div>
                  <span className="font-semibold text-[#2C221E] block leading-tight">
                    {paymentMeta.label}
                  </span>
                  <span className="text-[10px] text-[#7A6459]">
                    {paymentMeta.sub}
                  </span>
                </div>
              </div>

              <div className="sm:text-right">
                <span className="text-[10px] text-[#7A6459] uppercase block font-semibold">
                  Gateway Protocol
                </span>
                <span className="text-[#5C483F] font-medium text-[11px]">
                  {txn?.paymentGateway || 'Mithaas 256-Bit SSL PG'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery & Items Summary */}
        <div className="py-6 space-y-6">
          {/* Handover Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-[#FAF7F2] p-4 rounded-2xl border border-[#EADBCE]">
            <div className="space-y-1.5">
              <span className="font-bold text-[#7A6459] uppercase tracking-wider block text-[10px]">
                Delivery Details
              </span>
              <p className="font-bold text-[#2C221E]">{order.customer.fullName}</p>
              <p className="text-[#5C483F] leading-tight">
                {order.customer.address}, {order.customer.city} - {order.customer.postalCode}
              </p>
              <p className="text-[#5C483F] font-mono">{order.customer.phone}</p>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-[#7A6459] uppercase tracking-wider block text-[10px]">
                Scheduled Handover
              </span>
              <p className="font-bold text-[#2C221E] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#8C593B]" />
                {order.customer.deliveryDate}
              </p>
              <p className="text-[#5C483F] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#8C593B]" />
                {order.customer.deliveryTimeSlot}
              </p>
              <p className="text-emerald-800 font-medium">Temperature-Controlled Express Courier</p>
            </div>
          </div>

          {/* Ordered Products List */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-sm text-[#2C221E]">
              Ordered Delicacies & Confections
            </h4>

            <div className="space-y-2.5">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl border border-[#EADBCE] bg-[#FFFDFB] text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-[#FAF7F2] shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="font-bold text-[#2C221E]">
                        {item.quantity}x {item.product.name}
                      </p>
                      <p className="text-[10px] text-[#7A6459]">
                        Size: {item.selectedSize.weight}
                      </p>
                      {item.customMessage && (
                        <p className="text-[10px] text-[#8C593B] italic">
                          Plaque: “{item.customMessage}”
                        </p>
                      )}
                    </div>
                  </div>

                  <span className="font-bold text-[#412B24] shrink-0">
                    ₹{(item.selectedSize.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total Amount Paid Breakdown */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E0CFBF] space-y-2 text-xs">
            <div className="flex justify-between text-[#5C483F]">
              <span>Subtotal</span>
              <span className="font-mono">₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Discount Applied</span>
                <span className="font-mono">-₹{order.discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between text-[#5C483F]">
              <span>Delivery Fee</span>
              <span className="font-mono">
                {order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between text-[#7A6459] text-[11px]">
              <span>5% GST (CGST + SGST)</span>
              <span className="font-mono">₹{Math.round(order.total * 0.05).toLocaleString('en-IN')} (Included)</span>
            </div>

            <div className="pt-2 border-t border-[#E0CFBF] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#7A6459] font-medium block">Total Paid Amount</span>
                <span className="font-serif text-2xl font-bold text-[#412B24]">
                  ₹{order.total.toLocaleString('en-IN')}
                </span>
              </div>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Payment Confirmed
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-[#EADBCE] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handlePrintReceipt}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-[#D4C0B3] hover:bg-[#FAF7F2] text-[#412B24] font-semibold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Tax Invoice</span>
          </button>

          <button
            id="btn-confirm-continue-shopping"
            onClick={handleContinueShopping}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#412B24] hover:bg-[#2C221E] text-[#FAF7F2] font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
