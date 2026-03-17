'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { BRAND } from '@/config/flavors';

const benefits = [
  { icon: '⚡', title: 'Instant Energy', desc: 'Electrolytes hit your bloodstream in under 15 minutes. Real energy from proper hydration — not sugar spikes.', stat: '15', statLabel: 'min to kick in', color: '#00E5FF', science: 'Na + K restore nerve signaling' },
  { icon: '💧', title: 'Deep Hydration', desc: 'Your body is 60% water. Coconut water and sea minerals transport hydration deeper into cells than water alone.', stat: '3\u00d7', statLabel: 'better absorption', color: '#FF1493', science: 'Intracellular fluid balance' },
  { icon: '🧠', title: 'Mental Clarity', desc: 'Mild dehydration causes brain fog, headaches, and irritability. Proper electrolytes restore concentration fast.', stat: '40%', statLabel: 'focus increase', color: '#00FF00', science: 'Mg supports nerve stability' },
  { icon: '🔄', title: 'Fast Recovery', desc: 'Anti-inflammatory blend reduces muscle fatigue and DOMS. Train harder, bounce back faster — without the sugar crash.', stat: '2\u00d7', statLabel: 'faster recovery', color: '#FFD700', science: 'K regulates muscle function' },
  { icon: '🛡\ufe0f', title: 'Immune Shield', desc: 'Zinc, Vitamin C, and antioxidants form a daily shield. Your immune system at peak — every single day.', stat: '100%', statLabel: 'daily vitamin C', color: '#FF5F00', science: 'Antioxidant defense system' },
  { icon: '🚫', title: 'Zero Sugar', desc: `${BRAND.antiSugar} No glucose spikes, no crashes. Just pure bioavailable nutrients your body actually needs.`, stat: '0g', statLabel: 'sugar per serve', color: '#00FFFF', science: 'No insulin spike = sustained energy' },
];

function BenefitCard({ b, i }: { b: typeof benefits[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.1, duration: 0.6 }}
      className="relative rounded-2xl overflow-hidden group cursor-default h-full card-solid"
      style={{
        background: `linear-gradient(155deg, ${b.color}35 0%, ${b.color}20 38%, rgba(255,255,255,0.92) 100%)`,
        border: `2px solid ${b.color}40`,
        padding: '28px 22px',
        minHeight: '320px',
      }}
      whileHover={{ y: -8, boxShadow: `0 24px 60px ${b.color}30` }}>
      
      <div className="absolute inset-x-0 bottom-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, ${b.color}, transparent)` }} />

      <div className="text-5xl md:text-6xl mb-5">{b.icon}</div>
      <div className="flex items-end gap-3 mb-3">
        <span className="text-4xl md:text-5xl font-black leading-none" style={{ color: b.color }}>{b.stat}</span>
        <span className="text-xs md:text-sm font-medium text-blue-700 pb-2">{b.statLabel}</span>
      </div>
      <h3 className="font-display text-xl md:text-2xl font-bold text-blue-900 mt-3 mb-3">{b.title}</h3>
      <p className="text-sm md:text-base text-blue-700 leading-relaxed mb-4">{b.desc}</p>

      {/* Science tag */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
        style={{ background: `${b.color}18`, color: b.color, border: `1px solid ${b.color}40` }}>
        <span>🔬</span> {b.science}
      </div>

      <motion.div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: `radial-gradient(circle at top left, ${b.color}08, transparent 70%)` }} />
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
            <span className="inline-block text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-5 px-4 py-2 rounded-full"
              style={{ color: '#0077FF', background: 'rgba(0,119,255,0.12)', border: '1px solid rgba(0,119,255,0.3)' }}>
              The Science of Hydration
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-900 mb-4 md:mb-6 leading-tight">
              Real Hydration.<br />
              <span style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundImage: 'linear-gradient(90deg, #00D4FF, #0077FF)' }}>
                Not Sugar Drama.
              </span>
            </h2>
            <p className="text-base md:text-lg text-blue-700 max-w-2xl mx-auto">
              {BRAND.positioning}
            </p>
          </motion.div>

          <div className="relative">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="text-xs font-semibold tracking-widest uppercase text-blue-800/60">{benefits.length} science-backed benefits</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollCards(-1)}
                  className="w-9 h-9 rounded-full text-white font-bold text-sm"
                  style={{ background: 'linear-gradient(135deg, #0077FF, #00D4FF)' }}
                >
                  &larr;
                </button>
                <button
                  onClick={() => scrollCards(1)}
                  className="w-9 h-9 rounded-full text-white font-bold text-sm"
                  style={{ background: 'linear-gradient(135deg, #FF1493, #FF5F00)' }}
                >
                  &rarr;
                </button>
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