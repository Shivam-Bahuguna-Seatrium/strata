'use client';

import { motion } from 'framer-motion';
import { sipContent } from '@/config/siteContent';

const { steps, tips } = sipContent;

export default function SipSection() {
  return (
    <section id="how-to-use" className="relative flex flex-col items-center overflow-hidden px-8 sm:px-10 md:px-16 lg:px-20"
      style={{ background: 'linear-gradient(180deg, #F0FFF4 0%, #E6FFFA 50%, #CCFBF1 100%)' }}>

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
            style={{ color: '#10B981', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}>
            {sipContent.badge}
          </motion.span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-blue-950 leading-tight font-black uppercase tracking-tighter">
            {sipContent.heading}{' '}
            <span className="hero-line-script text-3xl sm:text-4xl md:text-5xl" style={{ textTransform: 'none' }}>{sipContent.headingAccent}</span>
          </h2>
          <p className="font-body text-base md:text-lg text-blue-800/70 font-semibold mt-6 max-w-lg tracking-tight">
            {sipContent.subtitle}
          </p>
        </motion.div>

        {/* ── 4-Step Process ── */}
        <div className="flex flex-col items-center gap-6 w-full">
          <motion.p
            className="font-cursive text-xl md:text-2xl text-emerald-600/80 font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}>
            {sipContent.stepsLabel}
          </motion.p>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}>
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * i, duration: 0.35 }}
                whileHover={{ scale: 1.04, y: -4 }}
                className="flex flex-col items-center text-center gap-2 md:gap-4 py-5 md:py-10 px-4 md:px-8 rounded-2xl cursor-default relative"
                style={{
                  background: 'rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: `0 3px 20px ${s.color}08, inset 0 0 0 1px rgba(255,255,255,0.4)`,
                }}>
                {/* Step number */}
                <span className="font-label text-[10px] font-extrabold tracking-widest absolute top-3 right-3"
                  style={{ color: `${s.color}60` }}>{s.num}</span>
                <span className="text-2xl md:text-5xl">{s.icon}</span>
                <h3 className="font-display text-xs md:text-base text-blue-950 font-black">{s.title}</h3>
                <p className="font-body text-[10px] md:text-xs text-blue-800/70 leading-snug px-1 font-medium">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Pro Tips ── */}
        <div className="flex flex-col items-center gap-6 w-full">
          <motion.p
            className="font-cursive text-xl md:text-2xl text-emerald-600/80 font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}>
            {sipContent.tipsLabel}
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4 md:gap-5 w-full max-w-4xl"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}>
            {tips.map((t, i) => (
              <motion.div
                key={t.tip}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.07 * i, duration: 0.3 }}
                whileHover={{ scale: 1.06, y: -3 }}
                className="flex items-center gap-3 px-6 py-3 md:px-7 md:py-4 rounded-full cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.65)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: `0 3px 16px ${t.color}10, inset 0 0 0 1px rgba(255,255,255,0.5)`,
                }}>
                <span className="text-xl md:text-2xl">{t.icon}</span>
                <span className="font-display text-xs md:text-sm text-blue-950 font-black">{t.tip}</span>
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
