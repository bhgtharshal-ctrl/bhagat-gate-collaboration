import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import {
  X,
  Package,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ChefHat,
  Truck,
  CheckCircle2,
  Search,
} from 'lucide-react';
import { motion } from 'motion/react';

export const OrderTrackingModal: React.FC = () => {
  const { isOrderTrackingOpen, setIsOrderTrackingOpen, orderHistory, setLastPlacedOrder } = useCart();
  const [searchOrderNo, setSearchOrderNo] = useState('');

  if (!isOrderTrackingOpen) return null;

  const filteredOrders = searchOrderNo.trim()
    ? orderHistory.filter((o) =>
        o.orderNumber.toLowerCase().includes(searchOrderNo.toLowerCase()) ||
        o.customer.phone.includes(searchOrderNo)
      )
    : orderHistory;

  return (
    <div
      id="order-tracking-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={() => setIsOrderTrackingOpen(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FFFDFB] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#EADBCE] p-6 sm:p-8 text-[#2C221E] relative scrollbar-thin space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EADBCE] pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6558] block">
              Live Order Tracker
            </span>
            <h2 className="font-serif text-2xl font-semibold text-[#2C221E]">
              Track Your Bakery Order
            </h2>
          </div>

          <button
            onClick={() => setIsOrderTrackingOpen(false)}
            className="w-9 h-9 rounded-full bg-[#FAF7F2] text-[#412B24] hover:bg-[#EADBCE] flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#8C593B] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchOrderNo}
            onChange={(e) => setSearchOrderNo(e.target.value)}
            placeholder="Search by Order ID (e.g. MC-...) or phone number..."
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-[#FAF7F2] border border-[#E0CFBF] text-[#2C221E] focus:outline-none focus:ring-1 focus:ring-[#8C593B]"
          />
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((ord) => (
              <div
                key={ord.orderNumber}
                className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EADBCE] space-y-3.5 shadow-xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-[#412B24]">
                        {ord.orderNumber}
                      </span>
                      {ord.transaction?.transactionId && (
                        <span className="text-[9px] font-mono bg-white px-2 py-0.5 rounded border border-[#E5D9CE] text-[#7A6459]">
                          {ord.transaction.transactionId}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#7A6459] block mt-0.5">
                      Placed on {new Date(ord.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })} • {ord.customer.paymentMethod.toUpperCase()}
                    </span>
                  </div>

                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {ord.status.toUpperCase()}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="bg-[#FFFDFB] p-3 rounded-xl border border-[#EADBCE] space-y-2">
                  <div className="flex justify-between text-[11px] font-semibold text-[#5C483F]">
                    <span>Kitchen Baking & Brewing Status</span>
                    <span className="text-[#8C593B]">Handover: {ord.customer.deliveryDate}</span>
                  </div>
                  <div className="w-full bg-[#EADBCE] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#8C593B] h-full rounded-full w-2/5 animate-pulse" />
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-1 text-xs text-[#5C483F]">
                  {ord.items.map((it, i) => (
                    <div key={i} className="flex justify-between">
                      <span>
                        {it.quantity}x {it.product.name} ({it.selectedSize.weight})
                      </span>
                      <span className="font-semibold text-[#2C221E]">
                        ₹{(it.selectedSize.price * it.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Transaction details mini row */}
                {ord.transaction && (
                  <div className="text-[10px] bg-white/70 p-2 rounded-lg border border-[#EADBCE] flex items-center justify-between text-[#7A6459]">
                    <span>UTR: <strong className="font-mono text-[#412B24]">{ord.transaction.utrNumber}</strong></span>
                    <span>Gateway: <strong>{ord.transaction.paymentGateway.split('(')[0]}</strong></span>
                  </div>
                )}

                <div className="pt-2 border-t border-[#EADBCE] flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-[#412B24]">
                    Total: ₹{ord.total.toLocaleString('en-IN')}
                  </span>
                  <button
                    onClick={() => {
                      setIsOrderTrackingOpen(false);
                      setLastPlacedOrder(ord);
                    }}
                    className="text-xs font-semibold text-[#8C593B] hover:text-[#412B24] underline underline-offset-2 flex items-center gap-1"
                  >
                    View Tax Invoice & Receipt
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 bg-[#FAF7F2] rounded-2xl border border-dashed border-[#D9C4B6] space-y-3">
              <Package className="w-10 h-10 text-[#8C6558] mx-auto opacity-70" />
              <p className="text-xs text-[#7A6459]">No orders found yet. Ready to place your first sweet order?</p>
              <button
                onClick={() => setIsOrderTrackingOpen(false)}
                className="px-5 py-2 rounded-full bg-[#412B24] text-[#FAF7F2] text-xs font-semibold"
              >
                Browse Menu
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
