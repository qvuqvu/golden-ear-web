'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { DictationScreen } from '@/screens/DictationScreen';
import { NavigationLayout } from '@/components/NavigationLayout';
import { Lesson, Language, CEFRLevel, findLessonBySlug } from '@/data/mockLessons';

export default function LessonPage() {
  const router = useRouter();
  const params = useParams();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('English');
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel>('A1');
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const slug = params.slug as string;
    
    // Load user preferences
    const savedLanguage = localStorage.getItem('selectedLanguage') as Language;
    const savedLevel = localStorage.getItem('selectedLevel') as CEFRLevel;
    
    if (savedLanguage && savedLevel) {
      setSelectedLanguage(savedLanguage);
      setSelectedLevel(savedLevel);
    }

    // Find lesson by slug (using helper function)
    const foundLesson = findLessonBySlug(slug);
    
    if (foundLesson) {
      setLesson(foundLesson);
    } else {
      setNotFound(true);
    }
    
    setIsLoading(false);
  }, [params.slug]);

  const handleBack = () => {
    router.push('/lessons');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (notFound || !lesson) {
    return (
      <NavigationLayout
        selectedLanguage={selectedLanguage}
        selectedLevel={selectedLevel}
      >
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-foreground">Lesson Not Found</h1>
            <p className="text-muted-foreground">The lesson you&apos;re looking for doesn&apos;t exist.</p>
            <button 
              onClick={handleBack}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Back to Lessons
            </button>
          </div>
        </div>
      </NavigationLayout>
    );
  }

  return (
    <NavigationLayout
      currentScreen="dictation"
      selectedLanguage={selectedLanguage}
      selectedLevel={selectedLevel}
      lessonTitle={lesson.title}
      onBack={handleBack}
    >
      <DictationScreen
        lesson={lesson}
        onBack={handleBack}
      />
    </NavigationLayout>
  );
}
