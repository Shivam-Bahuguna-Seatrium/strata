'use client';

import { motion } from 'framer-motion';
import { BRAND } from '@/config/flavors';

const scienceFacts = [
  {
    title: 'Your Body Is 60% Water',
    desc: 'Water is distributed between intracellular fluid (inside cells) and extracellular fluid (blood plasma and interstitial fluid). Electrolytes maintain this balance.',
    icon: '💧',
    color: '#00E5FF',
  },
  {
    title: 'Sugar ≠ Energy',
    desc: `${BRAND.antiSugar} Sugar provides a temporary glucose spike followed by a crash. It does not correct electrolyte imbalance or support sustained hydration.`,
    icon: '🚫',
    color: '#FF1493',
  },
  {
    title: 'Electrolytes Lock It In',
    desc: "Water alone isn't enough. Sodium retains fluid in circulation. Potassium regulates fluid inside cells. Magnesium supports energy production (ATP).",
    icon: '🔬',
    color: '#0077FF',
  },
];

export default function SocialProof() {
  return (
    <section id="reviews" className="relative section-shell overflow-hidden underwater-bg wave-divider">
      <div className="section-inner">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="section-header">
          <span className="font-label inline-block mb-5 px-4 py-2 rounded-full"
            style={{ color: '#0077FF', background: 'rgba(0,119,255,0.06)' }}>
            The Science
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-blue-900 mb-6 md:mb-8 leading-tight text-center">
            Real Science.<br />
            <span className="gradient-neon">Not Marketing Hype.</span>
          </h2>
          <p className="font-body text-base md:text-lg text-blue-700/75 max-w-2xl mx-auto px-2 text-center">
            {BRAND.positioning}
          </p>
        </motion.div>

        {/* Science facts grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-14 md:mb-20">
          {scienceFacts.map((fact, i) => (
            <motion.div
              key={fact.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="rounded-2xl p-7 md:p-10"
              style={{
                background: `linear-gradient(155deg, ${fact.color}08 0%, rgba(255,255,255,0.98) 50%)`,
              }}>
              <div className="text-4xl md:text-5xl mb-5 text-center">{fact.icon}</div>
              <h3 className="font-display text-lg md:text-xl text-blue-900 mb-3 text-center">{fact.title}</h3>
              <p className="font-body text-sm md:text-base text-blue-700/75 leading-relaxed text-center">{fact.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}