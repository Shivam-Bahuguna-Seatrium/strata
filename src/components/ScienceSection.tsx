'use client';

import { motion } from 'framer-motion';
import { scienceContent } from '@/config/siteContent';

const { benefits, molecules } = scienceContent;

export default function ScienceSection() {
  return (
    <section id="benefits" className="relative flex flex-col items-center overflow-hidden px-8 sm:px-10 md:px-16 lg:px-20"
      style={{ background: 'linear-gradient(180deg, #FFF5F7 0%, #FFF0F3 50%, #FFEEF2 100%)' }}>

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
            style={{ color: '#FF1493', background: 'rgba(255,20,147,0.08)', border: '1px solid rgba(255,20,147,0.15)' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}>
            {scienceContent.badge}
          </motion.span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-blue-950 leading-tight font-black uppercase tracking-tighter">
            {scienceContent.heading}
            <br className="sm:hidden" />
            <span className="hidden sm:inline">{' '}</span>
            <span className="hero-line-script text-3xl sm:text-4xl md:text-5xl" style={{ textTransform: 'none' }}>{scienceContent.headingAccent}</span>
          </h2>
          <p className="font-body text-base md:text-lg text-blue-800/70 font-semibold mt-6 max-w-lg tracking-tight">
            {scienceContent.subtitle}
          </p>
        </motion.div>

        {/* ── Dehydration effects Strata fixes ── */}
        <div className="flex flex-col items-center gap-6">
          <motion.p
            className="font-cursive text-xl md:text-2xl text-pink-500/80 font-bold text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}>
            <span className="sm:hidden">What Dehydration Takes —<br />Strata Gives Back</span>
            <span className="hidden sm:inline">{scienceContent.benefitsLabel}</span>
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4 md:gap-5 w-full max-w-4xl"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}>
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.07 * i, duration: 0.3 }}
                whileHover={{ scale: 1.06, y: -3 }}
                className="flex items-center gap-3 px-6 py-3 md:px-7 md:py-4 rounded-full cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.65)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: `0 3px 16px ${b.color}10, inset 0 0 0 1px rgba(255,255,255,0.5)`,
                }}>
                <span className="text-xl md:text-2xl">{b.icon}</span>
                <div className="flex flex-col items-start">
                  <span className="font-display text-xs md:text-sm text-blue-950 font-black leading-tight">{b.title}</span>
                  <span className="font-body text-[9px] md:text-xs text-blue-800/65 leading-tight font-medium">{b.desc}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Electrolyte cards ── */}
        <div className="flex flex-col items-center gap-6 w-full">
          <motion.p
            className="font-cursive text-xl md:text-2xl text-pink-500/80 font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}>
            {scienceContent.electrolyteLabel}
          </motion.p>
          <motion.div
            className="grid grid-cols-3 gap-3 md:gap-8 w-full"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}>
            {molecules.map((m, i) => (
              <motion.div
                key={m.symbol}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
                whileHover={{ scale: 1.04, y: -4 }}
                className="flex flex-col items-center text-center py-5 md:py-10 px-4 md:px-8 rounded-2xl cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: `0 3px 20px ${m.color}08, inset 0 0 0 1px rgba(255,255,255,0.4)`,
                }}>
                {/* Symbol */}
                <div className="w-12 h-12 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-3 md:mb-4"
                  style={{ background: `${m.color}08` }}>
                  <span className="font-display text-3xl md:text-5xl font-black" style={{ color: m.color }}>{m.symbol}</span>
                </div>
                <h3 className="font-display text-base md:text-lg text-blue-950 font-black">{m.name}</h3>
                <span className="font-body text-[10px] md:text-xs text-blue-800/65 font-medium mt-0.5 mb-3 leading-snug">{m.tagline}</span>
                {/* Scientific roles */}
                <div className="flex flex-col gap-1">
                  {m.benefits.map((b) => (
                    <div key={b} className="flex items-center gap-1.5 justify-center">
                      <span className="w-1 h-1 rounded-full" style={{ background: m.color }} />
                      <span className="font-body text-[10px] md:text-xs text-blue-800/65 font-medium">{b}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>

      {/* Bottom spacer */}
      <div className="w-full h-12 sm:h-16 md:h-20 lg:h-24" aria-hidden="true" />

    </section>
  );
}