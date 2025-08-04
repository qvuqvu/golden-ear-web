'use client';

import { useRouter } from 'next/navigation';
import { LandingPage } from '@/components/LandingPage';

export default function LandingPageRoute() {
  const router = useRouter();

  const handleStartTrial = () => {
    // Navigate to the main app where onboarding logic is handled
    router.push('/');
  };

  return <LandingPage onStartTrial={handleStartTrial} />;
}
