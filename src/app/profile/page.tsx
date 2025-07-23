'use client';

import { useRouter } from 'next/navigation';
import { ProfileScreen } from '@/screens/ProfileScreen';

export default function ProfilePage() {
  const router = useRouter();
  
  const handleShowOnboarding = () => {
    // Clear localStorage and redirect to home for onboarding
    localStorage.removeItem('selectedLanguage');
    localStorage.removeItem('selectedLevel');
    router.push('/');
  };

  // Get current preferences from localStorage
  const selectedLanguage = typeof window !== 'undefined' 
    ? localStorage.getItem('selectedLanguage') || 'English'
    : 'English';
  const selectedLevel = typeof window !== 'undefined' 
    ? localStorage.getItem('selectedLevel') || 'A1'
    : 'A1';

  return (
    <ProfileScreen
      selectedLanguage={selectedLanguage}
      selectedLevel={selectedLevel}
      onShowOnboarding={handleShowOnboarding}
    />
  );
}
