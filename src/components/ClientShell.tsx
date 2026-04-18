'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToastContainer from '@/components/Toast';

const FloatingBubbles = dynamic(() => import('@/components/FloatingBubbles'), { ssr: false });
const WaterCursor = dynamic(() => import('@/components/WaterCursor'), { ssr: false });
const Mascot = dynamic(() => import('@/components/Mascot'), { ssr: false });

export default function ClientShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 2,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden overflow-y-clip underwater-bg">
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-70"
        style={{
          background:
            'linear-gradient(105deg, rgba(255,255,255,0.34) 8%, transparent 24%, transparent 42%, rgba(255,255,255,0.18) 56%, transparent 72%), linear-gradient(180deg, transparent 0%, rgba(0,119,255,0.06) 100%)',
          mixBlendMode: 'screen',
        }}
      />
      <FloatingBubbles />
      <WaterCursor />
      <Mascot />
      <Navbar />
      <ToastContainer />

      <div className="relative z-10 pb-24 md:pb-32 lg:pb-40">
        {children}
      </div>

      <Footer />
    </main>
  );
}
