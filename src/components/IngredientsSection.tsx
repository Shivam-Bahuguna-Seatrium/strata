'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

const ingredients = [
  {
    name: 'Electrolytes (Na/K)',
    desc: 'Sodium & Potassium blend. Replaces what you sweat. Activates hydration absorption instantly.',
    icon: '⚡',
    color: '#00E5FF',
    benefits: ['Instant rehydration', 'Muscle function', 'Nerve signaling']
  },
  {
    name: 'Coconut Water',
    desc: 'Natural minerals and cytokines. Nature\'s perfect hydration formula developed over millennia.',
    icon: '🥥',
    color: '#FF1493',
    benefits: ['Deep hydration', 'Natural isotonic', 'Rapid absorption']
  },
  {
    name: 'Lion\'s Mane',
    desc: 'Medicinal mushroom compound. Sharpens cognitive function and supports neuroplasticity naturally.',
    icon: '🦁',
    color: '#00FF00',
    benefits: ['Mental clarity', 'Focus enhancement', 'Brain health']
  },
  {
    name: 'Adaptogens Blend',
    desc: 'Rhodiola, Ashwagandha, Cordyceps. Reduce stress, boost energy, enhance endurance scientifically.',
    icon: '🌿',
    color: '#FFD700',
    benefits: ['Stress reduction', 'Energy boost', 'Endurance']
  },
  {
    name: 'Vitamin Complex',
    desc: 'B6, B12, C vitamins. Supports energy metabolism and immune system. Complete daily coverage.',
    icon: '💊',
    color: '#FF5F00',
    benefits: ['Energy metabolism', 'Immunity', 'Antioxidant']
  },
  {
    name: 'Anti-Inflammatory Blend',
    desc: 'Ginger, Turmeric, Curcumin. Reduces muscle soreness and accelerates recovery naturally.',
    icon: '🔥',
    color: '#00FFFF',
    benefits: ['Muscle recovery', 'DOMS reduction', 'Anti-inflammatory']
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
        minHeight: '290px',
      }}
      whileHover={{ y: -8, boxShadow: `0 24px 60px ${ing.color}30` }}>

      <div className="absolute inset-x-0 bottom-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, ${ing.color}, transparent)` }} />

      <div className="text-5xl md:text-6xl mb-4">{ing.icon}</div>

      <h3 className="font-display text-xl md:text-2xl font-bold text-blue-900 mb-3">{ing.name}</h3>
      <p className="text-sm md:text-base text-blue-700 leading-relaxed mb-6">{ing.desc}</p>

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
              Scientifically Formulated
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-900 mb-4 md:mb-6 leading-tight">
              Every Ingredient<br />
              <span style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundImage: 'linear-gradient(90deg, #00D4FF, #FF1493)' }}>
                Matters
              </span>
            </h2>
            <p className="text-base md:text-lg text-blue-700 max-w-2xl mx-auto">
              Six premium ingredients. Zero fillers. Pure science in every bottle.
            </p>
          </motion.div>

          <div className="relative">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="text-xs font-semibold tracking-widest uppercase text-blue-800/60">6 premium ingredients · Swipe to explore</div>
              <div className="flex items-center gap-2">
              <button
                onClick={() => scrollCards(-1)}
                className="w-9 h-9 rounded-full text-white font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, #0077FF, #00D4FF)' }}
              >
                ←
              </button>
              <button
                onClick={() => scrollCards(1)}
                className="w-9 h-9 rounded-full text-white font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, #FF8C00, #FF1493)' }}
              >
                →
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
