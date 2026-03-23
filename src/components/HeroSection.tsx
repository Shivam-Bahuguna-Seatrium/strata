'use client';

import { motion } from 'framer-motion';
import { getActiveFlavors, BRAND } from '@/config/flavors';

export default function HeroSection() {
  const flavors = getActiveFlavors();
  const flavorCount = flavors.length;

  return (
    <section className="relative w-full h-[calc(100svh-82px)] md:h-[calc(100vh-82px)] flex items-center justify-center overflow-hidden underwater-bg wave-divider">
      
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 md:top-0 -right-20 md:-right-40 w-80 md:w-[600px] h-80 md:h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.35), transparent 70%)' }} />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-0 md:bottom-20 -left-20 md:-left-40 w-80 md:w-[600px] h-80 md:h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,20,147,0.25), transparent 70%)' }} />
        <div className="absolute inset-x-0 top-0 h-40 md:h-56" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.5), transparent)' }} />
        <div className="absolute inset-x-0 bottom-0 h-36 md:h-48" style={{ background: 'linear-gradient(0deg, rgba(0,119,255,0.18), transparent)' }} />
      </div>

      <div className="relative z-10 w-full h-full flex items-center">
        <div className="section-inner w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="w-full space-y-7 md:space-y-8 px-1 sm:px-0">
            
            {/* Badges */}
            <motion.div className="flex flex-wrap gap-2 md:gap-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}>
              {['Zero Sugar', 'Vegan', 'Gluten-Free', 'Fast Acting', 'Science-Backed'].map((badge, i) => {
                const emojis = ['🧊', '💯', '🌾', '⚡', '🔬'];
                const badgeColors = ['#00E5FF', '#FF1493', '#00FF00', '#FFD700', '#FF5F00'];
                const color = badgeColors[i];
                return (
                  <motion.span
                    key={badge}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                    className="font-label text-[10px] md:text-xs px-3 md:px-4 py-1.5 md:py-2 rounded-full text-gray-700"
                    style={{ background: `${color}15` }}>
                    {emojis[i]} {badge}
                  </motion.span>
                );
              })}
            </motion.div>

            {/* Brand headline - clean, no box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-blue-900 leading-[1.05]" style={{ letterSpacing: '-0.03em' }}>
                {BRAND.subTagline.split('.')[0]}.<br className="hidden sm:block" />
                <span className="gradient-neon">{BRAND.tagline}</span>
              </h1>
            </motion.div>

            {/* Subheading - clean text, no box */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="font-body text-base md:text-lg text-blue-800/80 max-w-xl leading-relaxed px-1 sm:px-0">
              {BRAND.science} {flavorCount} flavors. Zero sugar. Zero compromise.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-lg">
              <motion.a href="#product"
                className="px-8 md:px-10 py-3 md:py-4 rounded-2xl font-headline text-base md:text-lg text-white text-center"
                style={{ background: 'linear-gradient(135deg, #0077FF 0%, #00E5FF 58%, #FF1493 100%)', boxShadow: '0 6px 24px rgba(0,119,255,0.25)' }}
                whileHover={{ scale: 1.04, boxShadow: '0 10px 36px rgba(0,119,255,0.35)' }}
                whileTap={{ scale: 0.96 }}>
                Shop {flavorCount} Flavors
              </motion.a>
              <motion.a href="#benefits"
                className="px-8 md:px-10 py-3 md:py-4 rounded-2xl font-headline text-base md:text-lg text-center"
                style={{
                  color: '#0077FF',
                  background: 'rgba(0,119,255,0.06)',
                }}
                whileHover={{ scale: 1.04, background: 'rgba(0,119,255,0.14)' }}
                whileTap={{ scale: 0.96 }}>
                The Science →
              </motion.a>
            </motion.div>

            {/* Electrolyte quick info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex items-center gap-6">
              {BRAND.electrolytes.map((el) => (
                <div key={el.symbol} className="text-center">
                  <div className="font-display text-lg text-blue-900">{el.symbol}</div>
                  <div className="font-label text-[9px] text-blue-500">{el.name}</div>
                </div>
              ))}
            </motion.div>

            </motion.div>

            {/* Right: Product visualization */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="relative h-56 sm:h-64 md:h-72 lg:h-[420px] flex items-center justify-center">
            
            {/* Rotating glow */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full opacity-25 hidden md:block"
              style={{
                background: 'conic-gradient(from 0deg, #0077FF, #FF1493, #FF8C00, #0077FF)',
              }} />
            
            {/* Product image */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-52 sm:w-64 md:w-72 lg:w-80 h-64 sm:h-72 md:h-80 lg:h-96 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/starta1.png"
                alt="STRATA Hydration"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </motion.div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}