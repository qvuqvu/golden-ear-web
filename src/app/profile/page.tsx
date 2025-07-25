'use client';

import { useRouter } from 'next/navigation';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { NavigationLayout } from '@/components/NavigationLayout';
import { Language, CEFRLevel } from '@/data/mockLessons';

export default function ProfilePage() {
  const router = useRouter();
  
  const handleShowOnboarding = () => {
    // Clear localStorage and redirect to home for onboarding
    localStorage.removeItem('selectedLanguage');
    localStorage.removeItem('selectedLevel');
    router.push('/');
  };

  // Get current preferences from localStorage
  const selectedLanguage = (typeof window !== 'undefined' 
    ? localStorage.getItem('selectedLanguage') || 'English'
    : 'English') as Language;
  const selectedLevel = (typeof window !== 'undefined' 
    ? localStorage.getItem('selectedLevel') || 'A1'
    : 'A1') as CEFRLevel;

  return (
    <NavigationLayout
      selectedLanguage={selectedLanguage}
      selectedLevel={selectedLevel}
      onShowOnboarding={handleShowOnboarding}
    >
      <ProfileScreen
        selectedLanguage={selectedLanguage}
        selectedLevel={selectedLevel}
        onShowOnboarding={handleShowOnboarding}
      />
    </NavigationLayout>
  );
}
