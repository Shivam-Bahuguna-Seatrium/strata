'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { BRAND } from '@/config/flavors';

const ingredients = [
  {
    name: 'Sodium (Na)',
    desc: 'Maintains blood volume, supports nerve signaling, and retains fluid in circulation. The foundation of proper hydration.',
    icon: 'Na',
    iconType: 'symbol' as const,
    color: '#00E5FF',
    amount: '500mg',
    benefits: ['Blood volume regulation', 'Nerve signal support', 'Fluid retention'],
  },
  {
    name: 'Potassium (K)',
    desc: 'Regulates fluid inside cells and supports muscle and nerve function. Essential for intracellular hydration balance.',
    icon: 'K',
    iconType: 'symbol' as const,
    color: '#FF1493',
    amount: '200mg',
    benefits: ['Intracellular fluid', 'Muscle function', 'Nerve regulation'],
  },
  {
    name: 'Magnesium (Mg)',
    desc: 'Supports muscle relaxation, energy production (ATP), and nerve stability. The anti-cramp, anti-fatigue mineral.',
    icon: 'Mg',
    iconType: 'symbol' as const,
    color: '#00FF00',
    amount: '80mg',
    benefits: ['Muscle relaxation', 'ATP energy production', 'Nerve stability'],
  },
  {
    name: 'Coconut Water Extract',
    desc: "Nature's perfect isotonic drink. Natural minerals and cytokines for deep cellular hydration developed over millennia.",
    icon: '\ud83e\udd65',
    iconType: 'emoji' as const,
    color: '#FFD700',
    amount: 'Natural',
    benefits: ['Deep hydration', 'Natural isotonic', 'Rapid absorption'],
  },
  {
    name: 'Vitamin C + B Complex',
    desc: 'B6, B12, and C vitamins support energy metabolism and immune defense. Complete daily micronutrient coverage.',
    icon: '\ud83d\udc8a',
    iconType: 'emoji' as const,
    color: '#FF5F00',
    amount: '100% DV',
    benefits: ['Energy metabolism', 'Immune defense', 'Antioxidant shield'],
  },
  {
    name: 'Anti-Inflammatory Blend',
    desc: 'Ginger, Turmeric, and Curcumin reduce muscle soreness and accelerate recovery. Science-backed natural compounds.',
    icon: '\ud83d\udd25',
    iconType: 'emoji' as const,
    color: '#00FFFF',
    amount: 'Clinical',
    benefits: ['DOMS reduction', 'Faster recovery', 'Anti-inflammatory'],
  },
];

function IngredientCard({ ing, i }: { ing: typeof ingredients[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.1, duration: 0.6 }}
      className="relative rounded-2xl overflow-hidden group cursor-default h-full card-solid"
      style={{
        background: `linear-gradient(155deg, ${ing.color}34 0%, ${ing.color}20 38%, rgba(255,255,255,0.93) 100%)`,
        border: `2px solid ${ing.color}40`,
        padding: '26px 22px',
        minHeight: '320px',
      }}
      whileHover={{ y: -8, boxShadow: `0 24px 60px ${ing.color}30` }}>

      <div className="absolute inset-x-0 bottom-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, ${ing.color}, transparent)` }} />

      {/* Icon: chemical symbol or emoji */}
      {ing.iconType === 'symbol' ? (
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-4 font-black text-2xl md:text-3xl"
          style={{ background: `${ing.color}20`, border: `2px solid ${ing.color}50`, color: ing.color }}>
          {ing.icon}
        </div>
      ) : (
        <div className="text-5xl md:text-6xl mb-4">{ing.icon}</div>
      )}

      {/* Amount badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black mb-3"
        style={{ background: `${ing.color}20`, color: ing.color }}>
        {ing.amount}
      </div>

      <h3 className="font-display text-xl md:text-2xl font-bold text-blue-900 mb-3">{ing.name}</h3>
      <p className="text-sm md:text-base text-blue-700 leading-relaxed mb-5">{ing.desc}</p>

      <div className="space-y-2">
        {ing.benefits.map((benefit, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: ing.color }} />
            <span className="text-xs md:text-sm text-blue-800 font-medium">{benefit}</span>
          </div>
        ))}
      </div>

      <motion.div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: `radial-gradient(circle at top left, ${ing.color}08, transparent 70%)` }} />
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
            <span className="inline-block text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-5 px-4 py-2 rounded-full"
              style={{ color: '#0077FF', background: 'rgba(0,119,255,0.12)', border: '1px solid rgba(0,119,255,0.3)' }}>
              Electrolyte Science
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-900 mb-4 md:mb-6 leading-tight">
              Every Molecule<br />
              <span style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundImage: 'linear-gradient(90deg, #00D4FF, #FF1493)' }}>
                Has a Purpose
              </span>
            </h2>
            <p className="text-base md:text-lg text-blue-700 max-w-2xl mx-auto">
              Your body is 60% water. {BRAND.science} Here is exactly what goes into every STRATA serve.
            </p>
          </motion.div>

          {/* Electrolyte quick-reference bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-3 mb-8 max-w-2xl mx-auto">
            {BRAND.electrolytes.map((el) => (
              <div key={el.symbol} className="text-center py-3 rounded-xl underwater-card-strong" style={{ border: '1px solid rgba(0,119,255,0.2)' }}>
                <div className="text-2xl font-black text-blue-900">{el.symbol}</div>
                <div className="text-xs text-blue-600 font-semibold">{el.name}</div>
              </div>
            ))}
          </motion.div>

          <div className="relative">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="text-xs font-semibold tracking-widest uppercase text-blue-800/60">{ingredients.length} active compounds</div>
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
                style={{ background: 'linear-gradient(135deg, #FF8C00, #FF1493)' }}
              >
                &rarr;
              </button>
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