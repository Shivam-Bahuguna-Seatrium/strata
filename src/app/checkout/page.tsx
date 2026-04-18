'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart';
import { formatINR } from '@/lib/utils';
import { publicEnv } from '@/lib/env';
import { useToastStore } from '@/components/Toast';
import type { Address } from '@/lib/types';
import Link from 'next/link';

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void; on: (event: string, cb: () => void) => void };
  }
}

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Chandigarh', 'Jammu and Kashmir', 'Ladakh',
];

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotalPaise());
  const shipping = useCartStore((s) => s.shippingPaise());
  const total = useCartStore((s) => s.totalPaise());
  const clearCart = useCartStore((s) => s.clearCart);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const addToast = useToastStore((s) => s.addToast);

  // Promo code state
  const [promoCode, setPromoCode] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoDescription, setPromoDescription] = useState('');
  const [promoApplied, setPromoApplied] = useState('');

  const discountedTotal = total - promoDiscount;

  const applyPromo = async () => {
    if (!promoCode.trim()) return;
    setPromoLoading(true);
    try {
      const res = await fetch('/api/promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoCode, subtotalPaise: subtotal }),
      });
      const data = await res.json();
      if (res.ok) {
        setPromoDiscount(data.data.discountPaise);
        setPromoDescription(data.data.description);
        setPromoApplied(data.data.code);
        addToast(`Promo "${data.data.code}" applied — ${data.data.description}`, 'success');
      } else {
        addToast(data.error || 'Invalid code', 'error');
        setPromoDiscount(0);
        setPromoApplied('');
      }
    } catch {
      addToast('Could not validate promo code', 'error');
    }
    setPromoLoading(false);
  };

  const removePromo = () => {
    setPromoCode('');
    setPromoDiscount(0);
    setPromoDescription('');
    setPromoApplied('');
    addToast('Promo code removed', 'info');
  };

  const [form, setForm] = useState<Address & { email: string }>({
    fullName: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'IN',
    email: '',
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const loadRazorpayScript = useCallback((): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) { resolve(true); return; }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  const handleCheckout = async () => {
    setError('');

    // Basic client validation
    if (!form.fullName || !form.phone || !form.email || !form.line1 || !form.city || !form.state || !form.pincode) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    if (!/^\d{6}$/.test(form.pincode)) {
      setError('Please enter a valid 6-digit pincode.');
      return;
    }
    if (items.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    setLoading(true);

    try {
      // 1. Create order via API
      const checkoutRes = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
          shippingAddress: {
            fullName: form.fullName,
            phone: form.phone,
            line1: form.line1,
            line2: form.line2,
            city: form.city,
            state: form.state,
            pincode: form.pincode,
            country: form.country,
          },
          email: form.email,
        }),
      });

      const checkoutData = await checkoutRes.json();
      if (!checkoutRes.ok) {
        setError(checkoutData.error || 'Checkout failed');
        setLoading(false);
        return;
      }

      const { orderId, razorpayOrderId, totalPaise } = checkoutData.data;

      // 2. Load Razorpay
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setError('Failed to load payment provider. Please try again.');
        setLoading(false);
        return;
      }

      // 3. Open Razorpay checkout
      const razorpay = new window.Razorpay({
        key: publicEnv.razorpayKeyId,
        amount: totalPaise,
        currency: 'INR',
        name: 'STRATA Hydration',
        description: 'Electrolyte Drink Mix',
        order_id: razorpayOrderId,
        prefill: {
          name: form.fullName,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: '#0077FF',
        },
        handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          // 4. Verify payment
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok) {
              clearCart();
              router.push(`/order/${verifyData.data.orderId}`);
            } else {
              setError(verifyData.error || 'Payment verification failed');
            }
          } catch {
            setError('Payment verification failed. Contact support with your order ID.');
          }
          setLoading(false);
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      });

      razorpay.on('payment.failed', () => {
        setError('Payment failed. Please try again or use a different method.');
        setLoading(false);
      });

      razorpay.open();
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <section className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <span className="text-5xl mb-4">🛒</span>
        <h1 className="font-display text-xl font-bold text-slate-800 mb-2">Nothing to checkout</h1>
        <Link href="/products" className="text-sm text-blue-500 hover:underline">Browse products →</Link>
      </section>
    );
  }

  return (
    <section className="min-h-screen px-4 pt-10 pb-24 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
      <div className="mx-auto max-w-6xl">
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="font-display text-2xl sm:text-3xl font-black text-slate-800 mb-8">
          Checkout
        </motion.h1>

        <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1fr_400px]">
          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="space-y-6">

            {/* Contact */}
            <div className="rounded-2xl border border-white/50 bg-white/60 backdrop-blur-sm p-5">
              <h2 className="font-display text-base font-bold text-slate-800 mb-4">Contact</h2>
              <input
                type="email"
                placeholder="Email address *"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            {/* Shipping */}
            <div className="rounded-2xl border border-white/50 bg-white/60 backdrop-blur-sm p-5">
              <h2 className="font-display text-base font-bold text-slate-800 mb-4">Shipping Address</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  placeholder="Full name *"
                  value={form.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  className="sm:col-span-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <input
                  placeholder="Mobile number *"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <input
                  placeholder="Pincode *"
                  value={form.pincode}
                  onChange={(e) => updateField('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <input
                  placeholder="Address line 1 *"
                  value={form.line1}
                  onChange={(e) => updateField('line1', e.target.value)}
                  className="sm:col-span-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <input
                  placeholder="Address line 2"
                  value={form.line2}
                  onChange={(e) => updateField('line2', e.target.value)}
                  className="sm:col-span-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <input
                  placeholder="City *"
                  value={form.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <select
                  value={form.state}
                  onChange={(e) => updateField('state', e.target.value)}
                  className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                >
                  <option value="">Select state *</option>
                  {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:sticky lg:top-28 h-fit rounded-2xl border border-white/50 bg-white/70 backdrop-blur-sm p-5 shadow-sm"
          >
            <h2 className="font-display text-base font-bold text-slate-800 mb-4">Order Summary</h2>

            {/* Items */}
            <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
              {items.map((item) => (
                <div key={item.productId} className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg" style={{ background: `${item.color}15` }}>
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 truncate">{item.name}</p>
                    <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-medium text-slate-800">{formatINR(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="h-px bg-slate-200 mb-3" />

            {/* Promo code */}
            <div className="mb-4">
              {promoApplied ? (
                <div className="flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2.5">
                  <div>
                    <p className="text-xs font-bold text-emerald-700">✓ {promoApplied}</p>
                    <p className="text-[10px] text-emerald-600">{promoDescription}</p>
                  </div>
                  <button onClick={removePromo} className="text-xs text-emerald-500 hover:text-red-500 font-bold">Remove</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === 'Enter' && applyPromo()}
                    className="flex-1 rounded-xl border border-slate-200 bg-white/80 px-3 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all uppercase font-mono tracking-wider"
                  />
                  <button
                    onClick={applyPromo}
                    disabled={promoLoading || !promoCode.trim()}
                    className="rounded-xl bg-slate-800 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-700 transition-colors disabled:opacity-50"
                  >
                    {promoLoading ? '...' : 'Apply'}
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount ({promoApplied})</span>
                  <span>-{formatINR(promoDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-green-600 font-medium">Free</span> : formatINR(shipping)}</span>
              </div>
              <div className="h-px bg-slate-200 my-1" />
              <div className="flex justify-between font-bold text-slate-800 text-base">
                <span>Total</span>
                <span>{formatINR(discountedTotal)}</span>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-600"
              >
                {error}
              </motion.div>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="mt-5 w-full flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-blue-500 to-cyan-400 hover:shadow-lg hover:shadow-blue-200 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="32" /></svg>
                  Processing...
                </span>
              ) : (
                `Pay ${formatINR(discountedTotal)}`
              )}
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-400">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
              Secured by Razorpay · 256-bit SSL
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
