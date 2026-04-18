'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getActiveFlavors } from '@/config/flavors';
import { hydrationContent } from '@/config/siteContent';

export default function FuelSection() {
  const flavors = getActiveFlavors();
  const availableFlavors = flavors.filter(f => f.badge !== hydrationContent.comingSoonLabel);
  const comingSoonFlavors = flavors.filter(f => f.badge === hydrationContent.comingSoonLabel);
  const allDisplay = [...availableFlavors, ...comingSoonFlavors];
  const [selectedId, setSelectedId] = useState(availableFlavors[0]?.id ?? flavors[0]?.id);
  const selected = flavors.find(f => f.id === selectedId) ?? flavors[0];
  const isComingSoon = selected.badge === hydrationContent.comingSoonLabel;

  const stats = [
    { value: '3,000mg', label: 'Electrolytes' },
    { value: '0g', label: 'Sugar' },
    { value: '0', label: 'Calories' },
    { value: '6+', label: 'Minerals' },
  ];

  return (
    <section id="fuel" className="relative flex min-h-svh flex-col overflow-hidden sm:h-[92svh] sm:min-h-0"
      style={{ background: 'linear-gradient(165deg, #EDF9FF 0%, #DDF1FF 30%, #C2E4FF 60%, #A5D2F7 85%, #8CC2EC 100%)' }}>

      {/* ── Ambient background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-32 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,180,245,0.18), transparent 72%)' }} />
        <div className="absolute bottom-10 -left-32 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(30,140,235,0.18), transparent 72%)' }} />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-3 py-4 sm:px-5 sm:py-5 lg:px-7 lg:py-6">
        <div className="mx-auto grid h-[calc(100%-1rem)] w-full max-w-[1240px] grid-rows-[auto_auto_minmax(0,1fr)] place-items-center gap-2.5 rounded-[28px] border border-white/35 bg-white/14 px-4 py-4 shadow-[0_24px_80px_rgba(16,86,156,0.10)] backdrop-blur-[10px] sm:h-[calc(100%-1.25rem)] sm:gap-3 sm:px-6 sm:py-5 lg:h-[calc(100%-1.5rem)] lg:gap-3.5 lg:px-8 lg:py-6 xl:px-10">

        {/* Tag + Heading */}
        <motion.div
          className="flex w-full max-w-4xl flex-col items-center justify-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>
          <span className="mb-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-label text-[10px] font-extrabold uppercase tracking-widest sm:mb-4 sm:text-xs"
            style={{ color: '#00D4FF', background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Hydration Lab
          </span>
          <h2 className="mx-auto max-w-[16ch] font-display text-[2rem] font-black uppercase tracking-tight leading-[0.92] sm:text-[2.4rem] md:text-[2.8rem] lg:text-[3.3rem] xl:text-[3.75rem]">
            <span style={{ background: 'linear-gradient(180deg, #0B2E5B 0%, #1E5EA5 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {hydrationContent.heading}{' '}
            </span>
            <span className="hero-line-script" style={{ textTransform: 'none' }}>
              {hydrationContent.headingAccent}
            </span>
          </h2>
        </motion.div>

        {/* ═══ FLAVOR PICKER — creative radio buttons ═══ */}
        <motion.div
          className="flex w-full justify-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}>
          <div className="flex w-full max-w-4xl flex-wrap items-center justify-center gap-2.5 rounded-[2rem] p-3 sm:gap-3 sm:p-3.5"
            style={{ background: 'rgba(255,255,255,0.22)', border: '1px solid rgba(11,78,135,0.12)' }}>
            {allDisplay.map((flavor) => {
              const isActive = flavor.id === selectedId;
              const isSoon = flavor.badge === hydrationContent.comingSoonLabel;
              return (
                <motion.button
                  key={flavor.id}
                  onClick={() => setSelectedId(flavor.id)}
                  className="relative flex min-h-11 items-center gap-2.5 rounded-full px-4 py-2.5 transition-all cursor-pointer sm:min-h-12 sm:px-5 sm:py-3"
                  style={{
                    background: isActive ? `${flavor.color}20` : 'rgba(255,255,255,0.22)',
                    border: isActive ? `1.5px solid ${flavor.color}50` : '1.5px solid transparent',
                    opacity: isSoon && !isActive ? 0.6 : 1,
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}>
                  
                  {/* Custom radio indicator */}
                  <div className="relative w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      border: `2px solid ${isActive ? flavor.color : isSoon ? 'rgba(11,46,91,0.22)' : 'rgba(11,46,91,0.34)'}`,
                      background: isActive ? `${flavor.color}15` : 'transparent',
                    }}>
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
                          style={{ background: flavor.color, boxShadow: `0 0 8px ${flavor.color}80` }} />
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Emoji */}
                  <span className={`text-sm sm:text-base ${isSoon && !isActive ? 'grayscale' : ''}`}>{flavor.emoji}</span>

                  {/* Label — hidden on small mobile, visible on sm+ */}
                  <span className="font-display text-[10px] font-bold uppercase tracking-[0.12em] sm:text-[11px]"
                    style={{ color: isActive ? flavor.color : isSoon ? 'rgba(11,46,91,0.42)' : 'rgba(11,46,91,0.72)' }}>
                    {flavor.name}
                  </span>

                  {/* Coming soon indicator dot */}
                  {isSoon && !isActive && (
                    <span className="hidden md:inline font-label text-[8px] px-1.5 py-0.5 rounded-full uppercase tracking-wider font-bold"
                      style={{ color: 'rgba(11,46,91,0.42)', background: 'rgba(11,46,91,0.05)' }}>
                      Soon
                    </span>
                  )}

                  {/* Active glow ring behind */}
                  {isActive && (
                    <motion.div
                      layoutId="flavor-glow"
                      className="absolute inset-0 rounded-full -z-10"
                      style={{ boxShadow: `0 0 20px ${flavor.color}25` }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Product + Info ── */}
        <div className="grid h-full min-h-0 w-full items-stretch justify-items-center gap-2.5 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-5 xl:gap-7">

          {/* Left: Product — clean, no heavy shadows */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex h-full min-h-[17rem] w-full items-center justify-center self-stretch sm:min-h-[19rem] lg:min-h-[27rem]">

            {/* Single subtle ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
              className="absolute h-60 w-60 rounded-full sm:h-80 sm:w-80 md:h-[24rem] md:w-[24rem] lg:h-[27rem] lg:w-[27rem]"
              style={{ border: `1.5px solid ${selected.color}18` }} />

            <div
              className="absolute h-80 w-80 rounded-full blur-3xl sm:h-[26rem] sm:w-[26rem] lg:h-[32rem] lg:w-[32rem]"
              style={{ background: `radial-gradient(circle, ${selected.color}18 0%, transparent 72%)` }}
            />

            {/* Floating product */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.3 }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
                className="relative z-10 aspect-[3/4] h-[17rem] sm:h-[20rem] md:h-[23rem] lg:h-[27rem] xl:h-[29rem]"
                style={{ filter: isComingSoon ? 'grayscale(0.7) opacity(0.5)' : 'none' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/pack.png" alt={selected.name}
                  className="w-full h-full object-contain drop-shadow-lg" />
              </motion.div>
            </AnimatePresence>

            {/* Coming soon overlay on product */}
            {isComingSoon && (
              <div className="absolute z-20 font-display text-sm sm:text-base font-black uppercase tracking-widest px-5 py-2 rounded-full"
                style={{ color: 'rgba(255,255,255,0.6)', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
                Coming Soon
              </div>
            )}
          </motion.div>

          {/* Right: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto flex w-full max-w-[29rem] flex-col items-center justify-center gap-3 rounded-[24px] border border-white/45 bg-white/48 px-4 py-3.5 text-center shadow-[0_18px_55px_rgba(16,86,156,0.08)] backdrop-blur-[14px] sm:px-5 sm:py-4 lg:max-w-[28rem] lg:gap-3.5 lg:px-6 lg:py-4.5">

            {/* Name + tagline */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center gap-2">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <h3 className="font-display text-[1.55rem] font-black uppercase tracking-tight leading-none text-blue-950 sm:text-[1.9rem] md:text-[2.2rem] lg:text-[2.45rem]">
                    {selected.name}
                  </h3>
                  {!isComingSoon && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-label font-extrabold uppercase tracking-wider"
                      style={{ color: selected.color, background: `${selected.color}12`, border: `1px solid ${selected.color}25` }}>
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: selected.color }} />
                      Live
                    </span>
                  )}
                </div>
                <p className="font-cursive text-base font-bold sm:text-lg md:text-xl lg:text-2xl" style={{ color: isComingSoon ? 'rgba(255,255,255,0.3)' : selected.color }}>
                  {selected.tagline}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Description */}
            <p className="max-w-[34ch] font-body text-[13px] font-medium leading-5 text-blue-950/70 sm:text-sm sm:leading-6 lg:text-[14px] lg:leading-6">
              {selected.description}
            </p>

            {/* Stat strip */}
            <div className="grid w-full max-w-xl grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-2.5">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.35 }}
                  className="flex min-h-[4.5rem] flex-col items-center justify-center rounded-2xl px-2.5 py-2.5 text-center"
                  style={{ background: 'rgba(255,255,255,0.34)', border: '1px solid rgba(11,78,135,0.08)' }}>
                  <span className="font-display text-sm sm:text-base md:text-lg font-black text-blue-950 leading-none">{stat.value}</span>
                  <span className="font-label text-[8px] sm:text-[10px] text-blue-800/65 font-bold uppercase tracking-wider">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        </div>
      </div>

      {/* ═══ Ticker Bar ═══ */}
      <div className="relative z-20 w-full overflow-hidden hero-ticker shrink-0"
        style={{
          background: `linear-gradient(120deg, ${selected.color}${isComingSoon ? '40' : ''} 0%, ${selected.color}${isComingSoon ? '30' : 'cc'} 52%, ${selected.color}${isComingSoon ? '40' : ''} 100%)`,
        }}>
        <motion.div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: '2px' }}>
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), rgba(255,255,255,0.7), rgba(255,255,255,0.5), transparent)',
              backgroundSize: '200% 100%',
            }}
            animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

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
