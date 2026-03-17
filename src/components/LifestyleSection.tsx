'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { BRAND } from '@/config/flavors';

const moments = [
  { title: 'Pre-Workout', label: 'Fuel Up', emoji: '\ud83c\udfcb\ufe0f', desc: '30 min before training. Electrolytes prime your muscles and nervous system for peak output.', gradient: 'linear-gradient(180deg, rgba(255,20,147,0.25) 0%, rgba(255,255,255,0.95) 100%)', bg: 'linear-gradient(140deg, rgba(255,20,147,0.15), rgba(0,212,255,0.1))', science: 'Na preloads fluid retention' },
  { title: 'Morning Ritual', label: 'Wake Up', emoji: '\u2600\ufe0f', desc: "You wake up dehydrated. Replace coffee jitters with clean electrolyte energy that actually lasts.", gradient: 'linear-gradient(180deg, rgba(0,229,255,0.25) 0%, rgba(255,255,255,0.95) 100%)', bg: 'linear-gradient(140deg, rgba(0,229,255,0.15), rgba(0,200,255,0.1))', science: 'Overnight: ~500ml water lost' },
  { title: 'Race Day', label: 'Compete', emoji: '\ud83c\udfc3', desc: "Trusted by athletes for peak endurance. Electrolytes maintain performance when it matters most.", gradient: 'linear-gradient(180deg, rgba(0,255,0,0.25) 0%, rgba(255,255,255,0.95) 100%)', bg: 'linear-gradient(140deg, rgba(0,255,0,0.15), rgba(0,212,255,0.1))', science: '2% dehydration = 20% performance drop' },
  { title: 'Office Hours', label: 'Perform', emoji: '\ud83d\udcbc', desc: "Dehydration causes headaches, brain fog, and mood drops. Stay sharp through meetings and deadlines.", gradient: 'linear-gradient(180deg, rgba(255,215,0,0.25) 0%, rgba(255,255,255,0.95) 100%)', bg: 'linear-gradient(140deg, rgba(255,215,0,0.15), rgba(0,200,255,0.1))', science: 'Mild dehydration impairs cognition' },
  { title: 'Travel Day', label: 'Sustain', emoji: '\u2708\ufe0f', desc: "Cabin air humidity is ~20%. Beat travel fatigue with electrolytes that fit in any carry-on.", gradient: 'linear-gradient(180deg, rgba(255,95,0,0.25) 0%, rgba(255,255,255,0.95) 100%)', bg: 'linear-gradient(140deg, rgba(255,95,0,0.15), rgba(0,200,255,0.1))', science: 'Flying = accelerated dehydration' },
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
          <span className="inline-block text-sm font-bold tracking-[0.2em] uppercase mb-5 px-4 py-1.5 rounded-full"
            style={{ color: '#0077FF', background: 'rgba(0,119,255,0.12)', border: '1px solid rgba(0,119,255,0.25)' }}>
            Daily Hydration Moments
          </span>
          <h2 className="font-display text-5xl md:text-6xl font-extrabold text-blue-900">
            {BRAND.subTagline}<br />
            <span style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundImage: 'linear-gradient(90deg, #00D4FF, #0077FF)' }}>
              {BRAND.tagline}
            </span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="text-xs font-semibold tracking-widest uppercase text-blue-800/60">{moments.length} hydration moments</div>
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
            {moments.map((m, i) => (
              <div key={m.title} className="snap-start shrink-0 w-[88%] sm:w-[64%] lg:w-[33%] xl:w-[30%]">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="relative rounded-2xl overflow-hidden group cursor-default card-solid"
                  style={{ background: m.bg, border: '2px solid rgba(0,119,255,0.24)', minHeight: '350px' }}
                  whileHover={{ y: -6 }}
                >
                  <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-100 opacity-90"
                    style={{ background: m.gradient }} />
                  <div className="relative z-10 flex flex-col justify-between h-full p-7" style={{ minHeight: '350px' }}>
                    <motion.div className="text-6xl"
                      animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}>
                      {m.emoji}
                    </motion.div>
                    <div>
                      <div className="text-xs font-semibold tracking-widest uppercase text-blue-800/60 mb-2">{m.label}</div>
                      <div className="font-display text-2xl font-bold text-blue-900 mb-2">{m.title}</div>
                      <p className="text-sm text-blue-800/80 leading-relaxed mb-3">{m.desc}</p>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                        style={{ background: 'rgba(0,119,255,0.12)', color: '#0077FF', border: '1px solid rgba(0,119,255,0.3)' }}>
                        \ud83d\udd2c {m.science}
                      </div>
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