'use client';

import { motion } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';

const dailySteps = [
  {
    title: 'Mix The Strip',
    subtitle: 'Step 1',
    icon: '🧪',
    color: '#00E5FF',
    description: 'Pour 300-400 ml chilled water into a bottle, then add one STRATA strip and stir for 5-8 seconds until fully dissolved.',
  },
  {
    title: 'Let It Activate',
    subtitle: 'Step 2',
    icon: '⚡',
    color: '#FF1493',
    description: 'Wait for about 60 seconds after mixing. This gives the minerals and electrolytes time to blend evenly in the water.',
  },
  {
    title: 'Sip In 3 Rounds',
    subtitle: 'Step 3',
    icon: '🥤',
    color: '#00FF00',
    description: 'Drink in three intervals over 15-20 minutes instead of one gulp. This supports smoother absorption and steady energy.',
  },
  {
    title: 'Feel The Boost',
    subtitle: 'Step 4',
    icon: '🚀',
    color: '#FFD700',
    description: 'You should feel hydration, mental clarity, and light energy kick in shortly after. Use this before work, gym, or long tasks.',
  },
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
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="inline-block text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-5 px-4 py-2 rounded-full"
            style={{ color: '#0077FF', background: 'rgba(0,119,255,0.12)', border: '1px solid rgba(0,119,255,0.3)' }}
          >
            How to Use
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-900 mb-4">
            How to Use
            <span className="gradient-neon"> STRATA</span>
          </h2>
          <p className="text-blue-700 text-base md:text-lg max-w-2xl mx-auto">
            Simple, complete, and repeatable. Mix, activate, sip, and feel the boost.
          </p>
        </motion.div>

        <div className="underwater-card-strong rounded-2xl p-4 md:p-5 mb-5">
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className="text-blue-900 font-display text-lg md:text-xl font-bold">Completion Progress</div>
            <div className="text-blue-900 font-black text-xl">{progress}%</div>
          </div>
          <div className="h-2.5 rounded-full bg-blue-100 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
              style={{ background: 'linear-gradient(90deg, #0077FF, #FF8C00, #22C55E, #8B5CF6)' }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="text-xs font-semibold tracking-widest uppercase text-blue-800/60">4 steps to peak hydration · Swipe to explore</div>
          <div className="flex items-center gap-2">
            <button onClick={() => scrollCards(-1)} className="w-9 h-9 rounded-full text-white font-bold text-sm" style={{ background: 'linear-gradient(135deg,#0077FF,#00D4FF)' }}>←</button>
            <button onClick={() => scrollCards(1)} className="w-9 h-9 rounded-full text-white font-bold text-sm" style={{ background: 'linear-gradient(135deg,#22C55E,#8B5CF6)' }}>→</button>
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
              className="card-solid rounded-2xl p-4 md:p-5 snap-start shrink-0 w-[88%] sm:w-[66%] lg:w-[38%] xl:w-[30%]"
              style={{
                background: `linear-gradient(152deg, ${card.color}38 0%, ${card.color}20 42%, rgba(255,255,255,0.95) 100%)`,
                borderColor: `${card.color}88`,
                minHeight: '270px',
              }}
            >
              <div className="mb-5">
                <div className="text-xs font-semibold tracking-widest uppercase text-blue-800/70 mb-2">{card.subtitle}</div>
                <h3 className="font-display text-xl font-bold text-blue-900 flex items-center gap-2">
                  <span>{card.icon}</span>
                  <span>{card.title}</span>
                </h3>
              </div>

              <p className="text-sm md:text-[15px] text-blue-900/90 leading-relaxed mb-5">{card.description}</p>

              <button
                onClick={() => setDone((prev) => ({ ...prev, [card.title]: !prev[card.title] }))}
                className="w-full text-left rounded-xl px-3 py-2.5 transition-all"
                style={{
                  background: done[card.title] ? 'rgba(0,119,255,0.18)' : 'rgba(255,255,255,0.58)',
                  border: done[card.title] ? '1px solid rgba(0,119,255,0.45)' : '1px solid rgba(0,119,255,0.2)',
                }}
              >
                <span className="text-sm md:text-[15px] text-blue-900 font-semibold">{done[card.title] ? '✓ Step complete' : '○ Mark this step complete'}</span>
              </button>

              <div className="mt-3 text-xs text-blue-800/70 font-medium">
                {idx < dailySteps.length - 1 ? `Next: ${dailySteps[idx + 1].title}` : 'Routine complete. Repeat daily.'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
