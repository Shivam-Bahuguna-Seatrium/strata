'use client';

import { motion } from 'framer-motion';
import { getActiveFlavors, BRAND } from '@/config/flavors';

export default function CTASection() {
  const flavorCount = getActiveFlavors().length;

  return (
    <section className="relative section-shell overflow-hidden underwater-bg wave-divider">
      {/* Background ripples */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[0, 1, 2, 3, 4].map(i => (
          <motion.div
            key={i}
            animate={{ scale: [0.6, 2.5], opacity: [0.15, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, delay: i * 0.9, ease: 'easeOut' }}
            className="absolute w-80 h-80 rounded-full"
            style={{ border: '1px solid rgba(0,119,255,0.15)' }}
          />
        ))}
        <div className="absolute w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(0,119,255,0.1) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 section-inner text-center">
        <div className="w-full max-w-4xl mx-auto px-6 py-12 md:px-12 md:py-16">
        {/* Mascot */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-auto mb-10 w-20 h-20 flex items-center justify-center"
        >
          <svg width="64" height="80" viewBox="0 0 80 100" fill="none">
            <path d="M40 5C40 5 10 45 10 65C10 82 23 95 40 95C57 95 70 82 70 65C70 45 40 5 40 5Z"
              fill="url(#ctaGrad)" />
            <ellipse cx="27" cy="60" rx="11" ry="8" fill="#051A2E" />
            <ellipse cx="53" cy="60" rx="11" ry="8" fill="#051A2E" />
            <ellipse cx="24" cy="57" rx="5" ry="3" fill="rgba(0,200,255,0.35)" />
            <ellipse cx="50" cy="57" rx="5" ry="3" fill="rgba(0,200,255,0.35)" />
            <path d="M30 58 Q40 54 50 58" stroke="#051A2E" strokeWidth="3" fill="none"/>
            <path d="M32 72 Q40 79 48 72" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            <defs>
              <linearGradient id="ctaGrad" x1="40" y1="5" x2="40" y2="95" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#00C8FF" />
                <stop offset="55%" stopColor="#38BEFF" />
                <stop offset="100%" stopColor="#0066CC" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-blue-900 leading-[1]">
            {BRAND.subTagline}<br />
            <span className="gradient-neon">{BRAND.tagline}</span>
          </h2>

          <p className="font-body text-lg md:text-xl text-blue-800/70 max-w-xl mx-auto leading-relaxed">
            {BRAND.antiSugar} {BRAND.science}
          </p>

          {/* Dehydration effects - clean tags, no heavy boxes */}
          <div className="flex flex-wrap justify-center gap-2.5 max-w-2xl mx-auto">
            {BRAND.dehydrationEffects.map((effect) => (
              <span key={effect} className="font-label px-4 py-2 rounded-full text-[11px]"
                style={{ background: 'rgba(255,20,147,0.08)', color: '#FF1493', border: '1px solid rgba(255,20,147,0.2)' }}>
                {effect}
              </span>
            ))}
          </div>

          <p className="font-body text-blue-600/70 text-base max-w-lg mx-auto">
            Join {BRAND.stats.users} people who chose science over sugar. {flavorCount} flavors. Zero compromise.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <motion.a
              href="#product"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-block px-12 py-4 rounded-2xl text-lg font-headline text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #0077FF 0%, #00D4FF 56%, #FF1493 100%)', boxShadow: '0 8px 30px rgba(0,119,255,0.35)' }}
            >
              Shop STRATA &rarr;
            </motion.a>
            <span className="font-body text-blue-700/50 text-sm">Free shipping &middot; 30-day guarantee</span>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}