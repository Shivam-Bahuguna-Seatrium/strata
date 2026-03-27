'use client';

import { motion } from 'framer-motion';
import { voicesContent } from '@/config/siteContent';

const reviews = [
  {
    name: 'T',
    role: 'Field Engineer',
    avatar: '�',
    rating: 5,
    text: 'On-site 12 hours in 40°C heat. Strata is the only thing that keeps me from crashing by noon. My crew thinks I\'m built different — nah, I\'m just hydrated.',
    tag: 'Field',
    color: '#FF1493',
    rotate: -2,
    floatDuration: 5,
  },
  {
    name: 's',
    role: 'Data Scientist',
    avatar: '📊',
    rating: 5,
    text: 'Training models till 3am. Coffee gave me anxiety. Strata gives clarity. My code quality literally improved after I switched — brain fog is not a vibe.',
    tag: 'Focus',
    color: '#00E5FF',
    rotate: 1.5,
    floatDuration: 6,
  },
  {
    name: 'K',
    role: 'Boxer',
    avatar: '🥊',
    rating: 5,
    text: 'Twelve rounds in the ring and I still feel locked in. Strata before sparring is non-negotiable now. No sugar crash, just pure knockout energy.',
    tag: 'Combat',
    color: '#DC2626',
    rotate: -1,
    floatDuration: 5.2,
  },
];

const stats = [
  { value: '4.9', label: 'Avg Rating', icon: '⭐' },
  { value: '10K+', label: 'Happy Sippers', icon: '🥤' },
  { value: '0g', label: 'Sugar', icon: '🚫' },
  { value: '93%', label: 'Reorder Rate', icon: '🔁' },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`text-xs ${i < rating ? 'text-amber-400' : 'text-blue-200/30'}`}>★</span>
      ))}
    </div>
  );
}

export default function VoicesSection() {
  return (
    <section id="reviews" className="relative flex flex-col items-center overflow-hidden px-6 sm:px-10 md:px-16 lg:px-20"
      style={{ background: 'linear-gradient(180deg, #FFF8F0 0%, #FFF5EB 50%, #FEF3C7 100%)' }}>

      {/* Top spacer */}
      <div className="w-full h-10 sm:h-12 md:h-16 lg:h-20" aria-hidden="true" />

      <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center gap-8 md:gap-20 lg:gap-24">

        {/* ── Header ── */}
        <motion.div
          className="w-full flex flex-col items-center text-center px-4 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}>
          <motion.span
            className="font-label inline-block mb-5 px-6 py-2.5 rounded-full text-xs font-extrabold tracking-widest uppercase"
            style={{ color: '#F59E0B', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}>
            {voicesContent.badge}
          </motion.span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-blue-950 leading-tight font-black uppercase tracking-tighter">
            {voicesContent.heading}{' '}
            <span className="hero-line-script text-3xl sm:text-4xl md:text-5xl" style={{ textTransform: 'none' }}>{voicesContent.headingAccent}</span>
          </h2>
          <p className="font-body text-base md:text-lg text-blue-800/70 font-semibold mt-6 max-w-lg tracking-tight">
            {voicesContent.subtitle}
          </p>
        </motion.div>

        {/* ── Stats bar ── */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 w-full max-w-3xl"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * i, duration: 0.35 }}
              className="flex flex-col items-center gap-1.5 md:gap-2 px-3 py-3 md:py-6 rounded-xl cursor-default"
              style={{
                background: 'rgba(255,255,255,0.55)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 2px 16px rgba(245,158,11,0.06), inset 0 0 0 1px rgba(255,255,255,0.4)',
              }}>
              <span className="text-xl md:text-2xl">{s.icon}</span>
              <span className="font-display text-xl md:text-2xl text-blue-950 font-black">{s.value}</span>
              <span className="font-body text-[9px] md:text-xs text-blue-800/60 font-semibold uppercase tracking-wider">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Floating Review Windows ── */}
        <div className="flex flex-col items-center gap-6 w-full">
          <motion.p
            className="font-cursive text-xl md:text-2xl text-amber-600/80 font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}>
            {voicesContent.reviewsLabel}
          </motion.p>

          <div className="grid grid-cols-3 gap-3 md:gap-8 w-full">
            {reviews.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 30, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: r.rotate }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5, type: 'spring', stiffness: 120 }}
                whileHover={{ scale: 1.05, rotate: 0, y: -8, zIndex: 10 }}
                className="relative flex flex-col gap-2 md:gap-4 p-3 md:p-8 rounded-2xl cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.75)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: `0 8px 32px ${r.color}12, 0 2px 8px rgba(0,0,0,0.04), inset 0 0 0 1px rgba(255,255,255,0.6)`,
                  animation: `voiceFloat ${r.floatDuration}s ease-in-out infinite`,
                }}>

                {/* Window dots (macOS style) */}
                <div className="flex gap-1.5 mb-1">
                  <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-400/70" />
                  <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-amber-400/70" />
                  <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-400/70" />
                </div>

                {/* Reviewer info */}
                <div className="flex items-center gap-2 md:gap-4">
                  <motion.div
                    className="w-8 h-8 md:w-14 md:h-14 rounded-full flex items-center justify-center text-sm md:text-2xl"
                    style={{ background: `${r.color}12`, boxShadow: `0 0 0 2px ${r.color}20` }}
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}>
                    {r.avatar}
                  </motion.div>
                  <div className="flex flex-col flex-1 min-w-0 text-left">
                    <span className="font-body text-[9px] md:text-xs text-blue-800/55 font-medium">{r.role}</span>
                  </div>
                  <span className="font-label text-[8px] md:text-[10px] font-extrabold px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-full shrink-0"
                    style={{ color: r.color, background: `${r.color}10`, border: `1px solid ${r.color}20` }}>{r.tag}</span>
                </div>

                {/* Stars */}
                <StarRating rating={r.rating} />

                {/* Review text */}
                <p className="font-body text-[9px] md:text-sm text-blue-800/70 leading-relaxed text-left font-medium">
                  &ldquo;{r.text}&rdquo;
                </p>

                {/* Verified badge */}
                <div className="flex items-center gap-1 mt-auto pt-1">
                  <span className="text-[9px]">✅</span>
                  <span className="font-label text-[9px] text-emerald-600/70 font-extrabold tracking-wider uppercase">{voicesContent.verifiedLabel}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom spacer */}
      <div className="w-full h-12 sm:h-16 md:h-20 lg:h-24" aria-hidden="true" />

    </section>
  );
}
