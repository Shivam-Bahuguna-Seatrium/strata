'use client';

import { motion } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';

const dailySteps = [
  { title: 'Mix The Strip', subtitle: 'Step 1', icon: '\ud83e\uddea', color: '#00E5FF', description: 'Pour 300-400ml chilled water, add one STRATA strip and stir for 5-8 seconds until dissolved.' },
  { title: 'Let It Activate', subtitle: 'Step 2', icon: '\u26a1', color: '#FF1493', description: 'Wait 60 seconds after mixing. This lets minerals and electrolytes blend evenly in the water.' },
  { title: 'Sip In 3 Rounds', subtitle: 'Step 3', icon: '\ud83e\udd64', color: '#00FF00', description: 'Drink in three intervals over 15-20 minutes. Smoother absorption and steady energy.' },
  { title: 'Feel The Boost', subtitle: 'Step 4', icon: '\ud83d\ude80', color: '#FFD700', description: 'Hydration, mental clarity, and light energy kick in shortly after. Use before work, gym, or long tasks.' },
];

export default function TaskFeature() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const sliderRef = useRef<HTMLDivElement>(null);

  const progress = useMemo(() => {
    const completed = dailySteps.filter((s) => done[s.title]).length;
    return Math.round((completed / dailySteps.length) * 100);
  }, [done]);

  const scrollCards = (dir: 1 | -1) => {
    if (!sliderRef.current) return;
    const amount = sliderRef.current.clientWidth * 0.82;
    sliderRef.current.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <section id="how-to-use" className="relative section-shell underwater-bg wave-divider">
      <div className="section-inner">
        <motion.div className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>
          <span className="font-label inline-block mb-5 px-4 py-2 rounded-full"
            style={{ color: '#0077FF', background: 'rgba(0,119,255,0.08)', border: '1px solid rgba(0,119,255,0.2)' }}>
            How to Use
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-blue-900 mb-5">
            How to Use <span className="gradient-neon">STRATA</span>
          </h2>
          <p className="font-body text-base md:text-lg text-blue-700/75 max-w-2xl mx-auto">
            Mix, activate, sip, and feel the boost. Simple and repeatable.
          </p>
        </motion.div>

        {/* Progress bar - clean, no heavy card */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="flex items-center justify-between gap-4 mb-2">
            <span className="font-headline text-sm text-blue-900">Progress</span>
            <span className="font-display text-lg text-blue-900">{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-blue-50 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
              style={{ background: 'linear-gradient(90deg, #0077FF, #00D4FF, #FF1493)' }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 mb-5">
          <span className="font-label text-blue-600/50">4 steps</span>
          <div className="flex items-center gap-2">
            <button onClick={() => scrollCards(-1)} className="w-9 h-9 rounded-full text-white font-bold text-sm" style={{ background: 'linear-gradient(135deg,#0077FF,#00D4FF)' }}>&larr;</button>
            <button onClick={() => scrollCards(1)} className="w-9 h-9 rounded-full text-white font-bold text-sm" style={{ background: 'linear-gradient(135deg,#22C55E,#8B5CF6)' }}>&rarr;</button>
          </div>
        </div>

        <div ref={sliderRef} className="slider-track">
          {dailySteps.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="rounded-2xl p-5 md:p-6 snap-start shrink-0 w-[88%] sm:w-[66%] lg:w-[38%] xl:w-[30%]"
              style={{
                background: `linear-gradient(152deg, ${card.color}12 0%, rgba(255,255,255,0.96) 50%)`,
                border: `1.5px solid ${card.color}25`,
                minHeight: '270px',
              }}
            >
              <div className="mb-4">
                <span className="font-label text-[10px] text-blue-600/60 mb-2 block">{card.subtitle}</span>
                <h3 className="font-display text-lg text-blue-900 flex items-center gap-2">
                  <span>{card.icon}</span>
                  <span>{card.title}</span>
                </h3>
              </div>

              <p className="font-body text-sm text-blue-700/75 leading-relaxed mb-5">{card.description}</p>

              <button
                onClick={() => setDone((prev) => ({ ...prev, [card.title]: !prev[card.title] }))}
                className="w-full text-left rounded-xl px-3 py-2.5 transition-all font-headline text-sm text-blue-900"
                style={{
                  background: done[card.title] ? 'rgba(0,119,255,0.1)' : 'rgba(255,255,255,0.6)',
                  border: done[card.title] ? '1px solid rgba(0,119,255,0.3)' : '1px solid rgba(0,119,255,0.12)',
                }}
              >
                {done[card.title] ? '\u2713 Complete' : '\u25cb Mark complete'}
              </button>

              <div className="mt-3 font-body text-xs text-blue-600/50">
                {idx < dailySteps.length - 1 ? `Next: ${dailySteps[idx + 1].title}` : 'Routine complete. Repeat daily.'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}