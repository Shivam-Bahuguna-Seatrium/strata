'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Product', href: '#product' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'How to Use', href: '#how-to-use' },
  { label: 'Ingredients', href: '#ingredients' },
  { label: 'Reviews', href: '#reviews' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 40);
      setShowNavbar(currentY < 80 || currentY < lastScrollYRef.current);
      lastScrollYRef.current = currentY;
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={showNavbar ? { y: 0, opacity: 1 } : { y: -120, opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 overflow-hidden"
        style={scrolled
          ? {
              background: 'radial-gradient(circle at 12% 22%, rgba(255,255,255,0.28) 0%, transparent 24%), radial-gradient(circle at 82% 18%, rgba(255,255,255,0.22) 0%, transparent 20%), linear-gradient(120deg, #0077FF 0%, #00C8FF 52%, #0099FF 100%)',
              backdropFilter: 'blur(20px)',
              borderBottom: '2px solid rgba(170, 240, 255, 0.95)',
              padding: '14px 0',
              boxShadow: '0 10px 50px rgba(0, 119, 255, 0.45), inset 0 1px 0 rgba(255,255,255,0.22)'
            }
          : {
              background: 'radial-gradient(circle at 10% 24%, rgba(255,255,255,0.24) 0%, transparent 22%), radial-gradient(circle at 78% 22%, rgba(255,255,255,0.2) 0%, transparent 24%), linear-gradient(120deg, rgba(0,119,255,0.96) 0%, rgba(0,200,255,0.94) 50%, rgba(0,153,255,0.96) 100%)',
              borderBottom: '2px solid rgba(160, 235, 255, 0.85)',
              padding: '18px 0',
              boxShadow: '0 8px 32px rgba(0, 119, 255, 0.32), inset 0 1px 0 rgba(255,255,255,0.2)'
            }
        }
      >
        <div className="pointer-events-none absolute inset-0 opacity-90">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-white/35"
              style={{
                width: `${6 + (i % 4) * 6}px`,
                height: `${6 + (i % 4) * 6}px`,
                left: `${6 + i * 14}%`,
                top: `${16 + (i % 3) * 24}%`,
              }}
              animate={{ y: [0, -10, 0], x: [0, 4, 0], opacity: [0.2, 0.72, 0.2] }}
              transition={{ duration: 2 + (i % 3) * 0.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
            />
          ))}
        </div>

        <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-16 xl:px-20 flex items-center justify-between">
          <motion.a href="#" className="flex items-center gap-3" whileHover={{ scale: 1.04 }}>
            <div className="relative w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.26), rgba(255,255,255,0.08))', border: '1.5px solid rgba(180,240,255,0.95)', boxShadow: '0 4px 18px rgba(0, 120, 255, 0.45)' }}>
              <svg width="24" height="30" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M40 5C40 5 10 45 10 65C10 82 23 95 40 95C57 95 70 82 70 65C70 45 40 5 40 5Z"
                  fill="url(#miniMascotGrad)"
                  stroke="rgba(200,245,255,0.95)"
                  strokeWidth="1.2"
                />
                <ellipse cx="30" cy="55" rx="8" ry="12" fill="rgba(255,255,255,0.1)" />
                <path d="M32 58 Q40 55 48 58" stroke="#0A3A73" strokeWidth="2" fill="none" />
                <ellipse cx="28" cy="60" rx="9" ry="6" fill="#0B4B94" />
                <ellipse cx="52" cy="60" rx="9" ry="6" fill="#0B4B94" />
                <path d="M33 72 Q40 78 47 72" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
                <defs>
                  <linearGradient id="miniMascotGrad" x1="40" y1="5" x2="40" y2="95" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#00C8FF" />
                    <stop offset="45%" stopColor="#38BEFF" />
                    <stop offset="82%" stopColor="#FF1493" />
                    <stop offset="100%" stopColor="#0066CC" />
                  </linearGradient>
                </defs>
              </svg>
              <motion.span
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white/85"
                animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black tracking-wider" style={{ color: '#FFFFFF' }}>STRATA</span>
              <span className="text-[10px] font-semibold tracking-[0.18em] text-white/80 uppercase">Hydration</span>
            </div>
          </motion.a>

          <div className="hidden md:flex items-center gap-11 lg:gap-12">
            {navLinks.map(link => (
              <motion.a key={link.label} href={link.href}
                className="text-sm font-semibold text-white/90 hover:text-yellow-100 transition-colors duration-200 relative group"
                whileHover={{ y: -1 }}>
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                  style={{ background: '#FFFFFF' }} />
              </motion.a>
            ))}
          </div>

          <motion.a href="#product"
            className="hidden md:inline-block px-7 py-2.5 rounded-full text-sm font-bold text-white glow-coral transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #FF5A5A 0%, #E03E3E 100%)' }}
            whileTap={{ scale: 0.95 }}>
            BUY NOW
          </motion.a>

          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-50 relative">
            {[0,1,2].map(i => (
              <motion.span key={i}
                animate={mobileOpen ? (i === 1 ? { opacity: 0 } : { rotate: i === 0 ? 45 : -45, y: i === 0 ? 6 : -6 }) : { rotate: 0, y: 0, opacity: 1 }}
                className="w-6 h-0.5 rounded-full transition-colors" style={{ background: '#FFFFFF' }} />
            ))}
          </button>
        </div>
      </motion.nav>

      <div className="h-[84px] md:h-[82px] w-full" aria-hidden="true" />

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, x: -300 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -300 }} transition={{ duration: 0.4 }}
            className="fixed inset-y-0 left-0 z-40 w-80 flex flex-col pt-28 px-6 overflow-y-auto md:hidden"
            style={{ background: 'linear-gradient(170deg, #0077FF 0%, #00A8FF 50%, #00D4FF 100%)', boxShadow: 'inset -2px 0 20px rgba(0,0,0,0.1)' }}>
            <div className="flex flex-col gap-3">
              {navLinks.map((link, i) => (
                <motion.a key={link.label} href={link.href}
                  initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                  onClick={() => setMobileOpen(false)}
                  className="text-xl font-extrabold text-white hover:text-yellow-200 transition-colors py-3 px-4 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)' }}>
                  {link.label}
                </motion.a>
              ))}
              <motion.a href="#product" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                onClick={() => setMobileOpen(false)}
                className="mt-4 inline-block px-10 py-4 rounded-full text-lg font-black text-blue-900 text-center transition-all"
                style={{ background: 'linear-gradient(135deg, #FFC107 0%, #FFD700 100%)', boxShadow: '0 8px 25px rgba(255, 200, 0, 0.4)' }}
                whileHover={{ scale: 1.05 }}>
                🛒 BUY NOW
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {mobileOpen && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} className="fixed inset-0 z-30 md:hidden" style={{ background: 'rgba(0,0,0,0.3)' }} />)}
    </>
  );
}
