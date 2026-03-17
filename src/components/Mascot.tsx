'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Mascot() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      style={{ y, rotate }}
      className="fixed bottom-8 right-8 z-30 pointer-events-none hidden lg:block"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="80" height="100" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M40 5C40 5 10 45 10 65C10 82 23 95 40 95C57 95 70 82 70 65C70 45 40 5 40 5Z"
            fill="url(#mascotGrad)"
            stroke="rgba(0,200,255,0.45)"
            strokeWidth="1"
          />
          <ellipse cx="30" cy="55" rx="8" ry="12" fill="rgba(255,255,255,0.1)" />
          <g>
            <path d="M32 58 Q40 55 48 58" stroke="#0A3A73" strokeWidth="2.5" fill="none" />
            <ellipse cx="28" cy="60" rx="10" ry="7" fill="#0A3A73" />
            <ellipse cx="28" cy="60" rx="9" ry="6" fill="#0B4B94" />
            <ellipse cx="52" cy="60" rx="10" ry="7" fill="#0A3A73" />
            <ellipse cx="52" cy="60" rx="9" ry="6" fill="#0B4B94" />
            <ellipse cx="25" cy="58" rx="4" ry="2" fill="rgba(0,200,255,0.35)" />
            <ellipse cx="49" cy="58" rx="4" ry="2" fill="rgba(0,200,255,0.35)" />
          </g>
          <path d="M33 72 Q40 78 47 72" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
          {blink && (
            <>
              <line x1="24" y1="60" x2="32" y2="60" stroke="white" strokeWidth="2" />
              <line x1="48" y1="60" x2="56" y2="60" stroke="white" strokeWidth="2" />
            </>
          )}
          <defs>
            <linearGradient id="mascotGrad" x1="40" y1="5" x2="40" y2="95" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00C8FF" />
              <stop offset="45%" stopColor="#38BEFF" />
              <stop offset="82%" stopColor="#FF1493" />
              <stop offset="100%" stopColor="#0066CC" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </motion.div>
  );
}
