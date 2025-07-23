'use client';

import { CEFRLevel, Language } from '@/data/mockLessons';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface LanguageSelectorProps {
  selectedLanguage: Language | null;
  onLanguageSelect: (language: Language) => void;
  selectedLevel: CEFRLevel | null;
  onLevelSelect: (level: CEFRLevel) => void;
  onComplete: () => void;
}

const languages: Language[] = ['English', 'French', 'Chinese'];
const levels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const levelDescriptions = {
  A1: 'Beginner - Basic phrases and vocabulary',
  A2: 'Elementary - Simple conversations and texts',
  B1: 'Intermediate - Familiar topics and situations',
  B2: 'Upper Intermediate - Complex texts and ideas',
  C1: 'Advanced - Fluent and spontaneous expression',
  C2: 'Proficient - Near-native level understanding',
};

export function LanguageSelector({
  selectedLanguage,
  onLanguageSelect,
  selectedLevel,
  onLevelSelect,
  onComplete,
}: LanguageSelectorProps) {
  const isComplete = selectedLanguage && selectedLevel;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Welcome to Golden Ear</h1>
          <p className="text-muted-foreground">Choose your language and level to get started</p>
        </div>

        {/* Language Selection */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Select Language</h2>
          <div className="grid grid-cols-1 gap-3">
            {languages.map((language) => (
              <Card
                key={language}
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedLanguage === language
                    ? 'ring-2 ring-primary bg-primary/5'
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => onLanguageSelect(language)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{language}</span>
                  {selectedLanguage === language && (
                    <div className="w-3 h-3 bg-primary rounded-full" />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Level Selection */}
        {selectedLanguage && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Select Your Level</h2>
            <div className="grid grid-cols-2 gap-3">
              {levels.map((level) => (
                <Card
                  key={level}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedLevel === level
                      ? 'ring-2 ring-primary bg-primary/5'
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => onLevelSelect(level)}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg">{level}</span>
                      {selectedLevel === level && (
                        <div className="w-3 h-3 bg-primary rounded-full" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {levelDescriptions[level]}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Complete Button */}
        {isComplete && (
          <Button
            onClick={onComplete}
            className="w-full h-12 text-lg font-semibold"
            size="lg"
          >
            Start Learning
          </Button>
        )}
      </div>
    </div>
  );
}
