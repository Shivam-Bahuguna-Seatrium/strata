'use client';

import { motion } from 'framer-motion';
import { getActiveFlavors, BRAND } from '@/config/flavors';
import { heroContent } from '@/config/siteContent';

export default function HeroSection() {
  const flavors = getActiveFlavors();

  return (
    <section id="home" className="relative w-full min-h-[calc(100svh-5rem)] flex flex-col overflow-hidden underwater-bg wave-divider pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-24 sm:pb-32 md:pb-40 lg:pb-48 px-6 sm:px-10 md:px-16 lg:px-20">
      
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

      <div className="relative z-10 w-full flex-1 flex items-center">
        <div className="section-inner w-full">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            
            {/* Left column: Heading + mobile image + subtitle + buttons */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="w-full flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-7 px-1 sm:px-0">
            
            {/* Hero Motivational Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}>
              <div className="flex items-center gap-3 mb-2 md:mb-3">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
                  className="hero-accent-line origin-left" />
                <span className="hero-line-top text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold">
                  {heroContent.accentLine}
                </span>
              </div>
              <h1 className="leading-none">
                <span className="hero-line-main block text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem]">
                  {heroContent.headingMain.split('').map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.06, duration: 0.5, ease: 'easeOut' }}>
                      {char}
                    </motion.span>
                  ))}
                </span>
                <span className="hero-line-script block text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-1.5 sm:mt-2 ml-1 sm:ml-2">
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0, duration: 0.7, ease: 'easeOut' }}>
                    {heroContent.headingScript}
                  </motion.span>
                </span>
              </h1>
            </motion.div>

            {/* Mobile-only product image (below heading) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="lg:hidden relative h-44 sm:h-64 flex items-center justify-center">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-44 sm:w-64 h-44 sm:h-64 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/product.png"
                  alt={heroContent.productAlt}
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </motion.div>
            </motion.div>

            {/* Subheading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}>
              <p className="font-body text-base md:text-lg lg:text-xl text-blue-800/65 max-w-md leading-relaxed font-semibold">
                {BRAND.science} {heroContent.subtitle}
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3 mt-2 sm:mt-3 md:mt-6">
              <motion.a href={heroContent.cta.primary.href}
                className="group relative px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 rounded-2xl font-display text-sm sm:text-base text-white font-black uppercase tracking-wider text-center overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #0077FF 0%, #00C8FF 50%, #0099FF 100%)',
                  boxShadow: '0 4px 20px rgba(0,119,255,0.25), inset 0 1px 0 rgba(255,255,255,0.2)',
                }}
                whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(0,119,255,0.35), inset 0 1px 0 rgba(255,255,255,0.25)' }}
                whileTap={{ scale: 0.97 }}>
                <span className="relative z-10 flex items-center justify-center gap-2.5">
                  {heroContent.cta.primary.label}
                </span>
              </motion.a>
              <motion.a href={heroContent.cta.secondary.href}
                className="group relative px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 rounded-2xl font-display text-sm sm:text-base font-black uppercase tracking-wider text-center overflow-hidden"
                style={{
                  color: '#0077FF',
                  background: 'rgba(255,255,255,0.75)',
                  boxShadow: '0 4px 20px rgba(0,119,255,0.1), inset 0 0 0 1.5px rgba(0,119,255,0.2)',
                  backdropFilter: 'blur(12px)',
                }}
                whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(0,119,255,0.18), inset 0 0 0 1.5px rgba(0,119,255,0.35)' }}
                whileTap={{ scale: 0.97 }}>
                <span className="relative z-10 flex items-center justify-center gap-2.5">
                  {heroContent.cta.secondary.label}
                </span>
              </motion.a>
            </motion.div>

            </motion.div>

            {/* Right: Product visualization (desktop only) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="hidden lg:flex relative lg:h-[480px] xl:h-[520px] items-center justify-center">
            
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
              className="relative w-80 lg:w-96 h-80 lg:h-[26rem] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/product.png"
                alt={heroContent.productAlt}
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </motion.div>

            </motion.div>
          </div>
        </div>
      </div>

      {/* Broadcast Ticker Bar — matches navbar style */}
      <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden hero-ticker"
        style={{
          background: 'linear-gradient(120deg, #0077FF 0%, #00C8FF 52%, #0099FF 100%)',
          boxShadow: '0 -4px 30px rgba(0,119,255,0.18)',
        }}>

        {/* Bubbles — same as navbar */}
        {[
          { size: 10, left: '6%', delay: 0, dur: 4 },
          { size: 7, left: '18%', delay: 1.5, dur: 3.5 },
          { size: 14, left: '34%', delay: 0.8, dur: 5 },
          { size: 9, left: '50%', delay: 2.2, dur: 4.2 },
          { size: 12, left: '66%', delay: 0.3, dur: 4.8 },
          { size: 6, left: '80%', delay: 1, dur: 3 },
          { size: 8, left: '92%', delay: 2.8, dur: 3.8 },
        ].map((b, i) => (
          <motion.div
            key={`ticker-bubble-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: b.size,
              height: b.size,
              left: b.left,
              bottom: '-4px',
              background: 'radial-gradient(circle at 35% 25%, rgba(255,255,255,0.55), rgba(255,255,255,0.15) 50%, transparent 70%)',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '0 0 6px rgba(0,200,255,0.25)',
            }}
            animate={{
              y: [0, -(30 + i * 5)],
              x: [0, (i % 2 === 0 ? 1 : -1) * (4 + i * 2)],
              opacity: [0, 0.7, 0.4, 0],
              scale: [0.5, 1, 0.9],
            }}
            transition={{
              duration: b.dur,
              repeat: Infinity,
              delay: b.delay,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* Sparkle dots — same as navbar */}
        {[
          { top: '20%', left: '12%', delay: 0.5 },
          { top: '55%', left: '38%', delay: 2 },
          { top: '30%', left: '62%', delay: 1 },
          { top: '45%', left: '85%', delay: 3 },
        ].map((s, i) => (
          <motion.div
            key={`ticker-sparkle-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 3,
              height: 3,
              top: s.top,
              left: s.left,
              background: 'white',
              boxShadow: '0 0 4px 1px rgba(255,255,255,0.5)',
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: s.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Water shimmer at top edge */}
        <motion.div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{ height: '4px' }}>
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), rgba(0,220,255,0.5), rgba(255,255,255,0.4), transparent)',
              backgroundSize: '200% 100%',
            }}
            animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        {/* Subtle shimmer overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(0deg, rgba(0,200,255,0.08) 0%, transparent 40%, transparent 70%, rgba(255,255,255,0.06) 100%)' }} />

        {/* Scrolling marquee */}
        <div className="ticker-track relative z-10">
          {[0, 1, 2, 3].map((set) => (
            <div key={set} className="ticker-content" aria-hidden={set > 0}>
              {heroContent.ticker.map((item, i) => (
                <span key={`${set}-${i}`} className="ticker-item">
                  <span className="ticker-dot" style={{ background: 'rgba(255,255,255,0.7)', boxShadow: '0 0 6px rgba(255,255,255,0.4)' }} />
                  <span className="ticker-text" style={{ color: 'white' }}>{item}</span>
                  <span className="ticker-sep" style={{ color: 'rgba(255,255,255,0.35)' }}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}