'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProductShowcase from '@/components/ProductShowcase';
import BenefitsSection from '@/components/BenefitsSection';
import HowItWorks from '@/components/HowItWorks';
import TaskFeature from '@/components/TaskFeature';
import IngredientsSection from '@/components/IngredientsSection';
import LifestyleSection from '@/components/LifestyleSection';
import SocialProof from '@/components/SocialProof';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const FloatingBubbles = dynamic(() => import('@/components/FloatingBubbles'), { ssr: false });
const FloatingWatermelons = dynamic(() => import('@/components/FloatingWatermelons'), { ssr: false });
const WaterCursor = dynamic(() => import('@/components/WaterCursor'), { ssr: false });
const Mascot = dynamic(() => import('@/components/Mascot'), { ssr: false });

export default function Home() {
  return (
      <main className="relative min-h-screen w-full overflow-x-hidden underwater-bg">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-70"
        style={{
          background:
            'linear-gradient(105deg, rgba(255,255,255,0.34) 8%, transparent 24%, transparent 42%, rgba(255,255,255,0.18) 56%, transparent 72%), linear-gradient(180deg, transparent 0%, rgba(0,119,255,0.06) 100%)',
          mixBlendMode: 'screen',
        }}
      />
      {/* Global effects */}
      <FloatingWatermelons />
      <FloatingBubbles />
      <WaterCursor />
      <Mascot />

      {/* Navigation */}
      <Navbar />

      {/* Sections */}
      <HeroSection />

      <div className="relative z-10 main-stack space-y-16 md:space-y-20 lg:space-y-24">
        <ProductShowcase />
        <BenefitsSection />
        <HowItWorks />
        <TaskFeature />
        <IngredientsSection />
        <LifestyleSection />
        <SocialProof />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}
