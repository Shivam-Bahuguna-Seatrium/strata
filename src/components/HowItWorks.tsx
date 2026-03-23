'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

const steps = [
  { num: '01', title: 'Tear & Pour', desc: 'Tear open a STRATA stick pack. Pour into 300-400ml cold water. Electrolytes dissolve instantly.', icon: '\ud83e\uddea', color: '#00E5FF', science: 'Powder = faster dissolution than tablets' },
  { num: '02', title: 'Rapid Absorption', desc: 'Sodium and Potassium enter your bloodstream quickly. Cells begin rehydrating at the molecular level.', icon: '\u26a1', color: '#FF1493', science: 'Na drives osmotic absorption' },
  { num: '03', title: 'Baseline Restored', desc: 'Energy, focus, and mood return to peak. No sugar spike, no crash. Proper fluid balance.', icon: '\ud83d\ude80', color: '#00FF00', science: 'Electrolyte balance = nerve signaling' },
  { num: '04', title: 'Sustained Performance', desc: 'Magnesium supports muscle relaxation and energy production. Potassium regulates muscle function. Perform better, longer.', icon: '\ud83d\udcaa', color: '#FFD700', science: 'Mg + K = recovery + energy' },
];

function StepCard({ step, i }: { step: typeof steps[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: i * 0.15, duration: 0.6 }}
      className="relative rounded-2xl p-6 md:p-8"
      style={{
        background: `linear-gradient(150deg, ${step.color}08 0%, rgba(255,255,255,0.98) 50%)`,
        minHeight: '160px',
      }}>

      <div className="flex gap-5 md:gap-8 items-start">
        <div className="flex-shrink-0">
          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-3xl md:text-4xl"
            style={{
              background: `${step.color}08`,
            }}>
            {step.icon}
            <div className="absolute -bottom-1 -right-1 font-display text-xs md:text-sm" style={{ color: step.color }}>
              {step.num}
            </div>
          </div>
        </div>

        <div className="flex-1 pt-1">
          <h3 className="font-display text-lg md:text-xl text-blue-900 mb-2">{step.title}</h3>
          <p className="font-body text-sm text-blue-700/75 leading-relaxed mb-3">{step.desc}</p>
          <span className="font-label inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px]"
            style={{ background: `${step.color}10`, color: step.color }}>
            \ud83d\udd2c {step.science}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative section-shell underwater-bg wave-divider">
      <div className="section-inner">
          <motion.div className="section-header"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="font-label inline-block mb-5 px-4 py-2 rounded-full"
              style={{ color: '#00D4FF', background: 'rgba(0,212,255,0.06)' }}>
              The STRATA Effect
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-blue-900 mb-6 md:mb-8 leading-tight text-center">
              From Dehydrated<br />
              <span className="gradient-neon">To Peak Performance</span>
            </h2>
            <p className="font-body text-base md:text-lg text-blue-700/75 max-w-2xl mx-auto text-center">
              Proper hydration isn&apos;t about drinking more water. It&apos;s about locking it in with electrolytes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {steps.map((step, i) => (
              <StepCard key={step.num} step={step} i={i} />
            ))}
          </div>
      </div>
    </section>
  );
}