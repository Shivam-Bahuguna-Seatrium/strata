'use client';

import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section className="relative section-shell overflow-hidden underwater-bg wave-divider">
      {/* Deep ocean ripple background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[0, 1, 2, 3, 4].map(i => (
          <motion.div
            key={i}
            animate={{ scale: [0.6, 2.5], opacity: [0.2, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, delay: i * 0.9, ease: 'easeOut' }}
            className="absolute w-80 h-80 rounded-full"
            style={{ border: '1px solid rgba(0,119,255,0.25)' }}
          />
        ))}
        <div className="absolute w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(0,119,255,0.14) 0%, transparent 70%)' }} />
        <div className="absolute w-[300px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.16) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 section-inner text-center">
        <div className="w-full max-w-5xl mx-auto underwater-card-strong rounded-3xl px-6 py-10 md:px-12 md:py-14 lg:px-14 lg:py-16">
        {/* Mascot */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-auto mb-12 w-20 h-20 flex items-center justify-center"
        >
          <svg width="72" height="90" viewBox="0 0 80 100" fill="none">
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
          className="space-y-9 md:space-y-11"
        >
          <h2 className="font-display text-5xl md:text-7xl font-extrabold leading-[0.95]">
            <span className="text-blue-900">Upgrade Your</span>
            <br />
            <span className="gradient-text-coral">Hydration Game</span>
          </h2>
          <div className="h-4"></div>

          <p className="text-blue-800/80 text-xl max-w-lg mx-auto leading-relaxed">
            Join 50,000+ people who chose smarter hydration.
            Your body will thank you.
          </p>
          <div className="h-4"></div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="#product"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="inline-block px-14 py-5 rounded-full text-lg font-black text-white glow-coral transition-all"
              style={{ background: 'linear-gradient(135deg, #0077FF 0%, #00D4FF 56%, #FF1493 100%)' }}
            >
              Buy STRATA Hydration →
            </motion.a>
            <p className="text-blue-800/70 text-sm">Free shipping · 30-day guarantee</p>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
