'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { BRAND } from '@/config/flavors';

const moments = [
  { title: 'Pre-Workout', label: 'Fuel Up', emoji: '\ud83c\udfcb\ufe0f', desc: '30 min before training. Electrolytes prime your muscles for peak output.', gradient: 'linear-gradient(180deg, rgba(255,20,147,0.15) 0%, rgba(255,255,255,0.98) 100%)', bg: 'linear-gradient(140deg, rgba(255,20,147,0.08), rgba(0,212,255,0.05))', science: 'Na preloads fluid retention' },
  { title: 'Morning Ritual', label: 'Wake Up', emoji: '\u2600\ufe0f', desc: 'You wake up dehydrated. Replace coffee jitters with clean energy that lasts.', gradient: 'linear-gradient(180deg, rgba(0,229,255,0.15) 0%, rgba(255,255,255,0.98) 100%)', bg: 'linear-gradient(140deg, rgba(0,229,255,0.08), rgba(0,200,255,0.05))', science: 'Overnight: ~500ml water lost' },
  { title: 'Race Day', label: 'Compete', emoji: '\ud83c\udfc3', desc: 'Trusted by athletes for peak endurance when it matters most.', gradient: 'linear-gradient(180deg, rgba(0,255,0,0.15) 0%, rgba(255,255,255,0.98) 100%)', bg: 'linear-gradient(140deg, rgba(0,255,0,0.08), rgba(0,212,255,0.05))', science: '2% dehydration = 20% performance drop' },
  { title: 'Office Hours', label: 'Perform', emoji: '\ud83d\udcbc', desc: 'Dehydration causes headaches and brain fog. Stay sharp through deadlines.', gradient: 'linear-gradient(180deg, rgba(255,215,0,0.15) 0%, rgba(255,255,255,0.98) 100%)', bg: 'linear-gradient(140deg, rgba(255,215,0,0.08), rgba(0,200,255,0.05))', science: 'Mild dehydration impairs cognition' },
  { title: 'Travel Day', label: 'Sustain', emoji: '\u2708\ufe0f', desc: 'Cabin air humidity is ~20%. Beat travel fatigue with electrolytes.', gradient: 'linear-gradient(180deg, rgba(255,95,0,0.15) 0%, rgba(255,255,255,0.98) 100%)', bg: 'linear-gradient(140deg, rgba(255,95,0,0.08), rgba(0,200,255,0.05))', science: 'Flying = accelerated dehydration' },
];

export default function LifestyleSection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollCards = (dir: 1 | -1) => {
    if (!sliderRef.current) return;
    const amount = sliderRef.current.clientWidth * 0.85;
    sliderRef.current.scrollBy({ left: amount * dir, behavior: 'smooth' });
  };

  return (
    <section id="lifestyle" className="relative section-shell underwater-bg wave-divider">
      <div className="section-inner">
        <motion.div className="section-header"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="font-label inline-block mb-5 px-4 py-2 rounded-full"
            style={{ color: '#0077FF', background: 'rgba(0,119,255,0.08)', border: '1px solid rgba(0,119,255,0.2)' }}>
            Daily Hydration
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-blue-900 mb-5">
            {BRAND.subTagline}<br />
            <span className="gradient-neon">{BRAND.tagline}</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="flex items-center justify-between gap-3 mb-5">
            <span className="font-label text-blue-600/50">{moments.length} moments</span>
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
            {moments.map((m, i) => (
              <div key={m.title} className="snap-start shrink-0 w-[88%] sm:w-[64%] lg:w-[33%] xl:w-[30%]">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="relative rounded-2xl overflow-hidden group cursor-default"
                  style={{ background: m.bg, border: '1.5px solid rgba(0,119,255,0.15)', minHeight: '340px' }}
                  whileHover={{ y: -6 }}
                >
                  <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-100 opacity-90"
                    style={{ background: m.gradient }} />
                  <div className="relative z-10 flex flex-col justify-between h-full p-7" style={{ minHeight: '340px' }}>
                    <motion.div className="text-5xl"
                      animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}>
                      {m.emoji}
                    </motion.div>
                    <div>
                      <span className="font-label text-[10px] text-blue-600/60 mb-2 block">{m.label}</span>
                      <h3 className="font-display text-xl md:text-2xl text-blue-900 mb-2">{m.title}</h3>
                      <p className="font-body text-sm text-blue-700/70 leading-relaxed mb-3">{m.desc}</p>
                      <span className="font-label inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px]"
                        style={{ background: 'rgba(0,119,255,0.08)', color: '#0077FF' }}>
                        \ud83d\udd2c {m.science}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}