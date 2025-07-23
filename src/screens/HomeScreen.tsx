'use client';

import { useState, useEffect } from 'react';
import { mockLessons, Lesson, CEFRLevel, Language } from '@/data/mockLessons';
import { LevelSection } from '@/components/LevelSection';
import { Button } from '@/components/ui/button';
import { Settings, Globe } from 'lucide-react';

interface HomeScreenProps {
  selectedLanguage: Language;
  selectedLevel: CEFRLevel;
  onLessonSelect: (lesson: Lesson) => void;
  onShowOnboarding: () => void;
}

export function HomeScreen({ 
  selectedLanguage, 
  selectedLevel, 
  onLessonSelect,
  onShowOnboarding 
}: HomeScreenProps) {
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    // Filter lessons by selected language
    const filteredLessons = mockLessons.filter(
      lesson => lesson.language === selectedLanguage
    );
    setLessons(filteredLessons);
  }, [selectedLanguage]);

  // Group lessons by CEFR level
  const lessonsByLevel = lessons.reduce((acc, lesson) => {
    if (!acc[lesson.level]) {
      acc[lesson.level] = [];
    }
    acc[lesson.level].push(lesson);
    return acc;
  }, {} as Record<CEFRLevel, Lesson[]>);

  // CEFR levels in order
  const levels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Mobile-only Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border z-10 md:hidden">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Golden Ear</h1>
              <p className="text-sm text-muted-foreground">
                Learning {selectedLanguage} • Level {selectedLevel}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onShowOnboarding}
                className="flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">Change Language</span>
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              Featured Lessons
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Improve your listening and transcription skills with our carefully curated lessons. 
              Choose from different CEFR levels to match your current proficiency.
            </p>
          </div>

          {/* Lessons by Level */}
          <div className="space-y-12">
            {levels.map(level => (
              <LevelSection
                key={level}
                level={level}
                lessons={lessonsByLevel[level] || []}
                onLessonClick={onLessonSelect}
              />
            ))}
          </div>

          {/* Empty State */}
          {lessons.length === 0 && (
            <div className="text-center py-12">
              <div className="space-y-4">
                <Globe className="w-16 h-16 text-muted-foreground mx-auto" />
                <h3 className="text-lg font-semibold text-foreground">
                  No lessons available
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  We&apos;re working on adding more lessons for {selectedLanguage}. 
                  Check back soon or try a different language!
                </p>
                <Button onClick={onShowOnboarding} variant="outline">
                  Change Language
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
