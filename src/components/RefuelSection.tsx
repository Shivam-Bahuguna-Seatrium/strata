'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, FormEvent } from 'react';

const drops = [
  { left: '5%', size: 10, dur: 6, delay: 0 },
  { left: '15%', size: 6, dur: 8, delay: 1 },
  { left: '28%', size: 8, dur: 7, delay: 0.5 },
  { left: '42%', size: 5, dur: 9, delay: 2 },
  { left: '55%', size: 12, dur: 6.5, delay: 0.3 },
  { left: '70%', size: 7, dur: 8.5, delay: 1.5 },
  { left: '82%', size: 4, dur: 10, delay: 2.5 },
  { left: '93%', size: 9, dur: 7.5, delay: 0.8 },
];

export default function RefuelSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [focused, setFocused] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="relative flex flex-col items-center overflow-hidden px-8 sm:px-10 md:px-16 lg:px-20"
      style={{ background: 'linear-gradient(180deg, #EFF6FF 0%, #DBEAFE 40%, #BFDBFE 100%)' }}>

      {/* Top spacer */}
      <div className="w-full h-10 sm:h-12 md:h-16 lg:h-20" aria-hidden="true" />

      {/* ── Expanding ripples ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ width: 250, height: 250, border: '1px solid rgba(0,119,255,0.06)' }}
            animate={{ scale: [0.4, 3.5], opacity: [0.25, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: i * 1.5, ease: 'easeOut' }}
          />
        ))}
      </div>

      {/* ── Floating water drops ── */}
      {drops.map((d, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 rounded-full pointer-events-none"
          style={{
            width: d.size,
            height: d.size,
            left: d.left,
            background: 'radial-gradient(circle at 30% 30%, rgba(0,212,255,0.3), rgba(0,119,255,0.1))',
            border: '1px solid rgba(0,212,255,0.15)',
            animation: `refuelBubble ${d.dur}s linear ${d.delay}s infinite`,
          }}
        />
      ))}

      {/* ── Running water bar ── */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 overflow-hidden">
        <motion.div
          className="h-full w-[200%]"
          style={{ background: 'linear-gradient(90deg, transparent 0%, #00D4FF 20%, #0077FF 40%, #FF1493 60%, #00D4FF 80%, transparent 100%)' }}
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center gap-8 md:gap-20 lg:gap-24 relative z-10">

        {/* ── Header ── */}
        <motion.div
          className="w-full flex flex-col items-center text-center px-4 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}>

          {/* Animated droplet icon */}
          <motion.div
            className="mb-3 md:mb-5"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
            <div className="w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(0,119,255,0.1) 0%, rgba(0,212,255,0.08) 100%)',
                boxShadow: '0 0 30px rgba(0,119,255,0.1)',
              }}>
              <span className="text-2xl md:text-4xl">💧</span>
            </div>
          </motion.div>

          <motion.span
            className="font-label inline-block mb-5 px-6 py-2.5 rounded-full text-xs font-extrabold tracking-widest uppercase"
            style={{ color: '#0077FF', background: 'rgba(0,119,255,0.08)', border: '1px solid rgba(0,119,255,0.15)' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}>
            📬 Drop Us A Line
          </motion.span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-blue-950 leading-tight font-black uppercase tracking-tighter">
            Ready To{' '}
            <span className="hero-line-script text-3xl sm:text-4xl md:text-5xl" style={{ textTransform: 'none' }}>Refuel?</span>
          </h2>
          <p className="font-body text-base md:text-lg text-blue-800/70 font-semibold mt-6 max-w-lg tracking-tight">
            Questions, collabs, or just wanna say hi? Drop a message — we flow right back.
          </p>
        </motion.div>

        {/* ── Main content: Form + Info ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 w-full items-start">

          {/* ── Left: Contact Form ── */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 md:gap-8 p-8 md:p-14 rounded-3xl text-left"
            style={{
              background: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 12px 40px rgba(0,119,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.6)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}>

            <motion.p
              className="font-cursive text-xl md:text-3xl text-blue-500/80 font-bold text-center mb-1 md:mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}>
              Send A Ripple 💧
            </motion.p>

            <div className="flex flex-col gap-3">
              <label className="font-label text-xs font-extrabold tracking-widest uppercase text-blue-950/70">Your Name</label>
              <motion.div
                animate={focused === 'name' ? { scale: 1.01 } : { scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  placeholder="e.g. Shivam"
                  className="w-full font-body text-sm md:text-base px-5 py-4 md:px-5 md:py-4 rounded-xl bg-white/70 border border-blue-200/30 text-blue-950 font-medium placeholder:text-blue-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-transparent transition-all"
                />
              </motion.div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-3">
              <label className="font-label text-xs font-extrabold tracking-widest uppercase text-blue-950/70">Email</label>
              <motion.div
                animate={focused === 'email' ? { scale: 1.01 } : { scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}>
                <input
                  type="email"
                  required
                  maxLength={254}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="you@example.com"
                  className="w-full font-body text-sm md:text-base px-5 py-4 md:px-5 md:py-4 rounded-xl bg-white/70 border border-blue-200/30 text-blue-950 font-medium placeholder:text-blue-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-transparent transition-all"
                />
              </motion.div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-3">
              <label className="font-label text-xs font-extrabold tracking-widest uppercase text-blue-950/70">Message</label>
              <motion.div
                animate={focused === 'message' ? { scale: 1.01 } : { scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}>
                <textarea
                  required
                  maxLength={2000}
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  placeholder="What's on your mind?"
                  className="w-full font-body text-sm md:text-base px-5 py-4 md:px-5 md:py-4 rounded-xl bg-white/70 border border-blue-200/30 text-blue-950 font-medium placeholder:text-blue-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-transparent transition-all resize-none"
                />
              </motion.div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={status === 'sending'}
              whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(0,119,255,0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden font-display text-sm md:text-lg font-black text-white uppercase tracking-wider py-3 px-8 md:py-4 md:px-10 rounded-xl mt-2 md:mt-4 disabled:opacity-60 transition-all"
              style={{
                background: 'linear-gradient(135deg, #0077FF 0%, #00D4FF 100%)',
                boxShadow: '0 4px 20px rgba(0,119,255,0.2)',
              }}>
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{ background: 'linear-gradient(135deg, #00D4FF 0%, #FF1493 100%)' }}
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.4 }}
              />
              <span className="relative z-10">
                {status === 'sending' ? '💧 Sending...' : status === 'sent' ? '✅ Message Sent!' : 'Send Message →'}
              </span>
            </motion.button>

            <AnimatePresence />
          </motion.form>

          {/* ══ Status Popup Overlay ══ */}
          <AnimatePresence>
            {(status === 'sent' || status === 'error') && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center px-6"
                style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setStatus('idle')}
              >
                <motion.div
                  className="relative flex flex-col items-center gap-5 p-10 md:p-14 rounded-3xl max-w-md w-full text-center"
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 20px 60px rgba(0,119,255,0.15), inset 0 0 0 1px rgba(255,255,255,0.6)',
                  }}
                  initial={{ scale: 0.8, y: 30 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.8, y: 30 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.span
                    className="text-5xl md:text-6xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6 }}
                  >
                    {status === 'sent' ? '✅' : '❌'}
                  </motion.span>
                  <h3 className="font-display text-xl md:text-2xl text-blue-950 font-black">
                    {status === 'sent' ? 'Message Sent!' : 'Oops, Something Went Wrong'}
                  </h3>
                  <p className="font-body text-sm md:text-base text-blue-800/70 font-medium leading-relaxed">
                    {status === 'sent'
                      ? 'We got your ripple! Our team will flow right back to you within 24 hours. 💧'
                      : 'Something went wrong on our end. Please try again or email us directly at hello@stratahydration.com'}
                  </p>
                  <motion.button
                    onClick={() => setStatus('idle')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="font-display text-sm font-black text-white uppercase tracking-wider py-3 px-8 rounded-xl mt-2"
                    style={{
                      background: status === 'sent'
                        ? 'linear-gradient(135deg, #0077FF 0%, #00D4FF 100%)'
                        : 'linear-gradient(135deg, #FF4444 0%, #FF1493 100%)',
                      boxShadow: '0 4px 20px rgba(0,119,255,0.2)',
                    }}
                  >
                    {status === 'sent' ? 'Got It! 🎉' : 'Try Again'}
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Right: Info + Vibes ── */}
          <motion.div
            className="flex flex-col gap-5 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}>

            {/* Email card */}
            <motion.div
              whileHover={{ scale: 1.03, y: -3 }}
              className="flex items-center gap-4 md:gap-5 p-5 md:p-7 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.65)',
                backdropFilter: 'blur(14px)',
                boxShadow: '0 4px 24px rgba(0,119,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.5)',
              }}>
              <motion.div
                className="w-11 h-11 md:w-14 md:h-14 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(0,119,255,0.08)' }}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
                <span className="text-3xl">📧</span>
              </motion.div>
              <div className="text-left">
                <span className="font-display text-base md:text-lg text-blue-950 font-black block">Email Us Directly</span>
                <span className="font-body text-sm text-blue-800/60 font-medium">hello@stratahydration.com</span>
              </div>
            </motion.div>

            {/* Response time */}
            <motion.div
              whileHover={{ scale: 1.03, y: -3 }}
              className="flex items-center gap-4 md:gap-5 p-5 md:p-7 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.65)',
                backdropFilter: 'blur(14px)',
                boxShadow: '0 4px 24px rgba(0,212,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.5)',
              }}>
              <motion.div
                className="w-11 h-11 md:w-14 md:h-14 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(0,212,255,0.08)' }}
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                <span className="text-3xl">⚡</span>
              </motion.div>
              <div className="text-left">
                <span className="font-display text-base md:text-lg text-blue-950 font-black block">Lightning Fast</span>
                <span className="font-body text-sm text-blue-800/60 font-medium">We respond within 24 hours</span>
              </div>
            </motion.div>

            {/* Collabs */}
            <motion.div
              whileHover={{ scale: 1.03, y: -3 }}
              className="flex items-center gap-4 md:gap-5 p-5 md:p-7 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.65)',
                backdropFilter: 'blur(14px)',
                boxShadow: '0 4px 24px rgba(255,20,147,0.06), inset 0 0 0 1px rgba(255,255,255,0.5)',
              }}>
              <motion.div
                className="w-11 h-11 md:w-14 md:h-14 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(255,20,147,0.08)' }}
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
                <span className="text-3xl">🤝</span>
              </motion.div>
              <div className="text-left">
                <span className="font-display text-base md:text-lg text-blue-950 font-black block">Collabs Welcome</span>
                <span className="font-body text-sm text-blue-800/60 font-medium">Gyms, athletes, creators — let&apos;s build</span>
              </div>
            </motion.div>

            {/* Hydration fact with pulsing border */}
            <motion.div
              className="flex items-start gap-4 md:gap-4 p-5 md:p-6 rounded-2xl"
              style={{
                background: 'rgba(0,119,255,0.03)',
                border: '1px solid rgba(0,119,255,0.1)',
              }}
              animate={{ borderColor: ['rgba(0,119,255,0.08)', 'rgba(0,212,255,0.2)', 'rgba(0,119,255,0.08)'] }}
              transition={{ duration: 4, repeat: Infinity }}>
              <motion.span
                className="text-2xl shrink-0 mt-0.5"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}>
                💧
              </motion.span>
              <div className="text-left">
                <span className="font-display text-sm md:text-base text-blue-950 font-black block mb-1">Hydration Fact</span>
                <p className="font-body text-xs md:text-sm text-blue-800/55 leading-relaxed font-medium">
                  By the time you feel thirsty, you&apos;re already 2% dehydrated — enough to cut focus by 25%. Don&apos;t wait. Hydrate.
                </p>
              </div>
            </motion.div>

          </motion.div>
        </div>

      </div>

      {/* Bottom spacer */}
      <div className="w-full h-12 sm:h-16 md:h-20 lg:h-24" aria-hidden="true" />

    </section>
  );
}
