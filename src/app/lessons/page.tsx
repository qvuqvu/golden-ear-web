'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HomeScreen } from '@/screens/HomeScreen';
import { NavigationLayout } from '@/components/NavigationLayout';
import { Lesson, Language, CEFRLevel, getLessonSlug } from '@/data/mockLessons';

export default function LessonsPage() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('English');
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel>('A1');
  const [isLoading, setIsLoading] = useState(true);

  // Load user preferences
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') as Language;
    const savedLevel = localStorage.getItem('selectedLevel') as CEFRLevel;
    
    if (savedLanguage && savedLevel) {
      setSelectedLanguage(savedLanguage);
      setSelectedLevel(savedLevel);
    } else {
      // If no preferences saved, redirect to onboarding
      router.push('/');
    }
    
    setIsLoading(false);
  }, [router]);

  const handleLessonSelect = (lesson: Lesson) => {
    // Navigate to individual lesson page using proper slug
    const slug = getLessonSlug(lesson);
    router.push(`/lesson/${slug}`);
  };

  const handleShowOnboarding = () => {
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading lessons...</p>
        </div>
      </div>
    );
  }

  return (
    <NavigationLayout
      selectedLanguage={selectedLanguage}
      selectedLevel={selectedLevel}
      onShowOnboarding={handleShowOnboarding}
    >
      <HomeScreen
        selectedLanguage={selectedLanguage}
        selectedLevel={selectedLevel}
        onLessonSelect={handleLessonSelect}
        onShowOnboarding={handleShowOnboarding}
      />
    </NavigationLayout>
  );
}
