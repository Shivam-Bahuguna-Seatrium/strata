'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Sip STRATA Bottle',
    desc: 'Crack open an ice-cold bottle of scientifically calibrated hydration. Refreshment starts immediately.',
    icon: '🍹',
    color: '#00E5FF',
  },
  {
    num: '02',
    title: 'Instant Absorption',
    desc: 'Electrolytes and bioavailable minerals absorb in under 15 minutes. Your body feels it immediately.',
    icon: '⚡',
    color: '#FF1493',
  },
  {
    num: '03',
    title: 'Peak Performance',
    desc: 'Energy, focus, and endurance unlock. Train harder, think sharper, stay stronger all day.',
    icon: '🚀',
    color: '#00FF00',
  },
  {
    num: '04',
    title: 'Fast Recovery',
    desc: 'Anti-inflammatory formula activates muscle recovery. DOMS vanishes, bounce-back accelerates.',
    icon: '💪',
    color: '#FFD700',
  },
];

function StepCard({ step, i }: { step: typeof steps[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: i * 0.15, duration: 0.6 }}
      className="relative card-solid rounded-3xl p-5 md:p-6"
      style={{
        background: `linear-gradient(150deg, ${step.color}28 0%, ${step.color}14 36%, rgba(255,255,255,0.92) 100%)`,
        minHeight: '150px',
      }}>

      <div className="flex gap-6 md:gap-9 items-start">
        <div className="flex-shrink-0">
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-4xl md:text-5xl"
            style={{
              background: `linear-gradient(135deg, ${step.color}20, ${step.color}08)`,
              border: `2px solid ${step.color}60`,
              boxShadow: `0 0 30px ${step.color}40`
            }}>
            {step.icon}
            <div className="absolute bottom-2 right-2 text-lg md:text-xl font-black" style={{ color: step.color }}>
              {step.num}
            </div>
          </div>
        </div>

        <div className="flex-1 pt-2">
          <h3 className="font-display text-xl md:text-2xl font-bold text-blue-900 mb-2">{step.title}</h3>
          <p className="text-sm md:text-base text-blue-700 leading-relaxed">{step.desc}</p>
        </div>
      </div>

      {i < steps.length - 1 && <div className="hidden" />}
    </motion.div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative section-shell underwater-bg wave-divider">
      <div className="section-inner">
          <motion.div className="section-header"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-5 px-4 py-2 rounded-full"
              style={{ color: '#00D4FF', background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.3)' }}>
              The STRATA Effect
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-900 mb-4 md:mb-6 leading-tight">
              How STRATA<br />
              <span style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundImage: 'linear-gradient(90deg, #00E5FF, #FF1493)' }}>
                Powers You
              </span>
            </h2>
            <p className="text-base md:text-lg text-blue-700 max-w-2xl mx-auto">
              From your first sip to peak performance. Watch the transformation unfold.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {steps.map((step, i) => (
              <StepCard key={step.num} step={step} i={i} />
            ))}
          </div>
      </div>
    </section>
  );
}
