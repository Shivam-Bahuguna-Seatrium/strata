'use client';

import { motion } from 'framer-motion';
import { boostContent } from '@/config/siteContent';

const { steps, moments } = boostContent;

export default function BoostSection() {
  return (
    <section id="how-it-works" className="relative flex flex-col items-center overflow-hidden px-8 sm:px-10 md:px-16 lg:px-20"
      style={{ background: 'linear-gradient(180deg, #F0F9FF 0%, #E0F2FE 50%, #DBEAFE 100%)' }}>

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
            style={{ color: '#00D4FF', background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}>
            {boostContent.badge}
          </motion.span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-blue-950 leading-tight font-black uppercase tracking-tighter">
            {boostContent.heading}{' '}
            <span className="hero-line-script text-3xl sm:text-4xl md:text-5xl" style={{ textTransform: 'none' }}>{boostContent.headingAccent}</span>
          </h2>
          <p className="font-body text-base md:text-lg text-blue-800/70 font-semibold mt-6 max-w-lg tracking-tight">
            {boostContent.subtitle}
          </p>
        </motion.div>

        {/* ── Steps row ── */}
        <div className="flex flex-col items-center gap-6 mt-6 md:mt-10">
          <motion.p
            className="font-cursive text-xl md:text-2xl text-blue-500/80 font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}>
            {boostContent.stepsLabel}
          </motion.p>
          <motion.div
            className="flex flex-wrap items-start justify-center gap-5 sm:gap-8 md:gap-12 w-full"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}>
            {steps.map((step, i) => (
              <div key={step.num} className="flex items-start gap-3 sm:gap-5 md:gap-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.35 }}
                  whileHover={{ scale: 1.08, y: -4 }}
                  className="flex flex-col items-center gap-3 cursor-default">
                  <div className="rounded-full flex items-center justify-center"
                    style={{
                      width: 'clamp(3.5rem, 8vw, 6rem)',
                      height: 'clamp(3.5rem, 8vw, 6rem)',
                      background: `linear-gradient(160deg, white 40%, ${step.color}15)`,
                      boxShadow: `0 4px 20px ${step.color}15`,
                    }}>
                    <span className="text-2xl sm:text-3xl md:text-4xl">{step.icon}</span>
                  </div>
                  <span className="font-display text-[10px] sm:text-xs md:text-sm text-blue-950/70 font-black whitespace-nowrap">{step.title}</span>
                </motion.div>
                {i < 3 && (
                  <span className="text-blue-300/20 text-sm md:text-base font-light mt-4 sm:mt-5 md:mt-7">→</span>
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Daily Hydration Moments ── */}
        <div className="flex flex-col items-center gap-6 w-full">
          <motion.p
            className="font-cursive text-xl md:text-2xl text-blue-500/80 font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}>
            {boostContent.momentsLabel}
          </motion.p>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}>
            {moments.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * i, duration: 0.35 }}
                whileHover={{ scale: 1.04, y: -4 }}
                className="flex flex-col items-center text-center gap-2 md:gap-4 py-5 md:py-10 px-4 md:px-8 rounded-2xl cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: `0 3px 20px ${m.color}08, inset 0 0 0 1px rgba(255,255,255,0.4)`,
                }}>
                <span className="text-2xl md:text-5xl">{m.icon}</span>
                <h3 className="font-display text-xs md:text-base text-blue-950 font-black">{m.title}</h3>
                <p className="font-body text-[9px] md:text-xs text-blue-800/70 leading-snug px-1 font-medium">{m.sub}</p>
                <span className="font-label text-[9px] md:text-[10px] font-extrabold px-3 py-1 rounded-full"
                  style={{ color: m.color, background: `${m.color}08` }}>{m.when}</span>
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