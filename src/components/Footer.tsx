'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { getActiveFlavors, BRAND } from '@/config/flavors';

const exploreLinks = [
  { label: 'Home', href: '/' },
  { label: 'Hydration', href: '/hydration' },
  { label: 'Boost', href: '/boost' },
  { label: 'Science', href: '/science' },
  { label: 'Sip', href: '/sip' },
  { label: 'Voices', href: '/voices' },
  { label: 'Refuel', href: '/refuel' },
];

export default function Footer() {
  const flavors = getActiveFlavors();

  const connectLinks = [
    { label: 'Email Us', href: '/refuel' },
    { label: 'Instagram', href: process.env.NEXT_PUBLIC_INSTAGRAM_LINK || '#' },
    { label: 'WhatsApp', href: process.env.NEXT_PUBLIC_WHATSAPP_LINK || '#' },
    { label: 'Twitter / X', href: process.env.NEXT_PUBLIC_TWITTER_LINK || '#' },
  ];

  const flavorLinks = flavors.slice(0, 6).map(f => ({ label: f.name, href: '/hydration' }));

  const columns = [
    { title: 'Explore', hoverColor: '#00FFFF', links: exploreLinks },
    { title: 'Flavors', hoverColor: '#FF69B4', links: flavorLinks },
    { title: 'Connect', hoverColor: '#FFD700', links: connectLinks },
  ];

  return (
    <footer
      className="relative overflow-hidden w-full"
      style={{
        background: 'linear-gradient(160deg, #003E8A 0%, #0066DD 35%, #00A8E8 70%, #0077FF 100%)',
      }}
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── Water bubbles ── */}
      {[
        { size: 14, left: '6%', delay: 0, dur: 5 },
        { size: 8, left: '18%', delay: 1.2, dur: 4 },
        { size: 18, left: '32%', delay: 0.6, dur: 6 },
        { size: 10, left: '48%', delay: 2, dur: 4.5 },
        { size: 16, left: '62%', delay: 0.3, dur: 5.5 },
        { size: 6, left: '76%', delay: 1.8, dur: 3.5 },
        { size: 12, left: '88%', delay: 2.5, dur: 4.8 },
        { size: 9, left: '95%', delay: 0.9, dur: 4.2 },
      ].map((b, i) => (
        <motion.div
          key={`footer-bubble-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: b.size,
            height: b.size,
            left: b.left,
            bottom: '10%',
            background: 'radial-gradient(circle at 35% 25%, rgba(255,255,255,0.45), rgba(255,255,255,0.12) 50%, transparent 70%)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 0 6px rgba(0,200,255,0.2)',
          }}
          animate={{
            y: [0, -(120 + i * 20)],
            x: [0, (i % 2 === 0 ? 1 : -1) * (8 + i * 3)],
            opacity: [0, 0.7, 0.4, 0],
            scale: [0.5, 1, 0.8],
          }}
          transition={{
            duration: b.dur,
            repeat: Infinity,
            delay: b.delay,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* ── Sparkle dots ── */}
      {[
        { top: '15%', left: '12%', delay: 0.5 },
        { top: '40%', left: '30%', delay: 2 },
        { top: '25%', left: '55%', delay: 1 },
        { top: '60%', left: '72%', delay: 3 },
        { top: '35%', left: '90%', delay: 1.5 },
        { top: '75%', left: '45%', delay: 2.5 },
      ].map((s, i) => (
        <motion.div
          key={`footer-sparkle-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 3,
            height: 3,
            top: s.top,
            left: s.left,
            background: 'white',
            boxShadow: '0 0 4px 1px rgba(255,255,255,0.4)',
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* ── Shimmer wave at top edge ── */}
      <motion.div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: '4px' }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), rgba(0,220,255,0.4), rgba(255,255,255,0.3), transparent)',
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '200% 0%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </motion.div>

      {/* ════════════════ HERO STATEMENT — Nike-style massive type ════════════════ */}
      <div className="relative z-10 px-8 sm:px-12 md:px-20 lg:px-32 pt-20 sm:pt-24 md:pt-32 pb-6 md:pb-10">
        <div className="w-full flex flex-col items-center text-center">

          {/* Massive brand tagline */}
          <motion.h2
            className="font-cursive text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-black leading-tight tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Daily<br />
            <span style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>Hydration</span>
          </motion.h2>

          {/* Stinging sub-copy */}
          <motion.p
            className="font-body text-lg sm:text-xl md:text-2xl text-white/90 font-bold mt-6 md:mt-8 max-w-xl tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {BRAND.subTagline}
          </motion.p>

          {/* Punchy brand line */}
          <motion.p
            className="font-body text-sm sm:text-base md:text-lg text-white/60 font-semibold mt-3 italic tracking-wide"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {BRAND.antiSugar}
          </motion.p>

        </div>
      </div>

      {/* ════════════════ STATS + BRAND ROW ════════════════ */}
      <motion.div
        className="relative z-10 px-8 sm:px-12 md:px-20 lg:px-32 py-8 md:py-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="w-full flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
          {[
            { value: BRAND.stats.electrolytes, label: 'Electrolytes' },
            { value: BRAND.stats.sugar, label: 'Sugar' },
            { value: BRAND.stats.calories, label: 'Calories' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="font-display text-2xl sm:text-3xl md:text-4xl text-white font-black tracking-tight">
                {stat.value}
              </span>
              <span className="font-body text-xs sm:text-sm md:text-base text-white/50 font-semibold uppercase tracking-widest mt-1">
                {stat.label}
              </span>
            </div>
          ))}

          <div className="hidden md:block w-px h-14 bg-white/20" />

          <div className="flex items-center gap-5">
            <a href="/" className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt={BRAND.name}
                width={120}
                height={120}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain"
              />
            </a>
            <p className="font-body text-sm sm:text-base md:text-lg text-white/80 font-semibold leading-snug max-w-xs">
              {BRAND.positioning}
            </p>
          </div>
        </div>
      </motion.div>

      {/* ════════════════ DIVIDER ════════════════ */}
      <div className="relative z-10 px-8 sm:px-12 md:px-20 lg:px-32">
        <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }} />
      </div>

      {/* ════════════════ LINK GRID ════════════════ */}
      <div className="relative z-10 px-8 sm:px-12 md:px-20 lg:px-32 py-14 md:py-20">
        <div className="w-full flex flex-col items-center text-center gap-12 md:gap-16">

          {/* 3 Link columns — always centered */}
          <div className="w-full grid grid-cols-3 gap-6 sm:gap-10 md:gap-16">
            {columns.map((col, i) => (
              <motion.div
                key={col.title}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              >
                <h4 className="font-display text-sm sm:text-base md:text-lg text-white font-black uppercase tracking-wider mb-5 md:mb-7">
                  {col.title}
                </h4>

                <ul className="space-y-3 sm:space-y-3.5 md:space-y-4">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <motion.a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="font-body text-sm sm:text-base md:text-lg text-white/70 font-semibold transition-all duration-200"
                        whileHover={{
                          color: col.hoverColor,
                          scale: 1.05,
                        }}
                      >
                        {link.label}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* ════════════════ BOTTOM DIVIDER ════════════════ */}
      <div className="relative z-10 px-8 sm:px-12 md:px-20 lg:px-32">
        <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }} />
      </div>

      {/* ════════════════ BOTTOM BAR ════════════════ */}
      <motion.div
        className="relative z-10 px-8 sm:px-12 md:px-20 lg:px-32 py-8 md:py-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">

          <p className="font-body text-xs sm:text-sm text-white/50 font-medium">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>

          <span className="hidden sm:block text-white/20">|</span>

          <p className="font-body text-xs sm:text-sm text-white/30 font-medium italic hidden md:block">
            {BRAND.science}
          </p>

          <span className="hidden md:block text-white/20">|</span>

          <div className="flex items-center gap-6">
            {['Privacy', 'Terms'].map((lbl) => (
              <motion.a
                key={lbl}
                href="#"
                className="font-body text-xs sm:text-sm text-white/50 font-semibold uppercase tracking-wider"
                whileHover={{ color: '#ffffff' }}
              >
                {lbl}
              </motion.a>
            ))}
          </div>

        </div>
      </motion.div>
    </footer>
  );
}