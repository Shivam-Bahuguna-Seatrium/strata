'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cart';
import { formatINR } from '@/lib/utils';
import Link from 'next/link';

const BUY_LINKS = {
  amazon: 'https://www.amazon.in/',
  zepto: 'https://www.zeptonow.com/',
} as const;

export default function CheckoutPage() {
  const [mode, setMode] = useState<'explore' | 'cart'>('explore');
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotalPaise());
  const shipping = useCartStore((s) => s.shippingPaise());
  const total = useCartStore((s) => s.totalPaise());

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
          <h1 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight text-slate-900 mb-3">Cart Empty</h1>
          <Link href="/products" className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-[0_12px_28px_rgba(0,138,230,0.32)] hover:scale-[1.02] transition-transform">
            View Products <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 2xl:px-28 pt-12 sm:pt-16 lg:pt-24 pb-24 sm:pb-28 lg:pb-32">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12 sm:mb-16 lg:mb-20 text-center">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900">Checkout</h1>
          <div className="mx-auto mt-8 inline-flex w-full max-w-md rounded-full border border-slate-200/80 bg-white/80 p-2 shadow-sm backdrop-blur">
            <button
              type="button"
              onClick={() => setMode('explore')}
              className={`flex-1 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                mode === 'explore'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Explore
            </button>
            <button
              type="button"
              onClick={() => setMode('cart')}
              className={`flex-1 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                mode === 'cart'
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Cart
            </button>
          </div>
        </motion.div>

        {mode === 'explore' ? (
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
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto h-fit w-full max-w-3xl rounded-3xl border border-white/60 bg-white/75 p-8 sm:p-10 shadow-[0_12px_36px_rgba(15,23,42,0.08)] backdrop-blur-sm"
          >
            <div className="mb-3 inline-flex rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">
              Cart Mode Coming Soon
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1 pointer-events-none opacity-65 grayscale-[0.4] select-none">
              {items.map((item) => (
                <div key={item.productId} className="flex items-center gap-3 text-sm rounded-xl border border-slate-200 bg-white/80 px-3 py-2.5">
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: `${item.color}1a` }}>
                    {item.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-slate-800">{item.name}</p>
                    <p className="text-xs text-slate-500">Qty {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-slate-800">{formatINR(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="my-4 h-px bg-slate-200" />

            <div className="space-y-2 text-sm pointer-events-none opacity-65 select-none">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatINR(shipping)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900">
                <span>Total</span>
                <span>{formatINR(total)}</span>
              </div>
            </div>
          </motion.aside>
        )}
      </div>
    </section>
  );
}
