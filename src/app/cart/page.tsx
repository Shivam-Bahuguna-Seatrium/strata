'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { formatINR } from '@/lib/utils';
import { FREE_SHIPPING_THRESHOLD_PAISE } from '@/lib/types';

const BUY_LINKS = {
  amazon: 'https://www.amazon.in/',
  zepto: 'https://www.zeptonow.com/',
} as const;

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotalPaise());
  const shipping = useCartStore((s) => s.shippingPaise());
  const total = useCartStore((s) => s.totalPaise());
  const itemCount = useCartStore((s) => s.itemCount());
  const [viewMode, setViewMode] = useState<'explore' | 'cart'>('explore');

  const freeShippingGap = FREE_SHIPPING_THRESHOLD_PAISE - subtotal;

  if (items.length === 0) {
    return (
      <section className="min-h-[74vh] flex items-center justify-center px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/60 bg-[linear-gradient(155deg,#ffffff,#edf7ff)] p-8 sm:p-10 text-center shadow-[0_24px_70px_rgba(0,105,190,0.12)]"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-cyan-300/25 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 -bottom-16 h-52 w-52 rounded-full bg-blue-300/20 blur-3xl" />
          <span className="mb-6 block text-6xl sm:text-7xl">🛒</span>
          <h1 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight text-slate-900 mb-3">
            Your Cart Is Empty
          </h1>
          <p className="mx-auto max-w-lg text-sm sm:text-base text-slate-600 mb-8">
            Pick your flavor first, then use Explore mode to choose a purchase platform.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-[0_12px_28px_rgba(0,138,230,0.32)] hover:scale-[1.02] transition-transform"
          >
            View Products
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 2xl:px-28 pt-12 sm:pt-16 lg:pt-24 pb-24 sm:pb-28 lg:pb-32">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12 sm:mb-16 lg:mb-20 text-center">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Your Cart <span className="text-base sm:text-xl font-semibold text-slate-400">({itemCount} item{itemCount !== 1 ? 's' : ''})</span>
          </h1>
          <div className="mx-auto mt-8 inline-flex w-full max-w-md rounded-full border border-slate-200/80 bg-white/80 p-2 shadow-sm backdrop-blur">
            <button
              type="button"
              onClick={() => setViewMode('explore')}
              className={`flex-1 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                viewMode === 'explore'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Explore
            </button>
            <button
              type="button"
              onClick={() => setViewMode('cart')}
              className={`flex-1 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                viewMode === 'cart'
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Cart
            </button>
          </div>
        </motion.div>

        {viewMode === 'explore' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 grid min-h-[62vh] items-stretch gap-8 sm:gap-10 lg:gap-12 lg:grid-cols-3"
          >
            <motion.a
              href={BUY_LINKS.amazon}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -8, scale: 1.01 }}
              className="group relative isolate overflow-hidden rounded-[1.75rem] border border-amber-200/80 bg-white/60 p-8 sm:p-9 backdrop-blur-xl shadow-[0_16px_44px_rgba(245,158,11,0.18)] min-h-[20rem] sm:min-h-[23rem]"
            >
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,250,240,0.9),rgba(255,243,214,0.85))]" />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -left-20 top-0 hidden h-full w-20 rotate-[18deg] transform-gpu bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)] sm:block"
                animate={{ x: ['-10%', '520%'] }}
                transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 0.8, ease: 'easeInOut' }}
              />
              <div className="relative z-10">
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-400/20 text-4xl font-black text-amber-800">A</div>
                <h3 className="font-display text-2xl font-black uppercase text-slate-900">Amazon</h3>
                <p className="mt-2 text-sm font-semibold text-slate-700">Premium marketplace checkout</p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-800">
                  Open Amazon <span aria-hidden>→</span>
                </div>
              </div>
            </motion.a>

            <motion.a
              href={BUY_LINKS.zepto}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -8, scale: 1.01 }}
              className="group relative isolate overflow-hidden rounded-[1.75rem] border border-violet-200/80 bg-white/60 p-8 sm:p-9 backdrop-blur-xl shadow-[0_16px_44px_rgba(124,58,237,0.18)] min-h-[20rem] sm:min-h-[23rem]"
            >
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(248,245,255,0.9),rgba(237,232,255,0.86))]" />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -left-20 top-0 hidden h-full w-20 rotate-[18deg] transform-gpu bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)] sm:block"
                animate={{ x: ['-10%', '520%'] }}
                transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 0.8, ease: 'easeInOut', delay: 0.35 }}
              />
              <div className="relative z-10">
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-400/20 text-4xl font-black text-violet-800">Z</div>
                <h3 className="font-display text-2xl font-black uppercase text-slate-900">Zepto</h3>
                <p className="mt-2 text-sm font-semibold text-slate-700">Fast quick-commerce checkout</p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-wider text-violet-800">
                  Open Zepto <span aria-hidden>→</span>
                </div>
              </div>
            </motion.a>

            <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/60 p-8 sm:p-9 opacity-75 backdrop-blur-xl shadow-[0_16px_44px_rgba(100,116,139,0.14)] min-h-[20rem] sm:min-h-[23rem]">
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(247,247,248,0.92),rgba(236,239,242,0.9))]" />
              <div className="relative z-10">
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-300/25 text-4xl font-black text-slate-700">S</div>
                <h3 className="font-display text-2xl font-black uppercase text-slate-700">Website</h3>
                <p className="mt-2 text-sm font-semibold text-slate-600">Direct cart checkout service</p>
                <div className="mt-5 inline-flex items-center rounded-full border border-slate-300 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Coming Soon
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 grid gap-8 lg:gap-10 lg:grid-cols-[1fr_380px]"
          >
            <div className="lg:col-span-2 rounded-2xl border border-slate-300 bg-slate-100/80 px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-slate-600">
              Cart Mode Coming Soon - Preview Only
            </div>

            <div className="space-y-4 pointer-events-none opacity-55 grayscale-[0.45] select-none">
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
                    <div
                      className="relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex items-center justify-center"
                      style={{ background: `${item.color}10` }}
                    >
                      <img src={item.imageUrl} alt={item.name} className="h-16 sm:h-20 w-auto object-contain" />
                    </div>

                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-center gap-2">
                          <span>{item.emoji}</span>
                          <p className="font-display text-sm sm:text-base font-bold text-slate-800 truncate">{item.name}</p>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{formatINR(item.price)} each</p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center rounded-full border border-slate-200 bg-slate-100/90 opacity-70">
                          <button disabled className="w-8 h-8 flex items-center justify-center text-slate-400 font-bold">−</button>
                          <span className="w-8 text-center text-sm font-bold text-slate-600">{item.quantity}</span>
                          <button disabled className="w-8 h-8 flex items-center justify-center text-slate-400 font-bold">+</button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-bold text-slate-800">{formatINR(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="lg:sticky lg:top-28 h-fit rounded-2xl border border-white/50 bg-white/70 backdrop-blur-sm p-5 shadow-sm pointer-events-none opacity-55 grayscale-[0.45] select-none"
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

              {freeShippingGap > 0 && (
                <div className="mt-4 rounded-xl bg-blue-50/60 p-3 text-xs text-blue-700">
                  <p className="font-medium mb-1.5">Add {formatINR(freeShippingGap)} more for free shipping!</p>
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

              <div className="mt-5 flex items-center justify-center gap-2 w-full rounded-full py-3 text-sm font-bold uppercase tracking-wider text-white bg-slate-400">
                Cart Checkout Locked
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
