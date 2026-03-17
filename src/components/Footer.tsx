'use client';

import { motion } from 'framer-motion';
import { getActiveFlavors, BRAND } from '@/config/flavors';

const cols = [
  {
    title: 'Flavors',
    color: '#FF1493',
    links: [], // Will be auto-populated from flavors config
  },
  {
    title: 'Company',
    color: '#00E5FF',
    links: [
      { label: 'About', href: '#' },
      { label: 'Our Science', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Support',
    color: '#FFD700',
    links: [
      { label: 'Shipping', href: '#' },
      { label: 'Returns', href: '#' },
      { label: 'FAQs', href: '#' },
      { label: 'Wholesale', href: '#' },
    ],
  },
];

const socials = [
  { name: 'Twitter', color: '#FF1493', icon: '\ud835\udd4f' },
  { name: 'Instagram', color: '#00E5FF', icon: '\ud83d\udcf7' },
  { name: 'Facebook', color: '#00FF00', icon: '\ud83d\udc4d' },
  { name: 'TikTok', color: '#FFD700', icon: '\ud83c\udfb5' },
];

export default function Footer() {
  const flavors = getActiveFlavors();

  // Build flavor links dynamically
  const flavorCol = {
    ...cols[0],
    links: flavors.slice(0, 6).map(f => ({ label: `${f.emoji} ${f.name}`, href: '#product' })),
  };
  const allCols = [flavorCol, cols[1], cols[2]];

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(120deg, #0077FF 0%, #00C8FF 52%, #0099FF 100%)',
        borderTop: '3px solid rgba(255,255,255,0.5)',
      }}
    >
      {/* Subtle animated bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${8 + i * 6}px`,
              height: `${8 + i * 6}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              opacity: 0.25,
            }}
            animate={{ y: [-20, -80, 0] }}
            transition={{ duration: 5 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-16 md:py-20">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 md:gap-16 mb-16">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <a href="#" className="flex items-center gap-4 mb-6">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'rgba(255,255,255,0.4)',
                  border: '2px solid rgba(255,255,255,0.9)',
                  boxShadow: '0 4px 16px rgba(255,255,255,0.4)',
                }}
              >
                <svg width="26" height="30" viewBox="0 0 80 100" fill="none">
                  <path d="M40 5C40 5 10 45 10 65C10 82 23 95 40 95C57 95 70 82 70 65C70 45 40 5 40 5Z" fill="white"/>
                  <circle cx="30" cy="62" r="7" fill="#0077FF"/>
                  <circle cx="50" cy="62" r="7" fill="#0077FF"/>
                </svg>
              </motion.div>
              <div>
                <div className="text-3xl font-black text-white">{BRAND.name}</div>
                <div className="text-sm font-bold text-white italic">Hydration</div>
              </div>
            </a>

            <p className="text-base font-bold text-white mb-4 leading-relaxed">
              {BRAND.positioning}
            </p>
            <p className="text-sm font-semibold text-white/80 mb-8 italic">
              {BRAND.antiSugar}
            </p>

            <div className="flex gap-4">
              {socials.map((s) => (
                <motion.a
                  key={s.name}
                  href="#"
                  whileHover={{ scale: 1.2, y: -4 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.3)',
                    border: `2.5px solid ${s.color}`,
                    color: s.color,
                    boxShadow: `0 4px 12px ${s.color}44`,
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link columns - auto-generates flavors */}
          {allCols.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <h3 className="text-base font-black text-white mb-8 uppercase tracking-wider pb-3" style={{ borderBottom: `2px solid ${col.color}` }}>
                {col.title}
              </h3>

              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      className="text-base font-bold text-white transition-all px-3 py-2 rounded-lg block hover:font-black"
                      whileHover={{ x: 8, backgroundColor: col.color }}
                      style={{ color: 'rgba(255,255,255,0.95)' }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-[2px] mb-14 bg-white opacity-25 rounded-full" />

        {/* Stats from brand config */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 rounded-3xl p-8"
          style={{
            background: 'rgba(255,255,255,0.25)',
            border: '2px solid rgba(255,255,255,0.5)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {[
            { value: BRAND.stats.users, label: 'Athletes', color: '#FF1493' },
            { value: BRAND.stats.rating, label: 'Rating', color: '#00E5FF' },
            { value: BRAND.stats.recommend, label: 'Recommend', color: '#00FF00' },
            { value: BRAND.stats.sold, label: 'Sticks Sold', color: '#FFD700' },
          ].map((s) => (
            <motion.div
              key={s.label}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 0.5 }}
              className="text-center"
            >
              <div className="text-3xl font-black mb-3" style={{ color: s.color }}>{s.value}</div>
              <div className="text-base font-bold text-white">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm font-bold text-white pb-8"
        >
          <div>&copy; 2026 {BRAND.name}. All rights reserved.</div>
          <div className="text-center text-base font-semibold italic text-white/90">{BRAND.science}</div>
          <div className="flex gap-8">
            {['Privacy', 'Terms', 'Sitemap'].map((lbl) => (
              <motion.a key={lbl} href="#"
                whileHover={{ scale: 1.15, color: '#FFD700' }}
                className="font-bold text-white transition-all">
                {lbl}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}