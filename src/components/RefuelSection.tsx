'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FormEvent, useState } from 'react';
import { refuelContent } from '@/config/siteContent';

export default function RefuelSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [focused, setFocused] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());

  const canSubmit =
    form.name.trim().length > 1 &&
    emailLooksValid &&
    form.message.trim().length >= 10 &&
    status !== 'sending';

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors({});

    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!form.name.trim()) newErrors.name = 'Name required';
    if (!emailLooksValid) newErrors.email = 'Valid email required';
    if (form.message.trim().length < 10) newErrors.message = 'Min 10 characters';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

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
    <section
      id="contact"
      className="relative flex min-h-svh flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #EDF5FF 0%, #D9E8FF 20%, #C5DDFF 45%, #B8D5FF 70%, #A8CBFF 100%)',
      }}
    >
      {/* PREMIUM AMBIENT BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-40 top-10 h-[500px] w-[500px] rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.12, 0.35, 0.12], x: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(circle, rgba(0,119,255,0.4), transparent 70%)' }}
        />
        <motion.div
          className="absolute -left-40 -top-20 h-[450px] w-[450px] rounded-full blur-3xl"
          animate={{ scale: [1.2, 0.8, 1.2], opacity: [0.15, 0.3, 0.15], y: [0, -40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.35), transparent 70%)' }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full blur-3xl"
          animate={{ scale: [0.9, 1.2, 0.9], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(circle, rgba(100,200,255,0.3), transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-3 py-6 sm:px-6 sm:py-8 md:px-8 md:py-12 lg:px-10 lg:py-16">
        <div className="mx-auto w-full max-w-[900px]">
          {/* PREMIUM HEADER */}
          <motion.div
            className="mb-8 flex flex-col items-center text-center sm:mb-10 md:mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="mb-4 flex justify-center sm:mb-5 md:mb-6"
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full sm:h-24 sm:w-24 md:h-28 md:w-28"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,119,255,0.15), rgba(0,212,255,0.1))',
                  border: '2px solid rgba(0,119,255,0.25)',
                  boxShadow: '0 20px 50px rgba(0,119,255,0.15), inset 0 0 30px rgba(0,119,255,0.08)',
                }}
              >
                <span className="text-4xl sm:text-5xl md:text-6xl">📡</span>
              </div>
            </motion.div>

            <span
              className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-label text-[10px] font-extrabold uppercase tracking-widest sm:mb-5 sm:px-5 sm:py-2 sm:text-xs md:mb-6 md:gap-2.5 md:px-6 md:py-2.5"
              style={{
                color: '#0077FF',
                background: 'rgba(255,255,255,0.5)',
                border: '1px solid rgba(0,119,255,0.3)',
                boxShadow: '0 20px 50px rgba(0,119,255,0.12)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <motion.span className="h-2 w-2 rounded-full bg-blue-500" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              Premium Connect
            </span>

            <h2
              className="mx-auto max-w-4xl font-display text-3xl font-black uppercase leading-[0.95] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
              style={{
                background: 'linear-gradient(135deg, #0B2E5B 0%, #1657A1 35%, #1E5EA5 65%, #0077FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 10px 40px rgba(0,119,255,0.15)',
              }}
            >
              {refuelContent.heading}
              <br />
              <span className="hero-line-script text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl" style={{ textTransform: 'none' }}>
                {refuelContent.headingAccent}
              </span>
            </h2>

            <p className="mt-4 max-w-[22ch] font-body text-base font-medium leading-relaxed text-blue-950/80 sm:mt-5 sm:max-w-[28ch] sm:text-lg md:mt-6 md:max-w-[32ch] md:text-xl lg:mt-7 lg:max-w-[40ch] lg:text-[1.2rem]">
              {refuelContent.subtitle}
            </p>
          </motion.div>

          {/* PREMIUM FORM CARD */}
          <motion.form
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-[2rem] border backdrop-blur-xl sm:rounded-[2.5rem] md:rounded-[3rem]"
            style={{
              border: '1.5px solid rgba(255,255,255,0.6)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,252,255,0.8) 100%)',
              boxShadow: '0 30px 90px rgba(0,119,255,0.18), inset 0 0 40px rgba(255,255,255,0.8), inset 0 1px 0 rgba(255,255,255,0.9)',
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {/* TOP ACCENT LINE */}
            <div
              className="absolute left-1/2 top-0 h-1 w-48 -translate-x-1/2 rounded-b-full"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(0,119,255,0.6), rgba(0,212,255,0.5), transparent)',
              }}
            />

            <div className="space-y-6 p-6 sm:space-y-7 sm:p-8 md:space-y-8 md:p-10 lg:space-y-9 lg:p-12">
              {/* NAME FIELD */}
              <div className="flex flex-col gap-3 sm:gap-3.5 md:gap-4">
                <label className="font-label text-xs font-black uppercase tracking-widest text-blue-950/75 sm:text-[11px] md:text-xs">Name</label>
                <motion.div animate={focused === 'name' ? { scale: 1.01 } : { scale: 1 }} transition={{ type: 'spring', stiffness: 400 }}>
                  <input
                    type="text"
                    maxLength={100}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    placeholder={refuelContent.formFields.name.placeholder}
                    className="w-full rounded-2xl bg-white/50 px-5 py-4 font-body text-base font-medium text-blue-950 placeholder:text-blue-300/70 outline-none transition-all sm:px-6 sm:py-4.5 md:px-7 md:py-5"
                    style={{
                      border: focused === 'name' ? '2px solid rgba(0,119,255,0.5)' : '2px solid rgba(0,100,180,0.2)',
                      boxShadow: focused === 'name' ? '0 8px 32px rgba(0,119,255,0.15), inset 0 0 20px rgba(0,119,255,0.05)' : 'inset 0 2px 8px rgba(0,0,0,0.03)',
                    }}
                  />
                </motion.div>
                {errors.name && <p className="font-body text-xs font-semibold text-red-600 sm:text-sm">{errors.name}</p>}
              </div>

              {/* EMAIL FIELD */}
              <div className="flex flex-col gap-3 sm:gap-3.5 md:gap-4">
                <label className="font-label text-xs font-black uppercase tracking-widest text-blue-950/75 sm:text-[11px] md:text-xs">Email</label>
                <motion.div animate={focused === 'email' ? { scale: 1.01 } : { scale: 1 }} transition={{ type: 'spring', stiffness: 400 }}>
                  <input
                    type="email"
                    maxLength={254}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    placeholder={refuelContent.formFields.email.placeholder}
                    className="w-full rounded-2xl bg-white/50 px-5 py-4 font-body text-base font-medium text-blue-950 placeholder:text-blue-300/70 outline-none transition-all sm:px-6 sm:py-4.5 md:px-7 md:py-5"
                    style={{
                      border: focused === 'email' ? '2px solid rgba(0,119,255,0.5)' : '2px solid rgba(0,100,180,0.2)',
                      boxShadow: focused === 'email' ? '0 8px 32px rgba(0,119,255,0.15), inset 0 0 20px rgba(0,119,255,0.05)' : 'inset 0 2px 8px rgba(0,0,0,0.03)',
                    }}
                  />
                </motion.div>
                {errors.email && <p className="font-body text-xs font-semibold text-red-600 sm:text-sm">{errors.email}</p>}
              </div>

              {/* MESSAGE FIELD */}
              <div className="flex flex-col gap-3 sm:gap-3.5 md:gap-4">
                <label className="font-label text-xs font-black uppercase tracking-widest text-blue-950/75 sm:text-[11px] md:text-xs">Message</label>
                <motion.div animate={focused === 'message' ? { scale: 1.01 } : { scale: 1 }} transition={{ type: 'spring', stiffness: 400 }}>
                  <textarea
                    maxLength={2000}
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    placeholder={refuelContent.formFields.message.placeholder}
                    className="w-full resize-none rounded-2xl bg-white/50 px-5 py-4 font-body text-base font-medium leading-relaxed text-blue-950 placeholder:text-blue-300/70 outline-none transition-all sm:px-6 sm:py-4.5 md:px-7 md:py-5"
                    style={{
                      border: focused === 'message' ? '2px solid rgba(0,119,255,0.5)' : '2px solid rgba(0,100,180,0.2)',
                      boxShadow: focused === 'message' ? '0 8px 32px rgba(0,119,255,0.15), inset 0 0 20px rgba(0,119,255,0.05)' : 'inset 0 2px 8px rgba(0,0,0,0.03)',
                    }}
                  />
                </motion.div>
                {errors.message && <p className="font-body text-xs font-semibold text-red-600 sm:text-sm">{errors.message}</p>}
              </div>

              {/* PREMIUM BUTTON */}
              <motion.button
                type="submit"
                disabled={!canSubmit}
                className="mt-2 w-full rounded-full px-8 py-4 font-display text-base font-black uppercase tracking-wider text-white disabled:opacity-50 sm:mt-3 sm:py-4.5 md:mt-4 md:px-10 md:py-5 md:text-lg"
                style={{
                  background: 'linear-gradient(135deg, #0077FF 0%, #00B8FF 50%, #00D4FF 100%)',
                  boxShadow: '0 20px 60px rgba(0,119,255,0.35), inset 0 1px 0 rgba(255,255,255,0.4)',
                }}
                whileHover={canSubmit ? { scale: 1.03, boxShadow: '0 28px 80px rgba(0,119,255,0.45)' } : {}}
                whileTap={canSubmit ? { scale: 0.97 } : {}}
              >
                {status === 'sending' ? '⏳ Sending Signal...' : refuelContent.submitLabel}
              </motion.button>
            </div>
          </motion.form>

          {/* PREMIUM CONTACT CARDS */}
          <motion.div
            className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 md:mt-14 md:gap-6 lg:mt-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {refuelContent.contactCards.map((card, i) => (
              <motion.div
                key={card.title}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group flex flex-col items-start gap-4 rounded-2xl p-5 transition-all sm:p-6 md:gap-5 md:p-7"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(248,252,255,0.5) 100%)',
                  border: '1.5px solid rgba(255,255,255,0.8)',
                  boxShadow: '0 10px 40px rgba(0,119,255,0.12), inset 0 1px 0 rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(15px)',
                }}
              >
                <motion.div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl sm:h-16 sm:w-16 md:h-18 md:w-18"
                  style={{ background: 'rgba(0,119,255,0.1)', border: '2px solid rgba(0,119,255,0.2)' }}
                  animate={{ y: [0, -4, 0], scale: [1, 1.08, 1] }}
                  transition={{ duration: 3.2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="text-2xl sm:text-3xl md:text-4xl">{card.icon}</span>
                </motion.div>
                <div>
                  <p className="font-display text-base font-black text-blue-950 sm:text-lg">{card.title}</p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-blue-800/75 sm:mt-2.5 sm:text-base">{card.detail}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* PREMIUM SUCCESS/ERROR MODAL */}
      <AnimatePresence>
        {(status === 'sent' || status === 'error') && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-md sm:px-5"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setStatus('idle')}
          >
            <motion.div
              className="w-full max-w-md rounded-3xl p-10 text-center sm:p-12 md:p-14"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(248,252,255,0.92) 100%)',
                border: '1.5px solid rgba(255,255,255,0.8)',
                boxShadow: '0 40px 120px rgba(0,119,255,0.25), inset 0 1px 0 rgba(255,255,255,0.8)',
                backdropFilter: 'blur(30px)',
              }}
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.span className="mb-5 inline-block text-6xl sm:mb-6" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.7, repeat: Infinity, repeatDelay: 1.5 }}>
                {status === 'sent' ? '✅' : '❌'}
              </motion.span>

              <h3 className="font-display text-2xl font-black text-blue-950 sm:text-3xl">{status === 'sent' ? 'Perfect!' : 'Error'}</h3>

              <p className="mt-4 font-body text-base leading-relaxed text-blue-800/75 sm:mt-5">{status === 'sent' ? refuelContent.successMessage : refuelContent.errorMessage}</p>

              <motion.button
                onClick={() => setStatus('idle')}
                className="mt-8 rounded-full px-10 py-3 font-display text-base font-black uppercase tracking-widest text-white sm:mt-9 sm:px-12 sm:py-3.5"
                style={{
                  background: 'linear-gradient(135deg, #0077FF, #00B8FF)',
                  boxShadow: '0 15px 40px rgba(0,119,255,0.3)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {status === 'sent' ? 'Awesome!' : 'Retry'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
