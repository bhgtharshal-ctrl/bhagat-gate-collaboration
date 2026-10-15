import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, Circle, Sparkles, ArrowRight, Heart, Gift, Truck } from 'lucide-react';

const CHECKLIST_STEPS = [
  {
    title: 'Choose your favorite treat',
    description: 'Browse our artisanal catalog of cakes, cupcakes, pastries, and macarons.',
    icon: '🍰',
    actionText: 'Browse Menu',
    actionTarget: 'shop',
  },
  {
    title: 'Select quantity and size',
    description: 'Pick standard 0.5 kg, 1 kg, celebration sizes, or curated box packs.',
    icon: '⚖️',
    actionText: 'View Sizes',
    actionTarget: 'shop',
  },
  {
    title: 'Add a personalized message',
    description: 'Complimentary hand-piped edible gold or chocolate plaque lettering.',
    icon: '✍️',
    actionText: 'Customize',
    actionTarget: 'shop',
  },
  {
    title: 'Choose your delivery date',
    description: 'Select next-day express, future celebration date, or midnight countdown.',
    icon: '📅',
    actionText: 'Select Slot',
    actionTarget: 'shop',
  },
  {
    title: 'Confirm your order',
    description: 'Seamless instant prototype checkout with transparent ₹ pricing and zero fees.',
    icon: '✨',
    actionText: 'Open Cart',
    actionTarget: 'cart',
  },
  {
    title: 'Sit back while we bake',
    description: 'Our master pastry chefs handcraft your batch fresh on the morning of delivery.',
    icon: '👩‍🍳',
    actionText: 'Track Status',
    actionTarget: 'track',
  },
  {
    title: 'Receive your freshly baked goodies',
    description: 'Arrives in our temperature-controlled luxury insulated presentation box.',
    icon: '🎁',
    actionText: 'Unbox Joy',
    actionTarget: 'shop',
  },
];

interface OrderChecklistProps {
  onNavigate: (sectionId: string) => void;
}

export const OrderChecklist: React.FC<OrderChecklistProps> = ({ onNavigate }) => {
  const { completedChecklistSteps, toggleChecklistStep, setIsCartOpen, setIsOrderTrackingOpen } = useCart();

  const handleStepAction = (target: string) => {
    if (target === 'cart') {
      setIsCartOpen(true);
    } else if (target === 'track') {
      setIsOrderTrackingOpen(true);
    } else {
      onNavigate(target);
    }
  };

  const completedCount = completedChecklistSteps.length;
  const progressPercent = Math.round((completedCount / CHECKLIST_STEPS.length) * 100);

  return (
    <section id="checklist" className="py-16 sm:py-20 bg-transparent border-b border-[var(--theme-card-border)] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--theme-accent-soft)] text-[var(--theme-accent)] text-xs font-semibold uppercase tracking-widest mb-3 border border-[var(--theme-card-border)]">
            <Sparkles className="w-3 h-3 text-[var(--theme-accent)]" />
            <span>Interactive Guide</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[var(--theme-text-title)] font-medium tracking-tight">
            Your Order Checklist
          </h2>
          <p className="text-[var(--theme-text-body)] text-sm sm:text-base mt-2">
            Follow your effortless journey from recipe creation to fresh doorstep indulgence.
          </p>

          {/* Progress Bar */}
          <div className="mt-6 max-w-md mx-auto bg-[var(--theme-card-border)] h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-[#E5B895] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-[var(--theme-accent)] font-semibold mt-2">
            {completedCount} of {CHECKLIST_STEPS.length} steps completed ({progressPercent}%)
          </p>
        </div>

        {/* Interactive Checklist Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {CHECKLIST_STEPS.map((step, index) => {
            const isCompleted = completedChecklistSteps.includes(index);

            return (
              <div
                key={index}
                id={`checklist-step-${index}`}
                onClick={() => toggleChecklistStep(index)}
                className={`p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer select-none ${
                  isCompleted
                    ? 'bg-[var(--theme-card)] border-[#E5B895] shadow-md ring-1 ring-[#E5B895]/40'
                    : 'bg-[var(--theme-card)]/60 border-[var(--theme-card-border)] opacity-85 hover:opacity-100 hover:bg-[var(--theme-card)]'
                }`}
              >
                {/* Status Checkbox Icon */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleChecklistStep(index);
                  }}
                  className="mt-0.5 shrink-0 transition-transform active:scale-90"
                  aria-label={`Mark step ${index + 1} as ${isCompleted ? 'incomplete' : 'completed'}`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-[#E5B895] fill-[#2B1810]" />
                  ) : (
                    <Circle className="w-6 h-6 text-[var(--theme-text-muted)]" />
                  )}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{step.icon}</span>
                    <h3
                      className={`text-sm font-semibold transition-colors ${
                        isCompleted ? 'text-[var(--theme-text-title)]' : 'text-[var(--theme-text-body)]'
                      }`}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[var(--theme-text-muted)] mt-1 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[var(--theme-accent)] uppercase tracking-wider">
                      Step 0{index + 1}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStepAction(step.actionTarget);
                      }}
                      className="text-xs font-semibold text-[var(--theme-text-title)] hover:text-[var(--theme-accent)] flex items-center gap-1 group"
                    >
                      <span>{step.actionText}</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
