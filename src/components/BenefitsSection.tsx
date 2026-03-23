'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { BRAND } from '@/config/flavors';

const benefits = [
  { icon: '\u26a1', title: 'Rapid Absorption', desc: 'Electrolytes enter your bloodstream quickly. Real energy from proper hydration \u2014 not sugar spikes.', stat: 'Na+K', statLabel: 'electrolyte duo', color: '#00E5FF', science: 'Na + K restore nerve signaling' },
  { icon: '\ud83d\udca7', title: 'Deep Hydration', desc: 'Your body is 60% water. Sodium retains fluid in circulation while Potassium regulates fluid inside cells.', stat: '60%', statLabel: 'of your body is water', color: '#FF1493', science: 'Intracellular fluid balance' },
  { icon: '\ud83e\udde0', title: 'Mental Clarity', desc: 'Mild dehydration causes brain fog, headaches, and irritability. Proper electrolytes help restore concentration.', stat: 'Mg', statLabel: 'supports focus', color: '#00FF00', science: 'Mg supports nerve stability' },
  { icon: '\ud83d\udd04', title: 'Muscle Support', desc: 'Potassium regulates muscle function. Magnesium supports muscle relaxation and energy production (ATP).', stat: 'K+Mg', statLabel: 'muscle support', color: '#FFD700', science: 'K regulates muscle function' },
  { icon: '\ud83d\udeab', title: 'Zero Sugar', desc: `${BRAND.antiSugar} No glucose spikes, no crashes. Just proper electrolyte hydration.`, stat: '0g', statLabel: 'sugar per serve', color: '#00FFFF', science: 'No insulin spike = sustained energy' },
];

function BenefitCard({ b, i }: { b: typeof benefits[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.1, duration: 0.6 }}
      className="relative rounded-2xl overflow-hidden group cursor-default h-full"
      style={{
        background: `linear-gradient(155deg, ${b.color}10 0%, rgba(255,255,255,0.98) 50%, rgba(255,255,255,0.95) 100%)`,
        padding: '36px 32px',
        minHeight: '340px',
        borderRadius: '20px',
      }}
      whileHover={{ y: -6, boxShadow: `0 12px 36px ${b.color}12` }}>
      
      <div className="absolute inset-x-0 bottom-0 h-[1.5px] opacity-40"
        style={{ background: `linear-gradient(90deg, ${b.color}50, transparent)` }} />

      <div className="text-4xl md:text-5xl mb-5">{b.icon}</div>
      <div className="flex items-end gap-3 mb-3">
        <span className="font-display text-4xl md:text-5xl leading-none" style={{ color: b.color }}>{b.stat}</span>
        <span className="font-body text-xs text-blue-600 pb-2">{b.statLabel}</span>
      </div>
      <h3 className="font-display text-lg md:text-xl text-blue-900 mt-3 mb-3">{b.title}</h3>
      <p className="font-body text-sm text-blue-700/80 leading-relaxed mb-4">{b.desc}</p>

      {/* Science tag - light, no heavy box */}
      <span className="font-label inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px]"
        style={{ background: `${b.color}10`, color: b.color }}>
        \ud83d\udd2c {b.science}
      </span>

      <motion.div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: `radial-gradient(circle at top left, ${b.color}06, transparent 70%)` }} />
    </motion.div>
  );
}

export default function BenefitsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollCards = (dir: 1 | -1) => {
    if (!sliderRef.current) return;
    const amount = sliderRef.current.clientWidth * 0.85;
    sliderRef.current.scrollBy({ left: amount * dir, behavior: 'smooth' });
  };

  return (
    <section id="benefits" className="relative section-shell underwater-bg wave-divider">
      <div className="section-inner">
          <motion.div className="section-header"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="font-label inline-block mb-5 px-4 py-2 rounded-full"
              style={{ color: '#0077FF', background: 'rgba(0,119,255,0.06)' }}>
              The Science of Hydration
            </span>
            <h2  className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-blue-900 mb-6 md:mb-8 leading-tight text-center">
              Real Hydration.<br />
              <span className="gradient-neon">Not Sugar Drama.</span>
            </h2>
            <p className="font-body text-base md:text-lg text-blue-700/75 max-w-2xl mx-auto text-center">
              {BRAND.positioning}
            </p>
          </motion.div>

          <div className="relative">
            <div className="flex items-center justify-between gap-3 mb-5">
              <span className="font-label text-blue-600/50">{benefits.length} benefits</span>
              <div className="flex items-center gap-2">
                <button onClick={() => scrollCards(-1)}
                  className="w-9 h-9 rounded-full text-white font-bold text-sm"
                  style={{ background: 'linear-gradient(135deg, #0077FF, #00D4FF)' }}>&larr;</button>
                <button onClick={() => scrollCards(1)}
                  className="w-9 h-9 rounded-full text-white font-bold text-sm"
                  style={{ background: 'linear-gradient(135deg, #FF1493, #FF5F00)' }}>&rarr;</button>
              </div>
            </div>

            <div ref={sliderRef} className="slider-track">
              {benefits.map((b, i) => (
                <div key={b.title} className="snap-start shrink-0 w-[88%] sm:w-[64%] lg:w-[33%] xl:w-[30%]">
                  <BenefitCard b={b} i={i} />
                </div>
              ))}
            </div>
          </div>
      </div>
    </section>
  );
}