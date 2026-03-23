'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { BRAND } from '@/config/flavors';

const ingredients = [
  { name: 'Sodium (Na)', desc: 'Maintains blood volume, supports nerve signaling, and retains fluid in circulation.', icon: 'Na', iconType: 'symbol' as const, color: '#00E5FF', amount: '500mg', benefits: ['Blood volume', 'Nerve signals', 'Fluid retention'] },
  { name: 'Potassium (K)', desc: 'Regulates fluid inside cells and supports muscle and nerve function.', icon: 'K', iconType: 'symbol' as const, color: '#FF1493', amount: '200mg', benefits: ['Intracellular fluid', 'Muscle function', 'Nerve regulation'] },
  { name: 'Magnesium (Mg)', desc: 'Supports muscle relaxation, energy production (ATP), and nerve stability.', icon: 'Mg', iconType: 'symbol' as const, color: '#00FF00', amount: '80mg', benefits: ['Muscle relaxation', 'ATP production', 'Nerve stability'] },
  { name: 'Coconut Water', desc: "Nature's perfect isotonic drink. Natural minerals for deep cellular hydration.", icon: '\ud83e\udd65', iconType: 'emoji' as const, color: '#FFD700', amount: 'Natural', benefits: ['Deep hydration', 'Natural isotonic', 'Rapid absorption'] },
];

function IngredientCard({ ing, i }: { ing: typeof ingredients[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.1, duration: 0.6 }}
      className="relative rounded-2xl overflow-hidden group cursor-default h-full"
      style={{
        background: `linear-gradient(155deg, ${ing.color}10 0%, rgba(255,255,255,0.98) 50%, rgba(255,255,255,0.95) 100%)`,
        padding: '36px 32px',
        minHeight: '340px',
        borderRadius: '20px',
      }}
      whileHover={{ y: -6, boxShadow: `0 12px 36px ${ing.color}12` }}>

      <div className="absolute inset-x-0 bottom-0 h-[1.5px] opacity-40"
        style={{ background: `linear-gradient(90deg, ${ing.color}50, transparent)` }} />

      {ing.iconType === 'symbol' ? (
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-4 font-display text-xl md:text-2xl"
          style={{ background: `${ing.color}08`, color: ing.color }}>
          {ing.icon}
        </div>
      ) : (
        <div className="text-4xl md:text-5xl mb-4">{ing.icon}</div>
      )}

      <span className="font-label inline-block text-[10px] px-3 py-1 rounded-full mb-3"
        style={{ background: `${ing.color}12`, color: ing.color }}>
        {ing.amount}
      </span>

      <h3 className="font-display text-lg md:text-xl text-blue-900 mb-3">{ing.name}</h3>
      <p className="font-body text-sm text-blue-700/75 leading-relaxed mb-5">{ing.desc}</p>

      <div className="space-y-2">
        {ing.benefits.map((benefit, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: ing.color }} />
            <span className="font-body text-xs text-blue-700/70">{benefit}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function IngredientsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollCards = (dir: 1 | -1) => {
    if (!sliderRef.current) return;
    const amount = sliderRef.current.clientWidth * 0.85;
    sliderRef.current.scrollBy({ left: amount * dir, behavior: 'smooth' });
  };

  return (
    <section id="ingredients" className="relative section-shell underwater-bg wave-divider">
      <div className="section-inner">
          <motion.div className="section-header"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="font-label inline-block mb-5 px-4 py-2 rounded-full"
              style={{ color: '#0077FF', background: 'rgba(0,119,255,0.06)' }}>
              Electrolyte Science
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-blue-900 mb-6 md:mb-8 leading-tight text-center">
              Every Molecule<br />
              <span className="gradient-neon">Has a Purpose</span>
            </h2>
            <p className="font-body text-base md:text-lg text-blue-700/75 max-w-2xl mx-auto text-center">
              Your body is 60% water. {BRAND.science}
            </p>
          </motion.div>

          {/* Electrolyte quick-reference - clean inline, no heavy box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center gap-6 md:gap-10 mb-10">
            {BRAND.electrolytes.map((el) => (
              <div key={el.symbol} className="text-center">
                <div className="font-display text-2xl md:text-3xl text-blue-900">{el.symbol}</div>
                <div className="font-label text-[10px] text-blue-500 mt-1">{el.name}</div>
              </div>
            ))}
          </motion.div>

          <div className="relative">
            <div className="flex items-center justify-between gap-3 mb-5">
              <span className="font-label text-blue-600/50">{ingredients.length} key ingredients</span>
              <div className="flex items-center gap-2">
                <button onClick={() => scrollCards(-1)}
                  className="w-9 h-9 rounded-full text-white font-bold text-sm"
                  style={{ background: 'linear-gradient(135deg, #0077FF, #00D4FF)' }}>&larr;</button>
                <button onClick={() => scrollCards(1)}
                  className="w-9 h-9 rounded-full text-white font-bold text-sm"
                  style={{ background: 'linear-gradient(135deg, #FF8C00, #FF1493)' }}>&rarr;</button>
              </div>
            </div>

            <div ref={sliderRef} className="slider-track">
              {ingredients.map((ing, i) => (
                <div key={ing.name} className="snap-start shrink-0 w-[88%] sm:w-[64%] lg:w-[33%] xl:w-[30%]">
                  <IngredientCard ing={ing} i={i} />
                </div>
              ))}
            </div>
          </div>
      </div>
    </section>
  );
}