'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { BRAND } from '@/config/flavors';

const reviews = [
  { id: 1, name: 'Alex T.', avatar: '\ud83e\uddd1\u200d\ud83d\udcbb', stars: 5, text: "Best hydration product I've ever had. The watermelon flavor is incredible!", type: 'text' },
  { id: 2, name: 'Sarah M.', avatar: '\ud83d\udc69\u200d\ud83e\uddb0', stars: 5, text: 'I take STRATA to the gym every day. No more cramps, no fatigue. Game changer!', type: 'video', video: "\ud83c\udfac Sarah's Story" },
  { id: 3, name: 'Jordan K.', avatar: '\ud83e\uddd1\u200d\ud83c\udfa4', stars: 5, text: "Zero sugar and tastes amazing? This is exactly what I've been looking for!", type: 'text' },
  { id: 4, name: 'Mia L.', avatar: '\ud83d\udc69\u200d\ud83d\udd2c', stars: 5, text: 'The stick packs are so convenient for travel. Dissolves perfectly every time!', type: 'video', video: "\ud83c\udfac Mia's Travel Hack" },
  { id: 5, name: 'Chris P.', avatar: '\ud83e\uddd4', stars: 5, text: 'Replaced my morning coffee with STRATA. Never felt more energized. 10/10!', type: 'text' },
  { id: 6, name: 'Zoe R.', avatar: '\ud83d\udc69\u200d\ud83c\udfa8', stars: 5, text: "Vegan, gluten-free, zero sugar. This is the hydration product I've been waiting for!", type: 'video', video: "\ud83c\udfac Zoe's Review" },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < n ? '#FFD700' : 'rgba(0,119,255,0.15)'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function SocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const current = reviews[currentIndex];
  const nextSlide = () => { setDirection(1); setCurrentIndex((p) => (p + 1) % reviews.length); };
  const prevSlide = () => { setDirection(-1); setCurrentIndex((p) => (p - 1 + reviews.length) % reviews.length); };

  return (
    <section id="reviews" className="relative section-shell overflow-hidden underwater-bg wave-divider">
      <div className="section-inner">
          {/* Header - clean text, no box */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="section-header">
            <span className="font-label inline-block mb-5 px-4 py-2 rounded-full"
              style={{ color: '#0077FF', background: 'rgba(0,119,255,0.08)', border: '1px solid rgba(0,119,255,0.2)' }}>
              Community
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-blue-900 mb-5">
              {BRAND.stats.users} Athletes <span className="gradient-neon">Trust STRATA</span>
            </h2>
            <p className="font-body text-base md:text-lg text-blue-700/75 max-w-2xl mx-auto">
              Real people. Real hydration transformations.
            </p>
          </motion.div>

          {/* Stats - clean inline, lighter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 md:gap-14 mb-12">
            {[
              { value: BRAND.stats.users, label: 'Customers', color: '#00E5FF' },
              { value: BRAND.stats.rating, label: 'Rating', color: '#FF1493' },
              { value: BRAND.stats.recommend, label: 'Recommend', color: '#00FF00' },
              { value: BRAND.stats.sold, label: 'Sold', color: '#FFD700' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl md:text-4xl" style={{ color: s.color }}>{s.value}</div>
                <div className="font-label text-[10px] text-blue-600/60 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Review slider */}
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
              {/* Left: Review card */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.7 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
                    transition={{ duration: 0.5 }}
                    className="h-full p-8 md:p-10 rounded-2xl flex flex-col justify-between"
                    style={{
                      background: 'linear-gradient(150deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                      border: '1.5px solid rgba(0,119,255,0.15)',
                      minHeight: '380px',
                    }}>
                    
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                        style={{ background: 'rgba(0,119,255,0.08)' }}>
                        {current.avatar}
                      </div>
                      <div>
                        <h4 className="font-headline text-lg text-blue-900">{current.name}</h4>
                        <Stars n={current.stars} />
                      </div>
                    </div>

                    <p className="font-body text-base md:text-lg text-blue-800/80 mb-8 flex-1 leading-relaxed italic">
                      &ldquo;{current.text}&rdquo;
                    </p>

                    <span className="font-label text-[10px] text-blue-500">&check; Verified Purchase</span>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Right: Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.7 }}>
                <AnimatePresence mode="wait">
                  {current.type === 'video' ? (
                    <motion.div
                      key={`video-${current.id}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5 }}
                      className="relative h-full min-h-[380px] rounded-2xl overflow-hidden group cursor-pointer"
                      style={{
                        background: 'linear-gradient(150deg, rgba(0,119,255,0.06), rgba(255,255,255,0.95))',
                        border: '1.5px solid rgba(0,119,255,0.15)',
                      }}>
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto"
                            style={{ background: 'rgba(0,119,255,0.1)' }}>
                            <span className="text-3xl">&blacktriangleright;</span>
                          </motion.div>
                          <p className="font-headline text-blue-900 text-lg">{current.video}</p>
                          <p className="font-body text-blue-500/60 text-sm mt-2">Click to play</p>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`chart-${current.id}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5 }}
                      className="h-full min-h-[380px] p-8 md:p-10 rounded-2xl flex flex-col justify-center"
                      style={{
                        background: 'linear-gradient(150deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                        border: '1.5px solid rgba(0,119,255,0.15)',
                      }}>
                      <h3 className="font-display text-xl md:text-2xl text-blue-900 mb-8">Why STRATA?</h3>
                      {[
                        { label: 'Zero Sugar', value: '100%' },
                        { label: 'Vegan & GF', value: '\u2713' },
                        { label: 'Fast Acting', value: '15min' },
                      ].map((item, i) => (
                        <div key={item.label} className="mb-5">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-headline text-sm text-blue-900">{item.label}</span>
                            <span className="font-display text-xl" style={{ color: '#0077FF' }}>{item.value}</span>
                          </div>
                          <div className="h-2 rounded-full" style={{ background: 'rgba(0,119,255,0.08)' }}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${80 + i * 10}%` }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className="h-full rounded-full"
                              style={{ background: 'linear-gradient(90deg, #0077FF, #00D4FF)' }} />
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
                  className="w-2.5 h-2.5 rounded-full transition-all"
                  style={{ background: i === currentIndex ? '#0077FF' : 'rgba(0,119,255,0.2)' }}
                  whileHover={{ scale: 1.3 }}
                />
              ))}
            </div>
          </div>
      </div>
    </section>
  );
}