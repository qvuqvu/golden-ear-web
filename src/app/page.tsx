'use client';

import { useState, useEffect } from 'react';
import { OnboardingScreen } from '@/screens/OnboardingScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { DictationScreen } from '@/screens/DictationScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { NavigationLayout } from '@/components/NavigationLayout';
import { Lesson, CEFRLevel, Language } from '@/data/mockLessons';

type Screen = 'onboarding' | 'home' | 'dictation' | 'profile';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
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
      setCurrentScreen('home');
    }
    
    setIsLoading(false);
  }, []);

  const handleOnboardingComplete = (language: Language, level: CEFRLevel) => {
    setSelectedLanguage(language);
    setSelectedLevel(level);
    setCurrentScreen('home');
  };

  const handleLessonSelect = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setCurrentScreen('dictation');
  };

  const handleShowOnboarding = () => {
    setCurrentScreen('onboarding');
  };

  const handleBackToHome = () => {
    setSelectedLesson(null);
    setCurrentScreen('home');
  };

  const handleShowProfile = () => {
    setCurrentScreen('profile');
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

  return (
    <NavigationLayout
      currentScreen={currentScreen}
      selectedLanguage={selectedLanguage}
      selectedLevel={selectedLevel}
      onShowOnboarding={handleShowOnboarding}
      onNavigateProfile={handleShowProfile}
      onNavigateHome={handleBackToHome}
      onBack={currentScreen === 'dictation' ? handleBackToHome : undefined}
      lessonTitle={currentScreen === 'dictation' && selectedLesson ? selectedLesson.title : undefined}
      showNavigation={currentScreen !== 'onboarding'}
    >
      {/* Screen Router */}
      {currentScreen === 'onboarding' && (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      )}
      
      {currentScreen === 'home' && (
        <HomeScreen
          selectedLanguage={selectedLanguage}
          selectedLevel={selectedLevel}
          onLessonSelect={handleLessonSelect}
          onShowOnboarding={handleShowOnboarding}
        />
      )}
      
      {currentScreen === 'dictation' && selectedLesson && (
        <DictationScreen
          lesson={selectedLesson}
          onBack={handleBackToHome}
        />
      )}
      
      {currentScreen === 'profile' && (
        <ProfileScreen
          selectedLanguage={selectedLanguage}
          selectedLevel={selectedLevel}
          onShowOnboarding={handleShowOnboarding}
        />
      )}
    </NavigationLayout>
  );
}
