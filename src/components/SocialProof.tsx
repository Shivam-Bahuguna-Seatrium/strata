'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const reviews = [
  { id: 1, name: 'Alex T.', avatar: '🧑‍💻', stars: 5, text: 'Best hydration product I\'ve ever had. The watermelon flavor is incredible!', type: 'text' },
  { id: 2, name: 'Sarah M.', avatar: '👩‍🦰', stars: 5, text: 'I take STRATA to the gym every day. No more cramps, no fatigue. Game changer!', type: 'video', video: '🎬 Sarah\'s Story' },
  { id: 3, name: 'Jordan K.', avatar: '🧑‍🎤', stars: 5, text: 'Zero sugar and tastes amazing? This is exactly what I\'ve been looking for!', type: 'text' },
  { id: 4, name: 'Mia L.', avatar: '👩‍🔬', stars: 5, text: 'The stick packs are so convenient for travel. Dissolves perfectly every time!', type: 'video', video: '🎬 Mia\'s Travel Hack' },
  { id: 5, name: 'Chris P.', avatar: '🧔', stars: 5, text: 'Replaced my morning coffee with STRATA. Never felt more energized. 10/10!', type: 'text' },
  { id: 6, name: 'Zoe R.', avatar: '👩‍🎨', stars: 5, text: 'Vegan, gluten-free, zero sugar. This is the hydration product I\'ve been waiting for!', type: 'video', video: '🎬 Zoe\'s Review' },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < n ? '#FFD700' : 'rgba(0,119,255,0.2)'}>
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
  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };
  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="reviews" className="relative section-shell overflow-hidden underwater-bg wave-divider">
      <div className="section-inner">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="section-header">
            <span className="inline-block text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-5 px-4 py-2 rounded-full"
              style={{ color: '#0077FF', background: 'rgba(0,119,255,0.12)', border: '1px solid rgba(0,119,255,0.3)' }}>
              Community Proof
            </span>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-blue-900 mb-4 md:mb-6">
              50K+ Athletes <span className="gradient-neon">Trust STRATA</span>
            </h2>
            <p className="text-base md:text-lg text-blue-700 max-w-2xl mx-auto">
              See what real people say about their hydration transformation.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-8 md:mb-10">
            {[
              { value: '50K+', label: 'Happy Customers', color: '#00E5FF' },
              { value: '4.9★', label: 'Average Rating', color: '#FF1493' },
              { value: '98%', label: 'Would Recommend', color: '#00FF00' },
              { value: '1M+', label: 'Sticks Sold', color: '#FFD700' },
            ].map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="text-center py-6 md:py-8 rounded-2xl card-solid"
                style={{ background: `linear-gradient(150deg, ${s.color}30 0%, ${s.color}14 45%, rgba(255,255,255,0.93) 100%)`, border: `2px solid ${s.color}66` }}>
                <div className="text-3xl md:text-4xl font-black" style={{ color: s.color }}>{s.value}</div>
                <div className="text-blue-700 text-xs md:text-sm mt-2 font-medium">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
          <div className="h-4"></div>

          {/* Slider section */}
          <div className="relative min-h-[520px] md:min-h-[620px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
              {/* Left: Review card slider */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.7 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                    transition={{ duration: 0.5 }}
                    className="h-full p-8 md:p-10 rounded-2xl md:rounded-3xl flex flex-col justify-between underwater-card-strong"
                    style={{
                      border: '2px solid rgba(0,119,255,0.2)',
                      minHeight: '400px',
                    }}>
                    
                    {/* Avatar and name */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                        style={{ background: 'rgba(0,119,255,0.15)', border: '2px solid rgba(0,119,255,0.3)' }}>
                        {current.avatar}
                      </div>
                      <div>
                        <h4 className="text-lg md:text-xl font-bold text-blue-900">{current.name}</h4>
                        <Stars n={current.stars} />
                      </div>
                    </div>

                    {/* Review text */}
                    <p className="text-base md:text-lg text-blue-800 mb-8 flex-1 leading-relaxed">
                      &ldquo;{current.text}&rdquo;
                    </p>

                    {/* Badge */}
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <span>✓ Verified Purchase</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Right: Video/Content showcase */}
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
                      className="relative h-full min-h-[400px] rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer underwater-card-strong"
                      style={{
                        border: '2px solid rgba(0,119,255,0.2)',
                      }}>
                      {/* Video placeholder */}
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto"
                            style={{ background: 'rgba(0,119,255,0.2)' }}>
                            <span className="text-4xl">▶</span>
                          </motion.div>
                          <p className="text-blue-900 font-bold text-lg md:text-xl">{current.video}</p>
                          <p className="text-blue-600 text-sm mt-2">Click to play</p>
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
                      className="h-full min-h-[400px] p-8 md:p-10 rounded-2xl md:rounded-3xl flex flex-col justify-center underwater-card-strong"
                      style={{
                        border: '2px solid rgba(0,119,255,0.2)',
                      }}>
                      <h3 className="text-xl md:text-2xl font-black text-blue-900 mb-8">Why Choose STRATA?</h3>
                      {[
                        { label: 'Zero Sugar', value: '100%' },
                        { label: 'Vegan & GF', value: '✓' },
                        { label: 'Fast Acting', value: '15min' },
                      ].map((item, i) => (
                        <div key={item.label} className="mb-6">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-blue-900 font-bold">{item.label}</span>
                            <span className="text-2xl font-black" style={{ color: '#0077FF' }}>{item.value}</span>
                          </div>
                          <div className="h-3 rounded-full" style={{ background: 'rgba(0,119,255,0.15)' }}>
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

            {/* Navigation dots */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2">
              {reviews.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                  }}
                  className="w-3 h-3 rounded-full transition-all"
                  style={{ background: i === currentIndex ? '#0077FF' : 'rgba(0,119,255,0.3)' }}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            {/* Arrow buttons desktop */}
            <motion.button
              onClick={prevSlide}
              className="hidden md:flex absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full items-center justify-center text-white font-bold transition-all"
              style={{ background: 'linear-gradient(135deg, #0077FF, #00D4FF, #FF1493)', boxShadow: '0 8px 25px rgba(0,119,255,0.3)' }}
              whileHover={{ scale: 1.1, boxShadow: '0 12px 35px rgba(0,119,255,0.5)' }}
              whileTap={{ scale: 0.9 }}>
              ←
            </motion.button>
            <motion.button
              onClick={nextSlide}
              className="hidden md:flex absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full items-center justify-center text-white font-bold transition-all"
              style={{ background: 'linear-gradient(135deg, #0077FF, #00D4FF, #FF1493)', boxShadow: '0 8px 25px rgba(0,119,255,0.3)' }}
              whileHover={{ scale: 1.1, boxShadow: '0 12px 35px rgba(0,119,255,0.5)' }}
              whileTap={{ scale: 0.9 }}>
              →
            </motion.button>
          </div>

          {/* Mobile carousel info */}
          <div className="text-center mt-12 text-sm text-blue-700">
            Showing {currentIndex + 1} of {reviews.length} reviews
          </div>
          <div className="md:hidden mt-5 flex items-center justify-center gap-3">
            <button
              onClick={prevSlide}
              className="w-11 h-11 rounded-full text-white font-bold"
              style={{ background: 'linear-gradient(135deg, #0077FF, #00D4FF, #FF1493)' }}
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="w-11 h-11 rounded-full text-white font-bold"
              style={{ background: 'linear-gradient(135deg, #0077FF, #00D4FF, #FF1493)' }}
            >
              →
            </button>
          </div>
      </div>
    </section>
  );
}
