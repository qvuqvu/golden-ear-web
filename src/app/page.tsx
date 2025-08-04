'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LandingPage } from '@/components/LandingPage';
import { OnboardingScreen } from '@/screens/OnboardingScreen';
import { Language, CEFRLevel } from '@/data/mockLessons';

export default function Home() {
  const router = useRouter();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user has completed onboarding
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') as Language;
    const savedLevel = localStorage.getItem('selectedLevel') as CEFRLevel;
    
    if (savedLanguage && savedLevel) {
      // Redirect returning users to lessons page
      router.push('/lessons');
    }
    
    setIsLoading(false);
  }, [router]);

  const handleOnboardingComplete = (language: Language, level: CEFRLevel) => {
    // Store user preferences in localStorage
    localStorage.setItem('selectedLanguage', language);
    localStorage.setItem('selectedLevel', level);
    // Redirect to lessons after onboarding
    router.push('/lessons');
  };

  const handleStartOnboarding = () => {
    setShowOnboarding(true);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading Golden Ear...</p>
        </div>
      </div>
    );
  }

  // Show onboarding if user clicked to start
  if (showOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  // Show landing page for new users
  return <LandingPage onStartTrial={handleStartOnboarding} />;
}
