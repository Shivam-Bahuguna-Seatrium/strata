'use client';

import { motion } from 'framer-motion';
import { getActiveFlavors } from '@/config/flavors';
import { hydrationContent } from '@/config/siteContent';

export default function HydrationSection() {
  const flavors = getActiveFlavors();
  const hero = flavors.find(f => f.badge !== hydrationContent.comingSoonLabel) ?? flavors[0];
  const comingSoon = flavors.filter(f => f.badge === hydrationContent.comingSoonLabel);

  return (
    <section id="hydration" className="relative flex flex-col items-center px-8 sm:px-10 md:px-16 lg:px-20 overflow-hidden">

      {/* Top spacer */}
      <div className="w-full h-10 sm:h-12 md:h-16 lg:h-20" aria-hidden="true" />

      {/* Background glows — more colorful */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(0,119,255,0.25), transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(255,20,147,0.2), transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: `radial-gradient(circle, ${hero.color}30, transparent 70%)` }} />
      </div>

      <div className="section-inner relative z-10 flex flex-col gap-12 md:gap-20">

        {/* ═══ SECTION HEADING ═══ */}
        <motion.div
          className="text-center px-4 sm:px-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>
          <motion.span
            className="font-label inline-block mb-5 px-6 py-2.5 rounded-full text-xs font-extrabold"
            style={{ color: '#0077FF', background: 'rgba(0,119,255,0.1)', border: '1.5px solid rgba(0,119,255,0.2)' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}>
            {hydrationContent.badge}
          </motion.span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-blue-950 leading-tight font-black uppercase tracking-tighter">
            {hydrationContent.heading}{' '}
            <span className="hero-line-script text-3xl sm:text-4xl md:text-5xl" style={{ textTransform: 'none' }}>{hydrationContent.headingAccent}</span>
          </h2>

        </motion.div>

        {/* ═══ MAIN: Product + Info side by side on desktop ═══ */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 md:gap-14 items-center">

          {/* Left: Product Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex items-center justify-center">

            {/* Glow ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full opacity-25"
              style={{ background: `conic-gradient(from 0deg, ${hero.color}, #0077FF, #FF1493, #FF8C00, ${hero.color})` }} />

            {/* Floating product */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-64 h-72 sm:w-72 sm:h-80 md:w-96 md:h-[28rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/pack.png" alt={hero.name} className="w-full h-full object-contain drop-shadow-2xl" />
            </motion.div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col items-center text-center gap-5 md:gap-7">

            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-label font-extrabold"
              style={{ color: hero.color, background: `${hero.color}18`, border: `1.5px solid ${hero.color}40`, filter: 'saturate(1.3)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: hero.color }} />
              {hydrationContent.availableBadge}
            </span>

            {/* Name + tagline */}
            <div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-blue-950 leading-tight font-black">
                {hero.name}
              </h2>
              <p className="font-cursive text-2xl md:text-3xl mt-2 font-bold" style={{ color: hero.color, filter: 'saturate(1.5)' }}>
                {hero.tagline}
              </p>
            </div>

            {/* Description */}
            <p className="font-body text-base md:text-lg text-blue-900/75 max-w-sm mx-auto leading-relaxed font-medium">
              {hero.description}
            </p>

            {/* CTA */}
            <motion.button
              className="mt-2 px-10 md:px-12 py-3.5 md:py-4 rounded-2xl text-white font-display text-base md:text-lg font-black uppercase tracking-wider"
              style={{
                background: `linear-gradient(135deg, ${hero.color}, ${hero.color}ee)`,
                boxShadow: `0 6px 28px ${hero.color}45`,
                filter: 'saturate(1.2)',
              }}
              whileHover={{ scale: 1.04, boxShadow: `0 8px 36px ${hero.color}55` }}
              whileTap={{ scale: 0.97 }}>
              {hydrationContent.ctaPrefix} {hero.name} {hydrationContent.ctaSuffix}
            </motion.button>
          </motion.div>
        </div>

        {/* ═══ COMING SOON + FEATURES ═══ */}
        <div className="flex flex-col items-center gap-10 md:gap-14">

          {/* Coming Soon Flavors */}
          {comingSoon.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-6 w-full">

              {/* Label */}
              <div className="flex items-center gap-3 w-full max-w-sm">
                <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,119,255,0.3), transparent)' }} />
                <span className="font-label text-[10px] text-blue-600 font-extrabold">{hydrationContent.comingSoonLabel}</span>
                <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,119,255,0.3), transparent)' }} />
              </div>

              {/* Cards row */}
              <div className="flex flex-col sm:flex-row gap-4 md:gap-5 w-full max-w-2xl mx-auto">
                {comingSoon.map((flavor, i) => (
                  <motion.div
                    key={flavor.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 + i * 0.08, duration: 0.4 }}
                    className="flex-1 flex items-center gap-4 p-4 md:p-5 rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, rgba(255,255,255,0.85), ${flavor.color}08)`,
                      boxShadow: `0 3px 16px ${flavor.color}12, inset 0 0 0 1px ${flavor.color}15`,
                      backdropFilter: 'blur(8px)',
                    }}>
                    <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center"
                      style={{ background: `${flavor.color}15` }}>
                      <span className="text-xl md:text-2xl grayscale-[30%] opacity-80">{flavor.emoji}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-base md:text-lg text-blue-950 font-black">{flavor.name}</h4>
                      <p className="font-body text-xs text-blue-700/55 truncate font-medium">{flavor.tagline}</p>
                    </div>
                    <span className="font-label text-[10px] px-2.5 py-1 rounded-full font-extrabold"
                      style={{ color: flavor.color, background: `${flavor.color}12`, filter: 'saturate(1.2)' }}>Soon</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Feature strip removed — now in ticker bar below */}
        </div>

      </div>

      {/* Spacer between content and ticker */}
      <div className="w-full h-8 sm:h-10 md:h-14 lg:h-16" aria-hidden="true" />

      {/* ═══ Running Water Ticker Bar — same style as hero ═══ */}
      <div className="relative z-20 overflow-hidden hero-ticker mb-8 md:mb-20"
        style={{
          background: 'linear-gradient(120deg, #7CCF00 0%, #ADFF2F 52%, #7CCF00 100%)',
          boxShadow: '0 -4px 30px rgba(124,207,0,0.18)',
        }}>

        {/* Bubbles */}
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
            key={`hydra-bubble-${i}`}
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

        {/* Sparkle dots */}
        {[
          { top: '20%', left: '15%', delay: 0.5 },
          { top: '55%', left: '40%', delay: 2 },
          { top: '30%', left: '65%', delay: 1 },
          { top: '45%', left: '88%', delay: 3 },
        ].map((s, i) => (
          <motion.div
            key={`hydra-sparkle-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 3, height: 3,
              top: s.top, left: s.left,
              background: 'white',
              boxShadow: '0 0 4px 1px rgba(255,255,255,0.5)',
            }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
          />
        ))}

        {/* Water shimmer */}
        <motion.div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: '4px' }}>
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

        {/* Shimmer overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(0deg, rgba(0,200,255,0.08) 0%, transparent 40%, transparent 70%, rgba(255,255,255,0.06) 100%)' }} />

        {/* Scrolling marquee */}
        <div className="ticker-track relative z-10">
          {[0, 1, 2, 3].map((set) => (
            <div key={set} className="ticker-content" aria-hidden={set > 0}>
              {hydrationContent.ticker.map((item, i) => (
                <span key={`${set}-${i}`} className="ticker-item">
                  <span className="ticker-dot" style={{ background: '#fff', boxShadow: '0 0 8px rgba(255,255,255,0.7)' }} />
                  <span className="ticker-text" style={{ color: '#fff', fontWeight: 800, textShadow: '0 0 6px rgba(255,255,255,0.4)' }}>{item}</span>
                  <span className="ticker-sep" style={{ color: 'rgba(255,255,255,0.6)' }}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>



    </section>
  );
}
