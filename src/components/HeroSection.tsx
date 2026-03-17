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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="w-full">
            
            {/* Badges from brand config */}
            <motion.div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-5"
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
                    className="text-[10px] md:text-xs font-extrabold px-3 md:px-4 py-1.5 md:py-2 rounded-full text-gray-900"
                    style={{ background: `${color}28`, border: `1.5px solid ${color}55`, boxShadow: `0 4px 15px ${color}33` }}>
                    {emojis[i]} {badge}
                  </motion.span>
                );
              })}
            </motion.div>
            <div className="h-2" />

            {/* Brand headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-blue-900 leading-[1.05] mb-3 md:mb-4" style={{ letterSpacing: '-0.02em' }}>
                {BRAND.subTagline.split('.')[0]}.<br className="hidden sm:block" />
                <span className="gradient-neon">{BRAND.tagline}</span>
              </h1>
            </motion.div>

            {/* Science-backed subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-[15px] sm:text-base md:text-lg font-semibold text-blue-900 max-w-xl mb-5 md:mb-6 leading-relaxed">
              {BRAND.science} {flavorCount} flavors. {BRAND.stats.users} athletes trust STRATA daily.
            </motion.p>
            <div className="h-2" />

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-5 md:mb-6 max-w-2xl">
              <motion.a href="#product"
                className="px-8 md:px-10 py-3 md:py-4 rounded-xl font-extrabold text-base md:text-lg text-white transition-all text-center"
                style={{ background: 'linear-gradient(135deg, #0077FF 0%, #00E5FF 58%, #FF1493 100%)', boxShadow: '0 8px 30px rgba(0,119,255,0.5)' }}
                whileHover={{ scale: 1.05, boxShadow: '0 12px 50px rgba(0,119,255,0.7)' }}
                whileTap={{ scale: 0.95 }}>
                Shop {flavorCount} Flavors
              </motion.a>
              <motion.a href="#benefits"
                className="px-8 md:px-10 py-3 md:py-4 rounded-xl font-extrabold text-base md:text-lg transition-all text-center"
                style={{
                  color: '#FFFFFF',
                  background: 'linear-gradient(135deg, #00D4FF, #0099FF)',
                  border: '2px solid #00E5FF',
                  boxShadow: '0 6px 25px rgba(0,212,255,0.4)'
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(0,212,255,0.6)' }}
                whileTap={{ scale: 0.95 }}>
                The Science
              </motion.a>
            </motion.div>
            <div className="h-2" />

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="rounded-2xl px-4 py-4 md:px-5 md:py-5 flex items-center gap-4 md:gap-5 max-w-md"
              style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.25), rgba(0,119,255,0.2))', border: '2px solid rgba(0,200,255,0.6)', boxShadow: '0 8px 30px rgba(0,119,255,0.3)' }}>
              <div className="flex -space-x-2 md:-space-x-3">
                {['👨‍🦱', '👩‍🦰', '🧑', '👨', '👩'].map((emoji, i) => (
                  <div key={i} className="w-10 md:w-12 h-10 md:h-12 rounded-full flex items-center justify-center text-base md:text-lg"
                    style={{ background: 'linear-gradient(135deg, #0077FF, #00D4FF)', border: '2px solid #F5F9FF', boxShadow: '0 4px 15px rgba(0,119,255,0.4)' }}>
                    {emoji}
                  </div>
                ))}
              </div>
              <div>
                <div className="text-sm font-black text-blue-900">{BRAND.stats.users} hydrated</div>
                <div className="text-xs text-blue-700 font-semibold">{BRAND.stats.rating} avg rating</div>
              </div>
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
              className="absolute inset-0 rounded-full opacity-30"
              style={{
                background: 'conic-gradient(from 0deg, #0077FF, #FF1493, #FF8C00, #0077FF)',
              }} />
            
            {/* Product visualization */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-44 sm:w-52 md:w-60 h-56 sm:h-64 md:h-72 rounded-3xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, rgba(0,212,255,0.3), rgba(255,20,147,0.15))',
                border: '3px solid rgba(0,200,255,0.8)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 20px 60px rgba(0,119,255,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
              }}>
              <div className="text-center">
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }} className="text-6xl sm:text-7xl md:text-8xl mb-3">💧</motion.div>
                <div className="text-blue-900 text-sm md:text-base font-black">STRATA</div>
                <div className="text-blue-600 text-xs md:text-sm mt-2 font-semibold">Electrolyte Hydration</div>
              </div>
            </motion.div>

            {/* Floating electrolyte badges */}
            {BRAND.electrolytes.map((el, i) => {
              const positions = [
                'top-4 right-4 sm:-top-8 sm:-right-8',
                'bottom-4 left-4 sm:-bottom-8 sm:left-0',
                'top-1/3 -left-12 sm:-left-16',
              ];
              const colors = ['#0077FF', '#00E5FF', '#FF1493'];
              return (
                <motion.div
                  key={el.symbol}
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                  className={`absolute ${positions[i]} px-4 py-2 rounded-full text-xs md:text-sm font-bold text-gray-900`}
                  style={{ background: `${colors[i]}28`, border: `1.5px solid ${colors[i]}55`, boxShadow: `0 6px 20px ${colors[i]}33` }}>
                  {el.symbol} {el.name}
                </motion.div>
              );
            })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}