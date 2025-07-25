'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingScreen } from '@/screens/OnboardingScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { DictationScreen } from '@/screens/DictationScreen';
import { NavigationLayout } from '@/components/NavigationLayout';
import { Lesson, CEFRLevel, Language, getLessonSlug } from '@/data/mockLessons';

export default function Home() {
  const router = useRouter();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('English');
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel>('A1');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user has completed onboarding
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') as Language;
    const savedLevel = localStorage.getItem('selectedLevel') as CEFRLevel;
    
    if (savedLanguage && savedLevel) {
      setSelectedLanguage(savedLanguage);
      setSelectedLevel(savedLevel);
      // Redirect to lessons page if onboarding is complete
      router.push('/lessons');
    } else {
      setShowOnboarding(true);
    }
    
    setIsLoading(false);
  }, [router]);

  const handleOnboardingComplete = (language: Language, level: CEFRLevel) => {
    setSelectedLanguage(language);
    setSelectedLevel(level);
    setShowOnboarding(false);
    // Redirect to lessons after onboarding
    router.push('/lessons');
  };

  const handleLessonSelect = (lesson: Lesson) => {
    // Navigate to individual lesson page
    const slug = getLessonSlug(lesson);
    router.push(`/lesson/${slug}`);
  };

  const handleShowOnboardingScreen = () => {
    setShowOnboarding(true);
  };

  const handleBackToHome = () => {
    setSelectedLesson(null);
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

  // Show onboarding if needed
  if (showOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  // Show dictation screen if lesson is selected (for backward compatibility)
  if (selectedLesson) {
    return (
      <NavigationLayout
        currentScreen="dictation"
        selectedLanguage={selectedLanguage}
        selectedLevel={selectedLevel}
        lessonTitle={selectedLesson.title}
      >
        <DictationScreen
          lesson={selectedLesson}
          onBack={handleBackToHome}
        />
      </NavigationLayout>
    );
  }

  // Show home screen (lessons)
  return (
    <NavigationLayout
      currentScreen="home"
      selectedLanguage={selectedLanguage}
      selectedLevel={selectedLevel}
      onShowOnboarding={handleShowOnboardingScreen}
    >
      <HomeScreen
        selectedLanguage={selectedLanguage}
        selectedLevel={selectedLevel}
        onLessonSelect={handleLessonSelect}
        onShowOnboarding={handleShowOnboardingScreen}
      />
    </NavigationLayout>
  );
}
