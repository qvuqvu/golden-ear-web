'use client';

import { useState, useEffect } from 'react';
import { CEFRLevel, Language } from '@/data/mockLessons';
import { LanguageSelector } from '@/components/LanguageSelector';

interface OnboardingScreenProps {
  onComplete: (language: Language, level: CEFRLevel) => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel | null>(null);

  // Check if user has already completed onboarding
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') as Language;
    const savedLevel = localStorage.getItem('selectedLevel') as CEFRLevel;
    
    if (savedLanguage && savedLevel) {
      onComplete(savedLanguage, savedLevel);
    }
  }, [onComplete]);

  const handleComplete = () => {
    if (selectedLanguage && selectedLevel) {
      // Save to localStorage
      localStorage.setItem('selectedLanguage', selectedLanguage);
      localStorage.setItem('selectedLevel', selectedLevel);
      
      onComplete(selectedLanguage, selectedLevel);
    }
  };

  return (
    <LanguageSelector
      selectedLanguage={selectedLanguage}
      onLanguageSelect={setSelectedLanguage}
      selectedLevel={selectedLevel}
      onLevelSelect={setSelectedLevel}
      onComplete={handleComplete}
    />
  );
}
