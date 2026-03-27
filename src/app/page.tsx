import HeroSection from '@/components/HeroSection';
import HydrationSection from '@/components/HydrationSection';
import BoostSection from '@/components/BoostSection';
import ScienceSection from '@/components/ScienceSection';
import SipSection from '@/components/SipSection';
import VoicesSection from '@/components/VoicesSection';
import RefuelSection from '@/components/RefuelSection';

export default function Home() {
  return (
    <div className="relative z-10">
      <HeroSection />
      <HydrationSection />
      <BoostSection />
      <ScienceSection />
      <SipSection />
      <VoicesSection />
      <RefuelSection />
    </div>
  );
}
