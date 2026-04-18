'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { formatINR } from '@/lib/utils';
import { FREE_SHIPPING_THRESHOLD_PAISE } from '@/lib/types';

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotalPaise());
  const shipping = useCartStore((s) => s.shippingPaise());
  const total = useCartStore((s) => s.totalPaise());
  const itemCount = useCartStore((s) => s.itemCount());

  const freeShippingGap = FREE_SHIPPING_THRESHOLD_PAISE - subtotal;

  if (items.length === 0) {
    return (
      <section className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-6xl mb-6 block">🛒</span>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-slate-800 mb-3">Your cart is empty</h1>
          <p className="text-sm text-slate-500 mb-6">Add some hydration to get started!</p>
          <Link href="/products"
            className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-blue-500 to-cyan-400 hover:shadow-lg transition-shadow">
            Browse Products →
          </Link>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen px-4 pt-10 pb-24 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-2xl sm:text-3xl font-black text-slate-800">
            Your Cart <span className="text-lg font-medium text-slate-400">({itemCount} item{itemCount !== 1 ? 's' : ''})</span>
          </h1>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Cart items */}
          <div className="space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.productId}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  className="flex gap-4 rounded-2xl border border-white/50 bg-white/60 backdrop-blur-sm p-4 shadow-sm"
                >
                  {/* Image */}
                  <Link href={`/products/${item.slug}`}
                    className="relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex items-center justify-center"
                    style={{ background: `${item.color}10` }}>
                    <img src={item.imageUrl} alt={item.name} className="h-16 sm:h-20 w-auto object-contain" />
                  </Link>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-center gap-2">
                        <span>{item.emoji}</span>
                        <Link href={`/products/${item.slug}`} className="font-display text-sm sm:text-base font-bold text-slate-800 hover:text-blue-600 transition-colors truncate">
                          {item.name}
                        </Link>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{formatINR(item.price)} each</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity */}
                      <div className="flex items-center rounded-full border border-slate-200 bg-white/80">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-blue-600 transition-colors font-bold"
                        >−</button>
                        <span className="w-8 text-center text-sm font-bold text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-blue-600 transition-colors font-bold"
                        >+</button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-800">{formatINR(item.price * item.quantity)}</span>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-slate-300 hover:text-red-400 transition-colors"
                          aria-label={`Remove ${item.name}`}
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:sticky lg:top-28 h-fit rounded-2xl border border-white/50 bg-white/70 backdrop-blur-sm p-5 shadow-sm"
          >
            <h2 className="font-display text-lg font-bold text-slate-800 mb-4">Order Summary</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-medium">{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="font-medium">{shipping === 0 ? <span className="text-green-600">Free</span> : formatINR(shipping)}</span>
              </div>
              <div className="h-px bg-slate-200 my-2" />
              <div className="flex justify-between text-slate-800 font-bold text-base">
                <span>Total</span>
                <span>{formatINR(total)}</span>
              </div>
            </div>

            {/* Free shipping progress */}
            {freeShippingGap > 0 && (
              <div className="mt-4 rounded-xl bg-blue-50/60 p-3 text-xs text-blue-700">
                <p className="font-medium mb-1.5">
                  Add {formatINR(freeShippingGap)} more for free shipping!
                </p>
                <div className="h-1.5 rounded-full bg-blue-100 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD_PAISE) * 100)}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            )}

            <Link href="/checkout"
              className="mt-5 flex items-center justify-center gap-2 w-full rounded-full py-3 text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-blue-500 to-cyan-400 hover:shadow-lg hover:shadow-blue-200 transition-all">
              Proceed to Checkout →
            </Link>

            <Link href="/products"
              className="mt-3 flex items-center justify-center text-xs text-slate-500 hover:text-blue-500 transition-colors">
              ← Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
